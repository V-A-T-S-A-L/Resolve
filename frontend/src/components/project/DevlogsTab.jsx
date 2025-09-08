import { useState } from "react";
import { MessageSquareCode, PlusCircle, X } from "lucide-react";
import { motion } from "framer-motion";

export default function DevlogsTab({ role }) {
    // Dummy data
    const [devlogs, setDevlogs] = useState([
        {
            id: 1,
            user: { name: "Vatsal Shah" },
            title: "Navbar Fixes",
            content: "Fixed navbar responsiveness and added role-based access 🔧",
            createdAt: "2025-09-05T10:15:00",
            comments: [{ id: 1, user: "Neev", text: "Great work!" }],
        },
        {
            id: 2,
            user: { name: "Neev Shah" },
            title: "Project Cards",
            content: "Implemented project cards with neon hover effects ✨",
            createdAt: "2025-09-06T17:42:00",
            comments: [],
        },
        {
            id: 3,
            user: { name: "Neev Shah" },
            title: "Project Cards",
            content: "Implemented project cards with neon hover effects ✨",
            createdAt: "2025-09-06T17:42:00",
            comments: [],
        },
        {
            id: 4,
            user: { name: "Neev Shah" },
            title: "Project Cards",
            content: "Implemented project cards with neon hover effects ✨",
            createdAt: "2025-09-06T17:42:00",
            comments: [],
        },
        {
            id: 5,
            user: { name: "Neev Shah" },
            title: "Project Cards",
            content: "Implemented project cards with neon hover effects ✨",
            createdAt: "2025-09-06T17:42:00",
            comments: [],
        },
        {
            id: 6,
            user: { name: "Neev Shah" },
            title: "Project Cards",
            content: "Implemented project cards with neon hover effects ✨",
            createdAt: "2025-09-06T17:42:00",
            comments: [],
        },
    ]);

    const [selectedLog, setSelectedLog] = useState(null);
    const [newLogModal, setNewLogModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newComment, setNewComment] = useState("");

    const handleAddLog = () => {
        if (!newTitle.trim() || !newContent.trim()) return;

        const newEntry = {
            id: devlogs.length + 1,
            user: { name: "Current User" },
            title: newTitle,
            content: newContent,
            createdAt: new Date().toISOString(),
            comments: [],
        };

        setDevlogs([newEntry, ...devlogs]);
        setNewTitle("");
        setNewContent("");
        setNewLogModal(false);
    };

    const handleAddComment = () => {
        if (!newComment.trim() || !selectedLog) return;

        const updatedLog = {
            ...selectedLog,
            comments: [
                ...selectedLog.comments,
                { id: selectedLog.comments.length + 1, user: "Current User", text: newComment },
            ],
        };

        setDevlogs(devlogs.map((d) => (d.id === updatedLog.id ? updatedLog : d)));
        setSelectedLog(updatedLog);
        setNewComment("");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                    <MessageSquareCode className="w-5 h-4 text-pink-400" /> Devlogs
                </h2>
                {/* Button to open new devlog modal */}
                {(role === "admin" || role === "manager" || role === "contributor") && (
                    <button
                        onClick={() => setNewLogModal(true)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center gap-2 hover:shadow-lg hover:shadow-pink-500/30 transition"
                    >
                        <PlusCircle size={18} /> Add New Devlog
                    </button>
                )}
            </div>

            {/* Devlogs List */}
            <div className="grid gap-3 md:grid-cols-1">
                {devlogs.length > 0 ? (
                    devlogs.map((log) => (
                        <div
                            key={log.id}
                            className="relative p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md transition-all hover:scale-101 hover:border-green-500 cursor-pointer"
                            style={{ height: "100px", overflow: "hidden" }}
                            onClick={() => setSelectedLog(log)}
                        >
                            <h4 className="text-md font-semibold text-zinc-300">{log.title}</h4>
                            <p className="mt-1 text-xs text-zinc-400">{log.user.name}</p>
                            <p className="mt-1 text-xs text-zinc-500">{new Date(log.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-zinc-500">No devlogs yet. Start logging!</p>
                )}
            </div>

            {/* Modal for viewing devlog */}
            {selectedLog && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[80vh] overflow-y-auto"
                    >
                        <button
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                            onClick={() => setSelectedLog(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold mb-2">{selectedLog.title}</h2>
                        <p className="text-sm text-zinc-300 mb-4">By {selectedLog.user.name}</p>
                        <p className="text-zinc-100 whitespace-pre-wrap">{selectedLog.content}</p>
                        <p className="mt-2 text-xs text-zinc-500">{new Date(selectedLog.createdAt).toLocaleString()}</p>

                        {/* Comments */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Comments</h3>
                            {selectedLog.comments.length === 0 ? (
                                <p className="text-zinc-400 text-sm">No comments yet.</p>
                            ) : (
                                selectedLog.comments.map((c) => (
                                    <div key={c.id} className="border-t border-zinc-800 pt-2 mt-2">
                                        <p className="text-sm font-semibold">{c.user}</p>
                                        <p className="text-zinc-300 text-sm">{c.text}</p>
                                    </div>
                                ))
                            )}

                            {/* Add Comment */}
                            <div className="mt-4 flex gap-2">
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition text-sm"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Modal for adding new devlog */}
            {newLogModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[80vh] overflow-y-auto"
                    >
                        <button
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                            onClick={() => setNewLogModal(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold mb-4">Create New Devlog</h2>

                        <div className="space-y-4">
                            <input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                            <textarea
                                rows={5}
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                placeholder="Content"
                                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                            />
                            <button
                                onClick={handleAddLog}
                                className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white hover:opacity-90 transition"
                            >
                                Create Devlog
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
