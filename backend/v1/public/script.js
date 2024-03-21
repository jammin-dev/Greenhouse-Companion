document.addEventListener("DOMContentLoaded", function(){
    const sensorValueLeftElement = document.getElementById('sensor_value_left');
    const soil_humidity_left_gauge = document.getElementById('soil_humidity_left_gauge');
    
    // Define the API URL you want to fetch data from
    const apiUrl = 'http://192.168.1.104:5001/api/sensors/last';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Assuming the API returns JSON data
        .then(data => {
           // Extract the value of soil_humidity_1 from the data object
            const soilHumidity1Value = data.soil_humidity_1;
            // Update the content of the element with the extracted value
            sensorValueLeftElement.textContent = `${soilHumidity1Value}`;
            // Determine which image to display based on the value
            let imageSrc;
            if (soilHumidity1Value < 2500) {
                imageSrc = './assets/icon_gauge.png'; // Use the high value image
            } else {
                imageSrc = './assets/icon_humidity.png';  // Use the low value image
            }

            // Update the image source
            soil_humidity_left_gauge.src = imageSrc;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
