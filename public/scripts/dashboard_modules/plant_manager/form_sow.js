// Function to create and render the sow form
function renderSowForm() {
  const formContainer = document.getElementById('form-sow');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <label for="name_sow">Name :</label>
      <select id="name_sow" name="name_sow">
      </select>
      <div class="form_quantity">
        <label for="quantity_sow">Quantity :</label>
        <input type="number" id="quantity_sow" name="quantity_sow" value="1">
      </div>
      <div class="form_garden_area">
        <label for="garden_area_sow">Garden Area :</label>
        <select id="garden_area_sow" name="garden_area_sow">
        </select>
      </div>
      <div class="form_sowing_date">
        <label for="sowing_date">Sowing Date :</label>
        <input type="date" id="sowing_date" name="sowing_date">
      </div>
      <button id="add-vegetable-button-sow" type="submit">Add Vegetable</button>
      <button class="return-button">retour</button>
    </div>
    <div id="custom-popup1" class="popup1">
      <div class="popup-content1">
        <span id="popup-message1">Congratulations, vegetable sowed !</span>
        <button id="popup-ok-button1">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);
}

// Call the renderForm function to render the form
renderSowForm();

  // Get the "Add Vegetable" button by its ID
const addButtonSow = document.querySelector('#add-vegetable-button-sow');

// Add a click event listener to the button
addButtonSow.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission

// Retrieve the quantity value within the event handler
const quantity = document.querySelector('#quantity_sow').value;
const selectedNameOption = document.querySelector('#name_sow option:checked');
const selectedName = selectedNameOption ? selectedNameOption.textContent : '';
const sowingDate = document.querySelector('#sowing_date').value;

// Rest of your code to construct formData
const formData = {
  'name': selectedName,
  'quantity': quantity,
  'area_id': document.querySelector('#garden_area_sow').value,
  'sowed': true,
  'planted': false,
  'sowing_date': sowingDate,
};

  console.log('Form data:', formData);
  // Send a POST request to your server
  sendPostRequestSow(formData);
});

  // // Function to get the current date in YYYY-MM-DD format
  // function getCurrentDate() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0');
  //   const day = String(today.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

// Function to send a POST request
function sendPostRequestSow(formData) {
  // Define your server URL
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

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
      console.log('data:', data)
      // Handle the response from the server here (e.g., show a success message)
      showSuccessMessage1(data);
      // console.log('Response from server:', data);

      // Optionally, you can clear the form or perform other actions
      clearFormSow();
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
      // Handle errors here (e.g., show an error message)
    });
}

// Function to clear the form after submission
function clearFormSow() {
  document.querySelector('#name_sow').value = '';
  document.querySelector('#quantity_sow').value = '0';
  document.querySelector('#garden_area_sow').value = '';
}

// Function to fetch garden area data from the API
function fetchGardenAreas() {

  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for garden areas
      const gardenAreaSelect = document.querySelector('#garden_area_sow');

      // Loop through the garden area data and create options
      data.forEach((gardenArea) => {
        const option = document.createElement('option');
        option.value = gardenArea.id; // Set the value to the garden area ID
        option.textContent = gardenArea.name; // Set the text content to the garden area name
        gardenAreaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching garden area data:', error);
    });
}

// Call the fetchGardenAreas function to populate the selection
fetchGardenAreas();

// Function to fetch vegetable names from the API
function fetchVegetableNames() {
  // Replace with the URL of your API endpoint that provides vegetable names
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for vegetable names
      const nameSelect = document.querySelector('#name_sow');

      // Loop through the vegetable names data and create options
      data.forEach((vegetable) => {
        const option = document.createElement('option');
        option.value = vegetable.id; // Set the value to the vegetable ID
        option.textContent = vegetable.name; // Set the text content to the vegetable name
        nameSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching vegetable names:', error);
    });
}

fetchVegetableNames();

function showSuccessMessage1(data) {
  const popup = document.getElementById('custom-popup1');
  const message = document.getElementById('popup-message1');
  const okButton = document.getElementById('popup-ok-button1');

  if (!isNaN(data.quantity)) {
    // Success: Vegetable was created
    message.textContent = `Congratulations, ${data.name} sowed!`;
  } else {
    // Error: Quantity needs to be a number
    message.textContent = 'Error ! Quantity needs to be a number.';
    okButton.style.backgroundColor = 'red';
  }

  if (data.quantity < 1) {
    message.textContent = 'Error ! Quantity needs to be a positive number.';
    okButton.style.backgroundColor = 'red';
  }

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
    // Optionally, you can navigate or perform other actions here.
  });
}
