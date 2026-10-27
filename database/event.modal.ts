import mongoose, { Schema, Types } from 'mongoose';
import { IEvent, IEventModel, EventType } from '@/lib/types';

/**
 * Generate a URL-friendly slug from a string.
 * Converts to lowercase, replaces spaces and special characters with hyphens,
 * and removes consecutive hyphens or leading/trailing hyphens.
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Ensure slug uniqueness by appending a counter if the slug already exists.
 */
async function ensureUniqueSlug(model: IEventModel, slug: string, excludeId?: Types.ObjectId): Promise<string> {
  let finalSlug = slug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug: finalSlug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const existing = await model.findOne(query);
    if (!existing) {
      return finalSlug;
    }
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
}

const eventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Event title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Event slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    src: {
      type: String,
      required: [true, 'Event source image is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: Object.values(EventType),
        message: '{VALUE} is not a valid event type',
      },
      required: [true, 'Event type is required'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: auto-generate slug from title if not provided
eventSchema.pre<IEvent>('validate', async function () {
  const event = this;

  // Only generate slug if it's a new document or slug is explicitly modified
  if (event.isModified('title') || !event.isModified('slug')) {
    const generatedSlug = generateSlug(event.title);

    if (!event.slug || event.slug !== generatedSlug) {
      event.slug = await ensureUniqueSlug(
        event.constructor as unknown as IEventModel,
        generatedSlug,
        event.isNew ? undefined : event._id
      );
    }
  }

  // Ensure date is a valid Date object
  if (event.date && !(event.date instanceof Date)) {
    event.date = new Date(event.date);
  }
});

// Indexes for better query performance
eventSchema.index({ date: -1 });
eventSchema.index({ tags: 1 });
eventSchema.index({ type: 1 });

// Static method: Find event by slug
eventSchema.static('findBySlug', function (slug: string) {
  return this.findOne({ slug }).lean();
});

// Static method: Find events by date range
eventSchema.static('findByDateRange', function (startDate: Date, endDate: Date) {
  return this.find({
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: -1 });
});

// Static method: Find events by tags
eventSchema.static('findByTags', function (tags: string[]) {
  return this.find({ tags: { $in: tags } });
});

const Event = mongoose.models.Event || mongoose.model<IEvent, IEventModel>('Event', eventSchema);

export default Event;
