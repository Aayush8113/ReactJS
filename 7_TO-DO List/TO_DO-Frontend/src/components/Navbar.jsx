import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="
          sticky top-0 z-50
          backdrop-blur-2xl
          bg-white/70 dark:bg-[#0f121a]/60
          border-b border-indigo-300/30 dark:border-indigo-600/10
          shadow-[0_6px_25px_rgba(0,0,0,0.12)]
        "
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-3 select-none">
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
              iTask
            </span>

            <motion.div
              className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.7, repeat: Infinity }}
            />
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-12 font-medium">
            {links.map((item, i) => {
              const active = location.pathname === item.path;

              return (
                <motion.li key={i} whileHover={{ scale: 1.12 }} className="relative">
                  <Link
                    to={item.path}
                    className={`
                      transition
                      ${active
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {item.name}
                  </Link>

                  {active && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_10px_#6366f1]"
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-3xl text-gray-700 dark:text-gray-200"
          >
            ☰
          </button>

          {/* iOS Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`
              relative w-14 h-7 flex items-center rounded-full cursor-pointer ml-4 
              shadow-inner transition
              ${theme === "dark" ? "bg-indigo-600" : "bg-gray-300"}
            `}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
              style={{ x: theme === "dark" ? 28 : 2 }}
            >
              {theme === "dark" ? (
                <BsSunFill className="text-indigo-600" size={15} />
              ) : (
                <BsMoonStarsFill className="text-gray-700" size={15} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
