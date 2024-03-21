// Function to create and render the sow form
function renderPlantForm() {
  const formContainer = document.getElementById('form-plant');

  // Create the form element
  const form = document.createElement('form');
  form.className = 'hidden form';

  // Add form fields and elements
  form.innerHTML = `
    <div class="form_line1">
      <div class="sow-checkbox"><br>
        <input type="checkbox" id="show-sowed-vegetables" name="show-sowed-vegetables">
        <label for="show-sowed-vegetables">Check to see sowed Vegetables</label>
      </div>
      <label for="name_plant">Name :</label>
      <select id="name_plant" name="name_plant">
      </select>
      <div class="form_quantity">
        <label for="quantity_plant">Quantity :</label>
        <input type="number" id="quantity_plant" name="quantity_plant" value="1">
      </div>
      <div class="form_garden_area">
        <label for="garden_area_plant">Garden Area :</label>
        <select id="garden_area_plant" name="garden_area_plant">
        </select>
      </div>
      <div class="form_planting_date">
        <label for="planting_date">Planting Date :</label>
        <input type="date" id="planting_date" name="planting_date">
      </div>
      <button id="add-vegetable-button-plant" type="submit">Add Vegetable</button>
      <button class="return-button">Back</button>
    </div>
    <div id="custom-popup" class="popup">
      <div class="popup-content">
        <span id="popup-message">Congratulations, vegetable planted !</span>
        <button id="popup-ok-button">OK</button>
      </div>
    </div>
  `;

  // Append the form to the container
  formContainer.appendChild(form);
}

// Call the renderForm function to render the form
renderPlantForm();


const addButtonPlant = document.querySelector('#add-vegetable-button-plant');

addButtonPlant.addEventListener('click', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const quantity = document.querySelector('#quantity_plant').value;
  const selectedNameOption = document.querySelector('#name_plant option:checked');
  const plantingDate = document.querySelector('#planting_date').value;
  const selectedName = selectedNameOption ? selectedNameOption.textContent.split(' - ')[0] : '';
  const isSowed = selectedNameOption ? selectedNameOption.dataset.sowed === 'true' : false;

  const baseUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

  try {
    const areaId = document.querySelector('#garden_area_plant').value;

    if (isSowed) {
      // Retrieve the existing sowed vegetable data
      const sowedUrl = `${baseUrl}/${selectedNameOption.value}`;
      const sowedResponse = await fetch(sowedUrl);
      const sowedData = await sowedResponse.json();

      // Calculate the new quantity of the sowed vegetable
      const updatedSowedQuantity = sowedData.quantity - quantity;

      if (updatedSowedQuantity >= 0) {
        // There's enough quantity to plant, so create a new planted vegetable
        const newPlantedVegetable = {
          'name': selectedName,
          'quantity': quantity,
          'area_id': areaId,
          'sowed': false,
          'planted': true,
          'planting_date': plantingDate,
          'harvest_quantity': 0,
        };

        // Create the new planted vegetable and update the sowed vegetable's quantity
        const plantedVegetableUrl = baseUrl;
        const plantedVegetableResponse = await fetch(plantedVegetableUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlantedVegetable),
        });
        const plantedData = await plantedVegetableResponse.json();
        console.log('New planted vegetable data:', plantedData);

        // Update the sowed vegetable's quantity
        const updatedSowedData = {
          quantity: updatedSowedQuantity,
        };

        if (updatedSowedQuantity <= 0) {
          updatedSowedData.remove_date = plantingDate;
        }

        const updatedSowedUrl = sowedUrl;
        const updatedSowedResponse = await fetch(updatedSowedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSowedData),
        });
        const updatedSowedDataResponse = await updatedSowedResponse.json();
        console.log('Updated sowed vegetable data:', updatedSowedDataResponse);

        // Handle the response from the server here (e.g., show a success message)
        showSuccessMessage(updatedSowedDataResponse, true, false);
      } else {
        // Handle insufficient quantity error (optional)
        console.error('Insufficient quantity to plant.');
        // Show an error message or provide user feedback as needed
      }
    } else {
      // Handle planting a new vegetable (not sowed)
      const formData = {
        'name': selectedName,
        'quantity': quantity,
        'area_id': areaId,
        'sowed': false,
        'planted': true,
        'planting_date': plantingDate,
        'harvest_quantity': 0,
      };

      const newVegetableUrl = baseUrl;
      const newVegetableResponse = await fetch(newVegetableUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newVegetableData = await newVegetableResponse.json();
      console.log('New vegetable data:', newVegetableData);

      // Handle the response from the server here (e.g., show a success message)
      showSuccessMessage(newVegetableData, false, true);
    }
  } catch (error) {
    console.error('Error sending request:', error);
    // Handle errors here (e.g., show an error message)
  }
});

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('planting_date').value = getCurrentDate();

