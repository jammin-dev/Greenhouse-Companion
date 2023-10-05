document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://squid-app-2psbp.ondigitalocean.app/vegetable_infos';
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const main = document.getElementById('container_allVegetables');
      let families = [];

      data.forEach(function (item) {
        if (!families.includes(item.family)) {
          families.push(item.family);
        }
      });

      families.sort();
      families.forEach(function (familyName) {
        const subtitle = document.createElement('div');
        subtitle.className = 'allVegetables__subtitle';
        subtitle.textContent = familyName;
        const container = document.createElement('div');
        container.className = 'allVegetables__container';

        main.appendChild(subtitle);
        main.appendChild(container);

        data = data.sort((a, b) => a.name.localeCompare(b.name));
        data.forEach(function (vegetable) {
          if (vegetable.family === familyName) {
            const item = document.createElement('div'); // Create a new item element for each vegetable
            item.className = 'allVegetables__item';
            let imgUrl = `url(./styles/assets/vegetable_icons/${vegetable.name}.png)`;
            console.log(imgUrl);
            item.style.backgroundImage = imgUrl; // Set background image

            // Create a span for the vegetable name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = vegetable.name;
            item.appendChild(nameSpan); // Append the name to the item element

            container.appendChild(item);
          }
        });
      });
    })

    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});
