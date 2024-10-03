// import React, { useState } from 'react'
// import Header from '../../../components/header'
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from "react-router";
// import axios from "axios";
// import { Fill_QUESTIONS } from '../../../constants';

// import { Loader } from '../../../components/common/Loader';
// function PropertyType() {

//     const [errorField, setErrorField] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');


//     const initialValues = {
//         loan_number: localStorage.getItem("loanNo."),
//         // customer_name: "james Ted with loan_number",
//         property_type: "",
//     };

//     // const state = useLocation().state;
//     const info = useLocation().state || {};


//     const location = useLocation();
//     const stateValues = location.state?.values || {};
//     console.log('State Values:', stateValues);
//     const loan_number = localStorage.getItem("loanNo.");


//     //   const id = info?.info?.id;
//     const navigate = useNavigate();

//     const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             console.log("🚀 ~ file:  ~ onSubmit: ~ values:", values);

//             if (values.property_type === '') {
//                 setErrorMessage('This field is required.');
//                 setErrorField(true);
//                 return; // Exit early if there's an error
//               } else {
//                 setErrorMessage('');
//                 setErrorField(false);
//               }
//               try {
//                 const response = await axios.put(
//                     loan_number ? `${Fill_QUESTIONS}/${loan_number}` : `${Fill_QUESTIONS}`,
//                     values
//                 );
//                 if (response?.status === 200 || response?.status === 201) {
//                     navigate('/estimated-taxes', { state: { ...values } });
//                 }
//                 console.log("🚀 ~ file: Purchase Price:", response);
//             } catch (error) {
//                 setErrorField(true);
//                 console.log("🚀 ~ error:", error);
//             }
//         },
//     });

// import React, { useState, useEffect } from 'react';
// import Header from '../../../components/header';
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from 'react-router';
// import { Loader } from '../../../components/common/Loader';

// function PropertyType() {
//     const [errorField, setErrorField] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const initialValues = {
//         loan_number: localStorage.getItem('loanNo.') || '',
//        property_type: localStorage.getItem('propertyType') || '',
//     };

//     const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             if (values.property_type === '') {
//                 setErrorMessage('This field is required.');
//                 setErrorField(true);
//                 return;
//             } else {
//                 setErrorMessage('');
//                 setErrorField(false);
//             }

//             localStorage.setItem('propertyType', values.property_type);

//             navigate('/estimated-taxes', { state: { ...values } });
//         },
//     });

//     useEffect(() => {
//         localStorage.setItem('propertyType', values.property_type);
//     }, [values.property_type]);




//     return (
//         <>
//         {isSubmitting && <Loader />}
//             <Header />
//             <section className="income-section row d-flex justify-content-center mt-5">
//               <form onSubmit={handleSubmit}>
//                 <div className="income-source-container w-100 d-flex justify-content-center  flex-column  align-items-center">
//                     <h2 className='text-bold'>What is the property type?</h2>
//                     <div className="income-info-box mt-5 width-30">
//                         <div class="table-header mb-2">
//                             <h5>What is the property type?</h5>
//                         </div>
//                         <div >
//                             <span></span>
//                             <div className=" mb-3   d-flex justify-content-start align-items-center border-radius">
//                                 <input
//                                     className=' p-4 w-100   m-0  outline-0'
//                                     name="property_type"
//                                     id="type_of_income"
//                                     placeholder="Property Type"
//                                 value={values.property_type}
//                                 onChange={handleChange}
//                                 />
//                                 <div className='bkg-grey  p-4 m-0 '>
//                                     <img className=" m-2" width='15px' height='10px' src='/assets/images/Pathdown.png' />
//                                 </div>
//                             </div>
//                             {errorField && (
//                   <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
//                     {errorMessage}
//                   </span>
//                 )}
//                         </div>
//                     </div>
//                     <div className="d-none d-lg-block">

//                         <img
//                             src="./assets/images/rectangle-right.png"
//                             className="position-absolute"
//                             style={{ right: 0, top: 25 }}
//                             width="18%"
//                             alt="rectangle"
//                         />
//                     </div>

//                     <div className="mt-5 bg-white d-flex justify-content-center gap-3">
//                         <a>  <button
//                             className="back-btn btn1"
//                             type="button"
//                             onClick={() => {
//                                 window.history.back(); // Navigate back one step
//                             }}
//                         >
//                             Back
//                         </button>
//                         </a>
//                         <a>
//                             <button type="submit" className="next-btn-fill">Next</button>
//                         </a>
//                     </div>
//                 </div>
//                 </form>
//             </section>
//         </>
//     )
// }

// export default PropertyType

import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useNavigate } from 'react-router';
import { Loader } from '../../../Components/common/Loader';

function PropertyType() {
    const [selectedCard, setSelectedCard] = useState(localStorage.getItem('propertyType') || '');
    const [errorField, setErrorField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const propertyTypes = [
        { name: 'Single Family Home', image: './assets/icons/singleFamily.png' },
        { name: 'Condominium', image: './assets/icons/condominium.png' },
        { name: 'Townhome', image: './assets/icons/townHome.png' },
        { name: 'Multi-Family Home', image: './assets/icons/multiFamily.png' },
        { name: 'Manufactured or  Mobile Home', image: './assets/icons/manufactureHome.png' },
    ];

    useEffect(() => {
        localStorage.setItem('propertyType', selectedCard);
    }, [selectedCard]);

    const handleCardClick = (cardName) => {
        setSelectedCard(cardName);
    };

    
    const handleNextClick = () => {
        if (selectedCard === '') {
            setErrorMessage('Please select an occupancy type.');
            setErrorField(true);
        }  else {
            setErrorMessage('');
            setErrorField(false);
            navigate('/estimated-taxes', { state: { property_type: selectedCard } });
        }
    };

    return (
        <>
            <Header />
            <section className="income-section row d-flex justify-content-center mt-5">
            <h1 className='text-bold  text-center ' >Identifying   <span className="txt-secondary ">Property </span><span className="txt-primary">Type </span></h1>
            <p className="mx-auto text-muted text-center px-5">
            The type of property you're interested in can dictate certain loan conditions, including down payment requirement and available loan types. By classifying your desired property, we can better streamline your mortgage options
              </p>
                <div className="w-100 d-flex justify-content-center evenly mt-5 mb-5 ">
                    <div className="property-type-cards d-flex w-100 justify-content-center flex-wrap">
                        {propertyTypes.map((type) => (
                            <div
                            key={type.name}
                            className={`p-4 py-4 z-2 m-3 bg-white form-btn-cards text-decoration-none text-dark  property-type-card ${selectedCard === type.name ? 'selected' : ''}`}
                            onClick={() => handleCardClick(type.name)}
                        >
                            <img  width="40px" height="40px" src={type.image} alt={type.name} />
                            {/* <p className="fw-semibold fs-6 mt-2  px-2 py-1 text-center">{type.name}</p> */}
                            <span className="text-center text-bold fw-semibold txt-14 mt-3">{type.name}</span>

                        </div>
                        ))}
                    </div>
                </div>
                <div>
                {errorField && (
                        <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                            {errorMessage}
                        </span>
                    )}
                </div>
               
                <div className="mt-5 bg-white d-flex justify-content-center gap-3">
                    <a>
                        <button
                            className="back-btn btn1"
                            type="button"
                            onClick={() => {
                                window.history.back(); // Navigate back one step
                            }}
                        >
                            Back
                        </button>
                    </a>
                    <button type="button" className="next-btn-fill" onClick={handleNextClick}>
                        Next
                    </button>
                </div>
            </section>
        </>
    )
}

export default PropertyType;