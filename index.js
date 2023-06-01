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

// PostArtists
apiRouter.post('/prevArtists', (req, res) => {
  artists = updateArtists(req.body, artists);
  res.send(artists);
});


const port = 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
