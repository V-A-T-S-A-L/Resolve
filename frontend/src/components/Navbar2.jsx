// Navbar.jsx
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar2({ logout }) {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", path: "/resolve" },
        { name: "Projects", path: "/joinedprojects" },
        { name: "Invites", path: "/invites" },
        { name: "Profile", path: "/profile" },
    ];

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-4/5 z-50 
      bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 rounded-2xl px-6 py-3 
      flex items-center justify-between shadow-lg">

            {/* Logo */}
            <Link to="/">
                <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xl">
                    Resolve
                </h2>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 items-center text-zinc-300 text-sm">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="relative group hover:text-purple-400 transition"
                    >
                        {link.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                    </Link>
                ))}

                <button
                    onClick={logout}
                    className="hover:text-red-400 transition flex items-center gap-1"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900/90 border border-zinc-800 rounded-xl flex flex-col p-4 space-y-3 shadow-lg md:hidden">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className="hover:text-purple-400 transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="hover:text-red-400 transition flex items-center gap-1"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
