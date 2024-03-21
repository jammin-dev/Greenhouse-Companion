// Function to create and render the delete vegetable and garden area form
function renderDeleteForm() {
  const formContainer = document.getElementById('form-delete');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements for deleting vegetables
  form.innerHTML = `
    <div class="form_line1">
      <div class="delete-options"><br><br>
        <input type="radio" id="delete-vegetable-option" name="delete-option" value="vegetable" checked>
        <label for="delete-vegetable-option">Delete Vegetable</label>
        <input type="radio" id="delete-garden-area-option" name="delete-option" value="garden-area">
        <label for="delete-garden-area-option">Delete Garden Area</label>
      </div><br>

      <div id="delete-vegetable-form">
        <label for="vegetable_to_delete">Select Vegetable to Delete :</label><br><br>
        <select id="vegetable_to_delete" name="vegetable_to_delete">
          <!-- Populate this select with existing vegetables -->
        </select>
        <button id="delete-vegetable-button" type="submit">Delete Vegetable</button>
      </div>

      <div id="delete-garden-area-form">
        <label for="garden_area_to_delete">Select Garden Area to Delete :</label><br><br>
        <select id="garden_area_to_delete" name="garden_area_to_delete">
          <!-- Populate this select with existing garden areas -->
        </select><br>
        <button id="delete-garden-area-button" type="submit">Delete Garden Area</button>
      </div>
      <button class="return-button">Back</button>
      <button class="hidden" id="delete-button" type="submit">Delete</button>
    </div>

    <div id="custom-popup5" class="popup5">
      <div class="popup-content5">
        <span id="popup-message5"></span>
        <button id="popup-ok-button5">OK</button>
      </div>
    </div>
    <div id="custom-popup6" class="popup6">
      <div class="popup-content6">
        <span id="popup-message6"></span>
        <button id="popup-ok-button6">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);

  const deleteGardenAreaForm = document.querySelector('#delete-garden-area-form');
  deleteGardenAreaForm.style.display = 'none';
  // Get the elements related to the "Delete Vegetable" form and "Delete Garden Area" form
  const deleteVegetableForm = document.querySelector('#delete-vegetable-form');

  // Get the elements related to the radio buttons for selecting the delete option
  const deleteVegetableOption = document.querySelector('#delete-vegetable-option');
  const deleteGardenAreaOption = document.querySelector('#delete-garden-area-option');

  // Get the "Delete" button
  const deleteButton = document.querySelector('#delete-button');

  // Add an event listener to the radio buttons
  deleteVegetableOption.addEventListener('change', function () {
    // Show the "Delete Vegetable" form and hide the "Delete Garden Area" form
    deleteVegetableForm.style.display = 'block';
    deleteGardenAreaForm.style.display = 'none';
  });

  deleteGardenAreaOption.addEventListener('change', function () {
    // Show the "Delete Garden Area" form and hide the "Delete Vegetable" form
    deleteVegetableForm.style.display = 'none';
    deleteGardenAreaForm.style.display = 'block';
  });

  // Add an event listener to the "Delete" button
  deleteButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission
    handleDeleteAction();
  });
}

// Call the renderDeleteForm function to render the delete form
renderDeleteForm();

// Get the "Delete Vegetable" button by its ID
const deleteVegetableButton = document.querySelector('#delete-vegetable-button');

// Add a click event listener to the button
deleteVegetableButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission
  deleteVegetable();
});

// Get the "Delete Garden Area" button by its ID
const deleteGardenAreaButton = document.querySelector('#delete-garden-area-button');

// Add a click event listener to the button
deleteGardenAreaButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission
  deleteGardenArea();
});

// Function to fetch existing garden areas
function fetchExistingGardenAreas() {
  // Define the URL to fetch existing garden areas
  const existingGardenAreasUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas';

  fetch(existingGardenAreasUrl)
    .then((response) => response.json())
    .then((data) => {
      const updateGardenAreaSelect = document.querySelector('#garden_area_to_delete');

      // Clear existing options in the select element
      updateGardenAreaSelect.innerHTML = '';

      // Loop through the existing garden areas and create options
      data.forEach((gardenArea) => {
        const option = document.createElement('option');
        option.value = gardenArea.id;
        option.textContent = gardenArea.name;
        updateGardenAreaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching existing garden areas:', error);
    });
}

// Call the fetchExistingGardenAreas function to populate the select with existing garden areas
fetchExistingGardenAreas();

// Function to fetch vegetable names from the API
function fetchVegetableNames() {
  // Replace with the URL of your API endpoint that provides vegetable names
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for vegetable names
      const nameSelect = document.querySelector('#vegetable_to_delete');

      const gardenAreaData = {};

      // Fetch garden areas data
      return fetch('https://walrus-app-jbfmz.ondigitalocean.app/areas')
        .then((response) => response.json())
        .then((areasData) => {
          // Create a lookup object for garden area names
          areasData.forEach((gardenArea) => {
            gardenAreaData[gardenArea.id] = gardenArea.name;
          });

          // Loop through the vegetable data and create options
          data.forEach((vegetable) => {
            const areaName = gardenAreaData[vegetable.area_id] || 'Unknown Area';

            // Create an option with the vegetable name and area name
            const option = document.createElement('option');
            option.value = vegetable.id; // Set the value to the vegetable ID
            option.textContent = `${vegetable.name} (${areaName})`; // Set the text content to the vegetable name and area name
            nameSelect.appendChild(option);
          });
      });
    })
    .catch((error) => {
      console.error('Error fetching vegetable names:', error);
    });
}

fetchVegetableNames();


// Function to handle the delete action based on the selected radio button
function handleDeleteAction() {
  const selectedOption = document.querySelector('input[name="delete-option"]:checked');

  if (selectedOption) {
    if (selectedOption.value === 'vegetable') {
      // Handle the "Delete Vegetable" action
      deleteVegetable();
    } else if (selectedOption.value === 'garden-area') {
      // Handle the "Delete Garden Area" action
      deleteGardenArea();
    }
  } else {
    // No action selected
    // You can show an error message or handle it as needed
  }
}

// Function to delete a vegetable
function deleteVegetable() {
  const selectedVegetable = document.querySelector('#vegetable_to_delete').value;

  // Rest of your code to send a DELETE request for deleting the vegetable
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager/' + selectedVegetable;

  // Define the request options
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // Set the content type as JSON
    },
  };

  // Send the DELETE request
  fetch(serverUrl, requestOptions)
    .then((response) => {
      if (response.ok) {
        // Successfully deleted
        showSuccessMessageDeleteVegetable();
      }
    })
    .catch((error) => {
      console.error('Error sending DELETE request:', error);
    });
}

// Function to delete a garden area
function deleteGardenArea() {
  const selectedGardenArea = document.querySelector('#garden_area_to_delete').value;

  // Rest of your code to send a DELETE request for deleting the garden area
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas' + selectedGardenArea;

  // Define the request options
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // Set the content type as JSON
    },
  };

  // Send the DELETE request
  fetch(serverUrl, requestOptions)
    .then((response) => {
      if (response.ok) {
        // Successfully deleted
        showSuccessMessageDeleteArea();
      }
    })
    .catch((error) => {
      console.error('Error sending DELETE request:', error);
    });
}

// Function to show a success message for deleting a vegetable
function showSuccessMessageDeleteVegetable() {
  const popup = document.getElementById('custom-popup5');
  const messageElement = document.getElementById('popup-message5');
  const okButton = document.getElementById('popup-ok-button5');

  // Success message
  messageElement.textContent = `Congratulations, vegetable  deleted!`;

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

// Function to show a success message for deleting a garden area
function showSuccessMessageDeleteArea() {
  const popup = document.getElementById('custom-popup6');
  const messageElement = document.getElementById('popup-message6');
  const okButton = document.getElementById('popup-ok-button6');

  // Success message
  messageElement.textContent = `Congratulations, garden area  deleted !`;

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}