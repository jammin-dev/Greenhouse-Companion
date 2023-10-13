document.addEventListener('DOMContentLoaded', () => {
  const detail_page = document.getElementById('container_vegetableInfos');
  const all_vegetables = document.getElementById('container_allVegetables');

  // Add a click event listener to the parent element (detail_page)
  all_vegetables.addEventListener('click', (event) => {
    const vegetable = event.target.querySelector('span');
    // Check if the clicked element has the class 'allVegetables__item'
    if (event.target.classList.contains('allVegetables__item')) {
      const container = document.createElement('div');
      container.className = 'vegetable_detail';
      container.textContent = vegetable.textContent;

      // Append the container to the detail_page
      detail_page.appendChild(container);
    }
  });
});
