import { NextResponse } from 'next/server';
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
}