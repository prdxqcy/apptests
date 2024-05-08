import React, { useState } from "react";
import Task from "./components/Task";
import "./App.css";
import "moment/min/locales";
import "./responsive.css"; // Import the responsive.css file

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        description: "Task 1",
        dueDate: "2023-02-01",
        priority: "medium",
        isCompleted: false,
      },
      {
        id: 2,
        description: "Task 2",
        dueDate: "2023-02-05",
        priority: "high",
        isCompleted: false,
      },
    ];
  });
  const [nextId, setNextId] = useState(tasks.length + 1);

  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  const moment = require("moment");
  moment.locale("en");

  const handleEdit = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const toggleEdit = (index) => {
    setEditingTaskIndex(editingTaskIndex === index ? null : index);
  };

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (description, dueDate, priority) => {
    const newTask = {
      id: nextId,
      description,
      dueDate,
      priority,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setNextId((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <button className="add-task-button" onClick={() => handleAddTask("", "", "")}>
        Add Task
      </button>
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            task={task}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            isEditing={editingTaskIndex === index}
            toggleEdit={toggleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;