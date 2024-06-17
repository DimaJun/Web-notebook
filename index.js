window.addEventListener("DOMContentLoaded", () => {
  let texts = ["text1", "text2", "text3"];

  const notesList = document.querySelector("#notes");

  const createNoteBtn = document.querySelector("button#create");
  const saveNoteBtn = document.querySelector("#save");

  const userTextarea = document.querySelector("#text textarea");
  const successDelete = document.querySelector("#success-delete");

  //Рендер списка записок
  function renderNotesLinks(arr, notesList) {
    arr.forEach((_item, index) => {
      let li = document.createElement("li");
      li.setAttribute("data-key", index + 1);
      let open = document.createElement("span");
      open.textContent = `запись ${index + 1}`;
      open.classList.add("open");
      let remove = document.createElement("span");
      remove.textContent = " X";
      remove.classList.add("remove");

      li.addEventListener("click", (e) => {
        let target = e.target;
        if (target.tagName === "SPAN" && target.classList.contains("open")) {
          killActiveLinks();
          setActiveLink(li);
          showNoteText(li.getAttribute("data-key"));
        } else if (
          target.tagName === "SPAN" &&
          target.classList.contains("remove")
        ) {
          deleteNote(li.getAttribute("data-key"));
          successDelete.style.color = "green";
          successDelete.textContent = "Записка успешно удалена!";
          setTimeout(() => (successDelete.textContent = ""), 1000);
        }
      });

      li.appendChild(open);
      li.appendChild(remove);
      notesList.appendChild(li);
    });
  }

  // init-вызов, для начального UI
  renderNotesLinks(texts, notesList);

  //Создать записку, перерендерить список
  function createNote(arr, text) {
    if (text == null || text == "") {
      text = "some text..";
    }
    arr.push(text);
    notesList.innerHTML = "";
    renderNotesLinks(texts, notesList);
  }

  //Добавляем класс .active активной ссылке
  function setActiveLink(linkItem) {
    linkItem.classList.add("active");
  }

  //Чистим класс .active у всех ссылок на записки
  function killActiveLinks() {
    let linksList = document.querySelectorAll("[data-key]");
    linksList.forEach((link) => {
      link.classList.remove("active");
    });
  }

  //Показать текст записки
  function showNoteText(noteLinkKey) {
    userTextarea.value = texts[noteLinkKey - 1];
  }

  //Сохраняем измененный текст для n-Записки
  function saveNoteText(noteKey, newText) {
    texts[noteKey - 1] = newText;
    killActiveLinks();
    userTextarea.value = "";
  }

  //Удаляем запись по клику
  function deleteNote(noteKey) {
    texts.splice(noteKey - 1, 1);
    let deleteItem = document.querySelector(`[data-key="${noteKey}"]`);
    deleteItem.remove();
    notesList.innerHTML = "";
    renderNotesLinks(texts, notesList);
  }

  //Обработчик события для кнопки создания записки
  createNoteBtn.addEventListener("click", () => {
    createNote(texts, userTextarea.value);
    userTextarea.value = "";
    console.log(texts);
  });

  //Обработчик события для кнопки сохранения изменений записки
  saveNoteBtn.addEventListener("click", () => {
    let activeBtnKey = document
      .querySelector(".active[data-key]")
      .getAttribute("data-key");
    saveNoteText(activeBtnKey, userTextarea.value);
    console.log(texts);
  });
});
