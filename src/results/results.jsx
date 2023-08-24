import React, {useEffect, useState, useRef} from 'react';
import ArtistRectangle from '../components/ArtistRectange';
import Songrectangle from '../components/SongRectangle';
import Loading from '../components/loading'
export function Results() {
    
    const [profile, setProfile] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [firstTracks, setFirstTracks] = useState(null);
    const [songData, setSongData] = useState(null);
    const [artist1Songs, setArtist1Songs] = useState([]);
    const [artist2Songs, setArtist2Songs] = useState([]);
    const [artist3Songs, setArtist3Songs] = useState([]);
    //Loading state for the Songs
    const [loadingArtist1, setLoadingArtist1] = useState(true);
    const [loadingArtist2, setLoadingArtist2] = useState(true);
    const [loadingArtist3, setLoadingArtist3] = useState(true);

    const clientId = "34e8bb8fea5945318f1e45de7e51b9b4"; // Replace with your Spotify client ID

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            getAccessToken(clientId, code).then(token => {
                fetchTop(token).then(artistData => {
                  setTopArtists(artistData);
                  getTop3Artists(artistData).then(firstTracks => {
                    setFirstTracks(firstTracks);
                    fetchSongs(firstTracks); // Move the fetchSongs call here
                    console.log("FIRST TRACKS HERE: " + firstTracks);
                  });
                });
                fetchProfile(token).then(profileData => {
                  setProfile(profileData);
                });
              });
        }
  }, [clientId]);

    const getTop3Artists = async (topArtists) => {
        const artistJSON = JSON.stringify({
            artist1: topArtists.items[0].name,
            artist2: topArtists.items[1].name,
            artist3: topArtists.items[2].name
        })
        return artistJSON;
    }

    const generateCodeChallenge = async (codeVerifier) => {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    };

    const generateCodeVerifier = (length) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    const redirectToAuthCodeFlow = async (clientId) => {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);
    
        localStorage.setItem("verifier", verifier);
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "https://startup.drewharts.com");
        params.append("scope", "user-top-read");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
    
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    const getAccessToken = async (clientId, code) => {
        const verifier = localStorage.getItem("verifier");
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "https://startup.drewharts.com");
        params.append("code_verifier", verifier);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
    
        const { access_token } = await result.json();
        return access_token;
    };

    const fetchTop = async (token) => {
        const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        if (!result.ok) {
            console.error(`Error: HTTP ${result.status} - ${result.statusText}`);
            return null;
        }
    
        return await result.json();
    };


    const fetchProfile = async (token) => {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        return await result.json();
    };

    const fetchSongs = async (firstTracks) => {
        try {
          const response = await fetch("/api/chatGPT/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstTracks }), // Wrap firstTracks in an object to ensure it's sent as JSON
          });
      
          if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
          }
      
          const data = await response.json();
          //figure out a way to display data here
          console.log(data.responseOne);
          setArtist1Songs(processSongString(data.responseOne));
          setLoadingArtist1(false);
          console.log(data.responseTwo);
          setArtist2Songs(processSongString(data.responseTwo));
          setLoadingArtist2(false);
          console.log(data.responseThree);
          setArtist3Songs(processSongString(data.responseThree));
          setLoadingArtist3(false);
        } catch (error) {
          console.error("There was an error with the fetch:", error);
          // Handle the error
        }
      };

      function processSongString(songString) {
        // Split the string into individual songs
        const songList = songString.split("\n");
    
        // Remove any empty strings or whitespace from the list
        const filteredSongList = songList.filter(song => song.trim() !== '');
    
        // Sort the list of songs
        const sortedSongs = filteredSongList.sort();
    
        return sortedSongs;
    }
      


    return(
        <main>
          
        <section id="top data">
          <h2>Welcome {profile ? profile.display_name : ""}</h2>
          <div id="database placeholder"></div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <div className = "image-container">
                <div className = "header-image-container">
                  <h1>{topArtists ? topArtists.items[0].name : ""}</h1>
                  <ArtistRectangle>
                    <div className = "song-rectangle-container">
                      {loadingArtist1 ? (
                        <Loading /> // Render loading component while data is loading
                      ) : (
                          <>
                            <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[0] : ""} />
                            {/* Repeat for other songs */}
                          </>
                      )}
                      {/* <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[0] : ""} /> */}
                      <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[1] : ""} />
                      <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[2] : ""} />
                      <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[3] : ""} />
                      <Songrectangle children={artist1Songs.length > 0 ? artist1Songs[4] : ""} />
                    </div>
                  </ArtistRectangle>
                </div>
                <div className = "header-image-container">
                  <h1>{topArtists ? topArtists.items[1].name : ""}</h1>
                  <ArtistRectangle children = {artist2Songs ? artist2Songs : ""}>
                    <div className = "song-rectangle-container">
                        <Songrectangle children={artist2Songs.length > 0 ? artist2Songs[0] : ""} />
                        <Songrectangle children={artist2Songs.length > 0 ? artist2Songs[1] : ""} />
                        <Songrectangle children={artist2Songs.length > 0 ? artist2Songs[2] : ""} />
                        <Songrectangle children={artist2Songs.length > 0 ? artist2Songs[3] : ""} />
                        <Songrectangle children={artist2Songs.length > 0 ? artist2Songs[4] : ""} />
                      </div>
                  </ArtistRectangle>
                </div>
                <div className = "header-image-container">
                  <h1>{topArtists ? topArtists.items[2].name : ""}</h1>
                  <ArtistRectangle children={artist3Songs ? artist3Songs : ""}>
                    <div className = "song-rectangle-container">
                        <Songrectangle children={artist3Songs.length > 0 ? artist3Songs[0] : ""} />
                        <Songrectangle children={artist3Songs.length > 0 ? artist3Songs[1] : ""} />
                        <Songrectangle children={artist3Songs.length > 0 ? artist3Songs[2] : ""} />
                        <Songrectangle children={artist3Songs.length > 0 ? artist3Songs[3] : ""} />
                        <Songrectangle children={artist3Songs.length > 0 ? artist3Songs[4] : ""} />
                      </div>
                  </ArtistRectangle>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><span id="artist1Song2"></span></li>
                <li><span id="artist1Song3"></span></li>
                <li><span id="artist1Song4"></span></li>
                <li><span id="artist1Song5"></span></li>
              </ul>
            </li>
            <li>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><span id="artist2Song2"></span></li>
                <li><span id="artist2Song3"></span></li>
                <li><span id="artist2Song4"></span></li>
                <li><span id="artist2Song5"></span></li>
              </ul>
            </li>
            <li>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><span id="artist3Song2"></span></li>
                <li><span id="artist3Song3"></span></li>
                <li><span id="artist3Song4"></span></li>
                <li><span id="artist3Song5"></span></li>
              </ul>
            </li>
          </ul>
      </section>
      </main>
    )
}
