import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./New.css"

const PRIORITY_LEVELS = {
  LOW: { value: "low", label: "Low", color: "#52b788" },
  MEDIUM: { value: "medium", label: "Medium", color: "#fca311" },
  HIGH: { value: "high", label: "High", color: "#e63946" },
}

const CATEGORIES = ["Work", "Personal", "Health", "Finance", "Other"]

const QUOTES = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "It always seems impossible until it's done. - Nelson Mandela",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
]

function DailyPlanner() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState({
    title: "",
    startTime: "",
    endTime: "",
    priority: PRIORITY_LEVELS.MEDIUM.value,
    category: CATEGORIES[0],
    completed: false,
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sortBy, setSortBy] = useState("startTime")
  const [quote, setQuote] = useState("")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }, [])

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.title.trim() !== "" && newTask.startTime && newTask.endTime) {
      setTasks([...tasks, { ...newTask, id: uuidv4(), date: selectedDate.toISOString().split("T")[0] }])
      setNewTask({
        title: "",
        startTime: "",
        endTime: "",
        priority: PRIORITY_LEVELS.MEDIUM.value,
        category: CATEGORIES[0],
        completed: false,
      })
    }
  }

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = tasks.filter((task) => task.date === selectedDate.toISOString().split("T")[0])

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = Object.values(PRIORITY_LEVELS).map((p) => p.value)
      return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
    } else if (sortBy === "startTime") {
      return a.startTime.localeCompare(b.startTime)
    }
    return 0
  })

  const completedTasksCount = filteredTasks.filter((task) => task.completed).length
  const totalTasksCount = filteredTasks.length
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0

  return (
    <div className="daily-planner">
      <header>
        <h1>Daily Planner</h1>
      </header>
      <main>
        <div className="sidebar">
          <div className="date-selector">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          <form onSubmit={addTask} className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <div className="time-inputs">
              <input
                type="time"
                value={newTask.startTime}
                onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                required
              />
              <input
                type="time"
                value={newTask.endTime}
                onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                required
              />
            </div>
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              {Object.values(PRIORITY_LEVELS).map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="task-container">
          <div className="task-controls">
            <label>
              Sort by:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="startTime">Start Time</option>
                <option value="priority">Priority</option>
              </select>
            </label>
          </div>
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                <div className="task-header">
                  <span className="task-time">
                    {task.startTime} - {task.endTime}
                  </span>
                  <h3>{task.title}</h3>
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: PRIORITY_LEVELS[task.priority.toUpperCase()].color }}
                  >
                    {PRIORITY_LEVELS[task.priority.toUpperCase()].label}
                  </span>
                </div>
                <div>Category: {task.category}</div>
                <div className="task-actions">
                  <button onClick={() => toggleComplete(task.id)}>{task.completed ? "Undo" : "Complete"}</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="quote-container">
            <p>{quote}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DailyPlanner

