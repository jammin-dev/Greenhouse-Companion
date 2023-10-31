const addTask = document.getElementById('addTask');
const urlTodo = 'https://walrus-app-jbfmz.ondigitalocean.app/todo';
const toDoContainer = document.getElementById('toDoContainer');

addTask.addEventListener('click', async function () {
  const userInput = window.prompt('Enter a new task:');
  if (userInput !== null) {
    try {
      const response = await fetch(urlTodo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the successful addition of the task, if needed.
      while (toDoContainer.firstChild) {
        toDoContainer.removeChild(toDoContainer.firstChild);
      }
      displayToDo();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
});

async function fetchToDo() {
  try {
    const response = await fetch(urlTodo);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const allTasks = await response.json();
    return allTasks;
  } catch (error) {
    console.error('Error fetching ToDo List:', error);
    return []; // Return an empty array in case of an error.
  }
}

async function displayToDo() {
  const allTasks = await fetchToDo();

  if (allTasks.length > 0) {
    allTasks.forEach((element) => {
      // Create a task container
      const task = document.createElement('div');
      task.className = 'task';

      // Create a label
      const label = document.createElement('label');

      // Create an input element for the checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = element.complete; // Set checkbox state based on completion status

      // Add a change event listener to update completion status
      checkbox.addEventListener('change', function () {
        const taskId = element.id;
        const newCompletionStatus = this.checked;
        updateCompletionStatus(taskId, newCompletionStatus);
      });

      // Create a text node with the task description
      const text = document.createTextNode(element.task);

      // Create a button for deletion
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.setAttribute('data-task-id', element.id);

      // Add a click event listener to the delete button
      deleteButton.addEventListener('click', function () {
        const taskId = this.getAttribute('data-task-id');
        deleteTask(taskId);
      });

      // Append elements to the label
      label.appendChild(checkbox);
      label.appendChild(text);

      // Append the label and delete button to the task container
      task.appendChild(label);
      task.appendChild(deleteButton);

      // Append the task container to the toDoContainer
      toDoContainer.appendChild(task);
    });
  } else {
    // Handle the case when there are no tasks or an error occurred.
  }
}

// Call displayToDo to initiate the process
displayToDo();

async function deleteTask(taskId) {
  try {
    const deleteResponse = await fetch(`${urlTodo}/${taskId}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
    }
    updateTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}

// Function to update the displayed tasks
async function updateTasks() {
  while (toDoContainer.firstChild) {
    toDoContainer.removeChild(toDoContainer.firstChild);
  }
  displayToDo();
}

async function updateCompletionStatus(taskId, newCompletionStatus) {
  try {
    const updateResponse = await fetch(`${urlTodo}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ complete: newCompletionStatus }),
    });

    if (!updateResponse.ok) {
      throw new Error(`HTTP error! Status: ${updateResponse.status}`);
    }

    // You can update the UI or perform other actions upon a successful update if needed.
  } catch (error) {
    console.error('Error updating completion status:', error);
  }
}
