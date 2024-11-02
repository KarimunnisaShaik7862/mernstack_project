import React from 'react';
import './DonationCard.css';

const DonationCard = () => {
  return (
    <div className="donation-card">
      <h1>Feed a<br />Homeless<br />Person</h1>
      <p>Every meal shared is a step toward a brighter future.</p>
      <button>Donate $25</button>
    </div>
  );
};

export default DonationCard;
