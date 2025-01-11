import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Display from './Display'
import Task from './Task'
import UpdateTask from './UpdateTask'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/" className="navbar-link">Add Task</Link>
          </li>
          <li>
            <Link to="/view-task" className="navbar-link">View Task</Link>
          </li>
        </ul>
      </div>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/view-task" element={<Display />} />
          <Route path='/update-task/:id' element={<UpdateTask />} />
        </Routes>
      </div>
    </div>
  )
}

export default Navbar
