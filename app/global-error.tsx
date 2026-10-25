"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import posthog from "posthog-js";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        posthog.captureException(error);
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <html lang="en" data-theme="dark">
        <body className="bg-(--bg-main) text-(--text-body) min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-(--bg-surface) border border-(--border-color) rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">

            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Warning Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AlertTriangle className="w-8 h-8 stroke-[2]" />
            </div>

            <span className="badge-yellow text-red-400 border-red-500/30 bg-red-500/10 mb-3 inline-block">
            System Alert
          </span>

            <h2 className="text-2xl font-extrabold text-(--text-heading) mb-2">
                Something Went Wrong
            </h2>

            <p className="text-body-normal text-(--text-muted) mb-6 leading-relaxed">
                An unexpected error occurred. Don&apos;t worry, our error boundary prevented the application from crashing.
            </p>

            {/* Error Details (Only digest in production for security) */}
            {error.digest && (
                <div className="p-3 rounded-lg bg-(--bg-main) border border-(--border-color) text-xs font-mono text-(--text-muted) mb-6">
                    Digest Code: <span className="text-(--school-bus-yellow)">{error.digest}</span>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                    onClick={() => reset()}
                    className="btn-primary w-full justify-center py-2.5 text-sm gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                </button>

                <a
                    href="/"
                    className="btn-outline w-full justify-center py-2.5 text-sm gap-2"
                >
                    <Home className="w-4 h-4" />
                    <span>Go Home</span>
                </a>
            </div>

        </div>
        </body>
        </html>
    );
}