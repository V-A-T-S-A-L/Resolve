import React, { Suspense, lazy, useState } from "react";
import Tabs from "./project/Tabs";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';

const OverviewTab = lazy(() => import("./project/OverviewTab"));
const BugsTab = lazy(() => import("./project/BugsTab"));
const MembersTab = lazy(() => import("./project/MembersTab"));
const ActivityTab = lazy(() => import("./project/ActivityTab"));
const SettingsTab = lazy(() => import("./project/SettingsTab"));

export default function ProjectDashboard() {
	const [activeTab, setActiveTab] = useState("overview");

	const tabs = [
		{ id: "overview", label: "Overview" },
		{ id: "bugs", label: "Bugs" },
		{ id: "members", label: "Members" },
		{ id: "activity", label: "Activity" },
		{ id: "settings", label: "Settings" },
	];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			{/* HEADER */}
			<header className="p-4 border-b border-zinc-800 flex items-center bg-gradient-to-r from-pink-500/10 to-blue-500/10 backdrop-blur-md">
				<Link to={'/resolve'}>
					<ChevronLeft className="text-pink-400 mr-3 hover:-translate-x-0.5 transition cursor-pointer"/>
				</Link>
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
					{activeTab === "overview" && <OverviewTab />}
					{activeTab === "bugs" && <BugsTab />}
					{activeTab === "members" && <MembersTab />}
					{activeTab === "activity" && <ActivityTab />}
					{activeTab === "settings" && <SettingsTab />}
				</Suspense>
			</main>
		</div>
	);
}
