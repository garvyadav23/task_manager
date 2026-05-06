# Ethara - Project Management Dashboard

A modern, full-stack project management application built with **React**, **Node.js**, **Express**, and **MongoDB**. Manage projects, tasks, and team members efficiently with a beautiful and intuitive UI.

![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-14+-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure login and signup with JWT tokens
- 👥 **Role-Based Access Control** - Admin and Member roles with different permissions
- 📊 **Dashboard** - Overview of tasks, projects, and statistics
- 📁 **Project Management** - Create, view, and delete projects
- ✅ **Task Management** - Create, update, and delete tasks with status tracking
- 👤 **User Management** - Admin can manage team members
- 📈 **Task Statistics** - Track total, completed, pending, and overdue tasks
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

### Task Features
- Status tracking (Todo, In Progress, Done)
- Task assignment to team members
- Due date management
- Project association
- Task overview with status badges
- Delete functionality (Admin only)

### Project Features
- Create and manage projects
- Add team members to projects
- Project descriptions
- Delete projects (Admin only)

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication

### Styling
- **CSS3** - Modern styling with gradients and animations
- **Custom CSS Variables** - Theme customization
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
ethara1/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── dashboardController.js
    │   ├── projectController.js
    │   ├── taskController.js
    │   └── userController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── models/
    │   ├── Project.js
    │   ├── Task.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── dashboardRoutes.js
    │   ├── projectRoutes.js
    │   ├── taskRoutes.js
    │   └── userRoutes.js
    ├── server.js
    ├── package.json
    └── .env
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ethara
JWT_SECRET=your_jwt_secret_key_here
```

4. **Configure MongoDB connection** in `config/db.js` if using cloud MongoDB:
```javascript
// Update connection string for MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Update API base URL** in `src/api.js`:
```javascript
const instance = axios.create({
  baseURL: "http://localhost:5001/api"
});
```

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server runs on `http://localhost:5001`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:5173`

### Create Initial Admin User
Sign up with the following credentials to create an admin account:
- **Name:** Admin User
- **Email:** admin@example.com
- **Password:** Your password
- **Role:** Admin

## 📡 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Dashboard Routes
- `GET /api/dashboard` - Get dashboard statistics

### Project Routes
- `POST /api/projects` - Create project (Admin only)
- `GET /api/projects` - Get all projects
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Task Routes
- `POST /api/tasks` - Create task (Admin only)
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete task (Admin only)

### User Routes
- `GET /api/users` - Get all users (Admin only)

## 📖 Usage Guide

### For Admin Users
1. **Create Projects:**
   - Click "Create Project" form on dashboard
   - Enter project title, description, and select team members
   - Click "Create Project"

2. **Create Tasks:**
   - Click "Create Task" form on dashboard
   - Enter task details, assign to team member, set due date
   - Click "Create Task"

3. **Manage Tasks:**
   - Update task status using the dropdown
   - Delete tasks using the delete button (×)
   - View all tasks in the overview section

4. **Manage Projects:**
   - View all projects
   - Delete projects using the delete button (×)

### For Member Users
1. **View Dashboard:**
   - See assigned tasks and projects
   - View task statistics

2. **Update Task Status:**
   - Change task status: Todo → In Progress → Done
   - Cannot create or delete tasks

3. **Monitor Progress:**
   - Track task due dates
   - View assigned project information

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize colors:
```css
:root {
  --accent: #aa3bff;        /* Purple accent */
  --text: #6b6375;          /* Text color */
  --text-h: #08060d;        /* Heading color */
  --bg: #fff;               /* Background */
  --border: #e5e4e7;        /* Border color */
  /* ... more variables */
}
```

### Dark Mode
Dark mode is automatically applied based on system preference:
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme colors */
  }
}
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Verify `PORT` is not already in use

### Frontend API Errors
- Check backend server is running on correct port
- Verify API base URL in `src/api.js`
- Check browser console for error messages

### Authentication Issues
- Clear browser cookies and local storage
- Logout and login again
- Check JWT_SECRET in backend .env

## 📝 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Admin/Member),
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  members: [ObjectId],
  createdBy: ObjectId,
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  project: ObjectId,
  assignedTo: ObjectId,
  status: String (Todo/In Progress/Done),
  dueDate: Date,
  createdAt: Date
}
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build frontend: `npm run build`
2. Deploy `dist` folder
3. Update API base URL for production

## 📦 Dependencies

### Frontend
- react: ^18.0.0
- react-router-dom: Latest
- axios: Latest
- vite: Latest

### Backend
- express: ^4.18.0
- mongoose: ^7.0.0
- jsonwebtoken: ^9.0.0
- bcrypt: ^5.0.0
- dotenv: ^16.0.0

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@ethara.com or open an issue on GitHub.

---

**Built with ❤️ by Ethara Team**

Last Updated: May 2026
