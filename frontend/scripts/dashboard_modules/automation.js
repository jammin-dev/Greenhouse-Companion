const sendButton = document.querySelector('.automation-container__sendButton');

sendButton.addEventListener('click', function () {
  // Get the input elements by their IDs
  const smartPlug1 = document.getElementById('smartPlug1');
  const smartPlug2 = document.getElementById('smartPlug2');
  const smartPlug3 = document.getElementById('smartPlug3');
  let timer1 = null;
  let timer2 = null;
  let timer3 = null;

  // Convert the values to numbers and multiply by 60000 to get milliseconds
  if (smartPlug1.value.trim() !== '') {
    timer1 = parseInt(smartPlug1.value) * 60000;
  }
  if (smartPlug2.value.trim() !== '') {
    timer2 = parseInt(smartPlug2.value) * 60000;
  }
  if (smartPlug3.value.trim() !== '') {
    timer3 = parseInt(smartPlug3.value) * 60000;
  }

  // Create a JSON object with the desired format only for elements with values
  const jsonObject = {};
  jsonObject.air_humidity_selection = '110';
  jsonObject.air_temperature_selection = '40';
  jsonObject.extractor_plug = '4';
  if (timer1) {
    jsonObject.smart_plug_1_state = true;
  }
  jsonObject.smart_plug_1_timer = timer1;
  if (timer2) {
    jsonObject.smart_plug_2_state = true;
  }
  jsonObject.smart_plug_2_timer = timer2;
  if (timer3) {
    jsonObject.smart_plug_3_state = true;
  }
  jsonObject.smart_plug_3_timer = timer3;
  // Log the JSON object to the console
  alert('Orders has been sent to the Greenhouse !');
  smartPlug1.value = null;
  smartPlug2.value = null;
  smartPlug3.value = null;
  // Send the JSON data to a server using the fetch API
  fetch('https://walrus-app-jbfmz.ondigitalocean.app/automation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data successfully sent to the server:', data);
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
});
