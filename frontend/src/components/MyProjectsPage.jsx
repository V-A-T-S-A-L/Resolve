import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { getProjectsByUserService } from "../services/ProjectService";
import { formatDate } from "../services/funtions";

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
        <div className="min-h-screen bg-black text-zinc-200 px-6 py-10">
            <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-4/5 z-50 
        bg-zinc-900/60 backdrop-blur-lg border border-zinc-800 rounded-2xl px-6 py-3 
        flex items-center justify-between">
                <Link to={'/'}>
                    <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xl">
                        Resolve
                    </h2>
                </Link>
                <div className="flex gap-5 items-center text-zinc-300">
                    <button className="hover:text-purple-400 transition">Dashboard</button>
                    <button className="hover:text-purple-400 transition">Projects</button>
                    <button className="hover:text-purple-400 transition">Invites</button>
                    <button className="hover:text-purple-400 transition">Profile</button>
                    <button onClick={logout} className="hover:text-red-400 transition flex items-center gap-1">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>
            {/* Header */}
            <div className="text-center mb-10 mt-20">
                <h1 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                    My Projects
                </h1>
                <p className="mt-6 text-zinc-400">
                    {"All the projects you’ve created are listed here ✨"}
                </p>
            </div>

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
