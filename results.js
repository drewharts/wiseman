// const axios=require('axios').default;
const clientId = "34e8bb8fea5945318f1e45de7e51b9b4"; // Replace with your Spotify client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const topArtists = await fetchTop(accessToken);
    const profile = await fetchProfile(accessToken);
    populateProfile(profile);
    populateUIArtists(topArtists);

    //make request to chatgpt endpoint

    //this is getting the required input for chatGPT
    const firstTracks = await getTop3Artists();

    fetch("/api/chatGPT/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: firstTracks,
    })
      .then(response => response.json())
      .then(data => {
        populateTracks(data.responseOne,data.responseTwo,data.responseThree);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the request
      });

}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://startup.drewharts.com/results.html");
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://startup.drewharts.com/results.html");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}


async function fetchTop(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=3&offset=0", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}


async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUIArtists(topArtists) {
    const name1 = topArtists.items[0].name;
    const name2 = topArtists.items[1].name;
    const name3 = topArtists.items[2].name;

    document.getElementById("artistName1").innerText = name1;
    document.getElementById("artistName2").innerText = name2;
    document.getElementById("artistName3").innerText = name3;

}

function populateProfile(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
}

function populateTracks(topArtist1,topArtist2,topArtist3) {
  console.log("TOP ARTIST 1" + topArtist1);
  console.log("TOP ARTIST 2" + topArtist2);
  console.log("TOP ARTIST 3" + topArtist3);

  if (topArtist1 != undefined) {
    const oneMatch1 = topArtist1.match(/1\. (.+)/);
    const oneMatch2 = topArtist1.match(/2\. (.+)/);
    const oneMatch3 = topArtist1.match(/3\. (.+)/);
    const oneMatch4 = topArtist1.match(/4\. (.+)/);
    const oneMatch5 = topArtist1.match(/5\. (.+)/);

    document.getElementById("artist1Song1").innerText = oneMatch1[0];
    document.getElementById("artist1Song2").innerText = oneMatch2[0];
    document.getElementById("artist1Song3").innerText = oneMatch3[0];
    document.getElementById("artist1Song4").innerText = oneMatch4[0];
    document.getElementById("artist1Song5").innerText = oneMatch5[0];
  } else {
    const oneMatch1 = "No available Data";
    const oneMatch2 = "No available Data";
    const oneMatch3 = "No available Data";
    const oneMatch4 = "No available Data";
    const oneMatch5 = "No available Data";

    document.getElementById("artist1Song1").innerText = oneMatch1;
    document.getElementById("artist1Song2").innerText = oneMatch2;
    document.getElementById("artist1Song3").innerText = oneMatch3;
    document.getElementById("artist1Song4").innerText = oneMatch4;
    document.getElementById("artist1Song5").innerText = oneMatch5;
  }
  
  if (topArtist2 != undefined) {
    const twoMatch1 = topArtist2.match(/1\. (.+)/);
    const twoMatch2 = topArtist2.match(/2\. (.+)/);
    const twoMatch3 = topArtist2.match(/3\. (.+)/);
    const twoMatch4 = topArtist2.match(/4\. (.+)/);
    const twoMatch5 = topArtist2.match(/5\. (.+)/);


    document.getElementById("artist2Song1").innerText = twoMatch1;
    document.getElementById("artist2Song2").innerText = twoMatch2;
    document.getElementById("artist2Song3").innerText = twoMatch3;
    document.getElementById("artist2Song4").innerText = twoMatch4;
    document.getElementById("artist2Song5").innerText = twoMatch5;
  } else {
    const twoMatch1 = "No available Data";
    const twoMatch2 = "No available Data";
    const twoMatch3 = "No available Data";
    const twoMatch4 = "No available Data";
    const twoMatch5 = "No available Data";

    document.getElementById("artist2Song1").innerText = twoMatch1;
    document.getElementById("artist2Song2").innerText = twoMatch2;
    document.getElementById("artist2Song3").innerText = twoMatch3;
    document.getElementById("artist2Song4").innerText = twoMatch4;
    document.getElementById("artist2Song5").innerText = twoMatch5;
  }
  if (topArtist3 != undefined) {
    const threeMatch1 = topArtist3.match(/1\. (.+)/);
    const threeMatch2 = topArtist3.match(/2\. (.+)/);
    const threeMatch3 = topArtist3.match(/3\. (.+)/);
    const threeMatch4 = topArtist3.match(/4\. (.+)/);
    const threeMatch5 = topArtist3.match(/5\. (.+)/);

    document.getElementById("artist3Song1").innerText = threeMatch1[0];
    document.getElementById("artist3Song2").innerText = threeMatch2[0];
    document.getElementById("artist3Song3").innerText = threeMatch3[0];
    document.getElementById("artist3Song4").innerText = threeMatch4[0];
    document.getElementById("artist3Song5").innerText = threeMatch5[0];
  } else {
    const threeMatch1 = "No available Data";
    const threeMatch2 = "No available Data";
    const threeMatch3 = "No available Data";
    const threeMatch4 = "No available Data";
    const threeMatch5 = "No available Data";

    document.getElementById("artist3Song1").innerText = threeMatch1;
    document.getElementById("artist3Song2").innerText = threeMatch2;
    document.getElementById("artist3Song3").innerText = threeMatch3;
    document.getElementById("artist3Song4").innerText = threeMatch4;
    document.getElementById("artist3Song5").innerText = threeMatch5;
  }  

        //send this data to DB
        const topArtistsArray = [match[0], match2[0],match3[0],match4[0],match5[0]];

        sendToDB(topArtistsArray);

        
}

async function sendToDB(topArtistBigString) {
  const checkingJSON = JSON.stringify({
    artist: document.getElementById("artistName1").innerText,
    songs: topArtistBigString
  });
  fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: checkingJSON
})
  .then(response => response.json())
  .then(result => {
    // Handle the response from the backend
    console.log(result);
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error('Error:', error);
  });

  // try {
  //   const response = await axios.post('/api/data', SongInfo);
  //   console.log(response.data);
  // } catch (error) {
  //   console.error('Error:', error);
  // }
}

async function getArtistTracks() {
    const userInput = 'Give me 5 ' + document.getElementById("artistName1").innerText + ' tracks that arent on Spotify or Apple Music but are on Youtube. Only response with a list of the 5 songs and nothing else.';
    //send this as post request to backend 
    //then plug in string to api (which is secure) and then grab asychnous chatgptresponse 
    // const reply = await sendChatMessage(userInput);

    // console.log(reply);
    // return reply;
    return userInput;

}

async function getTop3Artists() {
  const artistJSON = JSON.stringify({
    artist1: document.getElementById("artistName1").innerText,
    artist2: document.getElementById("artistName2").innerText,
    artist3: document.getElementById("artistName3").innerText
  })

  return artistJSON;
}

function updateWebSocket() {
    // Update the <h2> element
var headingElement = document.getElementById('favorite-artists-heading');
headingElement.textContent = "Drewharts's favorite Artists";

// Update the first <h3> element
var artist1Element = document.getElementById('artist1');
artist1Element.textContent = "Frank Ocean";

// Update the second <h3> element
var artist2Element = document.getElementById('artist2');
artist2Element.textContent = "Tom Misch";
}

