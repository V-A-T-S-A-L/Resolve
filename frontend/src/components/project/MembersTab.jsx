import React, { useEffect, useState } from "react";
import {
	Users,
	UserPlus,
	Mail,
	Briefcase,
	Calendar,
	X,
	Send,
	Trash2,
	MoreVertical,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { GetProjectMembers, removeMember, updateRole } from "../../services/MembersService";
import { formatDate } from "../../services/funtions";
import { sendReq } from "../../services/JoinRequestService";

export default function MembersTab({ role }) {

	const projectId = useParams().projectId;
	const user = JSON.parse(localStorage.getItem("user"));

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inviteEmail, setInviteEmail] = useState("");
	const [members, setMembers] = useState([]);


	useEffect(() => {
		GetProjectMembers(projectId).then((response) => {
			setMembers(response.data);
		}).catch((error) => {
			console.error("Error fetching members", error);
		})
	}, [projectId]);

	const handleSendInvite = (e) => {
		e.preventDefault();
		if (!inviteEmail.trim()) return;

		const senderEmail = user?.email;

		const body = {
			senderEmail,
			"receiverEmail": inviteEmail,
			projectId
		};

		console.warn(body);

		sendReq(body).then((response) => {
			setIsModalOpen(false);
			setInviteEmail("");
			console.warn("Request sent successfully");
		}).catch((error) => {
			console.error("Error sending request", error);
		});
	};

	const handleRoleChange = (memberId, newRole) => {
		const body = {
			role : newRole
		}

		updateRole(memberId, body).then((response) => {
			setMembers((prevMembers) =>
				prevMembers.map((m) =>
					m.id === memberId ? { ...m, role: newRole } : m
				)
			);
			console.warn("Role updated successfully");
		}).catch((error) => {
			console.error("Error updating role", error);
		});
	}
	
	const handleRemoveUser = (projectId, userId) => {
		if (!window.confirm("Are you sure you want to remove this member?")) return;
		removeMember(projectId, userId).then((response) => {
			setMembers((prevMembers) => prevMembers.filter((m) => m.userId !== userId));
			console.warn("Member removed successfully");
		}).catch((error) => {
			console.error("Error removing member", error);
		});
	}

	const [openMenu, setOpenMenu] = useState(null); 

	const toggleMenu = (email) => {
		setOpenMenu((prev) => (prev === email ? null : email));
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
					<Users className="h-5 w-5 text-pink-400" /> Project Members
				</h2>
				{role === "admin" && (
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center gap-2 hover:shadow-lg hover:shadow-pink-500/30 transition"
					>
						<UserPlus className="h-4 w-4" /> Invite Member
					</button>
				)}
			</div>

			{/* Members List */}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{members.map((m) => (
					<li
						key={m.email}
						className="relative bg-zinc-900/60 rounded-2xl p-5 shadow-md border border-zinc-800 hover:scale-[1.02] hover:border-pink-400/50 transition"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-zinc-100">{m.userName}</h3>

							{/* 3 dots menu - only visible to admin */}
							{role === "admin" && (
								<div className="relative">
									<button
										onClick={() => toggleMenu(m.email)}
										className="p-1 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
									>
										<MoreVertical className="h-4 w-4" />
									</button>

									{openMenu === m.email && (
										<div className="absolute right-0 mt-2 w-44 rounded-md bg-zinc-800 border border-zinc-700 shadow-lg z-10">
											<div className="p-2">
												<label className="block text-xs text-zinc-400 mb-1">Change Role</label>

												{/* If current member is admin, disable role change */}
												{m.role === "admin" ? (
													<select
														disabled
														value={m.role}
														className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-400 cursor-not-allowed"
													>
														<option value="admin">Admin (locked)</option>
													</select>
												) : (
													<select
														defaultValue={m.role}
														onChange={(e) => handleRoleChange(m.id, e.target.value)}
														className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-pink-500"
													>
														<option value="viewer">Viewer</option>
														<option value="contributor">Contributor</option>
														<option value="manager">Manager</option>
													</select>
												)}
											</div>

											{/* Remove option - hide if the member is admin */}
											{m.role !== "admin" && (
												<button
													onClick={() => handleRemoveUser(m.projectId, m.userId)}
													className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
												>
													<Trash2 className="h-4 w-4" />
													Remove Member
												</button>
											)}
										</div>
									)}
								</div>
							)}
						</div>

						<div className="mt-2 space-y-2 text-sm text-zinc-300">
							{/* Role */}
							<div className="flex items-center gap-2">
								<Briefcase className="h-4 w-4 text-blue-400" />
								<span className="capitalize">{m.role}</span>
							</div>

							{/* Email */}
							<p className="flex items-center gap-2 break-all">
								<Mail className="h-4 w-4 text-pink-400" />
								<span>{m.email}</span>
							</p>

							{/* Joined */}
							<p className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-blue-300" />
								<span>Joined: {formatDate(m.joinedAt)}</span>
							</p>
						</div>
					</li>
				))}
			</ul>

			{/* Invite Member Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-zinc-900 border border-pink-500/30 rounded-2xl p-6 w-full max-w-md">
						{/* Modal Header */}
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
								Invite Member
							</h3>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-zinc-400 hover:text-pink-400 transition"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Email Input */}
						<div className="space-y-4">
							<input
								type="email"
								value={inviteEmail}
								onChange={(e) => setInviteEmail(e.target.value)}
								placeholder="Enter email address..."
								className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
							/>
							<button
								onClick={handleSendInvite}
								className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium hover:shadow-[0_0_12px_rgba(236,72,153,0.6)] transition"
							>
								<Send className="h-4 w-4" /> Send Invite
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
