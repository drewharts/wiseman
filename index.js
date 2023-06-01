const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // GetArtists
apiRouter.get('/prevArtists', (_req, res) => {
  res.send(artsits);
});


const port = 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
