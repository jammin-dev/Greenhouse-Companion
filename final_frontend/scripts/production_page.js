const headerTable = `
<tr>
<th colspan="1">&nbsp;</th>
<th colspan="4">Name</th>
<th colspan="4">Variety</th>
<th colspan="4">Quantity</th>
<th colspan="4">Jan</th>
<th colspan="4">Feb</th>
<th colspan="4">Mar</th>
<th colspan="4">Apr</th>
<th colspan="4">May</th>
<th colspan="4">Jun</th>
<th colspan="4">Jul</th>
<th colspan="4">Aug</th>
<th colspan="4">Sep</th>
<th colspan="4">Oct</th>
<th colspan="4">Nov</th>
<th colspan="4">Dec</th>
<th colspan="4">Harvested</th>
</tr>
`;

document.addEventListener('DOMContentLoaded', () => {
  const productionContent = document.getElementById('productionContent');

  // Fetch the vegetables data
  fetch('https://walrus-app-jbfmz.ondigitalocean.app/vegetable_manager')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((vegetablesData) => {
      // Fetch the areas data
      return fetch('https://walrus-app-jbfmz.ondigitalocean.app/areas')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((areasData) => {
          areasData.forEach((area) => {
            const areaName = document.createElement('h3');
            areaName.classList.add('production-container__content__subtitle');
            areaName.textContent = area.name;

            const tableProduction = document.createElement('table');
            tableProduction.classList.add('table-production');
            tableProduction.innerHTML = headerTable;

            productionContent.appendChild(areaName);
            productionContent.appendChild(tableProduction);

            const vegetablesInArea = vegetablesData.filter((vegetable) => {
              return vegetable.area_id === area.id;
            });

            vegetablesInArea.forEach((vegetable) => {
              const tableRow = document.createElement('tr');
              const sowingDate = new Date(vegetable.sowing_date);
              console.log(sowingDate);

              for (let i = 0; i <= 52; i++) {
                const tableCell = document.createElement('td');
                if ((i > 0 && i < 4) || i === 52) {
                  tableCell.setAttribute('colspan', '4');
                }
                if (i === 0) {
                  tableCell.textContent = '';
                  tableCell.style.backgroundImage = `url(/final_frontend/styles/assets/vegetable_icons/${vegetable.name}.png)`;
                  tableCell.classList.add('table-production__vegetable-icon');
                }
                if (i === 1) {
                  tableCell.textContent = vegetable.name;
                }
                if (i === 3) {
                  tableCell.textContent = vegetable.quantity;
                }
                if (i === 52) {
                  tableCell.textContent = vegetable.harvest_quantity;
                }

                tableRow.appendChild(tableCell);
              }
              tableProduction.appendChild(tableRow);
            });
          });
        })
        .catch((error) => {
          console.error('Fetch error (areas):', error);
        });
    })
    .catch((error) => {
      console.error('Fetch error (vegetables):', error);
    });
});
