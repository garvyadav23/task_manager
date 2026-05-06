const Task = require("../models/Task");

exports.getStats = async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Done").length;
    const pending = tasks.filter(t => t.status !== "Done").length;
    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
    ).length;

    res.json({ total, completed, pending, overdue });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
