const data = {
    key: "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"
  };

  const jsonData = JSON.stringify(data);

  const fs = require('fs');

fs.writeFile('data.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return;
  }
  console.log('JSON file has been created.');
});