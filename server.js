const express = require('express');
const app = express();

const uniqid = require('uniqid'); 

const cors = require('cors');

let notes = [
  {
    id: uniqid(),
    name: "notatka 1",
    body: "siema to ja"
  },
  {
    id: uniqid(),
    name: "notatka 2",
    body: "druga notatka elo"
  },
];

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// API

app.get('/api/get-notes', (req, res) => {
  res.json({notes: notes});
});

app.post('/api/update-note', (req, res) => {
  notes = notes.map(note => note.id === req.body.id ? {...note, name: req.body.name, body: req.body.body} : note);

  res.sendStatus(200);
});
app.post('/api/add-note', (req, res) => {
  let newId = uniqid();

  let newNote = {id: newId, name: "New note", body: ""};

  notes.push(newNote)

  res.json(newNote);
});
app.post('/api/delete-note', (req, res) => {
  notes = notes.filter(note => note.id != req.body.id);

  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});