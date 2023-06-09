const express = require('express');
const app = express();
//THIS IS CAUSING FAILURE FOR SOME REASON
const DB = require('./database.js');
const apiUrl = 'https://api.openai.com/v1/chat/completions'; // ChatGPT url
const apiKey = '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'; //ChatGPT api key
// The model ID for ChatGPT (e.g., "gpt-3.5-turbo")
const modelId = 'gpt-3.5-turbo';

app.use(express.static('public'));

app.post('/')

// ChatGPT request
// Endpoint to receive the POST request
app.get('/api/chatGPT/:tracks', async(req, res) => {
  const firstTracks = req.params.tracks; // Access the received data from the request body
  console.log(firstTracks);
  const response = await sendChatMessage(firstTracks);
  console.log("This is my response",response);

  // Process the received data and send a response
  const responseData = {
    message: 'Received the POST request successfully',
    data: response
  };

  res.json(responseData);
});

app.post('/api/data',async (req, res) => {
  DB.addArtistsSongs(req.body);
  res.send("success");
})


const port = 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

async function sendChatMessage(message) {
  const requestBody = {
    model: modelId,
    messages: [{ role: 'system', content: 'You are' }, { role: 'user', content: message }]
  };
console.log("Request body: " + requestBody.model);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
console.log(response);
    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status);
    }

    const { choices } = await response.json();

    if (!choices || choices.length === 0) {
      throw new Error('Unexpected response from API');
    }

    const reply = choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('Error:', error.message);
    // Handle the error gracefully, such as showing an error message to the user
    // or providing fallback behavior.
  }
}
