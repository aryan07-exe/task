import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./New.css"
import image from  "../images/w.png"; 
const PRIORITY_LEVELS = {
  LOW: { value: "low", label: "Low", color: "#4caf50" },
  MEDIUM: { value: "medium", label: "Medium", color: "#ff9800" },
  HIGH: { value: "high", label: "High", color: "#f44336" },
}

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
    completed: false,
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sortBy, setSortBy] = useState("startTime")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.title.trim() !== "" && newTask.startTime && newTask.endTime) {
      setTasks([...tasks, { ...newTask, id: uuidv4(), date: selectedDate.toISOString().split("T")[0] }])
      setNewTask({
        title: "",
        startTime: "",
        endTime: "",
        priority: PRIORITY_LEVELS.MEDIUM.value,
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

  const renderPriorityOptions = () => {
    return Object.values(PRIORITY_LEVELS).map((priority) => (
      <option key={priority.value} value={priority.value}>
        {priority.label}
      </option>
    ))
  }

  return (
    <div className="daily-planner">
          <div className="img"><img src={image} alt="" /></div>
      <header>
        <h1>Daily Planner</h1>
      </header>
      <main>
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
            <span>to</span>
            <input
              type="time"
              value={newTask.endTime}
              onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
              required
            />
          </div>
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
            {renderPriorityOptions()}
          </select>
          <button type="submit">Add Task</button>
        </form>

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
              <div className="task-actions">
                <button onClick={() => toggleComplete(task.id)}>{task.completed ? "Undo" : "Complete"}</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default DailyPlanner

