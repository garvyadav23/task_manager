const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Verify environment variables are loaded
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not set in .env file");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ Error: JWT_SECRET is not set in .env file");
  process.exit(1);
}

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  "https://ethara.vercel.app"
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
