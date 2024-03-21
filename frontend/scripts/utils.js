document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();

  // Format options for the date
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    currentDate
  );

  const date = document.getElementById('date');
  date.textContent = `${formattedDate}`;
});

async function fetchSignal() {
  try {
    const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (JSON.stringify(data) !== JSON.stringify({ message: 'Hello World' })) {
      const signalStatus = document.getElementById('signalStatus'); // Use . for class, # for ID
      signalStatus.style.backgroundColor = 'red';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the async function
fetchSignal();

// const plantManagerTitle = document.getElementById('plant_manager_title');
// const plantManagerModule = document.querySelector('.plantManagerModule');
// const itemPlantManagerModule = document.querySelector('.icon_garden');

// if (window.innerWidth <= 950) {
//   plantManagerTitle.addEventListener('click', () => {
//     plantManagerModule.classList.toggle('module-expanded');
//   });
//   itemPlantManagerModule.addEventListener('click', () => {
//     plantManagerModule.classList.toggle('module-expanded');
//   });
// }

// if (window.innerWidth <= 1400 && window.innerWidth >= 950) {
//   plantManagerTitle.addEventListener('click', () => {
//     plantManagerModule.classList.toggle('module-expanded');
//   });
//   itemPlantManagerModule.addEventListener('click', () => {
//     plantManagerModule.classList.toggle('module-expanded');
//   });
// }
