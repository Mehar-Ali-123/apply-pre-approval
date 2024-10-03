
import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import axios from 'axios';
import { Fill_QUESTIONS } from '../../../constants';
import { InputNumber } from 'primereact/inputnumber';
import ErrorModal from "../../../Components/ErrorMessage"
import { Link } from 'react-router-dom';
function EstimatedInsurance() {
    const [errorField, setErrorField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const token = localStorage.getItem('accessToken')


    const down_payment = localStorage.getItem('downPayment');
    const estimated_insurance = localStorage.getItem('estimatedInsurance');
    const property_type__data = localStorage.getItem('propertyType');
    const loan_amount = localStorage.getItem('loanAmount');
    const purchase_price = localStorage.getItem('purchasePrice');
    const occupy_property = localStorage.getItem('occupyProperty');
    const estimated_taxes = localStorage.getItem('estimatedTaxes');
    const navigate = useNavigate();

    const initialValues = {
        loan_number: localStorage.getItem('loanNo.') || '',
        estimated_insurance: localStorage.getItem('estimatedInsurance') || '',
    };

    const loan_number = localStorage.getItem("loanNo.");
    const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (values.estimated_insurance ===null || values.estimated_insurance < 0) {
                setErrorMessage('This field is required.');
                setErrorField(true);
                return;
            } else {
                setErrorMessage('');
                setErrorField(false);
            }
            localStorage.setItem('estimatedInsurance', values.estimated_insurance);
            try {
                // Construct the request data
                const requestData = {
                    "subj_property_purchase_price": purchase_price || "0",
                    "subj_loan_amount": loan_amount || "0",
                    "subj_occupy_property": occupy_property || "0",
                    "subj_property_type": property_type__data || "0",
                    "subj_estimated_down_payment": down_payment || "0",
                    "subj_estimated_taxes": estimated_taxes || "0",
                    "subj_estimated_insurance": estimated_insurance || "0",
                    "subj_estimated_monthly_rent": "8999999",
                    "subj_estimated_credit_score": "3422",
                    "subj_property_zip_code": "342",
                    "subj_estimated_purchase_price": "432",
                    "subj_isPrimary_house": "120"
                };

                console.log(requestData)

                // PUT request to update data
                const response = await axios.put(loan_number ? `${Fill_QUESTIONS}/${loan_number}` : `${Fill_QUESTIONS}`, requestData ,{
                    headers: {
                      Authorization: token,
                    },
                  });
                if (response?.status === 200) {
                    navigate('/pre-approval-selected-amount', { state: { ...values } });
                }
                if (response?.status === 201) {
                    navigate('/pre-approval-selected-amount', { state: { ...values } });
                }
                console.log("🚀 ~ file: data uploaded :", response);
            } catch (error) {
                if (error?.response) {
                    const { status } = error.response;
                    if (status === 400 || status === 404) {
                        setIsErrorModalOpen(true);
                        setApiErrorMessage(error.response.data.error);
                    } else if (status === 500) {
                        setIsErrorModalOpen(true);
                        setApiErrorMessage('little hiccup on our side');
                        // Display error message in modal
                    }
                } else {
                    // Handle other error cases as needed
                    console.log('Other error:', error);
                }
                setErrorField(true)
                console.log("🚀 ~ error:", error);
            }


        },
    });


    useEffect(() => {
        localStorage.setItem('estimatedInsurance', values.estimated_insurance);
    }, [values.estimated_insurance]);




    return (
        <>
            {isSubmitting && <Loader />}
            <Header />
            <section className="income-section row d-flex justify-content-center mt-5">
                <form onSubmit={handleSubmit} >
                    <div className="income-source-container col-md-9 mx-auto d-flex justify-content-center  flex-column  align-items-center">
                        <h1 className='text-bold text-center'>Annual    <span className="txt-secondary">Home Insurance </span><span className="txt-primary">Premium</span></h1>
                        <p className="mx-auto px-3 text-muted text-center ">
                            Your annual home insurance premium is a pivotal component of your housing expenses. Confirm the provided figure for a thorough and accurate pre-approval evaluation </p>
                        <div className="income-info-box mt-5">
                            <div className="table-header mb-2">
                                <h5 className='fw-semibold'>Annual Home Insurance</h5>
                            </div>
                            <div>
                                <span></span>
                                <div className="input  mb-3">
                                    <img className=" bi bi-currency-dollar ms-2" width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                                    {/* <input
                                        className='ps-3 '
                                        name="estimated_insurance"
                                        id="type_of_income"
                                        placeholder="Enter home insurance"
                                        value={values.estimated_insurance}
                                        onChange={handleChange}
                                    /> */}
                                    <InputNumber
                                        className='ps-3 w-100'
                                        name="estimated_insurance"
                                        id="type_of_income"
                                        placeholder="Enter estimated home insurance"
                                        value={values.estimated_insurance}
                                        onValueChange={(e) => handleChange({ target: { name: "estimated_insurance", value: e.value } })}
                                        locale="en-us"
                                        minFractionDigits={2}
                                    />
                                </div>
                                {errorField && (
                                    <p className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                                        {errorMessage}
                                    </p>
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
                            <button type="submit" onClick={() => {
                                localStorage.setItem('setSubjActive', "");
                                localStorage.setItem('setDisableStatus', true)

                            }} className="next-btn-fill w-100 color-pink">
                                Generate Pre-Approval
                            </button>
                        </div>
                    </div>
                </form>
            </section>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                errorMessage={apiErrorMessage}
            />
        </>
    )
}

export default EstimatedInsurance