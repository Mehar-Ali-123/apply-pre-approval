import React from 'react';

const Steps = ({ currentStep, steps }) => {
  return (
    <div className="steps-container">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index === currentStep ? 'current' : ''}`}>
          {index > 0 && <div className="line" />}
          <div className={`step-content ${index === currentStep ? 'success' : ''}`}>
            {index !== currentStep && <span className="step-number">{index + 1}</span>}
            {index === currentStep && <span className="tick">&#10004;</span>}
          </div>
          <div className={`step-label ${index === currentStep && 'text-green-600'}`}>{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
