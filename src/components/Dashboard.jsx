import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calendar, CheckSquare, Bell, Users, PenTool } from "react-feather"
import "./Dashboard.css"

// Mock data for the weekly task completion
const weeklyData = [
  { day: "Mon", completed: 5, pending: 2 },
  { day: "Tue", completed: 7, pending: 1 },
  { day: "Wed", completed: 4, pending: 3 },
  { day: "Thu", completed: 6, pending: 2 },
  { day: "Fri", completed: 8, pending: 1 },
  { day: "Sat", completed: 3, pending: 4 },
  { day: "Sun", completed: 5, pending: 2 },
]

function Dashboard() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const calculateProductivityScore = () => {
    const totalTasks = weeklyData.reduce((acc, day) => acc + day.completed + day.pending, 0)
    const completedTasks = weeklyData.reduce((acc, day) => acc + day.completed, 0)
    return Math.round((completedTasks / totalTasks) * 100)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>MindBot </h1>
        <div className="user-profile">
          <img src="https://i.pravatar.cc/2350" alt="User Avatar" className="avatar" />
          <div className="greeting">{greeting}, Alex!</div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <Link to="/ai-planner" className="nav-button">
          <Calendar size={18} />
          AI Day Planner
        </Link>
        <Link to="/todo-list" className="nav-button">
          <CheckSquare size={18} />
          To-Do List
        </Link>
        <Link to="/reminders" className="nav-button">
          <Bell size={18} />
          Reminders
        </Link>
        <Link to="/collaborative-tasks" className="nav-button">
          <Users size={18} />
          Collaborative Tasks
        </Link>
        <Link to="/notes" className="nav-button">
          <PenTool size={18} />
          Notes
        </Link>
      </nav>

      <main className="dashboard-content">
        <section className="weekly-progress">
          <h2>Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
                labelStyle={{ color: "#1e3a8a" }}
              />
              <Legend wrapperStyle={{ color: "#1e3a8a" }} />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed Tasks" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="productivity-score">
          <h2>Productivity Score</h2>
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${calculateProductivityScore()}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{ stroke: "#3b82f6" }}
              />
              <text x="18" y="20.35" className="percentage">
                {calculateProductivityScore()}%
              </text>
            </svg>
          </div>
          <p className="productivity-message">Great job! Keep up the good work.</p>
        </section>
      </main>
    </div>
  )
}

export default Dashboard;

