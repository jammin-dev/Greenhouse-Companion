// Get references to the icon elements
const plantIcon = document.getElementById("plant-icon");
const sowIcon = document.getElementById("sow-icon");
const harvestIcon = document.getElementById("harvest-icon");
const createIcon = document.getElementById("create-icon");
const removeIcon = document.getElementById("remove-icon");
const deleteIcon = document.getElementById("delete-icon");
const plantManagerModule = document.querySelector(
    '.dashbord__module--plant-manager '
  );
const automationModule = document.querySelector(
    '.dashbord__module--automation'
  );
const backButtonElements = document.querySelectorAll('.return-button');

let isPlantManagerToggled = false;

// Add click event listeners to the icons
plantIcon.addEventListener("click", () => {
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

sowIcon.addEventListener("click", () => {
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

harvestIcon.addEventListener("click", () => {
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

createIcon.addEventListener("click", () => {
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

removeIcon.addEventListener("click", () => {
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

deleteIcon.addEventListener("click", () => {
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


// // Add a click event listener to the return button

// backButton.addEventListener('click', () => {
//     alert('click')

//       });
backButtonElements.forEach(backButton => {
        backButton.addEventListener('click', function() {
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
      });