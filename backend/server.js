const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: id++, ...req.body };
  tasks.push(newTask);
  res.json(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  res.json(task || {});
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index] = { id: tasks[index].id, ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
