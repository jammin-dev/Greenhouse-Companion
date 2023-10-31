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
