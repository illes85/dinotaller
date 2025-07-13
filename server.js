const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

app.get('/api/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  const newTask = { id: Date.now(), ...req.body, statusz: 'szabad', jelentkezok: [] };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Feladat mentve', task: newTask });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
