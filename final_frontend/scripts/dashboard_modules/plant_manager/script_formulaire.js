document.addEventListener("DOMContentLoaded", function () {

  const icons = document.querySelectorAll('.icons_container');
  const forms = document.querySelectorAll('.form');

// Function to toggle form visibility
function toggleFormVisibility(formIndex) {
  // Hide all icons
  icons.forEach((icons_container) => {
    icons_container.style.display = 'none';
    icons_container.style.justifyContent = 'initial';
    icons_container.style.alignItems = 'initial';
  });

  // Show the corresponding form and return button
  forms[formIndex].style.display = 'block';
  const returnButton = forms[formIndex].querySelector('.return-button');
  returnButton.style.display = 'block';

// Show the corresponding icons_container and adjust its size
const currentIconsContainer = icons[formIndex];
currentIconsContainer.style.display = 'flex';
currentIconsContainer.style.justifyContent = 'center';
currentIconsContainer.style.alignItems = 'center';

// Add a class to the icons_container to adjust its size and font size
currentIconsContainer.classList.add('large_icons_container');

// Add a click event listener to the return button
returnButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  // Hide the form and return button
  forms[formIndex].style.display = 'none';
  returnButton.style.display = 'none';

  // Show all icons and reset their styling
  icons.forEach((icons_container) => {
    icons_container.style.display = 'flex';
    icons_container.style.justifyContent = 'initial';
    icons_container.style.alignItems = 'initial';
    // Remove the class that adjusts the size and font size
    icons_container.classList.remove('large_icons_container');
  });
  });
}

// Add click event listeners to all icons
icons.forEach((icons_container, index) => {
  icons_container.addEventListener('click', () => {
    toggleFormVisibility(index);
  });
});

});