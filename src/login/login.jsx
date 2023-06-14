import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import '../app.css';
import {Spotify} from '../spotify/spotify';

// export function Login() {
//     return(
// 		<main>
// 		<h2>Welcome</h2>
// 		<p>Login to Wiseman</p>
// 		<form method="get" action="spotify.html">
// 		  <input type="text" id="name" placeholder="Your name here" />
// 		  <button type="submit" onClick="login()">Login</button>
// 		</form>
// 	  </main>
//     )
// }

export function Login() {
	let navigate = useNavigate();

	function login(e) {
		e.preventDefault();
		const name = e.target.elements.name.value;
		localStorage.setItem('userName',name);

		navigate('/Spotify');
	}

	return (
		<main>
			<h2>Welcome</h2>
			<p>Login to Wiseman</p>
			<form onSubmit={login}>
				<input type = "text" id="name" placeholder="Your name here"/>
				<button type="submit">Login</button>
			</form>
		</main>
	)
}

