import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'; // Changed here
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Results} from './results/results';


function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div>

        <header>
          <h1>Wiseman<sup>&reg;</sup></h1>
          <nav>
          </nav>
        </header>


        <main>
          <Routes>
            {/* <Route path = '/' element={<Login/>}/> */}
            {/* <Route path = '/spotify' index element={<Spotify/>}/> */}
            <Route path = '/' element={<Results/>}/>
            <Route path = '/*' element={<NotFound/>}/>
          </Routes>
        </main>

        <footer>
          <span className="text-reset">Author Name</span> {/* Changed here, use className instead of class */}
          <br />
          <a href="https://github.com/drewharts/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}
