import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables to manage tasks, form inputs, and the task being edited
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // API URL for the backend
  const apiUrl = 'http://localhost:3000/tasks';

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTasks(data);
  };

  // Function to add a new task
  const handleAddTask = async () => {
    const newTask = { title, description, dueDate };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
    // Clear input fields after adding a task
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  // Function to handle task edit
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
  };

  // Function to update an existing task
  const handleUpdateTask = async () => {
    const updatedTask = { ...editingTask, title, description, dueDate };
    const response = await fetch(`${apiUrl}/${editingTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
    // Clear input fields and editing task after update
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  // Function to delete a task
  const handleDeleteTask = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1 className='taskmang'>Task Managementss Application</h1>
      <div>
        {/* Input fields for task details */}
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* Button to add or update a task */}
        {editingTask ? (
          <button onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button style={{ backgroundColor: '#B3E2A7' }} onClick={handleAddTask}>Add Task</button>
        )}
      </div>
      <div>
        <h2 style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>Task List</h2>
        {/* Display list of tasks */}
        {tasks.map((task) => (
          <div key={task.id} style={{ border: '5px solid black', borderRadius: '20px', padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            {/* Buttons to edit or delete a task */}
            <button style={{ backgroundColor: '#80C4E9' }} onClick={() => handleEditTask(task)}>Edit</button>
            <button style={{ backgroundColor: '#F4A261' }} onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
