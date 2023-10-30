document.addEventListener('DOMContentLoaded', () => {
  const all_vegetables = document.getElementById('container_allVegetables');
  const detail_page = document.getElementById('container_vegetableInfos');

  all_vegetables.addEventListener('click', (event) => {
    if (event.target.classList.contains('allVegetables__item')) {
      const vegetableItem = event.target;
      const vegetableName = vegetableItem.getAttribute('name');
      const vegetableStart_indoor = vegetableItem.getAttribute('start_indoor');
      const vegetableStart_outdoor =
        vegetableItem.getAttribute('start_outdoor');
      const vegetableEnd = vegetableItem.getAttribute('end');
      const vegetableCold_resistance =
        vegetableItem.getAttribute('cold_resistance');
      const vegetableSpacing_on_raw =
        vegetableItem.getAttribute('spacing_on_raw');
      const vegetableSpacing_between_raw = vegetableItem.getAttribute(
        'spacing_between_raw'
      );

      const title = document.createElement('h2');
      title.textContent = vegetableName;

      const header = document.createElement('div');
      header.classList = 'vegetable-characteristic__header';

      const vegetablePicture = document.createElement('img');
      vegetablePicture.src = `./styles/assets/vegetables_pictures/${vegetableName}.jpg`;

      const headerContent = document.createElement('div');
      headerContent.classList =
        'vegetable-characteristic__header__text-content';

      const vegetableFamily = document.createElement('h3');
      vegetableFamily.textContent = `Category: ${vegetableItem.getAttribute(
        'family'
      )}`;

      const vegetableDescription = document.createElement('p');
      vegetableDescription.textContent = `${vegetableItem.getAttribute(
        'description'
      )}`;

      const quickInfos = document.createElement('div');
      quickInfos.classList = 'vegetable-characteristic__quick-infos';

      const quickInfosSpacingOnRow = document.createElement('div');
      quickInfosSpacingOnRow.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--spacing-on-row';

      const quickInfosSpacingBetweenRow = document.createElement('div');
      quickInfosSpacingBetweenRow.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--soil-temperature';

      const quickInfosWaterNeeds = document.createElement('div');
      quickInfosWaterNeeds.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--watering';

      const quickInfosFrost = document.createElement('div');
      quickInfosFrost.classList =
        'vegetable-characteristic__quick-infos__item vegetable-characteristic__quick-infos__item--frost';

      const growingPeriod = document.createElement('div');
      growingPeriod.classList = 'vegetable-characteristic__table';

      const tableLegend = document.createElement('div');
      tableLegend.classList = 'vegetable-characteristic__legend';

      const tableLegendItem1 = document.createElement('div');
      tableLegendItem1.classList = 'vegetable-characteristic__legend__item';
      const tableLegendItem2 = document.createElement('div');
      tableLegendItem2.classList = 'vegetable-characteristic__legend__item';
      const tableLegendItem3 = document.createElement('div');
      tableLegendItem3.classList = 'vegetable-characteristic__legend__item';

      const tableLegendItemStartInside = document.createElement('div');
      tableLegendItemStartInside.classList =
        'vegetable-characteristic__legend__item__title vegetable-characteristic__legend__item__title--start-inside';
      tableLegendItemStartInside.textContent = 'Start Inside';

      const tableLegendItemStartInsideData = document.createElement('div');
      tableLegendItemStartInsideData.classList =
        'vegetable-characteristic__legend__item__data';

      const tableLegendItemTransplant = document.createElement('div');
      tableLegendItemTransplant.classList =
        'vegetable-characteristic__legend__item__title vegetable-characteristic__legend__item__title--transplant';
      tableLegendItemTransplant.textContent = 'Transplant';

      const tableLegendItemTransplantData = document.createElement('div');
      tableLegendItemTransplantData.classList =
        'vegetable-characteristic__legend__item__data';

      const tableLegendItemStartOutside = document.createElement('div');
      tableLegendItemStartOutside.classList =
        'vegetable-characteristic__legend__item__title vegetable-characteristic__legend__item__title--start-outside';
      tableLegendItemStartOutside.textContent = 'Start Outside';

      const tableLegendItemStartOutsideData = document.createElement('div');
      tableLegendItemStartOutsideData.classList =
        'vegetable-characteristic__legend__item__data';
      tableLegendItemStartOutsideData.textContent = detail_page.innerHTML = '';
      detail_page.appendChild(title);
      detail_page.appendChild(header);
      header.appendChild(vegetablePicture);
      header.appendChild(headerContent);
      headerContent.appendChild(vegetableFamily);
      headerContent.appendChild(vegetableDescription);
      detail_page.appendChild(quickInfos);
      quickInfos.appendChild(quickInfosSpacingOnRow);
      quickInfos.appendChild(quickInfosSpacingBetweenRow);
      quickInfos.appendChild(quickInfosWaterNeeds);
      quickInfos.appendChild(quickInfosFrost);
      detail_page.appendChild(growingPeriod);
      growingPeriod.innerHTML = rawHtml;
      detail_page.appendChild(tableLegend);
      tableLegend.appendChild(tableLegendItem1);
      tableLegendItem1.appendChild(tableLegendItemStartInside);
      tableLegendItem1.appendChild(tableLegendItemStartInsideData);
      tableLegend.appendChild(tableLegendItem2);
      tableLegendItem2.appendChild(tableLegendItemTransplant);
      tableLegendItem2.appendChild(tableLegendItemTransplantData);
      tableLegend.appendChild(tableLegendItem3);
      tableLegendItem3.appendChild(tableLegendItemStartOutside);
      tableLegendItem3.appendChild(tableLegendItemStartOutsideData);
    }
  });
});

rawHtml = `
<table cellspacing="0">
              <tr>
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
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="color-pink color-first">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink">a</div>
                </td>
                <td>
                  <div class="color-pink color-end">a</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="today">1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="color-orange color-first">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange">a</div>
                </td>
                <td>
                  <div class="color-orange color-end">a</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="today"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="color-purple color-first"></td>
                <td class="color-purple">2</td>
                <td class="color-purple">3</td>
                <td class="color-purple">4</td>
                <td class="color-purple">1</td>
                <td class="color-purple">2</td>
                <td class="color-purple">3</td>
                <td class="color-purple">4</td>
                <td class="color-purple">1</td>
                <td class="color-purple"></td>
                <td class="color-purple color-end">3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="today">1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
`;
