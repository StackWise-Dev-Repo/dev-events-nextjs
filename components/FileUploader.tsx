"use client"

import React, { useState } from 'react'
import Card from "@/components/Card";
import { UploadCloud, CheckCircle } from "lucide-react";
import posthog from "posthog-js";

export default function FileUploader() {

    const [dragOver, setDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    const handleSimulatedUpload = (fileName: string, upload_method: "browse" | "drop") => {
        setUploadedFile(fileName);
        posthog.capture("file_upload_simulated", { upload_method });
        posthog.logger.info("simulated event asset upload completed", { upload_method });
    };

    return (
        <div className="lg:col-span-7">
            <Card interactive={false} glow={false} className="p-8 bg-[var(--bg-surface)] border-[var(--border-color)]">

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-body-normal font-mono text-[var(--text-muted)]">
                      Upload file
                    </span>
                </div>

                {/* Drag & Drop Box */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleSimulatedUpload("event-banner-2026.png", "drop"); }}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center ${
                        dragOver
                            ? "border-[var(--school-bus-yellow)] bg-[var(--school-bus-yellow)]/5"
                            : "border-[var(--border-color)] bg-[var(--bg-main)] hover:border-[var(--border-highlight)]"
                    }`}
                >
                    {uploadedFile ? (
                        <div className="flex flex-col items-center gap-3 animate-fade-in">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                <CheckCircle className="w-7 h-7" />
                            </div>
                            <span className="text-body-large font-bold text-[var(--text-heading)]">
                                          {uploadedFile} uploaded successfully!
                                        </span>
                            <p className="text-body-normal text-[var(--text-muted)]">
                                Optimized WebP generated &bull; CDN cached
                            </p>
                            <button
                                onClick={() => setUploadedFile(null)}
                                className="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-hover)] text-[var(--text-heading)] hover:bg-[var(--school-bus-yellow)] hover:text-[var(--ink-black)] transition-colors"
                            >
                                Upload Another File
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-14 h-14 rounded-xl bg-[var(--regal-navy)] text-[var(--school-bus-yellow)] flex items-center justify-center mb-4 shadow-md">
                                <UploadCloud className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                                Drag & Drop event assets here
                            </h3>
                            <p className="text-body-normal text-[var(--text-muted)] mb-6 max-w-sm">
                                Supports PNG, JPG, WEBP, or PDF up to 25MB. Instant compression and global CDN distribution.
                            </p>
                            <button
                                onClick={() => handleSimulatedUpload("dev-summit-hero.webp", "browse")}
                                className="btn-primary py-2.5 px-6 text-sm"
                            >
                                Browse Files
                            </button>
                        </>
                    )}
                </div>
            </Card>
        </div>
    )
}
