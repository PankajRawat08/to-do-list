import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { Button, Modal, Input } from "antd";
import Edit from "./components/Edit";
import './App.css';

const { Search } = Input;

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [records, setRecords] = useState(null);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add new task to tasks state
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsAddTaskModalVisible(false);
  };

  // Hide add task modal
  const handleCancelAddTask = () => {
    setIsAddTaskModalVisible(false);
  };

  // Delete task from tasks state
  const handleDeleteTask = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      onOk: () => {
        setTasks((prev) => {
          const newTasks = prev.filter((task) => task.key !== record.key);
          localStorage.setItem("tasks", JSON.stringify(newTasks));
          return newTasks;
        });
      },
    });
  };

  // Edit task in tasks state
  const handleEditTask = (record) => {
    setRecords({ ...record });
    setIsEditing(true);
  };

  // Filter tasks based on search text
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do List</h1>
        <div className="search-box">
          <Search
            placeholder="Search tasks"
            allowClear
            enterButton="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 400 }}
          />
        </div>
        <AddTask
          tasks={tasks}
          addTask={handleAddTask}
          visible={isAddTaskModalVisible}
          onCreate={handleAddTask}
          onCancel={handleCancelAddTask}
        />
        <Tasks
          tasks={filteredTasks}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
        {isEditing ? (
          <Edit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            tasks={tasks}
            setTasks={setTasks}
            records={records}
            setRecords={setRecords}
          />
        ) : (
          <div></div>
        )}
        <div className="add-task">
          <Button onClick={() => setIsAddTaskModalVisible(true)}>Add Task</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
