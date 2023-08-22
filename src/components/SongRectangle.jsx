import React from 'react';
import './SongRectangle.css';

const Songrectangle = ({ children }) => {
  return (
        <div className = "song-rectangle-container">
          <img class = "image-component" src="https://github.com/drewharts/startup/blob/main/songRectangle.png?raw=true" alt="Rectangle" />
          <div className = "text-overlay">
            {children}
          </div>
        </div>

  );
};

export default Songrectangle;


