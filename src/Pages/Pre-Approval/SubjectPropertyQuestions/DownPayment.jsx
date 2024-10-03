// import React, { useState } from 'react';
// import Header from '../../../components/header';
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from 'react-router';
// import { Loader } from '../../../components/common/Loader';

// function DownPaymemnt() {
//   const [errorField, setErrorField] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const stateValues = location.state || {};


//   const initialValues = {
//     loan_number: localStorage.getItem('loanNo.'),
//     down_payment: '',
//   };

//     const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//         initialValues,
//         onSubmit: async (values) => {

//             if (values.down_payment === '') {
//                 setErrorMessage('This field is required.');
//                 setErrorField(true);
//                 return; // Exit early if there's an error
//               } else {
//                 setErrorMessage('');
//                 setErrorField(false);
//               }
//               navigate('/how-occupy-property', { state: { ...stateValues, ...values } }); // Merge values from both pages

//         },
//     });
//      console.log('Current values:', values);

//     console.log('Gathered values:', {
//         ...stateValues, // Values from the first page
//         ...values,      // Values from the current page
//       });

import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import "./styles.css"
import { Link } from 'react-router-dom';
function DownPaymemnt() {
    const [errorField, setErrorField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        loan_number: localStorage.getItem('loanNo.') || '',
        down_payment: localStorage.getItem('downPayment') || '',
    };

    const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (values.down_payment === '') {
                setErrorMessage('This field is required.');
                setErrorField(true);
                return;
            } else {
                setErrorMessage('');
                setErrorField(false);
            }

            localStorage.setItem('downPayment', values.down_payment);

            navigate('/how-occupy-property', { state: { ...values } });
        },
    });

    useEffect(() => {
        localStorage.setItem('downPayment', values.down_payment);
    }, [values.down_payment]);


    return (
        <>

            {isSubmitting && <Loader />}
            <Header />
            <section className="income-section row d-flex justify-content-center mt-5 ">
                <div className="income-source-container col-md-9  d-flex justify-content-center  flex-column  align-items-center">
                    <h1 className='text-bold'> Defining Your <span className="txt-secondary"> 
                    </span><span className="txt-secondary"> Down Payment</span></h1>
                    <p className="mx-auto px-3 text-muted text-center ">
                        To proceed with your Pre-Approval, we need some specifics. Starting with the purchase price of the property you're interested in. This information will aid us in tailoring the right Pre-Approved amount for you.
                    </p>
                    <form onSubmit={handleSubmit} className=' w-75 w-sm-100'>
                        <div className="  mt-5  d-flex justify-content-center flex-column">
                            <div className="  mb-2 w-75 w-sm-100  mx-auto">
                                <h5 className='fw-semibold mx-auto px-2'>Down Payment</h5>
                            </div>
                            <div className='col-md-12  px-2'> 
                                <span></span>
                                <div className=" mb-3 w-75 w-sm-100  mx-auto  d-flex  justify-content-start align-items-center border-radius">
                                    <div className='bkg-grey  p-4 m-0 '>
                                        <img className=" m-2" width='20px' height='20px' src='./assets/images/percentage.png' />
                                    </div>
                                    <input
                                        className='ps-4 p-4 w-100 down-input  shadow-none  m-0  outline-0'
                                        name="down_payment"
                                        id="type_of_income"
                                        placeholder="Enter percentage of down payment"
                                        value={values.down_payment}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorField && (
                                    <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                                        {errorMessage}
                                    </span>
                                )}
                            </div>

                        </div>

                        <div className="mt-5 bg-white d-flex justify-content-center gap-3">
                            <a>  <button
                                className="back-btn btn1"
                                type="button"
                                onClick={() => {
                                    window.history.back(); // Navigate back one step
                                }}
                            >
                                Back
                            </button>
                            </a>
                            <a>
                                <button type='submit' className="next-btn-fill">Next</button>
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default DownPaymemnt