// Add an event listener to the background selection dropdown
const backgroundSelect = document.getElementById("background-select");

// Load the user's background choice from local storage (if available)
const selectedBackground = localStorage.getItem("selectedBackground");
if (selectedBackground) {
    document.body.style.backgroundImage = `url(${selectedBackground})`;
    backgroundSelect.value = selectedBackground; // Update the selected option in the dropdown
}

backgroundSelect.addEventListener("change", () => {
    // Get the selected background value
    const selectedBackground = backgroundSelect.value;

    // Update the background-image of the body based on the user's selection
    document.body.style.backgroundImage = `url(${selectedBackground})`;

    // Store the selected background in local storage
    localStorage.setItem("selectedBackground", selectedBackground);
});