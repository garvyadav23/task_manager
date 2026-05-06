const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController");

router.post("/", auth, role("Admin"), createProject);
router.get("/", auth, getProjects);
router.delete("/:id", auth, role("Admin"), deleteProject);

module.exports = router;
