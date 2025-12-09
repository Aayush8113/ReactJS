import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";
import { taskService } from "../api/taskService";
import { socket } from "../api/socket";

import {
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";

export default function DashboardPage() {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);

  // ================================
  // LOAD TASKS
  // ================================
  useEffect(() => {
    taskService.getAll().then((res) => setTasks(res.data));
  }, []);

  // ================================
  // SOCKET UPDATES
  // ================================
  useEffect(() => {
    socket.on("task-added", (task) => setTasks((p) => [task, ...p]));
    socket.on("task-updated", (task) =>
      setTasks((p) => p.map((t) => (t._id === task._id ? task : t)))
    );
    socket.on("task-deleted", (id) =>
      setTasks((p) => p.filter((t) => t._id !== id))
    );

    return () => {
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-deleted");
    };
  }, []);

  // ================================
  // CALCULATIONS
  // ================================
  const total = tasks.length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  const pending = tasks.filter((t) => !t.isCompleted).length;
  const urgent = tasks.filter((t) => t.category === "Urgent").length;

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  // ================================
  // CARD COMPONENT
  // ================================
  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        p-6 rounded-2xl
        bg-white/80 dark:bg-[#141821]/80 
        backdrop-blur-xl
        border border-indigo-300/40 dark:border-indigo-500/20
        shadow-[0_8px_25px_rgba(0,0,0,0.18)]
        flex items-center justify-between
      "
    >
      <div>
        <p className="text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      <div
        className={`
          text-4xl p-4 rounded-xl 
          bg-${color}-500/20 text-${color}-600 dark:text-${color}-400
        `}
      >
        {icon}
      </div>
    </motion.div>
  );

  // ================================
  // UI
  // ================================
  return (
    <div className="max-w-6xl mx-auto px-6 mt-10">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          text-3xl font-extrabold 
          text-gray-900 dark:text-white mb-8
        "
      >
        Dashboard Overview
      </motion.h1>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Tasks"
          value={total}
          icon={<FaTasks />}
          color="indigo"
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={<FaCheckCircle />}
          color="green"
        />

        <StatCard
          title="Urgent"
          value={urgent}
          icon={<FaExclamationTriangle />}
          color="red"
        />
      </div>

      {/* PROGRESS RING */}
      <div className="flex justify-center my-12">
        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          className="relative w-44 h-44 flex items-center justify-center"
        >
          <svg className="absolute w-44 h-44 -rotate-90">
            <circle
              cx="85"
              cy="85"
              r="70"
              stroke={theme === "dark" ? "#2c2f3b" : "#e5e7eb"}
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="85"
              cy="85"
              r="70"
              stroke="#6366f1"
              strokeWidth="12"
              fill="none"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * percent) / 100}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {percent}%
          </p>
        </motion.div>
      </div>

      {/* RECENT TASKS */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Tasks
      </h2>

      <div className="space-y-4">
        {tasks.slice(0, 5).map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              p-4 rounded-xl
              bg-white/80 dark:bg-[#141821]/80 
              backdrop-blur-lg
              border border-indigo-300/40 dark:border-indigo-500/20
              shadow-md
              flex justify-between
            "
          >
            <p
              className={`
                font-medium
                ${task.isCompleted
                  ? "line-through text-gray-400"
                  : "text-gray-900 dark:text-white"}
              `}
            >
              {task.todo}
            </p>

            <span className="text-indigo-600 dark:text-indigo-400">
              {task.category}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
