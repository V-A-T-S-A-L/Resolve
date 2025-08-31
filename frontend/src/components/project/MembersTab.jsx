import React, { useEffect, useState } from "react";
import {
	Users,
	UserPlus,
	Mail,
	Briefcase,
	Calendar,
	X,
	Send,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { GetProjectMembers } from "../../services/MembersService";
import { formatDate } from "../../services/funtions";
import { sendReq } from "../../services/JoinRequestService";

export default function MembersTab() {

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
			"receiverEmail" : inviteEmail,
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

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
					<Users className="h-5 w-5" /> Project Members
				</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-pink-400 rounded-lg hover:from-pink-500/30 hover:to-blue-500/30 transition flex items-center gap-2 border border-pink-500/30"
				>
					<UserPlus className="h-4 w-4" /> Invite Member
				</button>
			</div>

			{/* Members List */}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{members.map((m) => (
					<li
						key={m.email}
						className="bg-zinc-900/60 rounded-2xl p-5 shadow-md border border-zinc-800 hover:scale-102 hover:border-pink-400/50 transition"
					>
						<h3 className="text-lg font-semibold text-zinc-100">{m.userName}</h3>
						<div className="mt-2 space-y-2 text-sm text-zinc-300">
							<p className="flex items-center gap-2">
								<Briefcase className="h-4 w-4 text-blue-400" />
								<span>{m.role}</span>
							</p>
							<p className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-pink-400" />
								<span>{m.email}</span>
							</p>
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
