import React, { useState } from "react";
import logo from '../assets/r-logo.png';
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-5xl w-full px-6 rounded-2xl bg-transparent backdrop-blur-xs border-b border-white/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to={"/"}>
                    <div className="flex items-center">
                        {/* <img src={logo} className="w-16 h-16" /> */}
                        <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                            Resolve
                        </div>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Home", "Features", "Projects", "Community", "Contact"].map(
                        (item) => (
                            <a
                                key={item}
                                href="#"
                                className="relative text-white/80 hover:text-white transition"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-300 group-hover:w-full" />
                            </a>
                        )
                    )}
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:opacity-90 transition">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white focus:outline-none"
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-4">
                    {["Home", "Features", "Projects", "Community", "Contact"].map(
                        (item) => (
                            <a
                                key={item}
                                href="#"
                                className="block text-white/80 hover:text-white transition"
                            >
                                {item}
                            </a>
                        )
                    )}
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:opacity-90 transition">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
}
