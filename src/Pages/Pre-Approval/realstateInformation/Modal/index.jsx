// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       className="border-success"
//       show={props.show}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {props.children}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default MyVerticallyCenteredModal;


import React, { useState } from "react";
import "./style.css"
function MyVerticallyCenteredModal(props) {

  return (
    <>
      {props.show && (<div className=" w-100 h-100 border-2 glass-effect"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "20%",
          left: "50%",
          zIndex: 10,
          transform: "translate(-50%, -20%)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
        <div
          style={{
            borderRadius: "20px",
            width: "90%",
            height: "90%",
            backgroundColor: "#f0f0f0",
            // position: "fixed",
            // top: "20%",
            // left: "50%",
            // transform: "translate(-50%, -20%)",
            zIndex: 9999,
            overflow:"hidden",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div> 
            <iframe className="iframe"   width="100%" height="90%"  allowFullScreen src="https://rentcal.oqvesthomeloans.com" frameborder="0" ></iframe> 
           </div>
          <a
            onClick={props.onHide}
            style={{
              position: "absolute",
              top: " 60px",
              right: "8%",
              cursor: "pointer",
            }}
          >
            <img width="40px" height="30px" src="./assets/icons/x.png" alt="" />
          </a>
        </div>
      </div>
      )}
    </>
  );

}

export default MyVerticallyCenteredModal