const fs = require("fs").promises;
const path = require("path");
const { readFile } = require("../utils/fsUtils");
const { log } = require("console");

const getNotes = async (req, res) => {
  try {
    const { id, username, email } = req.user;
    const data = await readFile("../data/notes.json");
    if (data == null) return res.status(404).json({ message: "Note is empty" });
    const note = data.filter((note) => note.id_user == id);
    res.json({
      message: "Notes retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const createNote = async (req, res) => {
  try {
    const { id, username, email } = req.user;
    const id_user = id;
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
    console.log(req.user);

    const data = await readFile("../data/notes.json");
    const notes = data.filter((note) => note.id != id);
    const note = data.find((note) => note.id == id);

    if (note.id_user != req.user.id)
      return res
        .status(403)
        .json({ message: "Forbidden: No access to this note" });

    if (data.length == notes.length)
      return res
        .status(404)
        .json({ message: "Delete note failed, data not found" });
    await fs.writeFile(
      path.join(__dirname, "../data/notes.json"),
      JSON.stringify(notes)
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

    if (!note) return res.status(404).json({ message: "Upadate note failed, Note not found" });

    if (note.id_user != req.user.id)
      return res
        .status(403)
        .json({ message: "Forbidden: No access to this note" });

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

module.exports = { getNotes, createNote, deleteNote, updateNote };
