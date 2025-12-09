// src/pages/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTasks, FaChartBar } from "react-icons/fa";

export default function HomePage() {
  return (
    <div
      className="max-w-4xl mx-auto text-center mt-20 px-4"
      style={{ color: "var(--text)" }}
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold mb-4"
        style={{ color: "var(--text)" }}
      >
        Welcome to{" "}
        <span style={{ color: "var(--accent)" }}>iTask Dashboard</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg mb-12 leading-relaxed"
        style={{ color: "var(--text)" }}
      >
        A clean, fast, and smart task manager built with MERN + Crystal Neon UI.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-6 flex-wrap"
      >
        {/* Tasks Button */}
        <Link
          to="/tasks"
          className="px-6 py-3 flex items-center gap-2 rounded-xl font-semibold transition"
          style={{
            background: "var(--accent)",
            color: "white",
            boxShadow: "0 0 12px var(--accent)",
          }}
        >
          <FaTasks /> Go to Tasks
        </Link>

        {/* Dashboard Button */}
        <Link
          to="/dashboard"
          className="px-6 py-3 flex items-center gap-2 rounded-xl font-semibold transition"
          style={{
            background: "var(--neon)",
            color: "var(--text)",
            boxShadow: "0 0 12px var(--neon)",
          }}
        >
          <FaChartBar /> Dashboard
        </Link>
      </motion.div>

      {/* Glass Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 p-6 rounded-2xl backdrop-blur-xl max-w-xl mx-auto"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Why iTask?
        </h3>
        <p className="text-md" style={{ color: "var(--text)" }}>
          Built for speed, designed for clarity.  
          Drag & Drop tasks, real-time updates, clean analytics and a beautiful neon interface.
        </p>
      </motion.div>
    </div>
  );
}
