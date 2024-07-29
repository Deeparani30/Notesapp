document.addEventListener("DOMContentLoaded", () => {
    const noteText = document.getElementById("noteText");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const notesList = document.getElementById("notesList");

    const editModal = document.getElementById("editModal");
    const editText = document.getElementById("editText");
    const updateNoteBtn = document.getElementById("updateNoteBtn");
    const closeBtn = document.querySelector(".close-btn");

    let editIndex = null;

    // Load notes from local storage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const noteItem = document.createElement("div");
            noteItem.classList.add("note-item");
            noteItem.innerHTML = `
                <p>${note}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            notesList.appendChild(noteItem);
        });
    };

    // Save a new note
    const saveNote = () => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        if (noteText.value.trim()) {
            notes.push(noteText.value.trim());
            localStorage.setItem("notes", JSON.stringify(notes));
            noteText.value = "";
            loadNotes();
        }
    };

    // Update a note
    const updateNote = () => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        if (editText.value.trim()) {
            notes[editIndex] = editText.value.trim();
            localStorage.setItem("notes", JSON.stringify(notes));
            editText.value = "";
            editModal.style.display = "none";
            loadNotes();
        }
    };

    // Delete a note
    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    };

    // Open edit modal
    const openEditModal = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        editText.value = notes[index];
        editIndex = index;
        editModal.style.display = "block";
    };

    // Event listeners
    addNoteBtn.addEventListener("click", saveNote);
    notesList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            deleteNote(index);
        } else if (e.target.classList.contains("edit-btn")) {
            const index = e.target.getAttribute("data-index");
            openEditModal(index);
        }
    });

    updateNoteBtn.addEventListener("click", updateNote);
    closeBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == editModal) {
            editModal.style.display = "none";
        }
    });

    // Initial load
    loadNotes();
});
