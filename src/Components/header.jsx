// import React from "react";
// import { useDispatch } from 'react-redux'; // Import the useDispatch hook
// import { authActions } from '../Features/authSlice'
// const Header = () => {
//   const dispatch = useDispatch(); // Initialize useDispatch here

//   const logoutFunc = () => {
//     dispatch(authActions.logout()); // Dispatch the logout action
//   };

//   return (
//     <>
//       <header className="">
//         <div className="logo">
//           <a href="/">
//             <img src="./assets/images/logo.png" alt="logo" />
//           </a>
//         </div>
//         <button className="border" onClick={logoutFunc}>Logout</button>
//       </header>
//     </>
//   );
// };

// export default Header;


import React from 'react'
import Navbar from '../Components/common/Navbar'
function header() {
  return (
    <>
      <header className="w-100  mt-0  ms-0 ">
{/* <Navbar/> */}
      </header>
    </>
  )
}
export default header