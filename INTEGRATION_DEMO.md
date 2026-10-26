# DevEventMaintainer - Integration Demo Guide

This guide shows how to use your database models and handle image uploads in your Next.js application.

## 1. Database Connection Setup

Your `database/index.ts` already handles MongoDB connection with caching. Here's how to use it:

```typescript
// Anywhere in your API routes or server components
import connectDB from '@/database';

// Connect before any database operations
await connectDB();
```

## 2. Using Event Model

### Create an Event

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database';
import Event from '@/database/event.modal';
import { CreateEventInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: CreateEventInput = await request.json();
    
    // Create new event
    const event = await Event.create({
      title: body.title,
      slug: body.slug, // Auto-generated if not provided
      description: body.description,
      src: body.src, // This will be the Cloudinary URL
      type: body.type,
      venue: body.venue,
      date: body.date,
      tags: body.tags || [],
    });
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
```

### Get All Events

```typescript
// app/api/events/route.ts
export async function GET() {
  try {
    await connectDB();
    
    const events = await Event.find().sort({ date: -1 }).lean();
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
```

### Get Event by Slug

```typescript
// app/api/events/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database';
import Event from '@/database/event.modal';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const event = await Event.findBySlug(params.slug);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
```

## 3. Image Upload with Cloudinary

For handling event images, you have two options:

### Option 1: Cloudinary (Recommended)

Cloudinary is ideal for Next.js because:
- Automatic image optimization
- CDN delivery
- Easy integration
- Free tier available

#### Setup Cloudinary

1. Install Cloudinary package:
```bash
npm install cloudinary
```

2. Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Create upload utility:
```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

4. Create upload API route:
```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'dev-events',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(buffer);
    });
    
    return NextResponse.json({
      url: (uploadResponse as any).secure_url,
      publicId: (uploadResponse as any).public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
```

5. Frontend upload component:
```typescript
// components/ImageUploader.tsx
'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function ImageUploader({ onUploadComplete }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        onUploadComplete(data.url);
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {preview && (
        <img 
          src={preview} 
          alt="Preview" 
          style={{ maxWidth: '200px', marginTop: '10px' }}
        />
      )}
    </div>
  );
}
```

### Option 2: Direct MongoDB GridFS (Not Recommended)

While possible, storing images directly in MongoDB is generally not recommended because:
- MongoDB is not optimized for large binary data
- No automatic image optimization
- Slower delivery without CDN
- Higher storage costs

## 4. Complete Event Creation Flow

Here's how to combine image upload with event creation:

```typescript
// components/CreateEventForm.tsx
'use client';

import { useState } from 'react';
import { EventType } from '@/lib/types';

export default function CreateEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    src: '',
    type: EventType.Conference,
    venue: '',
    date: '',
    tags: '',
  });
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setFormData(prev => ({ ...prev, src: data.url }));
        setImageUploaded(true);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date),
          tags: formData.tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (response.ok) {
        // Reset form and redirect
        window.location.href = '/events';
      }
    } catch (error) {
      console.error('Create event failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div>
        <label>Event Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="input-base"
        />
        {imageUploaded && <p className="text-green-500">Image uploaded!</p>}
      </div>

      <div>
        <label>Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
          className="input-base"
        >
          {Object.values(EventType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Venue</label>
        <input
          type="text"
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div>
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="input-base"
          placeholder="react, javascript, webdev"
        />
      </div>

      <button type="submit" className="btn-primary">
        Create Event
      </button>
    </form>
  );
}
```

## 5. Using Booking Model

### Create a Booking

```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database';
import Booking from '@/database/booking.modal';
import { CreateBookingInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: CreateBookingInput = await request.json();
    
    // Check if already booked
    const isBooked = await Booking.isBooked(body.eventId, body.userEmail);
    
    if (isBooked) {
      return NextResponse.json(
        { error: 'You are already booked for this event' },
        { status: 400 }
      );
    }
    
    // Create booking
    const booking = await Booking.create({
      eventId: body.eventId,
      userEmail: body.userEmail,
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

### Get User's Bookings

```typescript
// app/api/bookings/user/[email]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/database';
import Booking from '@/database/booking.modal';

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    await connectDB();
    
    const bookings = await Booking.findByUser(params.email);
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
```

## 6. Using User Model

### Register a User

```typescript
// app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database';
import RegisterUser from '@/database/user.modal';
import { CreateRegisterUserInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: CreateRegisterUserInput = await request.json();
    
    // Check if user already exists
    const existingUser = await RegisterUser.findByEmail(body.email);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await RegisterUser.create({
      name: body.name,
      email: body.email,
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
```

## 7. Environment Variables

Add these to your `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/<database-name>?retryWrites=true&w=majority

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 8. Recommended Workflow

1. **Image Upload Flow:**
   - User selects image → Upload to Cloudinary via `/api/upload` → Get URL → Store URL in event's `src` field

2. **Event Creation Flow:**
   - User fills form → Uploads image → Creates event with Cloudinary URL → Event saved to MongoDB

3. **Booking Flow:**
   - User clicks "Book" → Check if already booked → Create booking → Return confirmation

## 9. Alternative: Next.js Image Component with Cloudinary

For optimized image delivery, you can use Next.js Image component with Cloudinary:

```typescript
import Image from 'next/image';

// In your event card component
<Image
  src={event.src}  // Cloudinary URL
  alt={event.title}
  width={400}
  height={300}
  className="rounded-lg"
/>
```

Cloudinary URLs work seamlessly with Next.js Image component for automatic optimization.

## 10. Testing the Integration

1. Start your development server:
```bash
npm run dev
```

2. Test image upload:
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/image.jpg"
```

3. Test event creation:
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Conference 2024",
    "description": "Annual React conference",
    "src": "https://res.cloudinary.com/.../image.jpg",
    "type": "Conference",
    "venue": "San Francisco, CA",
    "date": "2024-12-01T09:00:00Z",
    "tags": ["react", "javascript"]
  }'
```

This setup provides a complete, production-ready integration pattern for your DevEventMaintainer application.
