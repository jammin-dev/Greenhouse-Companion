document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.icons_container');
  const forms = document.querySelectorAll('.form');
  const sowingTableContainer = document.querySelector(
    '.sowing-table-container'
  );
  // const h6Element = document.querySelector('h6');

  // Function to toggle form visibility
  function toggleFormVisibility(formIndex) {
    // Hide the table
    // sowingTableContainer.style.display = 'none';

    // Hide the h6 element
    // h6Element.style.display = 'none';

    // Hide the icons
    icons.forEach((icons_container) => {
      icons_container.style.display = 'none';
      icons_container.style.justifyContent = 'initial';
      icons_container.style.alignItems = 'initial';
    });

    // Add a class to the icons_container to adjust its size and font size
    const currentIconsContainer = icons[formIndex];
    currentIconsContainer.style.display = 'flex';
    currentIconsContainer.style.justifyContent = 'center';
    currentIconsContainer.style.alignItems = 'center';
    currentIconsContainer.classList.add('large_icons_container');

    // Show the corresponding form and return button
    forms[formIndex].style.display = 'block';
    const returnButton = forms[formIndex].querySelector('.return-button');
    returnButton.style.display = 'block';

    // Add a click event listener to the return button
    returnButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Show the table
      // sowingTableContainer.style.display = 'block';
      // Show the h6 element
      // h6Element.style.display = 'block';
      // Hide the form and return button
      forms[formIndex].style.display = 'none';
      returnButton.style.display = 'none';
      // Show the icons and reset their styling
      icons.forEach((icons_container) => {
        icons_container.style.display = 'flex';
        icons_container.style.justifyContent = 'initial';
        icons_container.style.alignItems = 'initial';
        icons_container.classList.remove('large_icons_container');
      });
    });
  }

  // Function to hide the sowing table
  function hideSowingTable() {
    sowingTableContainer.style.display = 'none';
  }

  // Function to show the sowing table
  function showSowingTable() {
    sowingTableContainer.style.display = 'block';
  }

  // Add click event listeners to all icons
  icons.forEach((icons_container, index) => {
    icons_container.addEventListener('click', () => {
      toggleFormVisibility(index);
      hideSowingTable();
    });
  });

  // Add click event listener to show the sowing table
  sowingTableContainer.addEventListener('click', () => {
    showSowingTable();
  });

  // Mapping of vegetable names to their images
  const vegetableImages = {
    Lettuce: './styles/assets/vegetable_icons/Lettuce.png',
    Potato: './styles/assets/vegetable_icons/Potato.png',
    Eggplant: './styles/assets/vegetable_icons/Eggplant.png',
    Broccoli: './styles/assets/vegetable_icons/Broccoli.png',
    Tomato: './styles/assets/vegetable_icons/Tomato.png',
    'Bell Pepper': './styles/assets/vegetable_icons/BellPepper.png',
    Cabbage: './styles/assets/vegetable_icons/Cabbage.png',
    Radish: './styles/assets/vegetable_icons/Radish.png',
    Cucumber: './styles/assets/vegetable_icons/Cucumber.png',
    'Green Beans': './styles/assets/vegetable_icons/GreenBeans.png',
    Beet: './styles/assets/vegetable_icons/Beet.png',
    Peas: './styles/assets/vegetable_icons/Peas.png',
    Kale: './styles/assets/vegetable_icons/Kale.png',
    Zucchini: './styles/assets/vegetable_icons/Zucchini.png',
    Carrot: './styles/assets/vegetable_icons/Carrot.png',
    Onion: './styles/assets/vegetable_icons/Onion.png',
    Spinach: './styles/assets/vegetable_icons/Spinach.png',
    // Add more vegetables and their corresponding images as needed
  };

  // Function to get the image for a vegetable name
  function getVegetableImage(vegetableName) {
    // Check if the vegetable name is in the mapping
    if (vegetableImages.hasOwnProperty(vegetableName)) {
      return vegetableImages[vegetableName];
    } else {
      // Default to a generic vegetable emoji or text
      return '🧐';
    }
  }

  // Function to calculate the number of days between two dates
  function getDaysBetweenDates(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const start = new Date(startDate);
    const end = new Date(endDate);

    return Math.round(Math.abs((start - end) / oneDay));
  }

  // Function to format the sowing date as "X days"
  function formatSowingDate(sowingdate) {
    const currentDate = new Date();
    const sowingDateObject = new Date(sowingdate);

    const daysDifference = getDaysBetweenDates(currentDate, sowingDateObject);

    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return '1 day';
    } else {
      return daysDifference + ' days';
    }
  }

  // Function to fetch and process data
  function fetchDataAndPopulateTable() {
    // Fetch data from the URL
    fetch('https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager')
      .then((response) => response.json())
      .then((data) => {
        // Filter vegetables with sowed==true and planted==false
        const filteredVegetables = data.filter(
          (vegetable) => vegetable.sowed === true && vegetable.planted === false
        );

        // Extract "name" and "sowing_date" attributes and create table rows
        const tableBody = document.querySelector('#sowing-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        filteredVegetables.forEach((vegetable) => {
          const row = document.createElement('tr');
          const imageCell = document.createElement('td'); // Create a new cell for the image
          const nameCell = document.createElement('td');
          const sowingDateCell = document.createElement('td');

          const vegetableName = vegetable.name;
          const vegetableImage = getVegetableImage(vegetableName);
          imageCell.innerHTML = `<img src="${vegetableImage}" alt="${vegetableName}">`; // Display the image
          nameCell.textContent = vegetableName; // Display the name

          const formattedSowingDate = formatSowingDate(vegetable.sowing_date);
          sowingDateCell.textContent = formattedSowingDate;

          row.appendChild(imageCell);
          row.appendChild(nameCell);
          row.appendChild(sowingDateCell);

          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Call the function to fetch and populate the table
  fetchDataAndPopulateTable();
});
