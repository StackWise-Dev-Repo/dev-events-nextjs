

import { Image as ImageIcon, FileCode, Sparkles } from "lucide-react";
import FileUploader from "@/components/FileUploader";

export default function UploadShowcaseSection() {

    return (
        <section className="relative w-full pb-20 pt-10 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)]">

            {/* Background Glow Accent */}
            {/*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--school-bus-yellow)]/5 rounded-full blur-[140px] pointer-events-none" />*/}

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="badge-yellow mb-4 px-5 py-2">Infrastructure & Media</span>
                    <h2 className="text-[var(--text-heading)] font-extrabold tracking-tight">
                        Seamless File Upload & CDN Image Rendering
                    </h2>
                    <p className="text-body-large text-[var(--text-body-large)] mt-4">
                        Test our robust asset pipeline. Upload event banners, speaker avatars, and resource PDFs with real-time validation and instant preview.
                    </p>
                </div>

                {/* Grid Layout: Upload Zone & Feature Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Interactive Dropzone Simulator (Span 7) */}
                    <FileUploader />

                    {/* Right Column: Capabilities Bullet Points (Span 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">

                        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-[var(--regal-navy)] text-[var(--school-bus-yellow)] flex-shrink-0">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                                    Automatic Image Optimization
                                </h3>
                                <p className="text-body-normal text-[var(--text-body)] leading-relaxed">
                                    Images are automatically resized, converted to modern formats (AVIF/WebP), and lazy-loaded for peak performance.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-[var(--regal-navy)] text-[var(--school-bus-yellow)] flex-shrink-0">
                                <FileCode className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                                    Global Error Boundary & Fallbacks
                                </h3>
                                <p className="text-body-normal text-[var(--text-body)] leading-relaxed">
                                    Corrupted uploads or network timeouts trigger centralized error handling with graceful fallback states.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-[var(--regal-navy)] text-[var(--school-bus-yellow)] flex-shrink-0">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                                    Secure Session Management
                                </h3>
                                <p className="text-body-normal text-[var(--text-body)] leading-relaxed">
                                    Only authorized event organizers can upload or modify resources via verified token sessions.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}