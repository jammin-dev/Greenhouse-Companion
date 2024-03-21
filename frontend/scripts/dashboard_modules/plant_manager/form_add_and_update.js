// Function to create and render the garden area form
function renderGardenAreaForm() {
  const formContainer = document.getElementById('form-add-garden-area');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form'; // Show the form initially

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <div class="garden_area-checkbox"><br>
        <input type="checkbox" id="add_or_update_garden_area" name="add_or_update_garden_area">
        <label for="add_or_update_garden_area">Check to update a garden area</label><br><br>
      </div>

      <div id="add-garden-area-form">
        <label for="garden_area_name">Garden Area Name :</label><br><br>
        <input class="garden-area-input" type="text" id="garden_area_name" name="garden_area_name"><br>
        <label for="garden_area_surface">Surface :</label><br><br>
        <input class="garden-area-input" type="number" id="garden_area_surface" name="garden_area_surface" step="0.1">
      </div>
      
      <div id="update-garden-area-form">
        <label for="update_garden_area">Select Garden Area :</label><br><br>
        <select id="update_garden_area" name="update_garden_area">
          <!-- Populate this select with existing garden areas -->
        </select><br><br>
        <label for="update_garden_area_name">New Name :</label><br><br>
        <input class="garden-area-input" type="text" id="update_garden_area_name" name="update_garden_area_name"><br>
        <label for="update_garden_area_surface">New Surface :</label><br><br>
        <input class="garden-area-input" type="number" id="update_garden_area_surface" name="update_garden_area_surface" step="0.1">
      </div>

      <button id="add-garden-area-button" type="submit">Add garden area</button>
      <button class="return-button">Back</button>
    </div>

    <div id="custom-popup3" class="popup3">
      <div class="popup-content3">
        <span id="popup-message3"></span>
        <button id="popup-ok-button3">OK</button>
      </div>
    </div>
    <div id="custom-popup4" class="popup4">
      <div class="popup-content4">
        <span id="popup-message4"></span>
        <button id="popup-ok-button4">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);

  // Get the elements related to the "Update Garden Area" form
  const updateGardenAreaForm = document.querySelector('#update-garden-area-form');

  // Hide the "Update Garden Area" form initially
  updateGardenAreaForm.style.display = 'none';

  // Get the elements related to the "Add Garden Area" form
  const addGardenAreaForm = document.querySelector('#add-garden-area-form');

  // Get the checkbox element
  const addOrUpdateGardenAreaCheckbox = document.querySelector('#add_or_update_garden_area');

  // Add an event listener to the checkbox
  addOrUpdateGardenAreaCheckbox.addEventListener('change', function () {
    const labelForAddOrUpdate = document.querySelector('label[for="add_or_update_garden_area"]');

    if (addOrUpdateGardenAreaCheckbox.checked) {
      // Checked, show the "Update Garden Area" form and hide the "Add Garden Area" form
      updateGardenAreaForm.style.display = 'block';
      addGardenAreaForm.style.display = 'none';
      labelForAddOrUpdate.textContent = 'Uncheck to add a new garden area';
    } else {
      // Unchecked, show the "Add Garden Area" form and hide the "Update Garden Area" form
      updateGardenAreaForm.style.display = 'none';
      addGardenAreaForm.style.display = 'block';
      labelForAddOrUpdate.textContent = 'Check to update a garden area';
    }

    // Update the button label based on the checkbox state
    const submitButton = document.querySelector('#add-garden-area-button');
    submitButton.textContent = addOrUpdateGardenAreaCheckbox.checked ? 'Update Garden Area' : 'Add Garden Area';
  });
}

// Call the renderGardenAreaForm function to render the garden area form
renderGardenAreaForm();


// Get the "Submit" button by its ID
const submitButton = document.querySelector('#add-garden-area-button');

// Add a click event listener to the button
submitButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission

  const addOrUpdateGardenAreaCheckbox = document.querySelector('#add_or_update_garden_area');

  if (addOrUpdateGardenAreaCheckbox.checked) {
    // Handle the update logic
    updateGardenArea();
  } else {
    // Handle the add logic
    addGardenArea();
  }
});

// Function to add a new garden area
function addGardenArea() {
  const gardenAreaName = document.querySelector('#garden_area_name').value;
  const gardenAreaSurface = document.querySelector('#garden_area_surface').value;

  // Rest of your code to construct formData for the new garden area
  const formData = {
    'name': gardenAreaName,
    'surface': parseFloat(gardenAreaSurface),
  };

  console.log(formData);
  // Send a POST request to your server to add the garden area
  sendPostRequestAddGardenArea(formData);
}

