let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let tasks = [];

function goToFirstPage1(){
    window.location.href="index.html";
}

function startTimer() {
    const taskInput = document.getElementById("taskInput").value.trim();
    if (taskInput === "") {
        alert("Please enter a task description.");
        return;
    }
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    clearInterval(timerInterval);
    storeTask();
    resetTimer();
    displayTasks();
}

function storeTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const time = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    const currentDate = new Date().toLocaleDateString();
    tasks.push({ description: taskInput, time: time, date: currentDate });
    document.getElementById("taskInput").value = "";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <div class="task-info">
                <div class="task-description">${task.description}</div>
                <div class="task-date">${task.date}</div>
                <div class="task-time">${task.time}</div>
            </div>
            <span class="delete-icon" onclick="deleteTask(${index})">&#10006;</span>
        `;
        taskList.appendChild(taskItem);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function resetTimer() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("timer").textContent = "00:00:00";
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    document.getElementById("timer").textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}