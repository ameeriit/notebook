const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

let notes = [
  // dummy for checking the post from postman
  //   { id: 1, title: "Note 1", content: "This is the first note." },
  //   { id: 2, title: "Note 2", content: "This is the second note." },
];

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// too get specific note by ID
app.get("/notes/:id", (req, res) => {
  screen;
  const noteId = parseInt(req.params.id);
  const note = notes.find((n) => n.id === noteId);
  if (!note) {
    res.status(404).send("Note not found");
  } else {
    res.json(note);
  }
});

// Creating new note
app.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);
  res.status(201).json(newNote);
});

// For editing the existing note
app.put("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedNote = req.body;
  const index = notes.findIndex((n) => n.id === noteId);
  if (index === -1) {
    res.status(404).send("Note not found");
  } else {
    notes[index] = { ...notes[index], ...updatedNote };
    res.json(notes[index]);
  }
});

// For Deleting a note
app.delete("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === noteId);
  if (index === -1) {
    res.status(404).send("Note not found");
  } else {
    notes.splice(index, 1);
    res.sendStatus(204);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
