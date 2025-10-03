import React, { Suspense, lazy, useEffect, useState } from "react";
import Tabs from "./project/Tabs";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkMember, getRole } from "../services/MembersService";
import DevlogsTab from "./project/DevlogsTab";

const OverviewTab = lazy(() => import("./project/OverviewTab"));
const BugsTab = lazy(() => import("./project/BugsTab"));
const MembersTab = lazy(() => import("./project/MembersTab"));
const ActivityTab = lazy(() => import("./project/ActivityTab"));
const SettingsTab = lazy(() => import("./project/SettingsTab"));

export default function ProjectDashboard() {

	const projectId = useParams().projectId;
	const user = JSON.parse(localStorage.getItem("user"));
	const userId = user?.id;

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkMember(projectId, userId).then((response) => {
			if (response.data === false) {
				navigate("/resolve");
			} else {
				setLoading(false);
			}
		}).catch((error) => {
			console.error(error);
		});
	}, [projectId, userId]);

	const [role, setRole] = useState("");

	useEffect(() => {
		getRole(projectId, userId).then((response) => {
			setRole(response.data);
		}).catch((error) => {
			console.error("Error fetching role", error);
		}) 
	}, [projectId, userId]);

	const [activeTab, setActiveTab] = useState("overview");

	const tabs = [
		{ id: "overview", label: "Overview" },
		{ id: "bugs", label: "Bugs" },
		{ id: "devlogs", label: "Devlogs" },
		{ id: "members", label: "Members" },
		{ id: "settings", label: "Settings" },
	];

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-zinc-950">
				<Loader2 className="h-12 w-12 animate-spin text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]" />
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			{/* HEADER */}
			<header className="p-4 border-b border-zinc-800 flex items-center bg-gradient-to-r from-pink-500/10 to-blue-500/10 backdrop-blur-md">
					<ChevronLeft onClick={() => navigate(-1)} className="text-pink-400 mr-3 hover:-translate-x-0.5 transition cursor-pointer" />
				<h2 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
					Resolve
				</h2>
			</header>

			{/* TABS */}
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

			{/* MAIN */}
			<main className="p-6">
				<Suspense
					fallback={
						<div className="flex justify-center py-20">
							<Loader2 className="h-10 w-10 animate-spin text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
						</div>
					}
				>
					{activeTab === "overview" && <OverviewTab role={role} />}
					{activeTab === "bugs" && <BugsTab role={role} />}
					{activeTab === "devlogs" && <DevlogsTab role={role} />}
					{activeTab === "members" && <MembersTab role={role} />}
					{activeTab === "settings" && <SettingsTab role={role} />}
				</Suspense>
			</main>
		</div>
	);
}
