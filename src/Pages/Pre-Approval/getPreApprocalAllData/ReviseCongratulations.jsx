import React, { useEffect, useState } from 'react';
import Header from '../../../Components/header';
import styles from './approvalData.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import ErrorModal from '../../../Components/ErrorMessage';

function ReviseCongratulationsPage() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const [pdfData, setPdfData] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState('');
    const down_payment = localStorage.getItem('downPayment');
    const property_type_occupy = localStorage.getItem('occupyProperty');
    const purchase_price = localStorage.getItem('purchasePrice');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    // const loan_Amount = localStorage.getItem('loan-Amount');
    // const borrower_name = localStorage.getItem('borrowerName');
    const loan_Amount = searchParams.get('loanAmount');
    const borrowerNames = searchParams.get('borrowerNames') || '';

    const [isOpen, setIsOpen] = useState(false);

    // const handleDownloadPdf = () => {
    //     try {
    //         if (!pdfData) {
    //             console.log('PDF data not available');
    //             return;
    //         }

    //         const blob = new Blob([pdfData], { type: 'application/pdf' });

    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = 'pre_approval.pdf';
    //         link.click();
    //     } catch (error) {
    //         console.error('Error downloading PDF:', error);
    //         if (error?.response) {
    //             const { status } = error.response;
    //             if (status == 400) {
    //               setIsErrorModalOpen(true);
    //               setApiErrorMessage('404');
    //             } else if (status === 500) {
    //               setIsErrorModalOpen(true);
    //               setApiErrorMessage('500');
    //               // Display error message in modal
    //             } 
    //           } else {
    //             // Handle other error cases as needed
    //             console.log('Other error:', error);
    //           }
    //     }
    // };

    // useEffect(() => {
    //     // Simulate API call with a delay
    //     const fetchPdfData = async () => {
    //         try {
    //             const requestDataPdf = {
    //                 "customerName": borrowerNames,
    //                 "loan_amount": loan_Amount,
    //                 "property_type": property_type_occupy,
    //                 "loan_program": 'Business',
    //                 "down_payment": down_payment,
    //                 "purchase_price": purchase_price
    //             };
    //             const response = await axios.post("https://api.oqvesthomeloans.com/api/v1/pdf/generate", requestDataPdf, {
    //                 responseType: 'arraybuffer', // Set responseType to handle binary data
    //             });
    //             console.log(response.data)
    //             setPdfData(response.data);
    //         } catch (error) {
    //             if (error?.response) {
    //                 const { status } = error.response;
    //                 if (status == 400) {
    //                   setIsErrorModalOpen(true);
    //                   setApiErrorMessage('400');
    //                 } else if (status === 500) {
    //                   setIsErrorModalOpen(true);
    //                   setApiErrorMessage('500');
    //                   // Display error message in modal
    //                 } 
    //               } else {
    //                 // Handle other error cases as needed
    //                 console.log('Other error:', error);
    //               }
    //             console.error('Error:', error);
    //         }
    //     };
    //     fetchPdfData()
    // }, []);
    const handleDownloadPdf = async () => {
        try {
            if (!pdfData) {
                console.log('PDF data not available');
                return;
            }

            const blob = new Blob([pdfData], { type: 'application/pdf' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'pre_approval.pdf';
            link.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            // Handle errors here
        }
    };

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                const requestDataPdf = {
                    "customerName": borrowerNames,
                    "loan_amount": loan_Amount,
                    "property_type": property_type_occupy,
                    "loan_program": 'Business',
                    "down_payment": down_payment,
                    "purchase_price": purchase_price
                };
                const response = await axios.post("https://api.oqteq.com/api/v1/pdf/generate", requestDataPdf, {
                    responseType: 'arraybuffer', // Set responseType to handle binary data
                });
                console.log(response.data)
                setPdfData(response.data);
                setIsLoading(false); // Set loading state to false
                setIsDisabled(false); // Enable the download button

            } catch (error) {
                if (error?.response) {
                    const { status } = error.response;
                    if (status === 404 || status === 400) {
                      setIsErrorModalOpen(true);
                      setApiErrorMessage(error.response.data.error.message);
                    } else if (status === 500) {
                      setIsErrorModalOpen(true);
                      setApiErrorMessage('little hiccup');
                      // Display error message in modal
                    }
                  } else {
                    // Handle other error cases as needed
                    console.log('Other error:', error);
                  }
                console.error('Error:', error);
                setIsLoading(false);

            }
        };
        fetchPdfData()
    }, []);


    function formatCurrency(amount) {
        const numericAmount = Number(amount);
        if (!isNaN(numericAmount)) {
            return numericAmount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
        return amount;
    }


    const questions = [
        {
            question: "Need a Different Pre-Approval Amount?",
            answer: "Feel free to request multiple pre-approvals, but ensure the total doesn't exceed your maximum pre-qualified limit.",
        },
        {
            question: "Seeking a Higher Pre-Approval Amount?",
            answer: "For financial changes since your application, contact your loan officer to reassess and potentially adjust your amount.",
        },
        {
            question: "What can my real estate agent access and can I add multiple agents?",
            answer: "Once added, your agent can view your pre-approval letter, see your maximum pre-approved loan amount, and generate multiple pre-approval letters up to that limit. You also have the flexibility to add more than one agent as required.",
        },
       
    ];
    const [isSecondOpen, setIsSecondOpen] = useState(false);

    const toggleSecondAccordion = () => {
        setIsSecondOpen(!isSecondOpen);
    };

    const AccordionItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="accordion-item border-bottom py-3 ">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <div className="accordion-question d-flex gap-2">
                        <h3 className={`fw-semibold ps-4 d-flex ${isOpen ? "hidden" : ""}`}>
                            <img
                                className={`accordion-icon pe-2 me-0  ${isOpen ? "hidden" : ""}`}
                                src="./assets/icons/plusQues.png"
                                alt="Plus Icon"
                            />
                            {question}
                        </h3>
                    </div>
                </div>
                {isOpen && (
                    <div className="accordion-content d-flex justify-content-start align-items-center mt-2">
                        <div className='col-md-1'>
                            <button className="close-accordion px-2" onClick={toggleAccordion}>
                                <img src="./assets/icons/minusQues.png" alt="" />
                            </button>
                        </div>
                        <div className="col-md-11 ps-0 ">
                            <p className="text-start left-border ms-2 ps-2 text-grey">{answer}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <>
            <div>
                <Header />
                <div>
                    <div className="income-source-container  w-100 d-flex justify-content-center  flex-column  align-items-center">
                        <img width='80px' height='80px' src="/assets/images/Group.png" alt="" />
                        <div className='mt-4 p-3'>
                            <img width='450px' height='100px' src="/assets/images/Congratulations.png" alt="" />
                        </div>
                        <h2 className='fw-semibold  mt-3 text-center'>
                        You have been pre-approved for {' '}
                            <span className={styles.moneyColor}>{formatCurrency(loan_Amount)}</span>
                        </h2>
                         
                    </div>
                    <div className="container p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <div className='w-100   d-flex flex-column  justify-content-center align-items-center   mt-5'>
                                    <h6 className='w-100'>
                                    Download your pre-approval letter below:                                    </h6>
                                    <p className='p-4 add-files  mt-3'>
                                        {isLoading ? (
                                            <span className='loader    w-100'>
                                                <div class="custom-loader mx-auto"></div>
                                            </span> // Replace this with your loader component
                                        ) : (
                                            <label
                                                onClick={handleDownloadPdf}
                                                htmlFor='fileInput'
                                                className={`download-from-here d-flex m-0 justify-content-center py-3 align-items-center text-decoration-none w-100 ${isDisabled ? 'disabled' : ''}`}>
                                                <img height='25px' width='25px' src='./assets/images/pdf.png' alt='icon-plus' />
                                                <p className=''>
                                                    <span className='txt-14 w-100 ps-1 text-primary text-bold '>
                                                    Download Your Pre-Approval Letter
                                                    </span>{' '}
                                                    {/* <span className='text-muted txt-14 ps-2'> click here to download</span> */}
                                                </p>
                                            </label>
                                        )}
                                    </p>
                                    {/* <h6 className='w-100 mt-3'>
                                        Upload docs on next screen to get your pre approval letter.                                     </h6> */}
                                </div>
                            </div>
                            <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">

                            <Link to="/revise-pre-approval" className='mt-2'>
                        <button
                            type="submit"
                            onClick={() => {
                                localStorage.setItem("editId", "");
                                localStorage.setItem('setDisableUpload', true)
                                localStorage.setItem('setStatusActive', "");
                            }}
                            className="next-btn-fill w-100 ">
                           Revise Your pre-approval
                        </button>
                    </Link>
                    </div>
                            <div className="container-fluid p-2">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-9 col-sm-11 ">
                                        <div className='mt-5 '><img className='mx-auto' src="./assets/icons/faqs.png" alt="  " /></div>
                                        <div className=' text-center mt-5'>

                                            {/* <div className="accordion-item">
                                                <div className="accordion-header" onClick={toggleAccordion}>
                                                    <div className="accordion-question d-flex gap-2">
                                                       
                                                        <h3 className='fw-semibold ps-4 d-flex'><img
                                                            className={`accordion-icon pe-2 me-0  ${isOpen ? "hidden" : ""}`}
                                                            src="./assets/icons/plusQues.png"
                                                            alt="Plus Icon"
                                                        />
                                                        What is the difference between Pre-qualification VS Pre-Approval?</h3>
                                                    </div>
                                                </div>
                                                {isOpen && (
                                                    <div className="accordion-content d-flex  justify-content-start  align-items-center mt-2">
                                                        <button className="close-accordion px-2" onClick={toggleAccordion}>
                                                            <img   width='50' src="./assets/icons/minusQues.png" alt="" />
                                                        </button>
                                                        <div>
                                                           <p className='text-start left-border ms-2 ps-2'>
                                                           Pre-qualification is an initial estimate of borrowing potential without a credit check, while pre-approval is a more concrete credit-checked agreement on the loan amount and potential rate from a lender
                                                           </p>

                                                        </div>

                                                    </div>
                                                )}
                                            </div> */}

                                            <div className="text-center mt-5">
                                                {questions.map((qna, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        question={qna.question}
                                                        answer={qna.answer}
                                                    />
                                                ))}
                                            </div>

                                            <div className="accordion-item py-3">
                                                <div className="accordion-header" onClick={toggleSecondAccordion}>
                                                    <div className="accordion-question d-flex  align-items-center gap-2">

                                                        <h3 className='fw-semibold ps-4 d-flex'><img
                                                            className={`accordion-icon pe-2 me-0  ${isSecondOpen ? "hidden" : ""}`}
                                                            src="./assets/icons/plusQues.png"
                                                            alt="Plus Icon"
                                                        />
                                                            If I have a question and I am not sure, what should I do?</h3>
                                                    </div>
                                                </div>
                                                {isSecondOpen && (
                                                    <div className="accordion-content d-flex  justify-content-start  align-items-center mt-2">
                                                        <div className="col-md-1">
                                                            <button className="close-accordion px-2" onClick={toggleSecondAccordion}>
                                                                <img src="./assets/icons/minusQues.png" alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="col-md-11 ps-0">
                                                            <p className='text-start left-border ms-2 ps-2'>
                                                            If you have questions or uncertainties, your loan officer is here to help.
                                                                <ul className='mt-2'>
                                                                    <li className='list-ans'>
                                                                         Schedule a complimentary consultation with your loan officer. 

                                                                    </li>
                                                                    <li className='list-ans'>
                                                                         Reach out at +1 (551) 225-0733 for assistance.

                                                                    </li>
                                                                    
                                                                </ul>
                                                            </p>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  
            </div>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                errorMessage={apiErrorMessage}
            />
        </>
    );
}

export default ReviseCongratulationsPage;