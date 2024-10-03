import React, { useEffect, useState } from 'react';
import Header from '../../../Components/header';
import styles from './approvalData.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import ErrorModal from '../../../Components/ErrorMessage';
import { Loader } from "../../../Components/common/Loader"
function CongratulationsPage() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = localStorage.getItem('accessToken')

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
    const { user } = useSelector((state) => state.auth);
    const userFirstName = user.first_name
    const loan_Amount = searchParams.get('loanAmount');
    const borrowerNames = searchParams.get('borrowerNames') || "";
    const CustomerNames = [userFirstName, borrowerNames];
    let customerNameString = '';

    if (borrowerNames) {
        const names = borrowerNames.split(',');
        console.log("names:", names)
        if (names[0].includes("&")) {
            customerNameString = `${userFirstName} , ${names}`;
            console.log(1)
        }
        else if (names.length === 1) {
            customerNameString = `${userFirstName} & ${names}`;
            console.log(2)

        }
        else if (names.length > 1) {
            customerNameString = `${userFirstName} , ${names}`;
        }
        else if (names.pop().includes("&")) {
            customerNameString = `${userFirstName} , ${names}`;
            console.log(4)

        }


    } else {
        customerNameString = userFirstName;
    }

    console.log(customerNameString);


    console.log("customerNameString:", customerNameString);


    console.log("customerNameString:", customerNameString);

    console.log(customerNameString)
    console.log("cus:", CustomerNames)

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
                    "customerName": customerNameString,
                    "loan_amount": loan_Amount,
                    "property_type": property_type_occupy,
                    "loan_program": 'Business',
                    "down_payment": down_payment,
                    "purchase_price": purchase_price
                };
                const response = await axios.post(
                    "https://api.oqteq.com/api/v1/pdf/generate",
                    requestDataPdf,
                    {
                      responseType: 'arraybuffer',
                      withCredentials: true,
                      headers: {
                        Authorization: token,
                      },
                    }
                  );
                console.log(response.data)
                setPdfData(response.data);
                setIsLoading(false); // Set loading state to false
                setIsDisabled(false); // Enable the download button

            } catch (error) {
                if (error?.response) {
                    const { status } = error.response;
                    if (status === 404) {
                        setIsErrorModalOpen(true);
                        setApiErrorMessage(error.response.data.message);
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
            question: "What is the difference between Pre-qualification VS Pre-Approval?",
            answer: "Pre-qualification is an initial estimate of borrowing potential without a credit check, while pre-approval is a more concrete credit-checked agreement on the loan amount and potential rate from a lender.",
        },
        {
            question: "Should I get a Pre-approval letter or Pre-Qualification is sufficient?",
            answer: "For a stronger position in home buying, especially in competitive markets, a pre-approval letter is preferred as it indicates a more in-depth review and commitment from the lender. However, for a casual understanding of your borrowing potential, pre-qualification might suffice",
        },
        {
            question: "What are the steps involved in Pre-Approval and how long does it take?",
            answer: "Pre-approval involves submitting financial documents and a credit check by the lender to determine your loan eligibility. The process typically takes a few days to a week, depending on the lender and the completeness of submitted documents.",
        },
        {
            question: "Do you need a credit check for Pre-Approval?",
            answer: "Certainly, pre-approval generally requires a credit check to gauge your financial reliability and set loan conditions. Nonetheless, this doesn't always influence your credit score. At Oqvest, our approach involves a soft inquiry, ensuring your credit remains intact. ",
        },
        // Add more questions and answers here
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
                            You have been pre-qualified for{' '}
                            <span className={styles.moneyColor}>{formatCurrency(loan_Amount)}</span>
                        </h2>
                        <h2 className='fw-semibold  text-center mb-3 px-5'> Act now to secure your dream home by sending in your documents for swift pre-approval
                        </h2>
                    </div>
                    <div className="container p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <div className='w-100   d-flex flex-column  justify-content-center align-items-center   mt-5'>
                                    <h6 className='w-100'>
                                        Download your pre-qualified letter below:
                                    </h6>
                                    <p className='p-4 add-files  mt-3'>
                                        {isLoading ? (
                                            <span className='loader    w-100'>
                                                <Loader />
                                            </span>
                                        ) : (
                                            <label
                                                onClick={handleDownloadPdf}
                                                htmlFor='fileInput'
                                                className={`download-from-here d-flex m-0 justify-content-center py-3 align-items-center text-decoration-none w-100 ${isDisabled ? 'disabled' : ''}`}>
                                                <img height='25px' width='25px' src='./assets/images/pdf.png' alt='icon-plus' />
                                                <p className=''>
                                                    <span className='txt-14 w-100 ps-1 text-primary text-bold '>
                                                        Download Your Pre-Qualification Letter
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
                                                            What is the difference between Pre-qualification VS Pre-Approval?</h3>
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
                                                                Choosing Oqvest for your pre-approval comes with several key advantages:

                                                                <ul className='mt-2'>
                                                                    <li className='list-ans'>
                                                                        <span className='color-pink fw-semibold'>
                                                                            100% Success Rate:</span>
                                                                        We proudly maintain a flawless track record – every pre-approval issued by us thus far has successfully led to a loan.

                                                                    </li>
                                                                    <li className='list-ans'>
                                                                        <span className='color-pink fw-semibold'>
                                                                            Lowest Industry Rates: </span>
                                                                        Our advanced technology meticulously scans thousands of options, ensuring you access some of the most competitive rates available in the industry.

                                                                    </li>
                                                                    <li className='list-ans'>
                                                                        <span className='color-pink fw-semibold'>
                                                                            Total Control: </span>
                                                                        You're in charge. Whether you're actively shopping or making changes, you can instantly regenerate your pre-approval by logging in. This convenience is available to you 24/7, saving you time and eliminating unnecessary delays.

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
                <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                    <Link to="/pre-approval-document-upload" className='mt-2'>
                        <button
                            type="submit"
                            onClick={() => {
                                localStorage.setItem("editId", "");
                                localStorage.setItem('setDisableUpload', true)
                                localStorage.setItem('setStatusActive', "");
                            }}
                            className="next-btn-fill w-100 color-pink">
                            Bid Confidently: Get Pre-Approved!
                        </button>
                    </Link>
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

export default CongratulationsPage;