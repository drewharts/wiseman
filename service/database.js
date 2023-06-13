const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('wiseman')
const artistCollection = db.collection('artistsAndSongs');

//adding songs to database here
async function addArtistsSongs(songs) {
  
    const result = await artistCollection.insertOne(songs);
    return result;
  }

  //grabbing songs from database
function getSongs(topArtist) {
  const query = {Artist: topArtist};

  const cursor = artistCollection.find(query);

  return cursor.toArray;
}

module.exports = { addArtistsSongs, getSongs};


