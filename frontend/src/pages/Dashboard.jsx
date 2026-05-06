import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const initialProject = { title: "", description: "", members: [] };
const initialTask = { title: "", description: "", project: "", assignedTo: "", dueDate: "", status: "Todo" };

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectData, setProjectData] = useState(initialProject);
  const [taskData, setTaskData] = useState(initialTask);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, projectsRes, tasksRes] = await Promise.all([
          api.get("/dashboard"),
          api.get("/projects"),
          api.get("/tasks")
        ]);

        setStats(statsRes.data);
        setProjects(projectsRes.data);
        setTasks(tasksRes.data);

        if (user?.role === "Admin") {
          const usersRes = await api.get("/users");
          setUsers(usersRes.data);
        }
      } catch (err) {
        setError("Unable to load dashboard. Please login again.");
        logout();
        navigate("/login");
      }
    };

    fetchAll();
  }, [navigate, user, logout]);

  const refreshData = async () => {
    try {
      const [statsRes, projectsRes, tasksRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/projects"),
        api.get("/tasks")
      ]);
      setStats(statsRes.data);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      setError("Unable to refresh data.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/projects", {
        ...projectData,
        members: projectData.members
      });
      setSuccess("Project created.");
      setProjectData(initialProject);
      refreshData();
    } catch (err) {
      setError(err.response?.data?.msg || "Project creation failed.");
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/tasks", taskData);
      setSuccess("Task created.");
      setTaskData(initialTask);
      refreshData();
    } catch (err) {
      setError(err.response?.data?.msg || "Task creation failed.");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      setTasks((current) =>
        current.map((task) =>
          task._id === taskId ? { ...task, status } : task
        )
      );
      setSuccess("Task updated.");
    } catch (err) {
      setError(err.response?.data?.msg || "Task update failed.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      setSuccess("Task deleted successfully.");
      refreshData();
    } catch (err) {
      setError(err.response?.data?.msg || "Task deletion failed.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((current) => current.filter((project) => project._id !== projectId));
      setSuccess("Project deleted successfully.");
      refreshData();
    } catch (err) {
      setError(err.response?.data?.msg || "Project deletion failed.");
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {user?.name} ({user?.role})</p>
        </div>
        <div>
          <button onClick={refreshData}>Refresh</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section className="stats">
        <div>Total Tasks: {stats.total ?? 0}</div>
        <div>Completed: {stats.completed ?? 0}</div>
        <div>Pending: {stats.pending ?? 0}</div>
        <div>Overdue: {stats.overdue ?? 0}</div>
      </section>

      <section className="dashboard-section">
        <h2>All Tasks Overview</h2>
        <div className="tasks-overview">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks available.</p>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task._id} className="task-overview-card">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <span className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="task-project">📁 {task.project?.title || "Unknown Project"}</p>
                  <p className="task-assigned">👤 {task.assignedTo?.name || "Unassigned"}</p>
                  <p className="task-due">📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Projects</h2>
        <div className="project-list">
          {projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="card">
                <div className="card-header">
                  <h3>{project.title}</h3>
                  {user?.role === "Admin" && (
                    <button className="delete-btn" onClick={() => handleDeleteProject(project._id)} title="Delete project">
                      ✕
                    </button>
                  )}
                </div>
                <p>{project.description}</p>
                <p>
                  Members: {project.members?.map((m) => m.name).join(", ") || "None"}
                </p>
              </div>
            ))
          )}
        </div>

        {user?.role === "Admin" && (
          <form className="admin-form" onSubmit={handleProjectSubmit}>
            <h3>Create Project</h3>
            <label>
              Title
              <input
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                required
              />
            </label>
            <label>
              Members
              <select
                multiple
                value={projectData.members}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    members: Array.from(e.target.selectedOptions, (option) => option.value)
                  })
                }
              >
                <option value="">Select members</option>
                {users.map((userOption) => (
                  <option key={userOption._id} value={userOption._id}>
                    {userOption.name} ({userOption.role})
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Create Project</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Tasks</h2>
        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="card">
                <div className="card-header">
                  <h3>{task.title}</h3>
                  {user?.role === "Admin" && (
                    <button className="delete-btn" onClick={() => handleDeleteTask(task._id)} title="Delete task">
                      ✕
                    </button>
                  )}
                </div>
                <p>{task.description}</p>
                <p>Project: {task.project?.title || "Unknown"}</p>
                <p>Assigned To: {task.assignedTo?.name || "Unassigned"}</p>
                <p>Status: {task.status}</p>
                <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}</p>
                <div className="task-actions">
                  <label>
                    Update Status
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      disabled={user?.role === "Member" ? false : false}
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        {user?.role === "Admin" && (
          <form className="admin-form" onSubmit={handleTaskSubmit}>
            <h3>Create Task</h3>
            <label>
              Title
              <input
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                required
              />
            </label>
            <label>
              Project
              <select
                value={taskData.project}
                onChange={(e) => setTaskData({ ...taskData, project: e.target.value })}
                required
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Assign To
              <select
                value={taskData.assignedTo}
                onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                required
              >
                <option value="">Select user</option>
                {users.map((userOption) => (
                  <option key={userOption._id} value={userOption._id}>
                    {userOption.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Due Date
              <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
              />
            </label>
            <button type="submit">Create Task</button>
          </form>
        )}
      </section>
    </div>
  );
}
