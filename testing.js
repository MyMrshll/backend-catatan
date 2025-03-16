const fs = require('fs').promises;

async function readFile() {
    const users = await fs.readFile('./users.json', 'utf-8');
    const notes = await fs.readFile('./notes.json', 'utf-8');
    const dataUsers = JSON.parse(users);
    const dataNotes = JSON.parse(notes);



    dataUsers.forEach(user => {
        const userNotes = dataNotes.filter(note => note.id_user === user.id);
        console.log({notes: userNotes});
    });
}

readFile();