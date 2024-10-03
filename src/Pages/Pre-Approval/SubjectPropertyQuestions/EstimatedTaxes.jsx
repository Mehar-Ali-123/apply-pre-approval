
import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import { InputNumber } from 'primereact/inputnumber';
import { Link } from 'react-router-dom';

function EstimatedTaxes() {
    const [errorField, setErrorField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        loan_number: localStorage.getItem('loanNo.') || '',
        estimated_taxes: localStorage.getItem('estimatedTaxes') || '',
    };

    const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if(!values.estimated_taxes || values.estimated_taxes <= 0) {
                setErrorMessage('This field is required.');
                setErrorField(true);
                return;
            } else {
                setErrorMessage('');
                setErrorField(false);
            }

            localStorage.setItem('estimatedTaxes', values.estimated_taxes);

            navigate('/estimated-insurance', { state: { ...values } });
        },
    });

    useEffect(() => {
        localStorage.setItem('estimatedTaxes', values.estimated_taxes);
    }, [values.estimated_taxes]);



  return (
    <>
        {isSubmitting && <Loader />}
    <Header />
    <section className="income-section row d-flex justify-content-center mt-5">
       <form onSubmit={handleSubmit} >
        <div className="income-source-container col-md-9 mx-auto d-flex justify-content-center  flex-column  align-items-center">
            <h1 className='text-bold'>Annual <span className="txt-secondary">Property Tax  </span><span className="txt-primary">Amount </span></h1>
            <p className="mx-auto px-3 text-muted text-center ">
            Your annual property tax amount provides insights into recurring expenses associated with the property. Please review the entered amount to ensure accurate assessment in the pre-approval process
              </p>
            <div className="income-info-box mt-5">
                <div className="table-header mb-2">
                    <h5 className='fw-semibold'>Annual Property Tax </h5>
                </div>
                <div>
                    <span></span>
                <div className="input p-0 ps-3   m-0  mb-3">
                    <img className=" bi bi-currency-dollar ms-2"  width="25px" height="25px" src='/assets/images/currency-dollar.png' />
                    {/* <input
                        className='ps-3 p-4 w-100 '
                        name="estimated_taxes"
                        id="type_of_income"
                        placeholder="Enter property taxes"
                        value={values.estimated_taxes}
                        onChange={handleChange}
                    /> */}
                    <InputNumber
                         className='ps-3 p-3 w-100 '
                         name="estimated_taxes"
                         id="type_of_income"
                         placeholder="Enter estimated property taxes"
                         value={values.estimated_taxes}
                        onValueChange={(e) => handleChange({ target: { name: "estimated_taxes", value: e.value } })}
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
            </div>
          

            <div className="mt-5 bg-white d-flex justify-content-center gap-3">
                <Link>  <button
                    className="back-btn btn1"
                    type="button"
                    onClick={() => {
                        window.history.back(); // Navigate back one step
                    }}
                >
                    Back
                </button>
                </Link>
                <a>
                    <button type='submit' className="next-btn-fill">Next</button>
                </a>
            </div>
        </div>
        </form>
    </section>
</>
  )
}

export default EstimatedTaxes