document.addEventListener('DOMContentLoaded', () => {
  const temperature = document.getElementById('temperatureSensorValue');
  const humidity = document.getElementById('humiditySensorValue');
  const luminosity = document.getElementById('');
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/sensors/last';

  fetch(apiUrl)
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      temperature.textContent = `${data.air_temperature}°`;
      humidity.textContent = data.air_humidity;
      // luminosity.textContent = data.luminosity;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle errors here (e.g., show an error message)
    });
});
