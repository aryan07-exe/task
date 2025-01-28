import React, { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css";
import "./New.css";
import { requestNotificationPermission } from "./firebase-config"

const PRIORITY_COLORS = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
}

const ReminderPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [taskInput, setTaskInput] = useState("")
  const [taskTime, setTaskTime] = useState("")
  const [taskPriority, setTaskPriority] = useState("medium")
  const [reminders, setReminders] = useState({})
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    requestNotificationPermission().then((token) => {
      if (token) setUserToken(token)
    })
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const addTask = () => {
    if (!taskInput.trim() || !taskTime) return

    const dateKey = selectedDate.toDateString()
    const newTask = {
      text: taskInput,
      time: taskTime,
      priority: taskPriority,
    }

    setReminders((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask],
    }))

    setTaskInput("")
    setTaskTime("")
    scheduleNotification(newTask, selectedDate)
  }

  const scheduleNotification = (task, date) => {
    const [hours, minutes] = task.time.split(":")
    const scheduledTime = new Date(date)
    scheduledTime.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0, 0)

    const delay = scheduledTime.getTime() - new Date().getTime()
    if (delay > 0) {
      setTimeout(() => {
        sendNotification(task)
      }, delay)
    }
  }

  const sendNotification = (task) => {
    if (userToken) {
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=YOUR_SERVER_KEY`,
        },
        body: JSON.stringify({
          to: userToken,
          notification: {
            title: `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority Task`,
            body: `Reminder: ${task.text} at ${task.time}`,
            click_action: window.location.href,
          },
        }),
      })
    }
  }

  return (
    <div className="reminder-container">
      <h1>Task & Reminder System</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="task-section">
        <h2>Selected Date: {selectedDate.toDateString()}</h2>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        <h3>Tasks for {selectedDate.toDateString()}:</h3>
        {reminders[selectedDate.toDateString()]?.length > 0 ? (
          <ul>
            {reminders[selectedDate.toDateString()].map((task, index) => (
              <li
                key={index}
                className="task-item"
                style={{ borderLeft: `5px solid ${PRIORITY_COLORS[task.priority]}` }}
              >
                <span className="task-time">{task.time}</span>
                <span className="task-text">{task.text}</span>
                <span className="task-priority" style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}>
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  )
}

export default ReminderPage

