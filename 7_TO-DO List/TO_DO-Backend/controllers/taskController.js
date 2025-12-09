import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const task = await Task.create(req.body);

  req.io.emit("task-added", task); // Real-time
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;

  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });

  req.io.emit("task-updated", updated);
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);
  req.io.emit("task-deleted", id);

  res.json({ success: true });
};
