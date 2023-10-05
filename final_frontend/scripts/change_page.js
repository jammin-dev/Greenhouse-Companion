document.addEventListener('DOMContentLoaded', function () {
  const ButtonDashboard = document.getElementById('dashboard_page');
  const ButtonVegetable101 = document.getElementById('vegetable101_page');
  const ButtonChart = document.getElementById('chart_page');
  const ButtonProduction = document.getElementById('production_page');

  ButtonDashboard.addEventListener('click', function () {
    document.getElementById('container_dashboard').style.display = 'grid';
    document.getElementById('container_vegetable101').style.display = 'none';
    document.getElementById('container_production').style.display = 'none';
    document.getElementById('container_charts').style.display = 'none';
  });

  ButtonVegetable101.addEventListener('click', function () {
    document.getElementById('container_dashboard').style.display = 'none';
    document.getElementById('container_vegetable101').style.display = 'grid';
    document.getElementById('container_production').style.display = 'none';
    document.getElementById('container_charts').style.display = 'none';
  });

  ButtonChart.addEventListener('click', function () {
    document.getElementById('container_dashboard').style.display = 'none';
    document.getElementById('container_vegetable101').style.display = 'none';
    document.getElementById('container_production').style.display = 'none';
    document.getElementById('container_charts').style.display = 'grid';
  });

  ButtonProduction.addEventListener('click', function () {
    document.getElementById('container_dashboard').style.display = 'none';
    document.getElementById('container_vegetable101').style.display = 'none';
    document.getElementById('container_production').style.display = 'grid';
    document.getElementById('container_charts').style.display = 'none';
  });
});
