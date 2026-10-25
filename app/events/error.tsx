"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

export default function ErrorPage({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Route Error Boundary caught:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-(--bg-main)">
            <div className="max-w-lg w-full bg-(--bg-surface) border border-(--border-color) rounded-2xl p-8 text-center shadow-xl">

                <div className="w-14 h-14 rounded-xl bg-(--regal-navy) text-(--school-bus-yellow) border border-(--border-highlight) flex items-center justify-center mx-auto mb-5 shadow-md">
                    <ShieldAlert className="w-7 h-7 stroke-[2]" />
                </div>

                <h2 className="text-xl font-bold text-(--text-heading) mb-2">
                    Unable to Load Section
                </h2>

                <p className="text-body-normal text-(--text-body) mb-6">
                    We couldn&apos;t load this event component or asset stream. Try re-syncing the page state below.
                </p>

                <button
                    onClick={() => reset()}
                    className="btn-primary py-2.5 px-6 text-sm mx-auto"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reload Component</span>
                </button>

            </div>
        </div>
    );
}