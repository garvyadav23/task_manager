import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { setToken } = useContext(AuthContext);
  const [data, setData] = useState({ name: "", email: "", password: "", role: "Member" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/auth/signup", data);
      setSuccess("Account created successfully! Logging in...");
      
      // Auto-login after signup
      const loginRes = await api.post("/auth/login", {
        email: data.email,
        password: data.password
      });
      
      setToken(loginRes.data.token);
      setUser(loginRes.data.user);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </label>
        <label>
          Role
          <select
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
