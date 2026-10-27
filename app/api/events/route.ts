import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database';
import Event from '@/database/event.modal';


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
};

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { title, description, src, type, venue, date, tags } = body;

//     console.log("_________ reach to server __________")

//     await connectDB();

//     const response = await Event.create({
//       title,
//       description,
//       src,
//       type,
//       venue,
//       date: new Date(date),
//       tags,
//     });

//     console.log("server response", response)

//     return NextResponse.json({
//       success: true,
//       message: "Event created successfully."
//     }, {status: 201});

//   } catch(error: any) {
//     return NextResponse.json({
//       success: false,
//       message: error.message
//     }, {status: 400})
//   }
// }