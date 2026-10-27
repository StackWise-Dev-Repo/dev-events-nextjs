"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2, AlertCircle, PlusCircle } from "lucide-react";
import { createNewEvent } from "@/app/actions/event.manage";

const initialState = { success: false, message: "" };

export default function CreateEventForm() {

  const [state, formAction, isPending] = useActionState(createNewEvent, initialState);

  return (
    <div className="max-w-xl mx-auto bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-[var(--text-heading)]">
          Create New Event
        </h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Fill out the details below to host a new developer event.
        </p>
      </div>

      {/* Response Message Banner */}
      {state.message && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-sm ${
            state.success
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Next.js 15 Masterclass"
            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
          />
        </div>

        {/* Type & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
              Event Type
            </label>
            <select
              name="type"
              required
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
            >
              <option value="">Select Type</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
              Venue / Location
            </label>
            <input
              type="text"
              name="venue"
              required
              placeholder="Online / Silicon Valley, CA"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
            />
          </div>
        </div>

        {/* Date & Image Source URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
              Event Date & Time
            </label>
            <input
              type="datetime-local"
              name="date"
              required
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
              Image Source URL
            </label>
            <input
              type="file"
              name="src"
              required
              placeholder="choose file"
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
            Tags (Comma Separated)
          </label>
          <input
            type="text"
            name="tags"
            placeholder="react, nextjs, typescript"
            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono text-[var(--text-muted)] mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Describe what this event is about..."
            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-3 text-sm text-[var(--text-heading)] outline-none focus:border-[var(--school-bus-yellow)] transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full py-3 justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Event...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Publish Event</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
