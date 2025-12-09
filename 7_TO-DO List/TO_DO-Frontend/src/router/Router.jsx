import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import DashboardPage from "../pages/DashboardPage";

export default function Router() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}
