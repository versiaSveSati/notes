const noteList = document.getElementById("note-list");
        const noteText = document.getElementById("note-text");

        // Получение заметок из локального хранилища
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        // Функция для добавления заметки
        function addNote() {
            const text = noteText.value.trim();
            if (text === "") return;

            const note = { text, date: new Date().toLocaleString() };
            savedNotes.push(note);
            localStorage.setItem("notes", JSON.stringify(savedNotes));

            noteText.value = "";
            displayNotes();
        }

        // Функция для отображения заметок
        function displayNotes() {
            noteList.innerHTML = "";
            savedNotes.forEach((note, index) => {
                const noteElement = document.createElement("div");
                noteElement.innerHTML = `<p>${note.text}</p><small>${note.date}</small>`;
                noteElement.innerHTML += `<button onclick="deleteNote(${index})">Удалить</button>`;
                noteList.appendChild(noteElement);
            });
        }

            // Функция для обработки нажатия клавиши "Enter" в поле ввода заметки
    function handleEnter(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          addNote();
      }
  }

        // Функция для удаления заметки
        function deleteNote(index) {
            savedNotes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            displayNotes();
        }

        displayNotes();


      //Функция добавления кнопки редактирования
        function displayNotes() {
          noteList.innerHTML = "";
          savedNotes.forEach((note, index) => {
              const noteElement = document.createElement("div");
              noteElement.innerHTML = `<p>${note.text}</p><small>${note.date}</small>`;
              noteElement.innerHTML += `<button onclick="editNote(${index})">Редактировать</button>`;
              noteElement.innerHTML += `<button onclick="deleteNote(${index})">Удалить</button>`;
              noteList.appendChild(noteElement);
          });
      }

      //Функция редактирования
      function editNote(index) {
        const editedNote = prompt("Отредактируйте заметку:", savedNotes[index].text);
        if (editedNote !== null) {
            savedNotes[index].text = editedNote;
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            displayNotes();
        }
    }