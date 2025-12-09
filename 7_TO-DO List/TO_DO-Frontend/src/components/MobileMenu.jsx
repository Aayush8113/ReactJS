import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { FaHome, FaTasks, FaChartPie, FaTimes } from "react-icons/fa";

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  const items = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Tasks", path: "/tasks", icon: <FaTasks /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="
          absolute left-0 top-0 w-64 h-full p-6
          bg-white/80 dark:bg-[#10131d]/90
          backdrop-blur-xl
          border-r border-indigo-500/20
          shadow-2xl
          flex flex-col gap-8
        "
      >
        <button
          onClick={onClose}
          className="self-end text-2xl text-gray-700 dark:text-gray-200"
        >
          <FaTimes />
        </button>

        {items.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            onClick={onClose}
            className="
              flex items-center gap-4 p-3 rounded-xl
              text-gray-900 dark:text-white
              bg-indigo-500/15 dark:bg-indigo-400/20
              hover:bg-indigo-500/25 dark:hover:bg-indigo-400/30
              shadow-[0_0_12px_rgba(99,102,241,0.18)]
              transition-all
            "
          >
            <span className="text-indigo-600 dark:text-indigo-400 text-xl">
              {item.icon}
            </span>
            <span className="font-medium text-lg">{item.name}</span>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
