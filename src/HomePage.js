import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="content">
        <div className="content-wrapper">
          <img
            src="Images/image-removebg-preview 1.png"
            alt="background-img"
            className="content-image"
          />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <div className="encryption">
            <span role="img" aria-label="lock"><img class="lock-icon" src="Images/Vector.png" alt="lock-icon"/></span> end-to-end encrypted
          </div>
        </div>
    </div>
    </div>
  );
}

export default HomePage;
