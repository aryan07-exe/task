import { useState } from "react"
import { Users, Calendar, PlusCircle, AlertCircle } from "react-feather"
import "./collab.css"

const Collab = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      deadline: "2023-08-15",
      tasks: [
        { id: 1, description: "Wireframing", assignee: "Alice", completed: true },
        { id: 2, description: "UI Design", assignee: "Bob", completed: false },
        { id: 3, description: "Frontend Development", assignee: "Charlie", completed: false },
      ],
    },
    {
      id: 2,
      name: "Mobile App Launch",
      deadline: "2023-09-30",
      tasks: [
        { id: 1, description: "Finalize Features", assignee: "David", completed: true },
        { id: 2, description: "Beta Testing", assignee: "Eve", completed: false },
        { id: 3, description: "App Store Submission", assignee: "Frank", completed: false },
      ],
    },
  ])

  const [newTask, setNewTask] = useState({ description: "", assignee: "" })

  const addTask = (projectId) => {
    if (newTask.description.trim() !== "" && newTask.assignee.trim() !== "") {
      setProjects(
        projects.map((project) =>
          project.id === projectId
            ? { ...project, tasks: [...project.tasks, { ...newTask, id: Date.now(), completed: false }] }
            : project,
        ),
      )
      setNewTask({ description: "", assignee: "" })
    }
  }

  const toggleTaskCompletion = (projectId, taskId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
            }
          : project,
      ),
    )
  }

  const calculateProgress = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed).length
    return (completedTasks / tasks.length) * 100
  }

  return (
    <div className="collab-container">
      <h1>Collaborative Projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <h2>{project.name}</h2>
          <div className="project-info">
            <span>
              <Calendar size={18} /> Deadline: {project.deadline}
            </span>
            <span>
              <Users size={18} /> Team Size: {project.tasks.length}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${calculateProgress(project.tasks)}%` }}></div>
          </div>
          <h3>Tasks</h3>
          <ul className="task-list">
            {project.tasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(project.id, task.id)}
                  />
                  <span>{task.description}</span>
                </label>
                <span className="assignee">
                  <Users size={14} />
                  {task.assignee}
                </span>
              </li>
            ))}
          </ul>
          <div className="add-task">
            <input
              type="text"
              placeholder="New task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
            <button onClick={() => addTask(project.id)}>
              <PlusCircle size={18} /> Add Task
            </button>
          </div>
        </div>
      ))}
      <div className="info-box">
        <AlertCircle size={18} />
        <p>Collaborate effectively by assigning tasks and tracking progress together!</p>
      </div>
    </div>
  )
}

export default Collab

