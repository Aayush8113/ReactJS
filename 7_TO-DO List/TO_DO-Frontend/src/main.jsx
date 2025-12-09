// ===============================
// 🌀 MAIN.JSX — V16 (API READY)
// ===============================

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css"; // Tailwind + CSS Variables (Crystal UI)

// 🔵 Global fallback while API / routes load
const Fallback = () => (
  <div
    className="
      min-h-screen flex items-center justify-center
      text-indigo-600 dark:text-indigo-400
      text-xl font-bold tracking-wide
    "
  >
    Loading…
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);
