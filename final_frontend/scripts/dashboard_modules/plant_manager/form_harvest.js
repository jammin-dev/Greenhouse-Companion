// Function to create and render the harvest form
function renderHarvestForm() {
  const formContainer = document.getElementById('form-harvest'); // Assuming you want to use the same form container

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <label for="name_harvest">Name:</label>
      <select id="name_harvest" name="name_harvest">
      </select>
      <div class="form_quantity">
        <label for="quantity_harvest">Quantity:</label>
        <input type="number" id="quantity_harvest" name="quantity_harvest" value="1">
      </div>
      
      <div class="form_harvest_date">
        <label for="harvest_date">Harvesting Date:</label>
        <input type="date" id="harvest_date" name="harvest_date" value="${getCurrentDate()}">
      </div>
      <button id="add-vegetable-button-harvest" type="submit">Harvest Vegetable</button>
      <button class="return-button">retour</button>
    </div>
    <div id="custom-popup2" class="popup2">
      <div class="popup-content2">
        <span id="popup-message2">Congratulations, vegetable harvested !</span>
        <button id="popup-ok-button2">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);
}

// Call the renderHarvestForm function to render the harvest form
renderHarvestForm();

// Get the "Harvest Vegetable" button by its ID
const addButtonHarvest = document.querySelector('#add-vegetable-button-harvest');

// Add a click event listener to the button
addButtonHarvest.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve the quantity value within the event handler
  const quantity = document.querySelector('#quantity_harvest').value;
  const selectedNameOption = document.querySelector('#name_harvest option:checked');
  const selectedName = selectedNameOption ? selectedNameOption.textContent.split(' (')[0] : '';

  // Retrieve the area_id from the selected option's data attribute
  const selectedAreaId = selectedNameOption ? selectedNameOption.dataset.areaId : '';


  // Rest of your code to construct formData for harvest
  const formData = {
    'name': selectedName,
    'harvest_quantity': quantity,
    'quantity': quantity,
    'area_id': selectedAreaId,
    'sowed': false,
    'planted': false,
    'harvested': true,
    'harvest_date': getCurrentDate(),
  };

  console.log('Form data:', formData);
  // Send a POST request to your server
  sendPostRequestHarvest(formData);
});

// Function to send a POST request for harvest
function sendPostRequestHarvest(formData) {
  // Define your server URL for harvest
  const serverUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager'; // Replace with the correct URL for harvesting

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
      console.log('data:', data);
      // Handle the response from the server here (e.g., show a success message)
      showSuccessMessage2();
      // Optionally, you can clear the form or perform other actions
      clearFormHarvest();
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
      // Handle errors here (e.g., show an error message)
    });
}

// Function to clear the harvest form after submission
function clearFormHarvest() {
  document.querySelector('#name_harvest').value = '';
  document.querySelector('#quantity_harvest').value = '0';
  // document.querySelector('#garden_area_harvest').value = '';
}

// Function to fetch garden area data from the API
function fetchGardenAreas() {

  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for garden areas
      const gardenAreaSelect = document.querySelector('#garden_area_harvest');

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

// Function to fetch vegetable names for harvest from the API
function fetchVegetableNamesForHarvest() {
  // Replace with the URL of your API endpoint that provides vegetable names for harvest
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager'; // Replace with the correct URL

  // Fetch garden area data first
  fetch('https://walrus-app-jbfmz.ondigitalocean.app/areas')
    .then((areaResponse) => areaResponse.json())
    .then((areaData) => {
      // Get the select element for vegetable names for harvest
      const nameSelect = document.querySelector('#name_harvest');

      // Fetch vegetable data
      fetch(apiUrl)
        .then((vegetableResponse) => vegetableResponse.json())
        .then((vegetableData) => {
          // Filter the vegetables that are ready to harvest (planted)
          const vegetablesToHarvest = vegetableData.filter((vegetable) => vegetable.planted === true);

          // Loop through the filtered vegetable names data for harvest and create options
          vegetablesToHarvest.forEach((vegetable) => {
            const option = document.createElement('option');
            option.value = vegetable.id; // Set the value to the vegetable ID

            // Find the garden area name based on the area_id
            const gardenArea = areaData.find((area) => area.id === vegetable.area_id);

            if (gardenArea) {
              option.textContent = `${vegetable.name} (${gardenArea.name})`; // Set the text content to the vegetable name
              // Store the area_id as a data attribute
              option.dataset.areaId = vegetable.area_id;
            } else {
              option.textContent = `${vegetable.name} - ${vegetable.quantity} planted`; // Set the text content to the vegetable name
            }

            nameSelect.appendChild(option);
          });
        })
        .catch((error) => {
          console.error('Error fetching vegetable names for harvest:', error);
        });
    })
    .catch((error) => {
      console.error('Error fetching garden area data:', error);
    });
}

fetchVegetableNamesForHarvest();

function showSuccessMessage2() {
  const popup = document.getElementById('custom-popup2');
  const message = document.getElementById('popup-message2');
  const okButton = document.getElementById('popup-ok-button2');

  message.textContent = 'Congratulations, vegetable harvested !';

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
    // Optionally, you can navigate or perform other actions here.
  });
}
