import React from "react";
import moment from "moment";
import classNames from "classnames";
import "./Task.css";

const Task = ({
  task,
  index,
  handleEdit,
  handleDelete,
  handleComplete,
  isEditing,
  toggleEdit,
}) => {
  const classes = classNames("task", {
    "task--completed": task.isCompleted,
  });

  return (
    <div className={classes} key={index}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={task.description}
            className="task-description"
            onChange={(e) => handleEdit(index, "description", e.target.value)}
          />
          <input
            type="date"
            value={task.dueDate}
            className="task-due-date"
            onChange={(e) => handleEdit(index, "dueDate", e.target.value)}
          />
          <select
            value={task.priority}
            className="task-priority"
            onChange={(e) => handleEdit(index, "priority", e.target.value)}
          >
            <option value="low" style={{ backgroundColor: task.priority === "low" ? "#d1e3f3" : "" }}>
              Low
            </option>
            <option value="medium" style={{ backgroundColor: task.priority === "medium" ? "#e3f3d1" : "" }}>
              Medium
            </option>
            <option value="high" style={{ backgroundColor: task.priority === "high" ? "#f3d1d1" : "" }}>
              High
            </option>
          </select>
          <button className="task-edit-button" onClick={() => toggleEdit(index)}>
            Save
          </button>
        </>
      ) : (
        <>
          <div className="task-description">{task.description}</div>
          <div className="task-due-date">
            {moment(task.dueDate).format("MMM D, YYYY")}
          </div>
          <div className="task-priority" style={{ backgroundColor: task.priority === "low" ? "#d1e3f3" : task.priority === "medium" ? "#e3f3d1" : "#f3d1d1" }}>
            {task.priority}
          </div>
          <button className="task-edit-button" onClick={() => toggleEdit(index)}>
            Edit
          </button>
        </>
      )}
      <div className="task-controls">
        <button
          className="task-delete-button"
          onClick={() => handleDelete(index)}
        >
          Delete
        </button>
        <button
          className={classNames("task-complete-button", {
            "task-complete-button--completed": task.isCompleted,
          })}
          onClick={() => handleComplete(index)}
        >
          {task.isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default Task;