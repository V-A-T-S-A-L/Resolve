import React from "react";
import { Plus, FolderKanban, Users, Bell, LogOut } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-4/5 z-50 
        bg-zinc-900/60 backdrop-blur-lg border border-zinc-800 rounded-2xl px-6 py-3 
        flex items-center justify-between">
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xl">
          Resolve
        </h1>
        <div className="flex gap-5 items-center text-zinc-300">
          <button className="hover:text-purple-400 transition">Dashboard</button>
          <button className="hover:text-purple-400 transition">Projects</button>
          <button className="hover:text-purple-400 transition">Invites</button>
          <button className="hover:text-purple-400 transition">Profile</button>
          <button className="hover:text-red-400 transition flex items-center gap-1">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 mt-28 px-6 max-w-7xl mx-auto w-full space-y-20">
        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Plus size={24} />, title: "Create Project", desc: "Start a new devlog journey.", color: "from-purple-500 to-pink-500" },
            { icon: <FolderKanban size={24} />, title: "Your Projects", desc: "View projects you’ve created.", color: "from-blue-500 to-cyan-500" },
            { icon: <Users size={24} />, title: "Joined Projects", desc: "Collaborate with your team.", color: "from-green-500 to-emerald-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800 hover:border-purple-500 
              hover:shadow-lg hover:shadow-purple-500/20 transition transform hover:-translate-y-1 cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-zinc-400 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Your Active Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["AI Chatbot", "E-commerce Tracker", "Game Dev Toolkit"].map((proj, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500 
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
            ))}
          </div>
        </section>

        {/* Invitations */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Project Invitations
          </h2>
          <div className="space-y-4">
            {[
              { name: "Social Media Analyzer", by: "Arjun" },
              { name: "Resolve UI Kit", by: "Priya" },
            ].map((invite, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex justify-between items-center 
                hover:border-green-500 transition"
              >
                <div>
                  <h3 className="font-semibold">{invite.name}</h3>
                  <p className="text-zinc-400 text-sm">Invited by {invite.by}</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-semibold hover:opacity-90 transition">
                    Accept
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 transition">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-zinc-800 text-center text-sm text-zinc-500">
        © 2025 Resolve. Built for developers, by developers.
      </footer>
    </div>
  );
}
