document.addEventListener('DOMContentLoaded', function () {
  const chatOutput = document.getElementById('chat-output');
  const userInput = document.getElementById('user-input');
  const submitButton = document.getElementById('submit-button');

  // Function to add a user message to the chat
  function addUserMessage(message) {
    chatOutput.innerHTML += '<div class="user-message"><p id="message">' + message + '</p></div>';
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  // Function to add an assistant message to the chat
  function addAssistantMessage(message) {
    chatOutput.innerHTML +=
      '<div class="assistant-message">' + message + '</div>';
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  function sendQuestionToAPI() {
    const userQuestion = userInput.value;
    addUserMessage(userQuestion);

    // Display animated "..." to indicate that the assistant is generating a response
    const typingDots = document.createElement('div');
    typingDots.className = 'assistant-message typing-dots';
    chatOutput.appendChild(typingDots);

    // Set a context system message that gently guides the conversation
    const systemMessage =
      "Welcome to the garden of knowledge! 🌱 I'm a gardening enthusiast, and I'm here to help with all things gardening. Feel free to ask me your gardening questions, or let's explore the wonderful world of plants and vegetables. I'm a technical expert of how to plant, to water or harvest different varieties of vegetables in France. But be warned, if your question strays too far from the garden, I might lead you back with a touch of irony! 😉. I will not hesitate to refer about the garden. I will try to be concise in my answers to give most informations in maximum 300 tokens ";
    // Make the API request and handle the response
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer !!MY_KEY!!', // Replace with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userQuestion },
        ],
        max_tokens: 300,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        chatOutput.removeChild(typingDots);

        const generatedText = data.choices[0].message.content;
        addAssistantMessage(generatedText);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Clear the user input field
    userInput.value = '';
  }

  // Event listener for the submit button
  submitButton.addEventListener('click', sendQuestionToAPI);

  // Optionally, you can listen for the "Enter" key press to submit the question
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendQuestionToAPI();
    }
  });
});
