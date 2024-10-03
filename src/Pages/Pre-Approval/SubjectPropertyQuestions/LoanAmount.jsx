// import React, { useState } from 'react';
// import Header from '../../../components/header';
// import { useFormik } from 'formik';
// import { useNavigate, useLocation } from 'react-router';
// import { Loader } from '../../../components/common/Loader';

// function LoanAmount() {
//   const [errorField, setErrorField] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const stateValues = location.state || {};


//   const initialValues = {
//     loan_number: localStorage.getItem('loanNo.'),
//     loan_amount:  '', // Use purchase_price from state if available
//   };

//   const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
//     initialValues,
//     onSubmit: async (values) => {
//       if (values.loan_amount === '') {
//         setErrorMessage('This field is required.');
//         setErrorField(true);
//         return; // Exit early if there's an error
//       } else {
//         setErrorMessage('');
//         setErrorField(false);
//       }
//       navigate('/add-down-payment', { state: { ...stateValues, ...values } }); // Merge values from both pages
//     },
//   });


//   console.log('Current values:', values);

// console.log('Gathered values:', {
//     ...stateValues, // Values from the first page
//     ...values,      // Values from the current page
//   });

  import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import { InputNumber } from 'primereact/inputnumber';
import { Link } from 'react-router-dom';

function LoanAmount() {
  const [errorField, setErrorField] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    loan_number: localStorage.getItem('loanNo.') || '',
    loan_amount: localStorage.getItem('loanAmount') || '',
  };

  const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!values.loan_amount || values.loan_amount <= 0) {
        setErrorMessage('This field is required.');
        setErrorField(true);
        return;
      } else {
        setErrorMessage('');
        setErrorField(false);
      }

      localStorage.setItem('loanAmount', values.loan_amount);

      navigate('/add-down-payment', { state: { ...values } });
    },
  });

  useEffect(() => {
    localStorage.setItem('loanAmount', values.loan_amount);
  }, [values.loan_amount]);

    return (
        <>
            {isSubmitting && <Loader />}
            <Header />
            <section className="income-section row d-flex justify-content-center mt-5 ">
                <div className="income-source-container  d-flex justify-content-center   col-md-9  flex-column  align-items-center  ">
                <h1 className='text-bold'> Gathering Your <span className="txt-secondary">Purchase Price </span><span className="txt-primary"> Details </span></h1>
                <p className="mx-auto px-3 text-muted text-center ">
            To proceed with your Pre-Approval, we need some specifics. Starting with the purchase price of the property you're interested in. This information will aid us in tailoring the right Pre-Approved amount for you.
              </p>
                    <form onSubmit={handleSubmit}>
                        <div className="income-info-box mt-5">
                            <div className="table-header mb-2">
                                <h4 className='fw-semibold'>Loan Amount</h4>
                            </div>

                            <div className="input  mb-3 py-3 ">
                                <img className=" bi bi-currency-dollar ms-2" width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                                {/* <input
                                    className='ps-2 '
                                    name="loan_amount"
                                    id="type_of_income"
                                    placeholder="Enter Loan Amount"
                                    value={values.loan_amount}
                                    onChange={handleChange}
                                /> */}
                                <InputNumber
                          className='ps-2 '
                          name="loan_amount"
                          id="type_of_income"
                          placeholder="Enter Loan Amount"
                          value={values.loan_amount}
                        onValueChange={(e) => handleChange({ target: { name: "loan_amount", value: e.value } })}
                        locale="en-us"
                        minFractionDigits={2}
                      />
                            </div>
                            {errorField && (
                  <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                    {errorMessage}
                  </span>
                )}
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
                                <button className="next-btn-fill">Next</button> 
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoanAmount