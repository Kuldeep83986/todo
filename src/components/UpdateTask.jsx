import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const [getData, setGetData] = useState({});

  let { id } = useParams();
  let navigate = useNavigate();
  // console.log(id);

  async function fetchData() {
    let res = await axios.get(
      `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`
    );
    // console.log(res.data);
    setGetData(res.data);
  }

  function handleChange(e) {
    let key = e.target.name;
    setGetData({ ...getData, [key]: e.target.value });
  }

  async function update(e) {
    e.preventDefault();
    // console.log(getData)
    try {
      await axios.patch(
        `https://tasks-2e8fe-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
        getData
      );
      navigate(`/view-task`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="update-container">
      <form className="update-form" onSubmit={update}>
        <h1 className="update-header">Update Your Task </h1>
        <input
          type="text"
          className="update-input"
          value={getData.task || ""}
          name="task"
          onChange={handleChange}
          placeholder="Enter updated task"
        />
        <button className="update-button" type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
