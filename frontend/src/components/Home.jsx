import React, { useEffect, useState } from "react";
import { Plus, FolderKanban, Users, LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createProjectService } from "../services/ProjectService";
import { deleteReq, receivedReqs } from "../services/JoinRequestService";
import { formatDate } from "../services/funtions";
import { AddMember } from "../services/MembersService";
import { motion } from "framer-motion";
import Navbar2 from "./Navbar2";

export default function HomePage() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (!user) navigate("/");
	}, [user, navigate]);

	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [requests, setRequests] = useState([]);

	const logout = () => {
		localStorage.removeItem("user");
		navigate("/");
	};

	const createProject = (e) => {
		e.preventDefault();
		setShowModal(false);

		if (!projectName || !projectDescription) return;

		const body = { name: projectName, description: projectDescription };

		createProjectService(user?.id, body)
			.then((res) => {
				setProjectName("");
				setProjectDescription("");

				const projectId = res.data.id;
				const memberBody = { projectId, userId: user.id, role: "admin" };
				return AddMember(memberBody);
			})
			.catch(() => console.error("Error creating project"));
	};

	useEffect(() => {
		receivedReqs(user?.email)
			.then((res) => setRequests(res.data))
			.catch((err) => console.error("Error fetching invites", err));
	}, [user?.email]);

	const acceptReq = (id, projectId) => {
		const body = { projectId, userId: user?.id, role: "member" };

		AddMember(body).then(() => {
			deleteReq(id).then(() => {
				setRequests((prev) => prev.filter((req) => req.id !== id));
			});
		}).catch((err) => console.warn("Error accepting invite", err));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white flex flex-col relative">
			{/* Background overlay for subtle noise */}
			{/* <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" /> */}

			<Navbar2 logout={logout} />

			{/* Main Content */}
			<main className="flex-1 mt-28 px-6 max-w-7xl mx-auto w-full space-y-20">
				{/* Welcome */}
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
				>
					Welcome back, {user.name} 👋
				</motion.h2>

				{/* Quick Actions */}
				<section className="grid md:grid-cols-3 gap-8 mt-10">
					{/* Create Project */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						onClick={() => setShowModal(true)}
						className="p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-purple-500 
              hover:shadow-lg hover:shadow-purple-500/20 transition cursor-pointer group"
					>
						<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
							<Plus size={24} />
						</div>
						<h3 className="text-lg font-semibold">Create Project</h3>
						<p className="text-zinc-400 mt-2 text-sm">Start a new devlog journey.</p>
					</motion.div>

					{/* Your Projects */}
					<Link to="/myprojects">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-blue-500 
                hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer group"
						>
							<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
								<FolderKanban size={24} />
							</div>
							<h3 className="text-lg font-semibold">Your Projects</h3>
							<p className="text-zinc-400 mt-2 text-sm">View projects you’ve created.</p>
						</motion.div>
					</Link>

					{/* Joined Projects */}
					<Link to="/joinedprojects">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="p-6 rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-green-500 
                hover:shadow-lg hover:shadow-green-500/20 transition cursor-pointer group"
						>
							<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
								<Users size={24} />
							</div>
							<h3 className="text-lg font-semibold">Joined Projects</h3>
							<p className="text-zinc-400 mt-2 text-sm">Collaborate with your team.</p>
						</motion.div>
					</Link>
				</section>

				{/* Active Projects */}
				<section>
					<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
						Your Active Projects
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{["AI Chatbot", "E-commerce Tracker", "Game Dev Toolkit"].map(
							(proj, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.2 }}
									className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-blue-500 
                    transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
								>
									<h3 className="text-lg font-semibold">{proj}</h3>
									<p className="text-sm text-zinc-400 mt-2">
										{i === 0
											? "AI-powered assistant for customer support."
											: i === 1
												? "Track inventory & analytics with ease."
												: "Tools & docs for indie game developers."}
									</p>
									<button className="mt-4 text-sm font-semibold text-blue-400 hover:underline">
										Open →
									</button>
								</motion.div>
							)
						)}
					</div>
				</section>

				{/* Invitations */}
				<section>
					<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
						Project Invitations
					</h2>
					<div className="space-y-4">
						{requests.length === 0 ? (
							<p className="text-zinc-300 text-lg bg-zinc-900/70 p-6 rounded-2xl">
								No pending invitations
							</p>
						) : (
							requests.map((invite, i) => (
								<motion.div
									key={i}
									whileHover={{ scale: 1.02 }}
									className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex justify-between items-center 
                    hover:border-green-500 transition"
								>
									<div>
										<h3 className="font-semibold">{invite.projectName}</h3>
										<p className="text-zinc-400 text-sm">
											Invited by {invite.senderName} ({invite.senderEmail})
										</p>
										<p className="text-zinc-400 text-sm">
											On {formatDate(invite.createdAt)}
										</p>
									</div>
									<div className="flex gap-3">
										<button
											onClick={(e) => {
												e.preventDefault();
												acceptReq(invite.id, invite.projectId);
											}}
											className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition"
										>
											Accept
										</button>
										<button className="px-4 py-2 rounded-xl bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 transition">
											Decline
										</button>
									</div>
								</motion.div>
							))
						)}
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="mt-20 py-5 border-t border-zinc-800 text-center text-sm text-zinc-500">
				© 2025 Resolve. Built for developers, by developers.
			</footer>

			{/* Modal */}
			{showModal && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative"
					>
						{/* Close */}
						<button
							className="absolute top-4 right-4 text-zinc-400 hover:text-white"
							onClick={() => setShowModal(false)}
						>
							<X className="w-5 h-5" />
						</button>

						<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							Create New Project
						</h2>

						<form onSubmit={createProject} className="space-y-4">
							<div>
								<label className="block text-sm text-zinc-400 mb-1">
									Project Name
								</label>
								<input
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
									type="text"
									placeholder="Enter project name"
									className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<div>
								<label className="block text-sm text-zinc-400 mb-1">
									Description
								</label>
								<textarea
									value={projectDescription}
									onChange={(e) => setProjectDescription(e.target.value)}
									rows="3"
									placeholder="Enter project description"
									className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<button
								type="submit"
								className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition"
							>
								Create
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}
