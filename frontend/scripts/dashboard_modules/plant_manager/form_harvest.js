// Function to create and render the harvest form
function renderHarvestForm() {
  const formContainer = document.getElementById('form-harvest'); // Assuming you want to use the same form container

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <label for="name_harvest">Name :</label>
      <select id="name_harvest" name="name_harvest">
      </select>
      <div class="form_quantity">
        <label for="quantity_harvest">Quantity :</label>
        <input type="number" id="quantity_harvest" name="quantity_harvest" value="1">
      </div>
      
      <div class="form_harvest_date">
        <label for="harvest_date">Harvest Date :</label>
        <input type="date" id="harvest_date" name="harvest_date">
      </div>
      <button id="add-vegetable-button-harvest" type="submit">Harvest Vegetable</button>
      <button class="return-button">Back</button>
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

addButtonHarvest.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission

  const quantity = document.querySelector('#quantity_harvest').value;
  const selectedNameOption = document.querySelector('#name_harvest option:checked');
  const harvestDate = document.querySelector('#harvest_date').value;
  const selectedName = selectedNameOption ? selectedNameOption.textContent.split(' (')[0] : '';
  const selectedAreaId = selectedNameOption ? selectedNameOption.dataset.areaId : '';
  const baseUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';
  const vegetableId = selectedNameOption.value;
  const putUrl = `${baseUrl}/${vegetableId}`;

  fetch(putUrl)
    .then((response) => response.json())
    .then((vegetable) => {
      if (!vegetable.harvest_date) {
        // It's the first time, so create an object with harvest_date and harvest_quantity
        const formData = {
          harvest_date: harvestDate,
          harvest_quantity: quantity,
        };
        sendPutRequest(putUrl, formData);
      } else {
        // It's not the first time, so update the quantity
        const quantityToAdd = parseInt(quantity) || 0;
        vegetable.harvest_quantity = quantityToAdd;
        sendPutRequest(putUrl, vegetable);
      }
    })
    .catch((error) => {
      console.error('Error fetching vegetable data:', error);
      // Handle errors here (e.g., show an error message)
    });
});

function sendPutRequest(url, data) {
  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, putOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('data:', data);
      // Handle the response from the server (e.g., show a success message)
      showSuccessMessage2(data);
      // Optionally, you can clear the form or perform other actions
      clearFormHarvest();
    })
    .catch((error) => {
      console.error('Error sending PUT request:', error);
      // Handle errors here (e.g., show an error message)
    });
}

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('harvest_date').value = getCurrentDate();

// Function to clear the harvest form after submission
function clearFormHarvest() {
  document.querySelector('#name_harvest').value = '';
  document.querySelector('#quantity_harvest').value = '0';
}

// Function to fetch vegetable names for harvest from the API
function fetchVegetableNamesForHarvest() {
  // Replace with the URL of your API endpoint that provides vegetable names for harvest
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

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
          const vegetablesToHarvest = vegetableData.filter((vegetable) => (vegetable.planted === true || vegetable.sowed === true) && vegetable.area_id !== "64722a61-55a2-47ef-af3c-f05634b2b862" && vegetable.remove_date === null);

          // Loop through the filtered vegetable names data for harvest and create options
          vegetablesToHarvest.forEach((vegetable) => {
            const option = document.createElement('option');
            option.value = vegetable.id; // Set the value to the vegetable ID

            // Check if the vegetable has been harvested
            if (vegetable.harvest_date !== null) {
              // If it has been harvested at least once, add a bullet (•) marker
              option.textContent = `🧺${vegetable.name}`;
            } else {
              option.textContent = vegetable.name; // Set the text content to the vegetable name
            }

            // Find the garden area name based on the area_id
            const gardenArea = areaData.find((area) => area.id === vegetable.area_id);

            if (gardenArea) {
              option.textContent += ` (${gardenArea.name})`; // Set the text content to the vegetable name
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

function showSuccessMessage2(data) {
  const popup = document.getElementById('custom-popup2');
  const message = document.getElementById('popup-message2');
  const okButton = document.getElementById('popup-ok-button2');

  if (!isNaN(data.quantity)) {
    // Success: Vegetable was created
    message.textContent = `Congratulations, ${data.name} harvested!`;
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
