document.addEventListener('DOMContentLoaded', function () {
  const pages = ['dashboard', 'vegetable101', 'production', 'charts'];

  for (const page of pages) {
    const button = document.getElementById(`${page}_page`);
    const container = document.getElementById(`container_${page}`);

    button.addEventListener('click', function () {
      for (const otherPage of pages) {
        const otherContainer = document.getElementById(
          `container_${otherPage}`
        );
        otherContainer.style.display = page === otherPage ? 'grid' : 'none';
      }
    });
  }
});
