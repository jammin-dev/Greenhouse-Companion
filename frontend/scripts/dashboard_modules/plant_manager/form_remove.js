// Function to create and render the remove vegetable form
function renderRemoveForm() {
  const formContainer = document.getElementById('form-remove');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements for removing vegetables
  form.innerHTML = `
    <div class="form_line1">
    <br><br>
      <div id="remove-vegetable-form">
        <label for="vegetable_to_remove">Select Vegetable to Remove :</label>
        <select id="vegetable_to_remove" name="vegetable_to_remove">
          <!-- Populate this select with existing planted vegetables -->
        </select>
        <label for="remove-date">Select Removal Date:</label>
        <input type="date" id="remove-date" name="remove-date">
        <button id="remove-button" type="submit">Remove Vegetable</button>
        <button class="return-button">Back</button>
      </div>
    </div>

    <div id="custom-popup7" class="popup7">
      <div class="popup-content7">
        <span id="popup-message7"></span>
        <button id="popup-ok-button7">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);

  // Get the elements related to the "Remove Vegetable" form
  const removeVegetableForm = form.querySelector('#remove-vegetable-form');

  // Get the "Remove" button
  const removeButton = form.querySelector('#remove-button');

  // Add an event listener to the "Remove" button
  removeButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission
    removeVegetable(); // Call the function to remove the vegetable
  });
}

// Call the renderRemoveForm function to render the remove form
renderRemoveForm();

// Function to fetch vegetable names from the API
function fetchVegetableNames() {
  // Replace with the URL of your API endpoint that provides vegetable names
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for vegetable names
      const nameSelect = document.querySelector('#vegetable_to_remove');

      const gardenAreaData = {};

      // Fetch garden areas data
      return fetch('https://walrus-app-jbfmz.ondigitalocean.app/areas')
        .then((response) => response.json())
        .then((areasData) => {
          // Create a lookup object for garden area names
          areasData.forEach((gardenArea) => {
            gardenAreaData[gardenArea.id] = gardenArea.name;
          });

          // Filter out vegetables with a remove_date
          const filteredVegetables = data.filter((vegetable) => !vegetable.remove_date);

          // Loop through the filtered vegetable data and create options
          filteredVegetables.forEach((vegetable) => {
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

// Function to remove a vegetable (set remove_date)
function removeVegetable() {
  const selectedVegetable = document.querySelector('#vegetable_to_remove').value;
  const removeDate = document.querySelector('#remove-date').value;

  // Rest of your code to send a PUT request for removing the vegetable
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager/' + selectedVegetable;

  // Define the request options
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // Set the content type as JSON
    },
    body: JSON.stringify({ remove_date: removeDate }) // Replace with your logic to set the remove date
  };

  // Send the PUT request
  fetch(serverUrl, requestOptions)
    .then((response) => {
      if (response.ok) {
        // Successfully removed the vegetable
        showSuccessMessageRemoveVegetable();
      }
    })
    .catch((error) => {
      console.error('Error sending PUT request:', error);
    });
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('remove-date').value = getCurrentDate();


function showSuccessMessageRemoveVegetable() {
  const popup = document.getElementById('custom-popup7');
  const messageElement = document.getElementById('popup-message7');
  const okButton = document.getElementById('popup-ok-button7');

  // Success message
  messageElement.textContent = `Congratulations, vegetable  removed!`;

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}
