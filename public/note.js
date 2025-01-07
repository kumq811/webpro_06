"use strict";

const NoteApp = (() => {
    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const colorInput = document.getElementById('note-color');
    const noteList = document.getElementById('note-list');

    // 内部状態を保持
    const state = {
        notes: []
    };

    // メモのレンダリング
    const renderNotes = () => {
        noteList.innerHTML = ''; // リストをクリア
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

    // メモの保存
    const saveNote = (title, content, color) => {
        state.notes.push({ title, content, color });
        renderNotes();
    };

    // メモの削除
    const deleteNote = (index) => {
        state.notes.splice(index, 1);
        renderNotes();
    };

    // メモの編集
    const editNote = (index) => {
        const note = state.notes[index];
        titleInput.value = note.title;
        contentInput.value = note.content;
        colorInput.value = note.color;
        deleteNote(index); // 編集中のメモを一旦削除
    };

    // フォーム送信イベントの処理
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const color = colorInput.value;

        if (title && content) {
            saveNote(title, content, color);
            titleInput.value = '';
            contentInput.value = '';
            colorInput.value = '#ffffff'; // 初期色にリセット
        }
    };

    // リストクリックイベントの処理
    const handleListClick = (event) => {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('delete-button')) {
            deleteNote(index);
        } else if (target.classList.contains('edit-button')) {
            editNote(index);
        }
    };

    // イベントリスナーの設定
    form.addEventListener('submit', handleFormSubmit);
    noteList.addEventListener('click', handleListClick);

    // 初期化処理
    const init = () => {
        renderNotes(); 
    };

    return { init };
})();

// アプリケーションの初期化
NoteApp.init();
