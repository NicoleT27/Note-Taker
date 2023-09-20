const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/api/notes", (req, res) => res.sendFile(path.join(_dirname, "/db/db.json")));

app.post("/api/notes", (req, res) => {
const notes = JSON.parse(fs.readFileSync("./db/db.json"));
const newNotes = req.body;
notes.push(newNotes);
fs.writeFileSync("./db/db.json", JSON.stringify(notes))
res.json(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/assets/notes.html"));
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/assets/index.html"));
});

app.listen(PORT);
