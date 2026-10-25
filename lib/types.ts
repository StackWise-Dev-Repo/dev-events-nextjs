import { Document, Model, Types } from 'mongoose';

/** Enum for event types */
export enum EventType {
  Conference = 'Conference',
  Workshop = 'Workshop',
  Webinar = 'Webinar',
  Meetup = 'Meetup',
  Hackathon = 'Hackathon',
  Seminar = 'Seminar',
  Summit = 'Summit',
  Other = 'Other',
}

/** Core event interface extending Mongoose Document */
export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  src: string;
  type: EventType;
  venue: string;
  date: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Input type for creating a new event */
export interface CreateEventInput {
  title: string;
  slug: string;
  description: string;
  src: string;
  type: EventType;
  venue: string;
  date: Date | string;
  tags?: string[];
}

/** Input type for updating an existing event */
export interface UpdateEventInput {
  title?: string;
  slug?: string;
  description?: string;
  src?: string;
  type?: EventType;
  venue?: string;
  date?: Date | string;
  tags?: string[];
}

/** Mongoose model type for Event */
export interface IEventModel extends Model<IEvent> {
  /** Find event by slug */
  findBySlug(slug: string): Promise<IEvent | null>;
  /** Find events by date range */
  findByDateRange(startDate: Date, endDate: Date): Promise<IEvent[]>;
  /** Find events by tags */
  findByTags(tags: string[]): Promise<IEvent[]>;
}

// ============================================================================
// Register User Types
// ============================================================================

/** Interface for a registered user extending Mongoose Document */
export interface IRegisterUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  registerDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Input type for registering a new user */
export interface CreateRegisterUserInput {
  name: string;
  email: string;
}

/** Input type for updating a registered user */
export interface UpdateRegisterUserInput {
  name?: string;
  email?: string;
}

/** Mongoose model type for RegisterUser */
export interface IRegisterUserModel extends Model<IRegisterUser> {
  /** Find user by email */
  findByEmail(email: string): Promise<IRegisterUser | null>;
}

// ============================================================================
// Booking Types
// ============================================================================

/** Interface for a booking extending Mongoose Document */
export interface IBooking extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  userEmail: string;
  bookingDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Input type for creating a new booking */
export interface CreateBookingInput {
  eventId: Types.ObjectId | string;
  userEmail: string;
}

/** Input type for updating a booking */
export interface UpdateBookingInput {
  eventId?: Types.ObjectId | string;
  userEmail?: string;
}

/** Populated booking type with event details */
export interface IBookingPopulated extends IBooking {
  event: IEvent;
}

/** Mongoose model type for Booking */
export interface IBookingModel extends Model<IBooking> {
  /** Find bookings by event */
  findByEvent(eventId: Types.ObjectId | string): Promise<IBooking[]>;
  /** Find bookings by user email */
  findByUser(email: string): Promise<IBooking[]>;
  /** Check if user is already booked for an event */
  isBooked(eventId: Types.ObjectId | string, userEmail: string): Promise<boolean>;
}

