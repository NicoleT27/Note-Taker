const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuidv4();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
  console.log(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = notes.filter((remove) => remove.id !== req.params.id);

  fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
  res.json("Deleted");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
