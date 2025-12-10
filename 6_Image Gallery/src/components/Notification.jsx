import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style/Notification.css";
import { registerNotification } from "../utils/notifications";

export default function Notification() {
  const [list, setList] = useState([]);

  useEffect(() => {
    registerNotification((msg) => {
      setList((prev) => [...prev, msg]);

      setTimeout(() => {
        setList((prev) => prev.filter((n) => n.id !== msg.id));
      }, 3000);
    });
  }, []);

  const variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 }
  };

  return (
    <div className="notification-wrapper">
      <AnimatePresence>
        {list.map((n) => (
          <motion.div
            key={n.id}
            className={`notification ${n.type}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {n.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
