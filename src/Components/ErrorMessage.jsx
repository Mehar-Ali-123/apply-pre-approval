import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element as the app element for accessibility

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="API Error Modal"
      className="error-modal"
      overlayClassName="error-overlay"
    >
      <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
        <div className="error-content d-flex justify-content-center flex-column pt-0">
          <div className='d-flex justify-content-center  mb-3 m-0 p-0'>
            <img src="./assets/images/errorPic.png" />
          </div>
          <h2 className='mt-4 fw-semibold mt-3'><span className='txt-secondary'>Oops!</span> It seems we've encountered that  <span className='txt-primary'>{errorMessage || "400 error"}</span> Kindly give it another try</h2>
        </div>
        <button className="close-button" onClick={onRequestClose}>
          &#10005;
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;