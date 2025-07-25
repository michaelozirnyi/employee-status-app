const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(bodyParser.json());

// In-memory database for users
const employees = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Working',
    img: 'example1'
  },
  {
    id: 2,
    name: 'Jack Smith',
    status: 'Working',
    img: 'example2'
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'example3'
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    img: 'example4'
  },

  { id: 5, name: 'Jane Smith', status: 'OnVacation', img: 'example4' },
  { id: 6, name: 'Bob Johnson', status: 'LunchTime', img: 'example4' },
  { id: 7, name: 'Alice Brown', status: 'BusinessTrip', img: 'example4' },
  { id: 8, name: 'Charlie Wilson', status: 'Working', img: 'example4' },
  { id: 9, name: 'Joy Tomas', status: 'LunchTime', img: 'example4' },
];

app.get('/users', (req, res) => {
  res.send(employees);
});

app.post('/users/:id', (req, res) => {
  const userId = +req.params.id;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // Find employee
  const index = employees.findIndex(obj => obj.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  // Update employee status
  employees[index].status = status;
  res.send(employees);
});

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});
