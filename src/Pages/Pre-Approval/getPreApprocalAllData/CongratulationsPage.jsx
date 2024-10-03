import React, { useEffect, useState } from 'react'
import Header from '../../../Components/header'
import { Loader } from '../../../Components/common/Loader';
import { SELECTED_AMMOUNT, GET_ALL_INCOME_RESOURCES, ICOME_SUMMARY, ICOME_SUMMARY_LIABILITY } from '../../../constants';
import styles from "./approvalData.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ErrorModal from '../../../Components/ErrorMessage';


function CongratulationsPage() {
    // const [allIncomeSources, setAllIncomeSources] = useState(null);
    // const [totalPreApproval, setTotalPreApproval] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const loan_number = localStorage.getItem("loanNo.");
    const down_payment = localStorage.getItem('downPayment');
    const estimated_insurance = localStorage.getItem('estimatedInsurance');
    const property_type__data = localStorage.getItem('propertyType');

    // console.log(estimated_insurance,down_payment)

    // const [allIncomeSources, setAllIncomeSources] = useState(null);
    //     const [allLiabilitiesSources, setAllLiabilitiesSources] = useState(null);
    //     const [allPropertyHousingExpense, setAllPropertyHousingExpense] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState("");

    useEffect(() => {
        setLoader(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            // Fetch all income sources first
            const response = await axios.get(`${GET_ALL_INCOME_RESOURCES}/${loan_number}`);
            const totalIncome = response?.data?.total || ''; 

            const response2 = await axios.get(`${ICOME_SUMMARY_LIABILITY}/${loan_number}`);
            const totalLiabilities = response2?.data?.total || ''; 

            const response3 = await axios.get(`${ICOME_SUMMARY}/${loan_number}`);
            const totalPropertyHouseExpense = response3?.data?.total || ''; 

            // Construct the request data
            const requestData = {
                loan_number: localStorage.getItem("loanNo."),
                Income: totalIncome,
                property_type: property_type__data,
                Liabilities: totalLiabilities,
                Primary_Housing_Expense: totalPropertyHouseExpense,
                Insurance: estimated_insurance,
                Down_Payment: down_payment,
            };
            console.log(requestData)

            // PUT request to update data
            const putResponse = await axios.put(`${SELECTED_AMMOUNT}`, requestData);
            setSelectedAmount(putResponse.data.Approval_Amount);
            setLoader(false);
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
            setLoader(false);
        }
    };

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

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
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
    return (

        <>
            <div>
                {loader & <Loader />}
                <Header />
                <div>
                    <div className="income-source-container  w-100 d-flex justify-content-center  flex-column  align-items-center">
                        <img width='80px' height='80px' src="/assets/images/Group.png" alt="" />
                        <div className='mt-4 p-3'>  <img width='450px' height='100px' src="/assets/images/Congratulations.png" alt="" />
                        </div>
                        <h2 className='fw-semibold mt-3 text-center mb-3'>You have been pre-qualified for <span className={styles.moneyColor}>{formatCurrency(selectedAmount)}
                        </span>
                            Act now to secure your dream home by sending in your documents for swift pre-approval</h2>
                    </div>
                    <div className="container p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <div className='w-100   d-flex flex-column  justify-content-center align-items-center   mt-5'>
                                    <h6 className='w-100'>Download your pre-qualified letter below:</h6>
                                    <p className='p-4 add-files  mt-3'>
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
                                            multiple
                                            accept='.pdf'
                                        />
                                    </p>
                                    <div className="container p-2">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-12  col-sm-12  ">
                                                <div className='mt-4'>
                                                    {selectedFiles.map((file, index) => (
                                                        <div className='d-flex justify-content-between align-items-center w-100  mt-3' key={index}>
                                                            <p
                                                                className='text-muted txt-14 d-flex justify-content-start gap-2 me-5'
                                                                onClick={() => openModal(file)}
                                                                style={{ cursor: 'pointer' }}>
                                                                <img src='./assets/images/pdf.png' alt='' /> {file.name}
                                                            </p>
                                                            <button onClick={() => deleteFile(file)}>
                                                                <img src='./assets/icons/x.png' alt='' />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                    <Link to="/" className='mt-2'>
                        <button type="submit" className="next-btn-fill w-100 color-pink">Get Pre-Approval</button>
                    </Link>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Selected File Modal"
            >
                <button onClick={closeModal}>Close</button>
                {selectedFile && (
                    <div>
                        <h2>Selected File: {selectedFile.name}</h2>
                        <button onClick={() => deleteFile(selectedFile)}>Delete</button>
                        {/* Display additional file information here */}
                    </div>
                )}
            </Modal>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                errorMessage={apiErrorMessage}
            />
        </>
    )
}

export default CongratulationsPage