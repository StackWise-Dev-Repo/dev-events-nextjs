"use client";

import React, {useState} from 'react'
import {Menu, X} from "lucide-react";

export default function StateButton() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2.5 rounded-lg text-(--text-body) hover:text-white hover:bg-(--prussian-blue) focus:outline-none focus:ring-2 focus:ring-(--school-bus-yellow) transition-colors"
            aria-label="Toggle navigation menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
    )
}
