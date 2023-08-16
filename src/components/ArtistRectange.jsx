import React from 'react';
import './ArtistRectangle.css';

const ArtistRectangle = ({ title, imageSrc, overlayText }) => {
  return (
    <div className="artist-rectangle-container">
      <div className="image-container">
        <h1 className="image-title">{title}</h1>
        <img src="https://github.com/drewharts/startup/blob/main/OrangeArtistRectangle.png?raw=true" alt="Rectangle" />
        <div className="text-overlay">{overlayText}</div>
      </div>
    </div>
  );
};

export default ArtistRectangle;


