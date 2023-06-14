import React from 'react';

export function Results() {

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
        params.append("redirect_uri", "https://startup.drewharts.com/spotify.html");
        params.append("scope", "user-read-private user-read-email");
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
        params.append("redirect_uri", "https://startup.drewharts.com/spotify.html");
        params.append("code_verifier", verifier);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
    
        const { access_token } = await result.json();
        return access_token;
    };

    
    return(
        <main>
        <section id="top data">
          <h1>Results</h1>
          <p>Welcome <span id="displayName"></span></p>
          <div id="database placeholder"></div>
          <h2>Artists</h2>
          <ul>
            <li>
              <h3><span id="artistName1"></span></h3>
              <ul>
                <li><span id="artist1Song1"></span></li>
                <li><span id="artist1Song2"></span></li>
                <li><span id="artist1Song3"></span></li>
                <li><span id="artist1Song4"></span></li>
                <li><span id="artist1Song5"></span></li>
              </ul>
            </li>
            <li>
              <h3><span id="artistName2"></span></h3>
              <ul>
                <li><span id="artist2Song1"></span></li>
                <li><span id="artist2Song2"></span></li>
                <li><span id="artist2Song3"></span></li>
                <li><span id="artist2Song4"></span></li>
                <li><span id="artist2Song5"></span></li>
              </ul>
            </li>
            <li>
              <h3><span id="artistName3"></span></h3>
              <ul>
                <li><span id="artist3Song1"></span></li>
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
