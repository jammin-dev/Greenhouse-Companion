// Make an API request and get the forecast data
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall?lat=48.8588897&lon=2.320041&exclude=hourly,minutely,alerts&appid=9b14c40da416807a32337c8ec78d4c15'

  fetch(BASE_URL)
  .then(response => response.json())
  .then(data => {
      // Extract and display the weather for the next 4 days
    const dailyForecasts = data.daily.slice(1, 5); // Get data for the next 4 days (including the current day)

    dailyForecasts.forEach((dayData, index) => {
      const forecastContainer = document.createElement('div');
      forecastContainer.classList.add('forecast-container');

      const dayElement = document.createElement('p');
      dayElement.classList.add('forecast-container__day');
      dayElement.textContent = getDayFromTimestamp(dayData.dt);
      forecastContainer.appendChild(dayElement);

      const iconElement = document.createElement('img');
      iconElement.classList.add('forecast-container__icon');
      iconElement.src = getIconURL(dayData.weather[0].description);
      forecastContainer.appendChild(iconElement);

      const temperatureElement = document.createElement('p');
      temperatureElement.classList.add('forecast-container__temperature');
      temperatureElement.textContent = `${(dayData.temp.day - 273.15).toFixed(1)} °C`;
      forecastContainer.appendChild(temperatureElement);

      const rainElement = document.createElement('p');
      rainElement.classList.add('forecast-container__rain');
      rainElement.textContent = `${(dayData.rain || 0).toFixed(1)} mm/day`;
      forecastContainer.appendChild(rainElement);

      document.querySelector('.dashbord__module__content--forecast').appendChild(forecastContainer);
    });
  })

  fetch(BASE_URL)
  .then(response => response.json())
  .then(data => {
    // Extract and display the current day's weather for the "Air Sensors" section
    const currentDay = data.daily[0];
    const airSensorsContainerElement = document.querySelector('.air-sensors-container__icon--weather');

    // Get the URL of the icon image based on the weather description
    const iconURL = getIconURL(currentDay.weather[0].description);

    // Update the background image of the air-sensors-container__icon--weather element
    airSensorsContainerElement.style.backgroundImage = `url("${iconURL}")`;
  })
  .catch(error => console.error(error));



    // Function to get the day from a timestamp
    function getDayFromTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    // Function to get the icon URL based on the description
    function getIconURL(description) {
      // Create a mapping of descriptions to icons
      const descriptionToIcon = {
        'moderate rain': 'icon-rain.png',
        'light rain': 'icon-sun_rain.png',
        'heavy intensity rain': 'icon-heavy_rain.png',
        'clear sky': 'icon-sun.png',
        // Add more descriptions and their corresponding icons here
      };

      // Check if the description exists in the mapping
      if (descriptionToIcon.hasOwnProperty(description)) {
        return `./styles/assets/${descriptionToIcon[description]}`;
      } else {
        // Handle the case where the description is not in the mapping or provide a default icon
        return './styles/assets/icon_carrot.png'; // Replace with your default icon
      }
    }