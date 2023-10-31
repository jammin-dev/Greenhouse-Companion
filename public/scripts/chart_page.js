let data;
let myChart = null;
document.addEventListener('DOMContentLoaded', async () => {
  const apiUrl = 'https://walrus-app-jbfmz.ondigitalocean.app/sensors';
  try {
    data = await fetchData(apiUrl);
    displayChart(data);
  } catch (error) {
    console.error('Error:', error);
  }
  handleForm(data);
});

function handleForm(data) {
  const form = document.getElementById('chartSubmit');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    startDate = parseInt(startDate.replace(/-/g, ''));
    endDate = parseInt(endDate.replace(/-/g, ''));
    newData = data.filter((item) => {
      let itemDate = item.created_at;
      itemDate = parseInt(itemDate.replace(/-/g, ''));
      if (itemDate >= startDate && itemDate <= endDate) {
        return item;
      }
    });
    displayChart(newData);
  });
}
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

function displayChart(data) {
  const dates = data.map((item) => {
    const date = new Date(item.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD HH"
    return `${year}-${month}-${day} ${hour}h`;
  });
  const temperatures = data.map((item) => item.air_temperature);
  const humidity = data.map((item) => item.air_humidity);
  const canvas = document.getElementById('chart');
  if (myChart) {
    myChart.destroy();
  }
  // Create a chart
  const ctx = canvas.getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line', // Specify the type of chart (e.g., bar, line, pie)
    data: {
      labels: dates, // Labels for the data
      datasets: [
        {
          label: 'Temperature',
          data: temperatures, // Actual data values
          yAxisID: 'y', // Assign this dataset to the default y-axis
          pointRadius: 0, // Set point radius to 0 to remove points
        },
        {
          label: 'Humidity',
          data: humidity, // Actual data values
          yAxisID: 'y1', // Assign this dataset to the default y-axis
          pointRadius: 0, // Set point radius to 0 to remove points
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Degree Celsius',
          },
          grid: {
            display: false,
          },
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percent',
          },
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 50, // Limit the number of x-axis labels
          },
        },
      },
    },
  });
}
