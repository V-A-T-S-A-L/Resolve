import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquareCode, PlusCircle, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { createDevlog, getByProject } from "../../services/DevlogsService";
import { useParams } from "react-router-dom";

export default function DevlogsTab({ role }) {
    const projectId = useParams().projectId;
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const [devlogs, setDevlogs] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedLog, setSelectedLog] = useState(null);
    const [newLogModal, setNewLogModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        getByProject(projectId, page, size)
            .then((response) => {
                setDevlogs(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.warn("Error fetching devlogs", error);
            });
    }, [projectId, page, size]);

    const handleAddLog = () => {
        if (!newTitle.trim() || !newContent.trim()) return;

        const body = {
            userId,
            projectId,
            title: newTitle,
            content: newContent
        };

        createDevlog(body).then((response) => {
            setNewTitle("");
            setNewContent("");
            setNewLogModal(false);
        }).catch((error) => {
            console.error("error creating devlog", error);
        })
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                    <MessageSquareCode className="w-5 h-4 text-pink-400" /> Devlogs
                </h2>

                {(role === "admin" || role === "manager" || role === "contributor") && (
                    <button
                        onClick={() => setNewLogModal(true)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pink-500/30 transition"
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
                            {/* Delete Button */}
                            {(log.userId === userId || role === "admin" || role === "manager") && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent opening the log
                                        //handleDeleteLog(log.id);
                                    }}
                                    className="absolute top-2 right-2 p-1 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition"
                                    title="Delete log"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}

                            <h4 className="text-md font-semibold text-zinc-300">{log.title}</h4>
                            <p className="mt-1 text-xs text-zinc-400">{log.userName}</p>
                            <p className="mt-1 text-xs text-zinc-500">
                                {new Date(log.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-zinc-500">No devlogs yet. Start logging!</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center flex-col sm:flex-row justify-between mt-4">
                {/* Page size dropdown */}
                <select
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value));
                        setPage(0); // reset to first page on size change
                    }}
                    className="p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                </select>

                {/* Navigation buttons */}
                <div className="flex items-center justify-center gap-3 mt-4 w-full">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="sm:w-auto px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40"
                    >
                        <ChevronLeft />
                    </button>

                    <span className="text-sm text-zinc-400 text-center">
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="sm:w-auto px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40"
                    >
                        <ChevronRight />
                    </button>
                </div>

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
                        <p className="text-sm text-zinc-300 mb-4">By {selectedLog.userName}</p>
                        <p className="text-zinc-100 whitespace-pre-wrap">{selectedLog.content}</p>
                        <p className="mt-2 text-xs text-zinc-500">{new Date(selectedLog.createdAt).toLocaleString()}</p>
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
