const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("members");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
