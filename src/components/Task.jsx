import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Task = () => {
  const [todo, setTodo] = useState({ task: "", completed:false });

  const { task , completed } = todo;

  const navigate = useNavigate();

  function handleChange(e) {
    let key = e.target.name;
    setTodo({ ...todo, [key]: e.target.value });
    // console.log(todo)
  }

  async function addTask(e) {
    e.preventDefault();
    // console.log(todo)
    try {
      await axios.post(
        `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json`,
        todo
      );
      setTodo({ task: "", completed:false });
      navigate("/view-task");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="task-container">
        
        <form className="task-form">
        <h1 className="task-header">Add Your Task Here</h1>
          <input
            type="text"
            className="task-input"
            value={task}
            name="task"
            onChange={handleChange}
            placeholder="Enter task.."
          />
          <button className="task-button" onClick={addTask}>
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default Task;
