// Task List Array
let tasks = [];

// Function to add a task
function addTask(event) {
    event.preventDefault(); // Prevent form from refreshing page

    // Get form values
    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const status = document.querySelector('input[name="task-status"]:checked').value;

    // Create task object
    const task = {
        id: Date.now(), // Unique ID
        title: title,
        priority: priority,
        status: status
    };

    // Add task to array
    tasks.push(task);

    // Update the DOM
    displayTasks();

    // Clear input fields
    document.getElementById("task-form").reset();
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear previous items

    tasks.forEach(task => {
        // Create list item
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
            <span class="${task.status === 'completed' ? 'completed' : ''}">
                ${task.title} (${task.priority})
            </span>
            <div>
                <button class="btn-complete" onclick="markComplete(${task.id})">✔</button>
                <button class="btn-delete" onclick="removeTask(${task.id})">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Function to remove a task
function removeTask(taskId) {
    // Filter out the task from the array
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks(); // Refresh UI
}

// Function to mark a task as complete
function markComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = "completed";
        }
        return task;
    });

    displayTasks(); // Refresh UI
}

// Register form submit event
document.getElementById("task-form").addEventListener("submit", addTask);
