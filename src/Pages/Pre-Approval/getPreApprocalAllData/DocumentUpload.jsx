import React, { useEffect, useState } from 'react';
import Header from '../../../Components/header';
import styles from './approvalData.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ErrorModal from '../../../Components/ErrorMessage';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import FileUpload from '../../../Components/common/FileUpload';

function DocumentUploadPage() {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const { user } = useSelector((state) => state.auth);
    const user_id = user.user_id
    const loan_number = localStorage.getItem("loanNo.")

    console.log("user & loan:", user_id, loan_number)
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    // const [pdfData, setPdfData] = useState(null);
    // const [selectedAmount, setSelectedAmount] = useState('');
    // const down_payment = localStorage.getItem('downPayment');
    // const property_type_occupy = localStorage.getItem('occupyProperty');
    // const purchase_price = localStorage.getItem('purchasePrice');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    // const loan_Amount = localStorage.getItem('loan-Amount');
    // const borrower_name = localStorage.getItem('borrowerName'); 


    const [selectedFile, setSelectedFile] = useState(null);


    const createFolder = async () => {
        try {
            const response = await axios.get(`https://api.oqteq.com/api/v1/doc/create/${loan_number}/${user_id}`);
            console.log(response);
            console.log("folder structure created successfully");
            setIsLoading(false);
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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        localStorage.setItem('setStatusActive', "");
        createFolder();
    }, []);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const openModal = (file) => {
        setSelectedFile(file);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedFile(null);
        setIsModalOpen(false);
    };

    const deleteFile = (file) => {
        setSelectedFiles(selectedFiles.filter((f) => f !== file));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            console.log('No files selected for upload.');
            return;
        }

        const formData = new FormData();
        formData.append('loan_number', loan_number);
        formData.append('user_id', 3); // You might need to change this
        formData.append('file_type', 'property');

        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post("https://api.oqteq.com/api/v1/doc/upload", formData);
            console.log('Files uploaded successfully:', response.data.message);
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const questions = [
        {
            question: "Can I get a Pre-Approval without submitting the required docs?",
            answer: "Pre-approval involves submitting financial documents and a credit check by the lender to determine your loan eligibility. The process typically takes a few days to a week, depending on the lender and the completeness of submitted documents.",
        },
        {
            question: "If I am applying for no income loan, what docs do I need to upload?",
            answer: "Certainly, pre-approval generally requires a credit check to gauge your financial reliability and set loan conditions. Nonetheless, this doesn't always influence your credit score. At Oqvest, our approach involves a soft inquiry, ensuring your credit remains intact.  ",
        },
    ];

    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const toggleSecondAccordion = () => {
        setIsSecondOpen(!isSecondOpen);
    };

    const [isThirdOpen, setIsThirdOpen] = useState(false);
    const toggleThirdAccordion = () => {
        setIsThirdOpen(!isThirdOpen);
    };

    const AccordionItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="accordion-item border-bottom py-3 ">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <div className="accordion-question d-flex gap-2 ">
                        <h3 className={`fw-semibold ps-3 d-flex ${isOpen ? "hidden" : ""}`}>
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
                    <div className="row accordion-content d-flex justify-content-start align-items-center mt-2 ">
                        <div className='col-md-1 pe-0 me-0'>
                            <button className="close-accordion px-2 " onClick={toggleAccordion}>
                                <img src="./assets/icons/minusQues.png" alt="" />
                            </button>
                        </div>
                        <div className='col-md-11  ps-0'>
                            <p className="text-start left-border  ms-2 ps-2  text-grey">{answer}</p>
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
                        <img width='80px' height='80px' src="/assets/images/file.png" alt="" />
                        {/* <div className='mt-4 p-3'>
                            <img width='450px' height='100px' src="/assets/images/Congratulations.png" alt="" />
                        </div> */}
                        <h2 className='fw-semibold mt-3 text-center mb-3'>
                            Simplify Pre-Approval:<span className={styles.moneyColor}> Upload Required Documents</span><span className="txt-primary"> Effortlessly.</span>
                        </h2>
                    </div>
                    <div className="container p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                <FileUpload loan_number={loan_number} />

                                {/* <div className='w-100   d-flex flex-column  justify-content-center align-items-center   mt-5'>
                                    <div className=' w-100'>
                                        <h6 className='w-100 fw-semibold '>
                                            Select type of document </h6>
                                        <div>
                                            <InputNumber
                                                className='w-100'
                                                placeholder='select '>
                                            </InputNumber>
                                        </div>
                                    </div>

                                    {selectedFiles.length === 0 ? ( <p className='p-4 add-files  mt-3'>
                                        <label
                                            htmlFor='fileInput'
                                            className='upload-from-here d-flex m-0 justify-content-center py-3  align-items-center text-decoration-none  w-100'>
                                            <img height='20px' width='16px' src='./assets/images/Path.png' alt='icon-plus' />
                                            <p className=''>
                                                <span className='txt-14 w-100 ps-1 text-primary text-bold '>Add another</span>{' '}
                                                <span className='text-muted txt-14 ps-2'> or click here to upload</span>
                                            </p>
                                        </label>
                                        <input
                                            type='file'
                                            id='fileInput'
                                            className='d-none'
                                            onChange={handleFileInputChange}
                                            accept='.pdf'
                                        />
                                    </p>) : null}
                                   
                                    <div className="container p-2">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-12  col-sm-12  ">
                                                <div className='mt-4'>
                                                    {selectedFiles.map((file, index) => (
                                                        <div className='d-flex justify-content-between align-items-center w-100  mt-3' key={index}>
                                                            <p
                                                                className=' txt-14 d-flex justify-content-start gap-2 me-5'
                                                                onClick={() => openModal(file)}
                                                                style={{ cursor: 'pointer' }}>
                                                                <img src='./assets/images/pdf.png' alt='' /> {file.name}
                                                            </p>
                                                            <div className='d-flex  flex-end'>
                                                                <button className='d-flex  px-0' onClick={() => handleUpload()}>
                                                                    <img src='./assets/icons/cloud.png' alt='' /><span className='txt-sky px-1'>
                                                                        Upload
                                                                    </span>
                                                                </button>
                                                                <button className='d-flex px-0 ms-3' onClick={() => deleteFile(file)}>
                                                                    <img src='./assets/icons/x.png' alt='' /><span className='txt-sharp-red'>
                                                                        Delete
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="container-fluid p-2">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-9 col-sm-11 ">
                                        <div className='mt-5 '><img className='mx-auto' src="./assets/icons/faqs.png" alt="  " /></div>
                                        <div className=' text-center mt-5'>

                                            {/* <div className="accordion-item">
                                                <div className="accordion-header" onClick={toggleAccordion}>
                                                    <div className="accordion-question d-flex gap-2">
                                                       
                                                        <h3 className='fw-semibold ps-3 d-flex'><img
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
                                                <div className="accordion-item border-bottom py-3">
                                                    <div className="accordion-header" onClick={toggleSecondAccordion}>
                                                        <div className="accordion-question d-flex gap-2">
                                                            <h3 className='fw-semibold ps-3 d-flex'><img

                                                                className={`accordion-icon pe-2 me-0  ${isSecondOpen ? "hidden" : ""}`}
                                                                src="./assets/icons/plusQues.png"
                                                                alt="Plus Icon"
                                                            />
                                                                What is the difference between Pre-qualification VS Pre-Approval?</h3>
                                                        </div>
                                                    </div>
                                                    {isSecondOpen && (
                                                        <div className=" row accordion-content  d-flex  justify-content-start  align-items-center mt-2">
                                                            <div className='col-md-1 pe-0 me-0'>
                                                                <button className="close-accordion px-2 me-0" onClick={toggleSecondAccordion}>
                                                                    <img src="./assets/icons/minusQues.png" alt="" />
                                                                </button>
                                                            </div>
                                                            <div className='col-md-11 ps-0'>
                                                                <p className='text-start left-border ms-2 ps-2'>
                                                                    Choosing Oqvest for your pre-approval comes with several key advantages:
                                                                    <ul className='mt-2'>
                                                                        <li className='list-ans'>
                                                                            Last 2 years of W2 (for all employment income was entered)
                                                                        </li>
                                                                        <li className='list-ans'>
                                                                            Recent month of Paystub (for all employment income entered)
                                                                        </li>
                                                                        <li className='list-ans'>
                                                                            Any documents to support other income mentioned
                                                                        </li>
                                                                        <li className='list-ans'>
                                                                            YTD profit and loss summary (if business income was entered)
                                                                        </li>
                                                                        <li className='list-ans'>
                                                                            Submit last 2 month statement for assets that was entered to pre-qualify
                                                                        </li>
                                                                    </ul>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="accordion-item border-bottom py-3  mb-0">
                                                    <div className="accordion-header" onClick={toggleThirdAccordion}>
                                                        <div className="accordion-question d-flex gap-2">
                                                            <h3 className='fw-semibold ps-3 d-flex'><img

                                                                className={`accordion-icon pe-2 me-0  ${isThirdOpen ? "hidden" : ""}`}
                                                                src="./assets/icons/plusQues.png"
                                                                alt="Plus Icon"
                                                            />
                                                                If I have a question and I am not sure, what should I do?
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    {isThirdOpen && (
                                                        <div className=" row accordion-content  d-flex  justify-content-start  align-items-center mt-2">
                                                            <div className='col-md-1 pe-0 me-0'>
                                                                <button className="close-accordion px-2 me-0" onClick={toggleThirdAccordion}>
                                                                    <img src="./assets/icons/minusQues.png" alt="" />
                                                                </button>
                                                            </div>
                                                            <div className='col-md-11  ps-0'>
                                                                <p className='text-start left-border ms-2 ps-2'>
                                                                    If you have questions or uncertainties, your loan officer is here to help.
                                                                    <nav>
                                                                        <ul className='mt-2'>
                                                                            <li className='list-ans'>
                                                                                Schedule a complimentary consultation with your loan officer.
                                                                            </li>
                                                                            <li className='list-ans'>
                                                                                Reach out at +1 (551) 225-0733 for assistance.  </li>
                                                                        </ul>
                                                                    </nav>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {questions.map((qna, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        question={qna.question}
                                                        answer={qna.answer}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                    <Link 
                    // to="/documents-submitted" 
                    to="/status-pre-approved" 
                    className='mt-2' >
                        <button onClick={() => {
                            localStorage.setItem("editId", "");
                            localStorage.setItem('setDisableReviseStatus', true)
                            localStorage.setItem('setUploadActive', "");
                        }}
                            type="submit" className="next-btn-fill w-100 color-pink">
                            Get Pre-Approved!
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

export default DocumentUploadPage;