import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReminderPage.css";
import { requestNotificationPermission } from "./firebase-config";

const ReminderPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskInput, setTaskInput] = useState("");
  const [reminders, setReminders] = useState({});
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    requestNotificationPermission().then((token) => {
      if (token) setUserToken(token);
    });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;

    const dateKey = selectedDate.toDateString();
    setReminders((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), taskInput],
    }));
    setTaskInput("");
    scheduleNotification(taskInput, selectedDate);
  };

  // Schedule Notification
  const scheduleNotification = (task, date) => {
    const delay = new Date(date).getTime() - new Date().getTime();
    if (delay > 0) {
      setTimeout(() => {
        sendNotification(task);
      }, delay);
    }
  };

  // Send Push Notification
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
            title: "Task Reminder",
            body: `Reminder: ${task}`,
            click_action: window.location.href,
          },
        }),
      });
    }
  };

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
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        <h3>Tasks for {selectedDate.toDateString()}:</h3>
        {reminders[selectedDate.toDateString()]?.length > 0 ? (
          <ul>
            {reminders[selectedDate.toDateString()].map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default ReminderPage;
