const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

const db = './db/data.json';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api', (req, res) => {
    // get all notes
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(db, JSON.stringify(notes, null, 2), 'utf8', err => {
            if (err) {
                throw err;
            }
            res.json({ message: 'added new note' });
        });
    });
});

app.put('/api/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let notes = JSON.parse(data);
        notes = notes.map(note => note.id === parseInt(noteId) ? updatedNote : note);
        fs.writeFile(db, JSON.stringify(notes, null, 2), 'utf8', err => {
            if (err) {
                throw err;
            }
            res.json({ message: `updated note with id ${noteId}` });
        });
    });
});

app.delete('/api/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== parseInt(noteId));
        fs.writeFile(db, JSON.stringify(notes, null, 2), 'utf8', err => {
            if (err) {
                throw err;
            }
            res.json({ message: `deleted note with id ${noteId}` });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});