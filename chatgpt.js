const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Your API key
const apiKey = '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';

async function askQuestion(question) {
  const requestBody = {
    prompt: question,
    max_tokens: 100
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  const { choices } = await response.json();
  const answer = choices[0].text;

  return answer;
}

// Example usage
async function main() {
  const userQuestion = 'What is the capital of France?';
  const answer = await askQuestion(userQuestion);
  console.log('Answer:', answer);
}

main();