// Function to clear the form after submission
function clearFormPlant() {
  document.querySelector('#name_plant').value = '';
  document.querySelector('#quantity_plant').value = '0';
  document.querySelector('#garden_area_plant').value = '';
}

const areaNameMap = {};
// Function to fetch garden area data from the API
function fetchGardenAreas() {

  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/areas';
  const sowGardenAreaId = '64722a61-55a2-47ef-af3c-f05634b2b862';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the select element for garden areas
      const gardenAreaSelect = document.querySelector('#garden_area_plant');

      // Loop through the garden area data and create options
      data.forEach((gardenArea) => {
        if (gardenArea.id !== sowGardenAreaId) { // Exclude Sow_gardenArea
          areaNameMap[gardenArea.id] = gardenArea.name;
          const option = document.createElement('option');
          option.value = gardenArea.id;
          option.textContent = gardenArea.name;
          gardenAreaSelect.appendChild(option);
        }
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

// Add an event listener to the checkbox
const showSowedVegetablesCheckbox = document.querySelector('#show-sowed-vegetables');
// Get the associated label element
const labelForShowSowedVegetables = document.querySelector('label[for="show-sowed-vegetables"]');
showSowedVegetablesCheckbox.addEventListener('change', function () {
  
  if (showSowedVegetablesCheckbox.checked) {
    // Checked, set the label text to "Show Sowed Vegetable"
    labelForShowSowedVegetables.textContent = 'Uncheck to plant a new Vegetable';
  } else {
    // Unchecked, set the label text to "Show Planted Vegetable"
    labelForShowSowedVegetables.textContent = 'Check to see sowed Vegetables';
  }

  const nameSelect = document.querySelector('#name_plant');

  // Clear the existing options in the select element
  nameSelect.innerHTML = '';

  // Define the base URL for fetching vegetables
  const baseUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager';

  // Check if the checkbox is checked
  if (showSowedVegetablesCheckbox.checked) {
    // Fetch sowed vegetables when the checkbox is checked
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        const sowedVegetables = data.filter((vegetable) => vegetable.area_id === sowGardenAreaId && vegetable.remove_date === null);

        sowedVegetables.forEach((vegetable) => {
          const option = document.createElement('option');
          option.value = vegetable.id;

          // Parse the sowing date and calculate the number of days
        const sowingDate = new Date(vegetable.sowing_date);
        const currentDate = new Date();
        const timeDifference = currentDate - sowingDate;
        const daysSowed = Math.ceil(timeDifference / (1000 * 3600 * 24));

          option.textContent = `${vegetable.name} - ${daysSowed} days ago (${vegetable.quantity})`;
          option.dataset.sowed = vegetable.sowed;
          nameSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error('Error fetching sowed vegetables:', error);
      });
  } else {
    // Fetch all vegetables when the checkbox is unchecked
    fetch('https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((vegetable) => {
          const option = document.createElement('option');
          option.value = vegetable.id;
          option.textContent = vegetable.name;
          nameSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error('Error fetching all vegetables:', error);
      });
  }
});

function showSuccessMessage(data, isSowed, isNewVegetable) {
  const popup = document.getElementById('custom-popup');
  const message = document.getElementById('popup-message');
  const okButton = document.getElementById('popup-ok-button');

  if (data && !data.error) {
    if (isSowed) {
      message.textContent = `Congratulations, ${data.name} planted from a sowed vegetable !`;
    } else if (isNewVegetable) {
      message.textContent = `Congratulations, ${data.name} planted as a new vegetable !`;
    }
  } else {
    if (isSowed) {
      message.textContent = 'Error planting the vegetable from a sowed vegetable.';
    } else if (isNewVegetable) {
      message.textContent = 'Error planting the new vegetable.';
      okButton.style.backgroundColor = 'red';
    }
  }

  popup.style.display = 'flex';

  okButton.addEventListener('click', () => {
    popup.style.display = 'none';
    // Optionally, you can navigate or perform other actions here.
  });
}
