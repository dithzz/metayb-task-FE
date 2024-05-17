import React, { useState } from 'react';

const JobCard = ({ selectedCard, painting }) => {

  return (
    <div style={{cursor: 'pointer'}} >
      <div className="card">
        <div className={`${selectedCard === painting.id ? 'selected' : ''} card-body`} >
          <h5 className="card-title">{painting.jobName}</h5>
          <p className="card-text">{painting.description}</p>
          <p className="card-text">ETA: {painting.eta} Hrs</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
