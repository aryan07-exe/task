import React, { useState } from "react";
import "./Planner.css"; // Importing CSS for styling

const SmartPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [suggestedSlots, setSuggestedSlots] = useState([]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const getBestTimeSlots = async () => {
    // Simulating API response (Replace this with actual API)
    const fakeApiResponse = [
      { task: "Study Machine Learning", time: "10:00 AM - 11:30 AM" },
      { task: "Workout", time: "6:30 AM - 7:00 AM" },
      { task: "Project Work", time: "3:00 PM - 5:00 PM" },
    ];
    setSuggestedSlots(fakeApiResponse);
  };

  return (
    <div className="planner-container">
      <h1>Smart Day Planner</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task}
          </li>
        ))}
      </ul>

      <button className="schedule-btn" onClick={getBestTimeSlots}>
        Get Best Time Slots
      </button>

      <div className="time-slots">
        <h2>Suggested Time Slots:</h2>
        {suggestedSlots.length > 0 ? (
          <ul>
            {suggestedSlots.map((slot, index) => (
              <li key={index} className="time-slot">
                <strong>{slot.task}:</strong> {slot.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No suggestions yet. Add tasks and click the button!</p>
        )}
      </div>
    </div>
  );
};

export default SmartPlanner;
