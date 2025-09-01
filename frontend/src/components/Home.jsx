import React, { useEffect, useState } from "react";
import { Plus, FolderKanban, Users, LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createProjectService } from "../services/ProjectService";
import { deleteReq, receivedReqs } from "../services/JoinRequestService";
import { formatDate } from "../services/funtions";
import { AddMember } from "../services/MembersService";
import Prism from "./Prism";
import Aurora from "./Aurora";

export default function HomePage() {

	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));
	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, [user, navigate]);

	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [requests, setRequests] = useState([]);

	const logout = () => {
		localStorage.removeItem("user");
		navigate("/");
	};

	const createProject = (e) => {
		e.preventDefault();
		setShowModal(false);

		if (projectDescription.length == 0 || projectName.length == 0) {
			return;
		}

		const body = {
			"name": projectName,
			"description": projectDescription
		};

		createProjectService(user?.id, body).then((response) => {
			setProjectName("");
			setProjectDescription("");

			const projectId = response.data.id;
			const userId = user.id;

			const memberBody = {
				projectId,
				userId,
				"role": "admin"
			};

			return AddMember(memberBody);
		}).then((response) => {
			console.warn("Room created successfully");
		}).catch(() => {
			console.error("Error creating project");
		})
	}

	useEffect(() => {
		receivedReqs(user?.email).then((response) => {
			setRequests(response.data);
		}).catch((error) => {
			console.error("Error fetching invitations", error);
		})
	}, [user?.email]);

	const acceptReq = (id, projectId) => {

		const body = {
			"projectId": projectId,
			"userId": user?.id,
			"role": "member"
		};

		console.warn(body);

		AddMember(body).then((response) => {
			return deleteReq(id);
		}).then((response) => {
			console.warn("Success");
		}).catch((error) => {
			console.warn("Error accepting invite", error);
		});
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-white flex flex-col">
			<div className="absolute inset-0 z-0 opacity-70">
				<Aurora
					colorStops={["#7ab8f2", "#ff7ea1", "#7ab8f2"]}
					blend={0.5}
					amplitude={0.5}
					speed={0.5}
				/>
			</div>

			{/* Top Navbar */}
			<nav
				className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-4/5 z-50 
        bg-zinc-900/60 backdrop-blur-lg border border-zinc-800 rounded-2xl px-6 py-3 
        flex items-center justify-between"
			>
				<Link to={"/"}>
					<h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xl">
						Resolve
					</h2>
				</Link>
				<div className="flex gap-5 items-center text-zinc-300">
					<button className="hover:text-purple-400 transition">Dashboard</button>
					<button className="hover:text-purple-400 transition">Projects</button>
					<button className="hover:text-purple-400 transition">Invites</button>
					<button className="hover:text-purple-400 transition">Profile</button>
					<button
						onClick={logout}
						className="hover:text-red-400 transition flex items-center gap-1"
					>
						<LogOut size={18} /> Logout
					</button>
				</div>
			</nav>

			{/* Main Content */}
			<main className="flex-1 mt-28 px-6 max-w-7xl mx-auto w-full space-y-20">
				{/* Quick Actions */}
				<section className="grid md:grid-cols-3 gap-8">
					{/* Create Project - opens modal */}
					<div
						onClick={() => setShowModal(true)}
						className="p-6 rounded-2xl bg-zinc-900 backdrop-blur border border-zinc-800 hover:border-purple-500 
              hover:shadow-lg hover:shadow-purple-500/20 transition transform hover:-translate-y-1 cursor-pointer group"
					>
						<div
							className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition"
						>
							<Plus size={24} />
						</div>
						<h3 className="text-lg font-semibold">Create Project</h3>
						<p className="text-zinc-400 mt-2 text-sm">Start a new devlog journey.</p>
					</div>

					{/* Other Quick Actions */}
					<Link to="/myprojects">
						<div
							className="p-6 rounded-2xl bg-zinc-900 backdrop-blur border border-zinc-800 hover:border-blue-500 
              hover:shadow-lg hover:shadow-blue-500/20 transition transform hover:-translate-y-1 cursor-pointer group"
						>
							<div
								className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition"
							>
								<FolderKanban size={24} />
							</div>
							<h3 className="text-lg font-semibold">Your Projects</h3>
							<p className="text-zinc-400 mt-2 text-sm">{"View projects you’ve created."}</p>
						</div>
					</Link>

					<div
						className="p-6 rounded-2xl bg-zinc-900 backdrop-blur border border-zinc-800 hover:border-green-500 
              hover:shadow-lg hover:shadow-green-500/20 transition transform hover:-translate-y-1 cursor-pointer group"
					>
						<div
							className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition"
						>
							<Users size={24} />
						</div>
						<h3 className="text-lg font-semibold">Joined Projects</h3>
						<p className="text-zinc-400 mt-2 text-sm">Collaborate with your team.</p>
					</div>
				</section>

				{/* Projects Section */}
				<section>
					<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
						Your Active Projects
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{["AI Chatbot", "E-commerce Tracker", "Game Dev Toolkit"].map(
							(proj, i) => (
								<div
									key={i}
									className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 
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
								</div>
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
							<p className="text-zinc-300 text-lg bg-zinc-900/60 p-6 rounded-2xl">No pending invitations</p>
						) :
							(requests.map((invite, i) => (
								<div
									key={i}
									className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex justify-between items-center 
                					hover:border-green-500 transition"
								>
									<div>
										<h3 className="font-semibold">{invite.projectName}</h3>
										<p className="text-zinc-400 text-sm">Invited by {invite.senderName} ({invite.senderEmail})</p>
										<p className="text-zinc-400 text-sm">On {formatDate(invite.createdAt)}</p>
									</div>
									<div className="flex gap-3">
										<button onClick={(e) => { e.preventDefault(); acceptReq(invite.id, invite.projectId) }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition">
											Accept
										</button>
										<button className="px-4 py-2 rounded-xl bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 transition">
											Decline
										</button>
									</div>
								</div>
							)))}
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="mt-20 py-5 border-t border-zinc-800 text-center text-sm text-zinc-500">
				© 2025 Resolve. Built for developers, by developers.
			</footer>

			{/* ---------- Modal ---------- */}
			{showModal && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<div className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
						{/* Close Button */}
						<button
							className="absolute top-4 right-4 text-zinc-400 hover:text-white"
							onClick={() => setShowModal(false)}
						>
							<X className="w-5 h-5" />
						</button>

						<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							Create New Project
						</h2>

						<form
							onSubmit={createProject}
							className="space-y-4"
						>
							<div>
								<label className="block text-sm text-zinc-400 mb-1">
									Project Name
								</label>
								<input
									value={projectName}
									onChange={(e) => { setProjectName(e.target.value) }}
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
					</div>
				</div>
			)}
			{/* ---------- End Modal ---------- */}
		</div>
	);
}
