const headerTable = `
<tr>
<th colspan="1">&nbsp;</th>
<th colspan="4">Name</th>
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
              let startMonth;
              let startDay;
              let startCell;
              let endMonth;
              let endDay;
              let endCell;
              let harvestCell;

              const currentDate = new Date();

              if (vegetable.harvest_date) {
                const harvestDate = new Date(vegetable.harvest_date);
                const harvestMonth = harvestDate.getMonth();
                const harvestDay = harvestDate.getDate();
                harvestCell = parseInt(
                  (harvestMonth + 1) * 4 + harvestDay / 7 - 1
                );
              }

              if (vegetable.sowing_date) {
                const sowingDate = new Date(vegetable.sowing_date);
                startMonth = sowingDate.getMonth();
                startDay = sowingDate.getDate();
              }

              if (vegetable.planting_date) {
                const plantingDate = new Date(vegetable.planting_date);
                startMonth = plantingDate.getMonth();
                startDay = plantingDate.getDate();
              }
              startCell = parseInt((startMonth + 1) * 4 + startDay / 7 - 1);

              if (vegetable.remove_date) {
                const removeDate = new Date(vegetable.remove_date);
                endMonth = removeDate.getMonth();
                endDay = removeDate.getDate();
                endCell = parseInt((endMonth + 1) * 4 + endDay / 7 - 1);
              } else {
                endMonth = currentDate.getMonth();
                endDay = currentDate.getDate();
                endCell = parseInt((endMonth + 1) * 4 + endDay / 7 - 1);
              }

              for (let i = 0; i <= 51; i++) {
                const tableCell = document.createElement('td');
                if ((i > 0 && i < 3) || i === 51) {
                  tableCell.setAttribute('colspan', '4');
                }
                if (i === 0) {
                  tableCell.textContent = '';
                  tableCell.style.backgroundImage = `url(./styles/assets/vegetable_icons/${vegetable.name.replace(
                    /\s/g,
                    ''
                  )}.png)`;

                  tableCell.classList.add('table-production__vegetable-icon');
                }
                if (i === 1) {
                  tableCell.textContent = vegetable.name;
                }
                if (i === 2) {
                  tableCell.textContent = vegetable.quantity;
                }
                if (i === 51) {
                  tableCell.textContent = vegetable.harvest_quantity;
                }

                if (i >= startCell && i <= endCell) {
                  const timePeriod = document.createElement('div');
                  timePeriod.classList = 'highlight-grow highlight';
                  if (i === startCell) {
                    timePeriod.classList =
                      'highlight-grow highlight highlight-start';
                  }
                  if (i === endCell) {
                    timePeriod.classList =
                      'highlight-grow highlight highlight-end';
                  }
                  if (startCell == endCell) {
                    timePeriod.classList =
                      'highlight-grow highlight highlight-start-end';
                  }
                  if (harvestCell !== null) {
                    if (i >= harvestCell && i <= endCell) {
                      timePeriod.style.backgroundColor = 'orangered';
                    }
                  }

                  tableCell.appendChild(timePeriod);
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
