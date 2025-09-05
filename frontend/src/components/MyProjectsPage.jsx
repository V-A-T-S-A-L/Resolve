import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { getProjectsByUserService } from "../services/ProjectService";
import { formatDate } from "../services/funtions";
import { motion } from "framer-motion";
import Navbar2 from "./Navbar2";

export default function MyProjectsPage() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate('/');
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [projects, setProjects] = useState([]);


    useEffect(() => {
        getProjectsByUserService(userId).then((response) => {
            setProjects(response.data);
        }).catch(() => {
            console.error("Error fetching projects");
        })
    }, [userId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-200 px-6 py-10">

            <Navbar2 logout={logout} />

            {/* Sleek Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-center mb-14 mt-28 px-6">
                {/* Glow background accent */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>

                <h2 className="relative text-3xl md:text-4xl font-extrabold tracking-tight 
    text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
    drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    My Projects
                </h2>

                <p className="relative mt-4 text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Manage, track, and explore all the projects you’ve created in one place ✨
                </p>

                {/* Divider line */}
                <div className="relative mt-8 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-lg shadow-cyan-400/30"></div>
            </motion.div>


            {/* Project Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Neon Glow Border Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                        <h2 className="relative text-xl font-semibold text-zinc-100 group-hover:text-cyan-300 transition">
                            {project.name}
                        </h2>
                        <p className="relative mt-2 text-sm text-zinc-400">
                            {project.description}
                        </p>
                        <p className="relative mt-4 text-xs text-zinc-500">
                            Created on {formatDate(project.createdAt)}
                        </p>

                        {/* Actions */}
                        <div className="relative mt-5 flex gap-3">
                            <Link to={`/project/${project.id}`}>
                                <button className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-cyan-400/40 transition">
                                    Open
                                </button>
                            </Link>
                            <button className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-pink-400/40 transition">
                                Manage
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
