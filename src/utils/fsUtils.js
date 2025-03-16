const fs = require("fs").promises;
const path = require("path");

async function readFile(file) {
  try {
    const users = await fs.readFile(path.join(__dirname, file), "utf-8");
    return JSON.parse(users);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { readFile };
