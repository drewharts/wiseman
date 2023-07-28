import React from 'react';

const ArtistRectangle = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{children}</div>
      <img src="https://github.com/drewharts/startup/blob/main/OrangeArtistRectangle.png?raw=true" alt="Orange Rectangle" />
    </div>
  );
};

export default ArtistRectangle;

