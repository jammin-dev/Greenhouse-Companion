const plantManagerModuleTitle = document.getElementById('plant_manager_title');
const gridContainer = document.querySelector('.dashboard');

// Define two different grid templates
const originalGridTemplateAreas = `
  'plant-manager air-sensors recommandations'
  'plant-manager automation todolist'
  'plant-manager forecast todolist'
`;

const alternateGridTemplateAreas = `
'plant-manager air-sensors recommandations'
'plant-manager automation todolist'
'forecast forecast todolist'
`;

let isGridToggled = false; // Variable to track the grid state

// Add a click event listener to the element
plantManagerModuleTitle.addEventListener('click', (event) => {
  // Toggle between the two grid templates
  if (isGridToggled) {
    gridContainer.style.gridTemplateAreas = originalGridTemplateAreas;
  } else {
    gridContainer.style.gridTemplateAreas = alternateGridTemplateAreas;
  }

  isGridToggled = !isGridToggled; // Toggle the state
});
