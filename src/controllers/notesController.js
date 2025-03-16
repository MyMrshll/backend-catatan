const fs = require("fs").promises;
const path = require("path");
const { readFile } = require("../utils/fsUtils");


const getNotes = async (req, res) => {
  try {
    const { id_user } = req.params;
    const data = await readFile("../data/notes.json");
    if(data == null) return res.status(404).json({ message: "Note is empty" });
    const note = data.filter((note) => note.id_user == id_user);
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { title, body } = req.body;
    const data = await readFile("../data/notes.json");
    data.push({ id: data.length + 1, id_user, title, body });
    await fs.writeFile(
      path.join(__dirname, "../data/notes.json"),
      JSON.stringify(data)
    );
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFile("../data/notes.json");
    const note = data.filter((note) => note.id != id);
    await fs.writeFile(
      path.join(__dirname, "../data/notes.json"),
      JSON.stringify(note)
    );
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const data = await readFile("../data/notes.json");
    const note = data.find((note) => note.id == id);
    if(!note) return res.status(404).json({ message: "Note not found" });
    note.title = title;
    note.body = body;
    await fs.writeFile(
      path.join(__dirname, "../data/notes.json"),
      JSON.stringify(data)
    );
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {getNotes, createNote, deleteNote, updateNote };