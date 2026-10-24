"use client"

import React, {SetStateAction, useEffect, useState} from 'react'
import {Heart} from "lucide-react";
import Link from "next/link";

export default function BottomMessage() {

    const [footerDate, setFooterDate] = useState<string>("");

    useEffect(() => {
        setFooterDate(String(new Date().getFullYear()));
    }, [footerDate])

    return (
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            {/* Left: Rights & Credit */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
                <span className="">&copy; {footerDate} DevEvents. All rights reserved</span>
            </div>

            {/* Right: Legal Links & System Status */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-medium">All Systems Operational</span>
                </div>
                <Link href="#privacy" className="transition-colors">
                    Privacy Policy
                </Link>
                <Link href="#terms" className="transition-colors">
                    Terms of Service
                </Link>
            </div>
        </div>
    )
}
