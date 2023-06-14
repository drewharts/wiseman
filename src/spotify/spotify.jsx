import React, {useEffect, useState} from 'react';

export function Spotify() {
    const [profile, setProfile] = useState(null);
    const clientId = "34e8bb8fea5945318f1e45de7e51b9b4"; // Replace with your client ID

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            getAccessToken(clientId,code).then(token => {
                fetchProfile(token).then(profileData => {
                    setProfile(profileData);
                });
            });
        }
    }, [clientId]);

    const fetchProfile = async (token) => {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        return await result.json();
    };

    const getAccessToken = async (clientId, code) => {
        const verifier = localStorage.getItem("verifier");
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "https://startup.drewharts.com/spotify");
        params.append("code_verifier", verifier);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
    
        const { access_token } = await result.json();
        return access_token;
    };

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
        params.append("redirect_uri", "https://startup.drewharts.com/spotify");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
    
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };


    return(
        <main>
        <h1>Login to Spotify</h1>
        {profile ? (
          <section id="profile">
            <h2>Logged in as <span id="displayName">{profile.display_name}</span></h2>
            <span id="avatar"><img src={profile.images[0].url} alt="Profile avatar"/></span>
            <ul>
              <li>User ID: <span id="id">{profile.id}</span></li>
              <li>Email: <span id="email">{profile.email}</span></li>
              <li>Spotify URI: <a id="uri" href={profile.external_urls.spotify}>{profile.uri}</a></li>
              <li>Link: <a id="url" href={profile.href}>{profile.href}</a></li>
              <li>Profile Image: <span id="imgUrl">{profile.images[0].url}</span></li>
            </ul>
          </section>
        ) : null}
      </main>
    )
}

