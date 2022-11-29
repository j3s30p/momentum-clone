const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TO_DOS_KEY = "todos";

let toDos = [];

function saveToDo() {
    localStorage.setItem(TO_DOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDo();
}

function paintToDo(newToDoObject) {
    const li = document.createElement("li");
    li.id = newToDoObject.id;
    const span = document.createElement("span");
    span.innerText = newToDoObject.text;
    const button = document.createElement("button");
    button.innerText = "𝘹";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    const newToDo = toDoInput.value;
    event.preventDefault();
    toDoInput.value = null;
    const newToDoObject = {
        id: Date.now(),
        text: newToDo,
    };
    toDos.push(newToDoObject);
    paintToDo(newToDoObject);
    saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TO_DOS_KEY);

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
