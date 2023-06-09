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

module.exports = { addArtistsSongs};


