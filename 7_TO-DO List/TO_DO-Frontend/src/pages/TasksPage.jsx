import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { motion, AnimatePresence } from "framer-motion";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FaPlus, FaEdit, FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { taskService } from "../api/taskService";
import { socket } from "../api/socket";

// ===============================
// CATEGORY COLORS — CRYSTAL V16
// ===============================
const categoryColors = {
  Personal: "bg-indigo-500 text-white",
  Work: "bg-cyan-400 text-black",
  Urgent: "bg-red-500 text-white",
  Important: "bg-yellow-400 text-black",
};

// ===============================
// Sortable Task Component — V16
// ===============================
function SortableTask({ item, onEdit, onDelete, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="
        p-5 rounded-xl flex items-center justify-between
        bg-white/80 dark:bg-[#141821]/80 
        backdrop-blur-xl border border-indigo-300/40 dark:border-indigo-500/20
        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)]
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => onToggle(item._id)}
          className="w-5 h-5 cursor-pointer accent-indigo-600"
        />

        <div>
          <p
            className={`text-lg font-semibold ${
              item.isCompleted
                ? "line-through text-gray-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {item.todo}
          </p>

          <span
            className={`text-xs px-2 py-1 rounded-md mt-1 inline-block ${
              categoryColors[item.category]
            }`}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex gap-3 text-xl">
        <button
          onClick={() => onEdit(item)}
          className="
            p-2 bg-indigo-600 hover:bg-indigo-700 
            text-white rounded-lg shadow
          "
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="
            p-2 bg-red-500 hover:bg-red-600 
            text-white rounded-lg shadow
          "
        >
          <MdDeleteForever />
        </button>
      </div>
    </motion.div>
  );
}

// =================================================
// MAIN TASK PAGE — CRYSTAL UI V16
// =================================================
export default function TasksPage() {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [todoText, setTodoText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [editId, setEditId] = useState(null);

  // ============================
  // LOAD TASKS (API)
  // ============================
  useEffect(() => {
    taskService.getAll().then((res) => setTasks(res.data));
  }, []);

  // ============================
  // SOCKET REAL-TIME LISTENERS
  // ============================
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

  // ============================
  // DRAG END
  // ============================
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t._id === active.id);
    const newIndex = tasks.findIndex((t) => t._id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  // ============================
  // MODAL LOGIC
  // ============================
  const openModal = () => {
    setShowModal(true);
    setTodoText("");
    setCategory("Personal");
    setEditId(null);
  };

  const saveTask = async () => {
    if (!todoText.trim()) return;

    const data = { todo: todoText, category, isCompleted: false };

    editId
      ? await taskService.update(editId, data)
      : await taskService.add(data);

    setShowModal(false);
  };

  const handleDelete = async (id) => taskService.remove(id);

  const editTask = (task) => {
    setTodoText(task.todo);
    setCategory(task.category);
    setEditId(task._id);
    setShowModal(true);
  };

  const toggleCheck = async (id) => {
    const t = tasks.find((x) => x._id === id);
    await taskService.update(id, { ...t, isCompleted: !t.isCompleted });
  };

  // ===========================================================
  // UI START
  // ===========================================================
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Manage Your Tasks
      </h1>

      {/* ADD BUTTON */}
      <motion.button
        onClick={openModal}
        whileHover={{ scale: 1.05 }}
        className="
          bg-indigo-600 hover:bg-indigo-700 
          text-white px-5 py-3 rounded-xl 
          mb-6 shadow-md flex items-center gap-2
        "
      >
        <FaPlus /> Add Task
      </motion.button>

      {/* TASK LIST */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {tasks.map((task) => (
              <SortableTask
                key={task._id}
                item={task}
                onEdit={editTask}
                onDelete={handleDelete}
                onToggle={toggleCheck}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              fixed inset-0 bg-black/40 backdrop-blur-sm 
              flex justify-center items-center z-50
            "
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              onClick={(e) => e.stopPropagation()}
              className="
                p-6 rounded-2xl w-[90%] max-w-md
                bg-white dark:bg-[#12141d]
                border border-indigo-300/40 dark:border-indigo-500/20
              "
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editId ? "Edit Task" : "Add Task"}
              </h2>

              <input
                className="
                  w-full p-3 rounded-xl mb-3 
                  bg-gray-100 dark:bg-[#1c1f2b] 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-700
                "
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Task name..."
              />

              <select
                className="
                  w-full p-3 rounded-xl mb-5 
                  bg-gray-100 dark:bg-[#1c1f2b] 
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-700
                "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Object.keys(categoryColors).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={saveTask}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex gap-2 items-center"
                >
                  <FaSave /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
