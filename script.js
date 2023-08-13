document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <span class="delete-button">Delete</span>
        `;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskList.appendChild(taskItem);
    });
});
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span class="delete-button">Delete</span>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";

        const deleteButton = taskItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
        });
    }
    saveTasksToLocalStorage();
});
taskList.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("task-checkbox")) {
        const taskItem = clickedElement.closest("li");
        taskItem.classList.toggle("completed");

        saveTasksToLocalStorage();
    }

    if (clickedElement.classList.contains("delete-button")) {
        const taskItem = clickedElement.closest("li");
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
    }
    if (clickedElement.classList.contains("edit-button")) {
        const taskItem = clickedElement.closest("li");
        const taskText = taskItem.querySelector("span");
        const editText = taskText.textContent;

        taskText.innerHTML = `
            <input type="text" class="edit-input" value="${editText}">
            <button class="save-button">Save</button>
        `;
    }
    if (clickedElement.classList.contains("save-button")) {
        const taskItem = clickedElement.closest("li");
        const editInput = taskItem.querySelector(".edit-input");
        const taskText = taskItem.querySelector("span");

        taskText.textContent = editInput.value;

        // Remove edit input and save button
        taskItem.removeChild(editInput);
        taskItem.removeChild(clickedElement);
    }
});

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("li");
    
    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector("span").innerText;
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
