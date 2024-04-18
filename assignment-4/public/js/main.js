function generateId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

async function deleteNote(id) {
    try {
        const response = await fetch('/api/' + id, { 
            method: 'DELETE' 
        });
        let data = await response.json();
        console.log(data);
        refreshNotes();
    } catch (error) {
        console.log(error);
    }
}

async function uploadEdit(id) {
    try {
        let noteField = document.getElementById(`edit${id}`);
        let noteText = noteField.value;
        const response = await fetch('/api/' + id, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                text: noteText
            })
        });
        let data = await response.json();
        console.log(data);
        refreshNotes();
    } catch (error) {
        console.log(error);
    }
}

function editNote(id) {
    let note = document.getElementById(id);
    note.innerHTML = "";
    note.insertAdjacentHTML("beforeend", EditField(id));
    
}

function EditField(id) {
    return `
    <input id="edit${id}" type="text">
    <button onclick="uploadEdit(${id})">save</button>
    `
}

async function uploadNote() {
    try {
        let noteField = document.getElementById("noteField");
        let noteText = noteField.value;
        noteField.value = "";
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: generateId(),
                text: noteText
            })
        })
        let data = await response.json();
        console.log(data);
        refreshNotes();
    } catch (error) {
        console.log(error);
    }
}

function refreshNotes() {
    loadPage(EmptyPage());
    getNotesFromServer();
}

function Note(id, text) {
    return `
    <div class="note" id="${id}">
    ${text}
    <button onclick="editNote(${id})">edit</button>
    <button onclick="deleteNote(${id})">delete</button>
    </div>
    `
}

function EmptyPage() {
    return `
    <div class="container">
    <h1>Notes Notes Notes</h1>
    <div>
    <input id="noteField" type="text" placeholder="write a note here">
    <button onclick="uploadNote()">save</button>
    </div>
    </br>
    </div>
    `
}

function loadPage(page) {
    let body = document.querySelector('body');
    if (body) {
        body.innerHTML = page;
    }
}

function appendNote(note) {
    let container = document.getElementsByClassName('container')[0];
    container.insertAdjacentHTML('beforeend', Note(note.id, note.text));
}

async function getNotesFromServer() {
    try {
        const response = await fetch("/api");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.statusText}`);
        }
        let data = await response.json();
        console.log(data);
        data.forEach(note => {
            appendNote(note);
        })
    } catch (error) {
        console.log(error);
    }
}

refreshNotes();