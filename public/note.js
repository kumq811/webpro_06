"use strict";

const NoteApp = (() => {
    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const colorInput = document.getElementById('note-color');
    const noteList = document.getElementById('note-list');

    const state = {
        notes: []
    };

    const renderNotes = () => {
        noteList.innerHTML = '';
        state.notes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.style.backgroundColor = note.color;
            listItem.className = 'note-item';

            listItem.innerHTML = `
                <div>
                    <strong>${note.title}</strong>: ${note.content}
                </div>
                <div class="note-actions">
                    <button data-index="${index}" class="edit-button">編集</button>
                    <button data-index="${index}" class="delete-button">削除</button>
                </div>
            `;
            noteList.appendChild(listItem);
        });
    };

    const saveNote = (title, content, color) => {
        const newNote = { title, content, color };
        state.notes.push(newNote);
        renderNotes();
        
        
        fetch('/save-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Note saved:', data);
        })
        .catch(error => {
            console.error('Error saving note:', error);
        });
    };

    const deleteNote = (index) => {
        state.notes.splice(index, 1);
        renderNotes();
    };

    const editNote = (index) => {
        const note = state.notes[index];
        titleInput.value = note.title;
        contentInput.value = note.content;
        colorInput.value = note.color;
        deleteNote(index);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const color = colorInput.value;

        if (title && content) {
            saveNote(title, content, color);
            titleInput.value = '';
            contentInput.value = '';
            colorInput.value = '#ffffff';
        }
    };

    const handleListClick = (event) => {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('delete-button')) {
            deleteNote(index);
        } else if (target.classList.contains('edit-button')) {
            editNote(index);
        }
    };

    form.addEventListener('submit', handleFormSubmit);
    noteList.addEventListener('click', handleListClick);

    const init = () => {
        renderNotes(); 
    };

    return { init };
})();

NoteApp.init();