// Function to update an existing garden area
function updateGardenArea() {
  const selectedGardenArea = document.querySelector('#update_garden_area').value;
  const updatedName = document.querySelector('#update_garden_area_name').value;
  const updatedSurface = document.querySelector('#update_garden_area_surface').value;

  // Rest of your code to construct formData for updating the garden area
  const formData = {
    'name': updatedName,
    'surface': parseFloat(updatedSurface),
  };

  console.log(formData);
  // Send a PUT request to your server to update the garden area
  sendPutRequestUpdateGardenArea(selectedGardenArea, formData);
}

// Function to fetch existing garden areas
function fetchExistingGardenAreas() {
  // Define the URL to fetch existing garden areas
  const existingGardenAreasUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas'; // Replace with your server URL
  const sowGardenAreaId = '64722a61-55a2-47ef-af3c-f05634b2b862';

  fetch(existingGardenAreasUrl)
    .then((response) => response.json())
    .then((data) => {
      const updateGardenAreaSelect = document.querySelector('#update_garden_area');

      // Clear existing options in the select element
      updateGardenAreaSelect.innerHTML = '';

      // Loop through the existing garden areas and create options
      data.forEach((gardenArea) => {
        if (gardenArea.id !== sowGardenAreaId) {
          const option = document.createElement('option');
          option.value = gardenArea.id;
          option.textContent = gardenArea.name;
          updateGardenAreaSelect.appendChild(option);
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching existing garden areas:', error);
    });
}

// Call the fetchExistingGardenAreas function to populate the select with existing garden areas
fetchExistingGardenAreas();


// Function to send a POST request for adding a new garden area
function sendPostRequestAddGardenArea(formData) {
  // Define your server URL for adding a garden area
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas'; // Replace with the correct URL
  // Define the request options
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type as JSON
    },
    body: JSON.stringify(formData), // Convert the form data to JSON
  };

  // Send the POST request
  fetch(serverUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server here (e.g., show a success message)
      showSuccessMessageGardenArea(data);

      // Optionally, you can clear the form or perform other actions
      // clearFormGardenArea();
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
      // Handle errors here (e.g., show an error message)
    });
}


// Function to send a PUT request for updating a garden area
function sendPutRequestUpdateGardenArea(selectedGardenArea, formData) {

  // Define your server URL for updating a garden area with the selected ID
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas/' + selectedGardenArea;


  // Define the request options
  const requestOptions = {
    method: 'PUT', // Use the PUT method for updates
    headers: {
      'Content-Type': 'application/json', // Set the content type as JSON
    },
    body: JSON.stringify(formData), // Convert the form data to JSON
  };

  // Send the PUT request
  fetch(serverUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server here (e.g., show a success message)
      showSuccessMessageGardenAreaUpdate(data);

      // Optionally, you can clear the form or perform other actions
      // clearFormGardenAreaUpdate();
    })
    .catch((error) => {
      console.error('Error sending PUT request:', error);
      // Handle errors here (e.g., show an error message)
    });
}

function showSuccessMessageGardenArea(data) {
  const popup = document.getElementById('custom-popup3');
  const messageElementbis = document.getElementById('popup-message3');
  const okButton = document.getElementById('popup-ok-button3');

  if (!isNaN(data.surface)) {
    // Success: Vegetable was created
    messageElementbis.textContent = `Congratulations, new garden area '${data.name}' added!`;
  } else {
    // Error: Quantity needs to be a number
    messageElementbis.textContent = 'Error ! Surface needs to be a number.';
    okButton.style.backgroundColor = 'red';
  }

  if (data.surface <= 0) {
    messageElementbis.textContent = 'Error ! Surface needs to be a positive number.';
    okButton.style.backgroundColor = 'red';
  }

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

// Function to show a success message popup for updating a garden area
function showSuccessMessageGardenAreaUpdate(data) {
  const popup = document.getElementById('custom-popup4');
  const messageElement = document.getElementById('popup-message4');
  const okButton = document.getElementById('popup-ok-button4');

  if (!isNaN(data.surface)) {
    // Success: Vegetable was created
    messageElement.textContent = `Congratulations, garden area '${data.name}' updated!`;
  } else {
    // Error: Quantity needs to be a number
    messageElement.textContent = 'Error ! Surface needs to be a number.';
    okButton.style.backgroundColor = 'red';
  }

  if (data.surface <= 0) {
    messageElement.textContent = 'Error ! Surface needs to be a positive number.';
    okButton.style.backgroundColor = 'red';
  }

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}