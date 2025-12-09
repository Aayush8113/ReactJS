import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        transition: "all 0.3s ease",
      }}
    >
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE ROUTES */}
      <div className="pt-6 pb-20 px-4 md:px-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  );
}
