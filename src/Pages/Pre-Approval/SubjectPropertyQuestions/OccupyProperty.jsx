// import React, { useState } from 'react'
// import Header from '../../../components/header'
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from "react-router";
// // import axios from "axios";
// // import { Fill_QUESTIONS } from '../../../constants';
// import { Loader } from '../../../components/common/Loader';
// function OccupyProperty() {
//     const [errorField, setErrorField] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const navigate = useNavigate();
//     const location = useLocation();
//     const stateValues = location.state || {};

//     const initialValues = {
//         loan_number: localStorage.getItem('loanNo.'),
//         occupy_property: '',
//     };

//     const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             if (values.occupy_property === '') {
//                 setErrorMessage('This field is required.');
//                 setErrorField(true);
//                 return; // Exit early if there's an error
//             } else {
//                 setErrorMessage('');
//                 setErrorField(false);
//             }
//             navigate('/add-property-type', { state: { ...stateValues, ...values } });


//             // try {
//             //     const response = await axios.put(loan_number ? `${Fill_QUESTIONS}/${loan_number}` : `${Fill_QUESTIONS}`, values);
//             //     if (response?.status === 200) {
//             //         navigate("/add-property-type");
//             //     }
//             //     if (response?.status === 201) {
//             //         navigate("/add-property-type");
//             //     }
//             //     console.log("🚀 ~ file: Purchase Price:", response);
//             // } catch (error) {
//             //     setErrorField(true);
//             //     console.log("🚀 ~ error:", error);
//             // }
//         },
//     });
//     console.log('Current values:', values);

//     console.log('Gathered values:', {
//         ...stateValues, // Values from the first page
//         ...values,      // Values from the current page
//       });

// import React, { useState, useEffect } from 'react';
// import Header from '../../../components/header';
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from 'react-router';
// import { Loader } from '../../../components/common/Loader';

// function OccupyProperty() {
//     const [errorField, setErrorField] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const initialValues = {
//         loan_number: localStorage.getItem('loanNo.') || '',
//         occupy_property: localStorage.getItem('occupyProperty') || '',
//     };

//     const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             if (values.occupy_property === '') {
//                 setErrorMessage('This field is required.');
//                 setErrorField(true);
//                 return;
//             } else {
//                 setErrorMessage('');
//                 setErrorField(false);
//             }

//             localStorage.setItem('occupyProperty', values.occupy_property);

//             navigate('/add-property-type', { state: { ...values } });
//         },
//     });

//     useEffect(() => {
//         localStorage.setItem('occupyProperty', values.occupy_property);
//     }, [values.occupy_property]);


//     return (
//         <>
//             {isSubmitting && <Loader />}
//             <Header />
//             <section className="income-section row d-flex justify-content-center mt-5">
//                 <form onSubmit={handleSubmit}>
//                     <div className="income-source-container w-100 d-flex justify-content-center  flex-column  align-items-center">
//                         <h2 className='text-bold'>How will you occupy the property?</h2>

//                         <div className="income-info-box  mt-5 width-30">
//                             <div className="table-header mb-2">
//                                 <h5>Occupancy Type</h5>
//                             </div>
//                             <div>
//                                 <span></span>
//                                 <div className="mb-3 d-flex justify-content-start align-items-center -radius">
//                                     <input
//                                         className='ps-4 p-4 w-100   m-0  outline-0'
//                                         name="occupy_property"
//                                         id="occupy_property"
//                                         placeholder="Choose Occupancy Type"
//                                         value={values.occupy_property}
//                                         onChange={handleChange}
//                                     />
//                                     <div className='bkg-grey  p-4 m-0 '>
//                                         <img className=" m-2" width='15px' height='10px' src='/assets/images/Pathdown.png' />
//                                     </div>
//                                 </div>
//                                 {errorField && (
//                                     <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
//                                         {errorMessage}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="d-none d-lg-block">
//                             <img
//                                 src="./assets/images/rectangle-right.png"
//                                 className="position-absolute"
//                                 style={{ right: 0, top: 25 }}
//                                 width="18%"
//                                 alt="rectangle"
//                             />
//                         </div>
//                         <div className="mt-5 bg-white d-flex justify-content-center gap-3">
//                             <a>  <button
//                                 className="back-btn btn1"
//                                 type="button"
//                                 onClick={() => {
//                                     window.history.back(); // Navigate back one step
//                                 }}
//                             >
//                                 Back
//                             </button>
//                             </a>
//                             <a href="">
//                                 <button type="submit" className="next-btn-fill">Next</button>
//                             </a>
//                         </div>
//                     </div>
//                 </form>

