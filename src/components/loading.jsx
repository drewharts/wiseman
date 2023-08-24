import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css'

const Loading = () => (
  <div className="loading-container">
    <ReactLoading type="spin" color="#1ed760" height={30} width={30} />
  </div>
);

export default Loading;
