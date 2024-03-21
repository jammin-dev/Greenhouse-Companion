document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("vegetableForm");
  //   const sowedCheckbox = document.getElementById("sowed");
  //   const plantedCheckbox = document.getElementById("planted");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Gather form data and create a JSON object
    const formData = new FormData(form);
    const jsonData = {};
    // formData.set("sowed", sowed.checked);
    // formData.set("planted", planted.checked);
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    console.log(jsonData);
    // Send the JSON data to your server
    const apiUrl = "http://192.168.1.101:5001/api/v1/vegetable_manager"; // Replace with your API endpoint URL

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log("Response from server:", data);
        // Reset the form
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
