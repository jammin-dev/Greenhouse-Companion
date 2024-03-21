// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const apiUrl =
//       'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos';
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     const main = document.getElementById('container_allVegetables');
//     const families = [...new Set(data.map((item) => item.family))].sort();

//     for (const familyName of families) {
//       const subtitle = createSubtitleElement(familyName);
//       const container = createContainerElement();

//       main.appendChild(subtitle);
//       main.appendChild(container);

//       const sortedVegetables = data
//         .filter((vegetable) => vegetable.family === familyName)
//         .sort((a, b) => a.name.localeCompare(b.name));

//       sortedVegetables.forEach((vegetable) => {
//         const item = createItemElement(vegetable);
//         container.appendChild(item);
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const apiUrl =
      'https://walrus-app-jbfmz.ondigitalocean.app/vegetable_infos';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    const container = document.getElementById('allVegetablesInfos');
    sortedData.forEach((element) => {
      const item = createItemElement(element);
      container.appendChild(item);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function createSubtitleElement(text) {
  const subtitle = document.createElement('div');
  subtitle.className = 'allVegetables__subtitle';
  subtitle.textContent = text;
  return subtitle;
}

function createContainerElement() {
  const container = document.createElement('div');
  container.className = 'allVegetables__container';
  return container;
}

function createItemElement(vegetable) {
  const item = document.createElement('div');
  item.className = 'allVegetables__item';
  const vegetable_name = vegetable.name;
  const vegetable_name_without_spaces = vegetable_name.replace(/\s/g, '');
  const imgUrl = `url(./styles/assets/vegetable_icons/${vegetable_name_without_spaces}.png)`;
  item.style.backgroundImage = imgUrl;

  const nameSpan = document.createElement('span');
  nameSpan.textContent = vegetable.name;
  item.appendChild(nameSpan);
  item.setAttribute('id', vegetable.id);
  item.setAttribute('name', vegetable.name);
  item.setAttribute('family', vegetable.family);
  item.setAttribute('start_indoor', vegetable.start_indoor);
  item.setAttribute('start_outdoor', vegetable.start_outdoor);
  item.setAttribute('end', vegetable.end);
  item.setAttribute('water_needs', vegetable.water_needs);
  item.setAttribute('cold_resistance', vegetable.cold_resistance);
  item.setAttribute('spacing_on_raw', vegetable.spacing_on_raw);
  item.setAttribute('soil_temperature', vegetable.soil_temperature);
  item.setAttribute('description', vegetable.description);
  return item;
}
