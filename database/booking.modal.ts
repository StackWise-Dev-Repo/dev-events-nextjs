import mongoose, { Schema } from 'mongoose';
import { IBooking, IBookingModel } from '@/lib/types';

const bookingSchema: Schema<IBooking> = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    userEmail: {
      type: String,
      required: [true, 'User email is required'],
      lowercase: true,
      trim: true,
    },
    bookingDateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: ensure email is lowercased and booking date is set
bookingSchema.pre<IBooking>('save', function () {
  const booking = this;

  // Ensure email is always lowercase
  if (booking.isModified('userEmail')) {
    booking.userEmail = booking.userEmail.toLowerCase().trim();
  }

  // Set booking date for new bookings
  if (booking.isNew && !booking.bookingDateTime) {
    booking.bookingDateTime = new Date();
  }
});

// Indexes for better query performance
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ userEmail: 1 });
// Composite unique index to prevent duplicate bookings for the same user and event
bookingSchema.index({ eventId: 1, userEmail: 1 }, { unique: true });

// Static method: Find bookings by event
bookingSchema.static('findByEvent', function (eventId: mongoose.Types.ObjectId | string) {
  return this.find({ eventId }).populate('eventId');
});

// Static method: Find bookings by user email
bookingSchema.static('findByUser', function (email: string) {
  return this.find({ userEmail: email.toLowerCase().trim() }).populate('eventId');
});

// Static method: Check if user is already booked for an event
bookingSchema.static('isBooked', function (eventId: mongoose.Types.ObjectId | string, userEmail: string) {
  const count = this.countDocuments({
    eventId,
    userEmail: userEmail.toLowerCase().trim(),
  });
  return count.then((c: number) => c > 0);
});

const Booking = mongoose.model<IBooking, IBookingModel>('Booking', bookingSchema);

export default Booking;
