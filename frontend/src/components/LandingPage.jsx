import React from "react";
import { Bug, Users2, GitBranch, MessageSquare } from "lucide-react";
import DotGrid from "./DotGrid";
import Prism from "./Prism";
import Navbar from "./Navbar";

export default function LandingPage() {
    return (
        <div className="bg-zinc-950 text-gray-100 font-sans">
            <Navbar />
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-pink-400/50 to-zinc-900/30 blur-3xl opacity-40" />

                {/* DotGrid background */}
                <div className="absolute inset-0 z-0">
                    <DotGrid
                        dotSize={2}
                        gap={20}
                        baseColor="#5227FF"
                        activeColor="#5227FF"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                </div>

                {/* Content */}
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight relative z-10">
                    Collaborate. Build. Report.
                </h1>
                <p className="mt-6 text-lg md:text-2xl max-w-2xl relative z-10">
                    A modern devlog journal to manage projects, track bugs, and share progress
                    seamlessly with your team.
                </p>
                <div className="mt-8 relative z-10">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:opacity-90 transition">
                        Get Started
                    </button>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                        Features to Power Your Workflow
                    </div>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Everything you need to plan, collaborate, and ship faster.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="p-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition border-t-3 border-pink-300">
                            <Bug className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="font-semibold text-lg">Bug Tracking</h3>
                            <p className="text-gray-400 mt-2 text-sm">
                                Keep track of issues, assign fixes, and prioritize with ease.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition border-t-3 border-pink-300">
                            <Users2 className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="font-semibold text-lg">Team Collaboration</h3>
                            <p className="text-gray-400 mt-2 text-sm">
                                Work together in real-time and stay aligned on progress.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition border-t-3 border-pink-300">
                            <GitBranch className="w-8 h-8 text-pink-400 mb-4" />
                            <h3 className="font-semibold text-lg">Project Logs</h3>
                            <p className="text-gray-400 mt-2 text-sm">
                                Document milestones, decisions, and keep history at hand.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition border-t-3 border-pink-300">
                            <MessageSquare className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="font-semibold text-lg">Discussions</h3>
                            <p className="text-gray-400 mt-2 text-sm">
                                Comment, review, and make decisions without leaving the app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-20 px-6 bg-zinc-950">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">A Simple Workflow</h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Designed to flow naturally from planning to shipping.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Plan", desc: "Set goals and define milestones." },
                            { step: "2", title: "Log", desc: "Write daily devlogs and updates." },
                            { step: "3", title: "Track", desc: "Manage bugs and feature requests." },
                            { step: "4", title: "Ship", desc: "Deploy and celebrate progress." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
                                <span className="text-2xl font-bold text-purple-400">{item.step}</span>
                                <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 text-center">
                <h2 className="text-4xl font-bold mb-6">Start Your Devlog Today</h2>
                <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
                    Join teams already using Devlog Journal to build better together.
                </p>
                <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:opacity-90 transition">
                    Get Started Free
                </button>
            </section>

            {/* Footer */}
            <footer className="py-6 px-6 bg-gray-900 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Devlog Journal. All rights reserved.
            </footer>
        </div>
    );
}
