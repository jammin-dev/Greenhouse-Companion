async function getVegetablesInfos() {
  try {
    const apiUrl =
      'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // faire le sort avec la date de debut de semi indoor et fin de semi outdoor
    //faire un 2e sort par date de fin de semi
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function displayVegetables() {
  const vegetables = await getVegetablesInfos();
  const recommandationModule = document.getElementById('recommandationModule');
  vegetables.forEach((element) => {
    const recommandationsContainer = document.createElement('div');
    recommandationsContainer.className = 'recommandations-container';
    const vegetableName = document.createElement('p');
    vegetableName.textContent = element.name;
    vegetableName.className = 'recommandations-container__vegetable-name';
    recommandationsContainer.appendChild(vegetableName);
    recommandationModule.appendChild(recommandationsContainer);
  });
}

displayVegetables();
