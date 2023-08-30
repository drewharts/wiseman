var express = require('express');
require('dotenv').config()
const jsonData = require('./data.json');
const apiKey = jsonData.key; 
const app = express();
app.use(express.static('public'));
app.use(express.json());
const DB = require('./database.js');
const apiUrl = 'https://api.openai.com/v1/chat/completions'; // ChatGPT url
const axios = require('axios');


// The model ID for ChatGPT (e.g., "gpt-3.5-turbo")
const modelId = 'gpt-3.5-turbo';

const port = 4000;

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




app.post('/')

// ChatGPT request
// Endpoint to receive the POST request
app.post("/api/chatGPT/", async(req, res) => {
  const jsonString = req.body.firstTracks;
  const jsonObject = JSON.parse(jsonString);
  artist1 = jsonObject.artist1;
  artist2 = jsonObject.artist2;
  artist3 = jsonObject.artist3;

  const artist1Input = 'Give me 5 ' + artist2 + ' tracks that arent on Spotify or Apple Music but are on Youtube. Only response with a dictionary of the 5 songs and nothing else.';
  const artist2Input = 'Give me 5 ' + artist2 + ' tracks that arent on Spotify or Apple Music but are on Youtube. Only response with a dictionary of the 5 songs and nothing else.';
  const artist3Input = 'Give me 5 ' + artist3 + ' tracks that arent on Spotify or Apple Music but are on Youtube. Only response with a dictionary of the 5 songs and nothing else.';
  console.log(artist1Input);
  console.log(artist2Input);
  console.log(artist3Input);

  const response1 = await sendChatMessage(artist1Input);
  console.log(response1);
  const response2 = await sendChatMessage(artist2Input);
  console.log(response2);
  const response3 = await sendChatMessage(artist3Input);
  console.log(response3);


  // Process the received data and send a response
  const responseData = {
    message: 'Received the POST request successfully',
    responseOne: response1,
    responseTwo: response2,
    responseThree: response3
  };

  res.json(responseData);
});

app.post('/api/data',async (req, res) => {
  console.log("RAW REQUEST BODY " + req.body.artist);
  DB.addArtistsSongs(req.body);
  res.send("success");
})


// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// Update the sendChatMessage function
async function sendChatMessage(message) {
  const requestBody = {
    model: modelId,
    messages: [{ role: 'system', content: 'You are' }, { role: 'user', content: message }]
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Request failed with status code ' + response.status);
    }

    const { choices } = response.data;

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

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


