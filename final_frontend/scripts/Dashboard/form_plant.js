// Function to create and render the sow form
function renderPlantForm() {
  const formContainer = document.getElementById('form-plant');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <label for="name_plant">Name:</label>
      <select id="name_plant" name="name_plant">
      </select>
      <div class="form_quantity">
        <label for="quantity_plant">Quantity:</label>
        <input type="number" id="quantity_plant" name="quantity_plant" value="1">
      </div>
      <div class="form_garden_area">
        <label for="garden_area_plant">Garden Area:</label>
        <select id="garden_area_plant" name="garden_area_plant">
        </select>
      </div>
      <div class="form_planting_date">
        <label for="planting_date">Planting Date:</label>
        <input type="date" id="planting_date" name="planting_date" value="${getCurrentDate()}">
      </div>
      <button id="add-vegetable-button-plant" type="submit">Add Vegetable</button>
    </div>
    <button class="return-button">retour</button>
  `;

  // Append the form to the container
  formContainer.appendChild(form);
}

// Call the renderForm function to render the form
renderPlantForm();

  // Get the "Add Vegetable" button by its ID
const addButtonPlant = document.querySelector('#add-vegetable-button-plant');

// Add a click event listener to the button
addButtonPlant.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission

// Retrieve the quantity value within the event handler
const quantity = document.querySelector('#quantity_plant').value;
const selectedNameOption = document.querySelector('#name_plant option:checked');
const selectedName = selectedNameOption ? selectedNameOption.textContent : '';

// Rest of your code to construct formData
const formData = {
  'name': selectedName,
  'quantity': quantity,
  'area_id': document.querySelector('#garden_area_plant').value,
  'sowed': false,
  'planted': true,
  'planting_date': getCurrentDate(),
};

  console.log('Form data:', formData);
  // Send a POST request to your server
  sendPostRequestPlant(formData);
});

  // Function to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// Function to send a POST request
function sendPostRequestPlant(formData) {
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
      
      // console.log('Response from server:', data);

      // Optionally, you can clear the form or perform other actions
      clearFormPlant();
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
      // Handle errors here (e.g., show an error message)
    });
}

// Function to clear the form after submission
function clearFormPlant() {
  document.querySelector('#name_plant').value = '';
  document.querySelector('#quantity_plant').value = '0';
  document.querySelector('#garden_area_plant').value = '';
}

// Function to fetch garden area data from the API
function fetchGardenAreas() {

  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for garden areas
      const gardenAreaSelect = document.querySelector('#garden_area_plant');

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
      const nameSelect = document.querySelector('#name_plant');

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