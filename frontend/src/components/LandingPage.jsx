import React from "react";
import { Bug, Users2, GitBranch, MessageSquare } from "lucide-react";
import DotGrid from "./DotGrid";
import Prism from "./Prism";
import Navbar from "./Navbar";
import Iridescence from "./Iridescence";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    const checkAuth = () => {
        if(localStorage.getItem("user")) {
            navigate('/resolve');
        } else {
            navigate('/auth');
        }
    }

    return (
        <div className="bg-zinc-950 text-gray-100 font-sans">
            <Navbar />
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black opacity-90" />

                {/* DotGrid layer */}
                <div className="absolute inset-0 z-0 opacity-70">
                    <DotGrid
                        dotSize={2}
                        gap={20}
                        baseColor="#5227FF"
                        activeColor="#5227FF"
                        proximity={150}
                        shockRadius={300}
                        shockStrength={6}
                        resistance={600}
                        returnDuration={1.8}
                    />
                </div>

                {/* Glow gradient overlay */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-[200px]" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-[200px]" />

                {/* Content */}
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    Collaborate. Build. Report.
                </h1>
                <p className="mt-6 text-lg md:text-2xl max-w-2xl relative z-10 text-zinc-300">
                    A modern devlog journal to manage projects, track bugs, and share progress
                    seamlessly with your team.
                </p>
                <div className="mt-8 relative z-10 flex gap-4">
                    <button onClick={checkAuth} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg hover:opacity-90 transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border border-zinc-500 text-zinc-200 rounded-full hover:bg-zinc-800/40 transition">
                        Learn More
                    </button>
                </div>
            </section>



            {/* Features Section */}
            <section className="relative py-24 px-6 bg-gradient-to-br from-black via-zinc-950 to-zinc-900 overflow-hidden">
                {/* background accent */}
                <div className="absolute inset-0 -z-10">
                    <div className="w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl absolute -top-40 -left-40"></div>
                    <div className="w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl absolute bottom-0 right-0"></div>
                </div>

                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Features to Power Your Workflow
                    </h2>
                    <p className="text-zinc-400 mb-16 max-w-2xl mx-auto">
                        Everything you need to plan, collaborate, and ship faster.
                    </p>

                    {/* Features Grid */}
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
                        {/* Feature Card */}
                        <div className="group relative p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-pink-400/50 transition transform hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.6)]">
                            <Bug className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-lg text-zinc-100">Bug Tracking</h3>
                            <p className="text-zinc-400 mt-2 text-sm">
                                Keep track of issues, assign fixes, and prioritize with ease.
                            </p>
                        </div>

                        <div className="group relative p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-blue-400/50 transition transform hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]">
                            <Users2 className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-lg text-zinc-100">Team Collaboration</h3>
                            <p className="text-zinc-400 mt-2 text-sm">
                                Work together in real-time and stay aligned on progress.
                            </p>
                        </div>

                        <div className="group relative p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-pink-400/50 transition transform hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(244,114,182,0.6)]">
                            <GitBranch className="w-10 h-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-lg text-zinc-100">Project Logs</h3>
                            <p className="text-zinc-400 mt-2 text-sm">
                                Document milestones, decisions, and keep history at hand.
                            </p>
                        </div>

                        <div className="group relative p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-green-400/50 transition transform hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)]">
                            <MessageSquare className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-lg text-zinc-100">Discussions</h3>
                            <p className="text-zinc-400 mt-2 text-sm">
                                Comment, review, and make decisions without leaving the app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Workflow Section */}
            <section className="relative py-24 px-6 bg-zinc-950 overflow-hidden">
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#71717a_1px,transparent_1px),linear-gradient(to_bottom,#71717a_1px,transparent_1px)] [background-size:40px_40px]" />

                <div className="relative max-w-6xl mx-auto text-center">
                    {/* Title */}
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                        A Simple Process
                    </div>
                    <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
                        From idea to launch — we keep things effortless and structured.
                    </p>

                    {/* Steps */}
                    <div className="grid md:grid-cols-4 gap-10 relative">
                        {[
                            { step: "1", title: "Plan", desc: "Set goals and define milestones." },
                            { step: "2", title: "Log", desc: "Write daily devlogs and updates." },
                            { step: "3", title: "Track", desc: "Manage bugs and feature requests." },
                            { step: "4", title: "Ship", desc: "Deploy and celebrate progress." },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-400/50 transition transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10"
                            >
                                {/* Glowing step number */}
                                <div className="w-14 h-14 flex items-center justify-center rounded-full mx-auto 
                          bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-400 
                          text-white text-xl font-bold shadow-lg shadow-purple-500/30 group-hover:scale-110 transition">
                                    {item.step}
                                </div>

                                {/* Title */}
                                <h3 className="mt-6 font-semibold text-lg text-white">{item.title}</h3>
                                <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
                            </div>
                        ))}

                        {/* Connector lines (visible on desktop only) */}
                        {/* <div className="hidden md:block absolute top-15 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 opacity-30" /> */}
                    </div>
                </div>
            </section>


            {/* Call to Action Section */}
            <section className="relative py-20 px-6 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 text-center overflow-hidden">
                {/* Iridescence Background */}
                <div className="absolute inset-0 z-0">
                    <Iridescence
                        color={[0.5, 0.6, 0.8]}
                        mouseReact={false}
                        amplitude={0.1}
                        speed={0.5}
                    />
                </div>

                {/* Content on top */}
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black drop-shadow-lg">
                        Start Resolving Today
                    </h2>
                    <p className="text-zinc-800 mb-8 max-w-2xl mx-auto text-lg md:text-xl">
                        Join teams already using Resolve to build better together.
                    </p>
                    <button className="px-8 py-3 bg-white text-zinc-900 font-semibold rounded-full shadow-lg hover:opacity-90 transition">
                        Get Started Free
                    </button>
                </div>
            </section>


            {/* Footer Section */}
            <footer className="relative bg-zinc-950 text-zinc-400 pt-16 pb-8">
                {/* Gradient divider line */}

                <div className=" mx-auto px-6 grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Resolve
                        </h3>
                        <p className="mt-4 text-sm text-gray-500 max-w-xs">
                            Collaborate, track, and ship your projects with clarity. A journal made for modern dev teams.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Integrations</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-400 transition">About</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition">Blog</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition">Careers</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Discord</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-12 border-t border-zinc-800 pt-6 text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} Resolve. All rights reserved.
                </div>
            </footer>

        </div>
    );
}
