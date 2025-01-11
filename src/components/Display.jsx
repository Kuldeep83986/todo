import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [getData, setGetData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    let res = await axios.get(
      `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json`
    );
    // console.log(res.data);
    let obj = res.data;
    let arrData = [];
    for (let key in obj) {
      arrData.push({ id: key, ...obj[key] });
    }
    // console.log(arrData);
    setGetData(arrData);
  };

  async function deleteTask(id) {
    // console.log(id);
    try {
      await axios.delete(
        `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  function editTask(id) {
    // console.log(id);
    navigate(`/update-task/${id}`);
  }

   async function handleToggle(id,completed){
    // console.log(id, completed)
    try {
      await axios.patch(
        `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
        { completed: !completed }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div >
      <h1 className="display-header">Task List</h1>
      <ul className="task-list">
        {getData.map((el, i) => (
          <li key={i} className="task-item">
            <p style={{textDecoration : el.completed ? "line-through" : "none"}}>{el.task}</p>

            <div className="task-buttons">
            <button className="MAC" onClick={()=>handleToggle(el.id, el.completed)}>{el.completed ? "UNDO" : "Mark as completed" }</button>
              <button className="task-delete" onClick={() => deleteTask(el.id)}>
                Delete
              </button>
              <button className="task-edit" onClick={() => editTask(el.id)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
