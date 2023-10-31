const plantManagerModuleTitle = document.getElementById('plant_manager_title');
const assistantModuleTitle = document.getElementById('assistant_title');
const gridContainer = document.querySelector('.dashboard');
const gptButton = document.getElementById('submit-button');
const automationModule = document.querySelector(
  '.dashbord__module--automation'
);
const plantManagerModule = document.querySelector(
  '.dashbord__module--plant-manager '
);
const assistantModule = document.querySelector('.dashbord__module--assistant');
const forecastModule = document.querySelector('.dashbord__module--forecast');
const toDoModule = document.querySelector('.dashbord__module--todolist');

let isPlantManagerToggled = false; // Variable to track the grid state

// Add a click event listener to the element
plantManagerModuleTitle.addEventListener('click', (event) => {
  // Toggle between the two grid templates
  if (isPlantManagerToggled) {
    plantManagerModule.style.gridRow = '';
    plantManagerModule.style.borderRadius = '';
    automationModule.style.display = 'flex';
  } else {
    plantManagerModule.style.gridRow = 'span 3';
    plantManagerModule.style.borderRadius = '100px 5px 5px 100px';
    automationModule.style.display = 'none';
  }

  isPlantManagerToggled = !isPlantManagerToggled; // Toggle the state
});

let isAssistantToggled = false; // Variable to track the grid state

// Add a click event listener to the element
assistantModuleTitle.addEventListener('click', (event) => {
  // Toggle between the two grid templates
  if (isAssistantToggled) {
    assistantModule.style.gridRow = '';
    assistantModule.style.gridColumn = '';
    assistantModule.style.borderRadius = '';
    forecastModule.style.display = 'flex';
    toDoModule.style.display = 'flex';
  } else {
    assistantModule.style.gridRow = 'span 2';
    assistantModule.style.gridColumn = 'span 2';
    assistantModule.style.borderRadius = '5px 5px 100px 5px';
    forecastModule.style.display = 'none';
    toDoModule.style.display = 'none';
  }

  isAssistantToggled = !isAssistantToggled; // Toggle the state
});
gptButton.addEventListener('click', (event) => {
  assistantModule.style.gridRow = 'span 2';
  assistantModule.style.gridColumn = 'span 2';
  assistantModule.style.borderRadius = '5px 5px 100px 5px';
  forecastModule.style.display = 'none';
  toDoModule.style.display = 'none';
});
