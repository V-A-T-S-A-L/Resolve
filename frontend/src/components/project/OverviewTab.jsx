"use client";
import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
} from "recharts";
import { Activity, Bug, Users } from "lucide-react";

export default function OverviewTab() {
	const weeklyBugs = [
		{ day: "Mon", opened: 5, closed: 2 },
		{ day: "Tue", opened: 6, closed: 1 },
		{ day: "Wed", opened: 3, closed: 4 },
		{ day: "Thu", opened: 7, closed: 2 },
		{ day: "Fri", opened: 4, closed: 3 },
		{ day: "Sat", opened: 8, closed: 5 },
		{ day: "Sun", opened: 3, closed: 3 },
	];

	const recentActivities = [
		{ user: "Alice", action: "closed bug #123", time: "2h ago" },
		{ user: "Bob", action: "added new member", time: "4h ago" },
		{ user: "You", action: "updated project settings", time: "1d ago" },
		{ user: "Claire", action: "opened bug #127", time: "2d ago" },
		{ user: "Claire", action: "opened bug #127", time: "2d ago" },
		{ user: "Claire", action: "opened bug #127", time: "2d ago" },
		{ user: "Claire", action: "opened bug #127", time: "2d ago" },
		{ user: "Claire", action: "opened bug #127", time: "2d ago" },
	];

	return (
		<div className="grid gap-8">
			{/* Summary Card */}
			<div className="bg-zinc-900/40 rounded-2xl p-6 shadow-lg border border-zinc-700">
				<h2 className="text-xl font-semibold text-cyan-400">Project Overview</h2>
				<p className="text-zinc-400 mt-2">
					Welcome to your project dashboard. Get a quick snapshot of bugs, members, and recent activity.
				</p>
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-zinc-900/40 rounded-2xl p-5 shadow-md border border-zinc-700 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h3 className="text-emerald-400 font-semibold text-lg">Open Bugs</h3>
						<Bug className="h-5 w-5 text-emerald-400" />
					</div>
					<p className="text-zinc-300 text-2xl font-bold">12</p>
					<p className="text-xs text-zinc-500">+2 since yesterday</p>
				</div>

				<div className="bg-zinc-900/40 rounded-2xl p-5 shadow-md border border-zinc-700 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h3 className="text-emerald-400 font-semibold text-lg">Devlogs</h3>
						<Bug className="h-5 w-5 text-emerald-400" />
					</div>
					<p className="text-zinc-300 text-2xl font-bold">28</p>
					<p className="text-xs text-zinc-500">+3 since yesterday</p>
				</div>

				<div className="bg-zinc-900/40 rounded-2xl p-5 shadow-md border border-zinc-700 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h3 className="text-cyan-400 font-semibold text-lg">Members</h3>
						<Users className="h-5 w-5 text-cyan-400" />
					</div>
					<p className="text-zinc-300 text-2xl font-bold">5</p>
					<p className="text-xs text-zinc-500">1 pending invite</p>
				</div>

				<div className="bg-zinc-900/40 rounded-2xl p-5 shadow-md border border-zinc-700 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h3 className="text-violet-400 font-semibold text-lg">Activity</h3>
						<Activity className="h-5 w-5 text-violet-400" />
					</div>
					<p className="text-zinc-300 text-2xl font-bold">27</p>
					<p className="text-xs text-zinc-500">in last 7 days</p>
				</div>
			</div>

			{/* Chart + Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Chart Section */}
				<div className="lg:col-span-2 bg-zinc-900/40 rounded-2xl p-6 shadow-md border border-zinc-700">
					<h3 className="text-cyan-400 font-semibold mb-4">Weekly Bug Reports</h3>
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={weeklyBugs}>
							<CartesianGrid stroke="#444" strokeDasharray="3" />
							<XAxis dataKey="day" tick={{ fill: "#cbd5e1" }} />
							<YAxis tick={{ fill: "#cbd5e1" }} />
							<Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }} />
							<Legend wrapperStyle={{ color: "#cbd5e1" }} />
							<Line type="monotone" dataKey="opened" stroke="#06b6d4" strokeWidth={2} />
							<Line type="monotone" dataKey="closed" stroke="#f36bc2" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Recent Activity Section */}
				<div className="bg-zinc-900/40 rounded-2xl p-6 shadow-md border border-zinc-700 max-h-96 overflow-y-scroll">
					<h3 className="text-violet-400 font-semibold mb-4">Recent Activity</h3>
					<ul className="space-y-4">
						{recentActivities.map((a, i) => (
							<li key={i} className="text-sm text-zinc-300">
								<span className="font-semibold text-zinc-100">{a.user}</span>{" "}
								<span>{a.action}</span>
								<div className="text-xs text-zinc-500 mt-1">{a.time}</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
