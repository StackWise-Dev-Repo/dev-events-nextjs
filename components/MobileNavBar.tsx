"use client"

import React, {Fragment, useState} from 'react'
import {ArrowRight, Calendar, Code2, FolderUp, Layers, ShieldAlert, X} from "lucide-react";
import Link from "next/link";

export default function MobileNavBar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navLinks = [
        { name: "Events", href: "#events", icon: Calendar },
        { name: "Sessions", href: "#sessions", icon: Layers },
        { name: "Assets & Upload", href: "#upload", icon: FolderUp },
        { name: "Docs", href: "#docs", icon: ShieldAlert },
    ];

    return (
        <Fragment>
            {/* MOBILE DRAWER OVERLAY */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`fixed top-0 right-0 z-50 h-full w-[320px] sm:w-[320px] bg-(--prussian-blue) border-l border-(--border-color) p-6 shadow-2xl md:hidden flex flex-col justify-between transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-(--border-color)">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-6 h-6 text-(--school-bus-yellow)" />
                            <span className="font-bold text-lg text-white">DevEvents</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg text-(--text-body) hover:text-white hover:bg-(--regal-navy)"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Navigation Links */}
                    <nav className="flex flex-col gap-2 mt-6">
                        {navLinks.map((link: any) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-0 py-3 rounded-lg text-base font-medium text-(--text-body-large) hover:text-white hover:bg-(--regal-navy) transition-colors"
                                >
                                    <Icon className="w-5 h-5 text-(--school-bus-yellow)" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Drawer Bottom CTA */}
                <div className="pt-6 border-t border-(--border-color) flex flex-col gap-3">
                    <Link
                        href="/events/create"
                        className="btn-primary w-full justify-center py-3 text-body-large"
                    >
                        <span>Create Event</span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </Link>
                </div>
            </aside>
        </Fragment>
    )
}
