import React from 'react';
import './SongRectangle.css';
import Loading from './loading'; // Import the Loading component

const Songrectangle = ({ children, loading }) => {
  return (
    <div className="song-rectangle-container">
      <img className="image-component" src="https://github.com/drewharts/startup/blob/main/songRectangle.png?raw=true" alt="Rectangle" />
      <div className="text-overlay">
        {loading ? (
          <Loading /> // Render the Loading component
        ) : (
          children // Render the children content
        )}
      </div>
    </div>
  );
};

export default Songrectangle;
