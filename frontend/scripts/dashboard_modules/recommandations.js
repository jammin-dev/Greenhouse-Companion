async function getVegetablesInfos() {
  try {
    const apiUrl =
      'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Filter the data based on date criteria
    const currentDate = new Date();
    let startDate;

    const filteredData = data.filter((vegetable) => {
      if (vegetable.start_indoor) {
        startDate = new Date(vegetable.start_indoor);
      } else {
        startDate = new Date(vegetable.start_outdoor);
      }

      const outdoorEndDate = new Date(vegetable.end);
      return startDate < currentDate && outdoorEndDate > currentDate;
    });
    // Sort the filtered data by the start date of indoor planting
    filteredData.sort(
      (a, b) => new Date(a.start_indoor) - new Date(b.start_indoor)
    );

    // Then, sort by the end date of outdoor planting
    filteredData.sort((a, b) => new Date(a.end) - new Date(b.end));

    return filteredData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function displayVegetables() {
  const vegetables = await getVegetablesInfos();
  const recommandationModule = document.getElementById('recommandationModule');

  vegetables.forEach((element) => {
    const vegetableElement = createVegetableElement(element);
    recommandationModule.appendChild(vegetableElement);
  });
}

function createVegetableElement(vegetable) {
  const element = document.createElement('div');
  element.className = 'recommandations-container';

  const vegetableName = document.createElement('p');
  vegetableName.textContent = vegetable.name;
  vegetableName.className = 'recommandations-container__vegetable-name';

  const vegetableNameWithoutSpaces = vegetable.name.replace(/\s/g, '');
  const imgUrl = `url(./styles/assets/vegetable_icons/${vegetableNameWithoutSpaces}.png)`;

  element.style.backgroundImage = imgUrl;

  element.appendChild(vegetableName);

  return element;
}

displayVegetables();