//             </section>
//         </>
//     )
// }

// export default OccupyProperty



import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useNavigate } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import { Link } from 'react-router-dom';

function OccupyProperty() {
    const [selectedCard, setSelectedCard] = useState(localStorage.getItem('occupyProperty') || '');
    const [errorField, setErrorField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('occupyProperty', selectedCard);
    }, [selectedCard]);

    const handleCardClick = (cardName) => {
        setSelectedCard(cardName); 
        setErrorField(false);
        setErrorMessage('');
    };

    const handleNextClick = () => {
        if (selectedCard === '') {
            setErrorMessage('Please select an occupancy type.');
            setErrorField(true);
        } else {
            setErrorMessage('');
            setErrorField(false);
            navigate('/add-property-type', { state: { occupy_property: selectedCard } });
        }
    };

    return (
        <>
            {/* <Loader /> */}
            <Header />
            <section className="income-section row d-flex justify-content-center mt-5 mb-4">
                <div className="income-source-container w-100 d-flex justify-content-center  flex-column  align-items-center">
                <h1 className='text-bold col-md-9  text-center'> Determining  <span className="txt-secondary"> Occupancy
                    </span> <span className="txt-primary"> Details</span></h1>
                    <p className="mx-auto px-3 text-muted text-center col-md-9">
                        To proceed with your Pre-Approval, we need some specifics. Starting with the purchase price of the property you're interested in. This information will aid us in tailoring the right Pre-Approved amount for you.
                    </p>               
                    <h1 className='text-bold col-md-9  mt-2 text-center py-4'> Occupancy Type</h1>
                         <div className='w-100  d-flex justify-content-center  mb-5'>
                        <div className="occupancy-cards d-flex w-75  justify-content-center flex-wrap">
                            <div
                                className={` p-4 py-4 m-3 bg-white form-occupy-cards text-decoration-none text-dark occupancy-card ${selectedCard === 'Primary Home' ? 'selected' : ''}`}
                                onClick={() => handleCardClick('Primary Home')}
                            >
                                <img height="40px" width="40px" src="./assets/icons/primaryOccupy.png" alt="" />
                                <span className="text-bold fw-semibold txt-14 mt-3">Primary Home</span>
                            </div>
                            <div
                                className={` p-4 py-4   m-3 bg-white form-occupy-cards text-decoration-none text-dark occupancy-card d-flex justifty-content-center  ${selectedCard === 'Secondary Home' ? 'selected' : ''}`}
                                onClick={() => handleCardClick('Secondary Home')}
                            >
                                <img height="40px" width="40px" src="./assets/icons/secondaryOccupy.png" alt="" />
                                <span className="text-bold fw-semibold txt-14 mt-3 text-center">Secondary Home</span>

                            </div>
                            <div
                                className={`p-4 py-4  m-3 bg-white form-occupy-cards text-decoration-none text-dark occupancy-card ${selectedCard === 'Rental Property' ? 'selected' : ''}`}
                                onClick={() => handleCardClick('investment')}
                            >
                                <img height="40px" width="40px" src="./assets/icons/rentalOccupy.png" alt="" />
                                <span className="text-bold fw-semibold txt-14 mt-3">Rental Property</span>
                            </div>
                        </div>
                    </div>
                    {errorField && (
                        <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                            {errorMessage}
                        </span>
                    )}
                  
                    <div className="mt-5 bg-white d-flex justify-content-center gap-3">
                        <Link>
                            <button
                                className="back-btn btn1"
                                type="button"
                                onClick={() => {
                                    window.history.back(); // Navigate back one step
                                }}
                            >
                                Back
                            </button>
                        </Link>
                        <button type="button" className="next-btn-fill " onClick={handleNextClick}>
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OccupyProperty;