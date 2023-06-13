const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Your API key
const apiKey = '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';

// The model ID for ChatGPT (e.g., "gpt-3.5-turbo")
const modelId = 'gpt-3.5-turbo';

import { topArtists } from "./results.js";

async function sendChatMessage(message) {
  const requestBody = {
    model: modelId,
    messages: [{ role: 'system', content: 'You are' }, { role: 'user', content: message }]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

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

// Example usage
async function main() {
  const userInput = 'Give me 5 Frank Ocean tracks that arent on Spotify or Apple Music';
  const reply = await sendChatMessage(userInput);
  console.log('ChatGPT Reply:', reply);
}

main();

function populateUIArtists() {
    const name1 = topArtists.items[0].name;
    const name2 = topArtists.items[1].name;
    const name3 = topArtists.items[2].name;

    document.getElementById("artistName1").innerText = name1;
    document.getElementById("artistName2").innerText = name2;
    document.getElementById("artistName3").innerText = name3;

}
