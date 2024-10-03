import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../../../Components/header'
import { Loader } from '../../../Components/common/Loader';
import { SELECTED_AMMOUNT, GET_ALL_INCOME_RESOURCES, ICOME_SUMMARY, ICOME_SUMMARY_LIABILITY } from '../../../constants';
import styles from "./approvalData.module.css";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import ErrorModal from '../../../Components/ErrorMessage'; 
import { useSelector } from 'react-redux';

function PreApprovalSelectedMoney() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
const user_name = user.first_name
    // const [allIncomeSources, setAllIncomeSources] = useState(null);
    // const [totalPreApproval, setTotalPreApproval] = useState(null);
    const [loader, setLoader] = useState(false);
    const [loanAmount, setLoanAmount] = useState(localStorage.getItem('loan-Amount') || '');
    const [borrowerName, setBorrowerName] = useState(localStorage.getItem('borrowerName') || '');
    const [loanAmountError, setLoanAmountError] = useState('');
    const [borrowerNames, setBorrowerNames] = useState([]);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const token = localStorage.getItem('accessToken')


    const loan_number = localStorage.getItem("loanNo.");
    const down_payment = localStorage.getItem('downPayment');
    const estimated_insurance = localStorage.getItem('estimatedInsurance');
    const property_type__data = localStorage.getItem('propertyType');

    // console.log(estimated_insurance,down_payment)

    // const [allIncomeSources, setAllIncomeSources] = useState(null);
    //     const [allLiabilitiesSources, setAllLiabilitiesSources] = useState(null);
    //     const [allPropertyHousingExpense, setAllPropertyHousingExpense] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState("");

    useLayoutEffect(() => {
        localStorage.setItem('setSubjActive', "");
    })
    useEffect(() => {
        fetchData()
        localStorage.setItem('borrowerNames', JSON.stringify(borrowerNames));
        localStorage.setItem('setSubjActive', "");

      }, [borrowerNames]);
    

    const fetchData = async () => {
        try {

            // Fetch all income sources first
            const response = await axios.get(`${GET_ALL_INCOME_RESOURCES}/${loan_number}`,{ withCredentials: true, headers: {
                Authorization: token,
              }});
            const totalIncome = response?.data?.total || '0';
            //   setAllIncomeSources(totalIncome);


            const response2 = await axios.get(`${ICOME_SUMMARY_LIABILITY}/${loan_number}`,{ withCredentials: true, headers: {
                Authorization: token,
              }});
            const totalLiabilities = response2?.data?.total || '0';
            //   setAllLiabilitiesSources(totalLiabilities);


            const response3 = await axios.get(`${ICOME_SUMMARY}/${loan_number}`,{ withCredentials: true, headers: {
                Authorization: token,
              }});
            const totalPropertyHouseExpense = response3?.data?.total || '0';
            //   setAllPropertyHousingExpense(totalPropertyHouseExpense);

            // Construct the request data
            const requestData = {
                loan_number: localStorage.getItem("loanNo."),
                Income: totalIncome || "0",
                property_type: property_type__data || "0",
                Liabilities: totalLiabilities || "0",
                Primary_Housing_Expense: totalPropertyHouseExpense || "0",
                Insurance: estimated_insurance || "0",
                Down_Payment: down_payment || "0",
            };
            console.log(requestData)
  
            const putResponse = await axios.put(`${SELECTED_AMMOUNT}`, requestData,{
                headers: {
                  Authorization: token,
                },
              });
            setSelectedAmount(putResponse.data.PreQualification_Amount);
            setLoader(false);
        } catch (error) {
            if (error?.response) {
                const { status } = error.response;
                if (status === 400 || status  ===404) {
                  setIsErrorModalOpen(true);
                  setApiErrorMessage(error.response.data.message);
                } else if (status === 500) {
                  setIsErrorModalOpen(true);
                  setApiErrorMessage('little hiccup on our side');
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

    const handleLoanAmountChange = (value) => {
        if (value <= selectedAmount) {
            setLoanAmount(value);
            setLoanAmountError('');
            localStorage.setItem('loan-Amount', value);
        } else {
            setLoanAmountError('Loan amount cannot be greater than the pre-approved amount.');
        }
    };


    const handleBorrowerNameChange = (value) => {
        setBorrowerName(value);
        localStorage.setItem('borrowerName', value);
    };
    // const handleButtonClick = () => {
    //     console.log("Button clicked"); // Check if the button click is registered
    //     if (loanAmountError === '') {
    //         console.log("Navigating"); // Check if navigation is being triggered
    //         navigate('/download-pdf');
    //     }
    // };


    // ... Rest of the component ...

    // const handleButtonClick = () => {
    //     if (loanAmountError === '') {
    //         console.log('Navigating');
    //         const formattedBorrowerNames = borrowerNames.join(", ");
    //                     const encodedNames = encodeURIComponent(formattedBorrowerNames);
    //         navigate(`/download-pdf?loanAmount=${loanAmount}&borrowerNames=${encodedNames}`);

    //         if (lastCommaIndex !== -1) {
    //             formattedBorrowerNames =
    //                 formattedBorrowerNames.substring(0, lastCommaIndex) +
    //                 " &" +
    //                 formattedBorrowerNames.substring(lastCommaIndex + 1);
    //         }

    //         navigate(`/download-pdf?loanAmount=${loanAmount}&borrowerNames=${formattedBorrowerNames}`);
    //     }
    // };

    const formatBorrowerNames = (names) => {
        if (names.length === 1) {
            return names[0];
        } else if (names.length === 2) {
            return names.join(" & ");
        } else {
            const lastTwoNames = names.slice(-2).join(" & "); 
            const remainingNames = names.slice(0, -2).join(", ");
            return `${remainingNames}, ${lastTwoNames}`;
        }
    };

    const handleButtonClick = () => {   
        if (loanAmountError === '') {
            const formattedBorrowerNames = formatBorrowerNames(borrowerNames);
            const encodedNames = encodeURIComponent(formattedBorrowerNames);
            navigate(`/download-pdf?loanAmount=${loanAmount}&borrowerNames=${encodedNames}`);
        }
    };

    const handleAddAnotherName = () => {
        if (borrowerName.trim() !== '') {
            const capitalizedBorrowerName = borrowerName.charAt(0).toUpperCase() + borrowerName.slice(1);
            const updatedBorrowerNames = [...borrowerNames, capitalizedBorrowerName ]; // Add user_name here
            setBorrowerNames(updatedBorrowerNames);
            setBorrowerName('');
            localStorage.setItem('borrowerNames', JSON.stringify(updatedBorrowerNames));
        }
    };

    const handleRemoveBorrower = (index) => {
        const updatedNames = [...borrowerNames];
        updatedNames.splice(index, 1);
        setBorrowerNames(updatedNames);
        localStorage.setItem('borrowerNames', JSON.stringify(updatedNames)); // Update borrowerNames in localStorage
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


    return (

        <>
            <div>
                <div className='row'>
                    <div className="income-source-container mt-3 w-100 d-flex justify-content-center  flex-column  align-items-center">
                        <img width='60px' height='60px' src="/assets/images/moneywing.png" alt="" />
                        <h1 className='text-bold mt-3 text-center'>You have been <span className='txt-primary'>Pre-Qualified</span> <br /> for <span className={styles.moneyColor}>{formatCurrency(selectedAmount)}
                        </span></h1>
                        {/* {allIncomeSources} <br />
                        {allPropertyHousingExpense} <br />
                        {allLiabilitiesSources} */}
                    </div>
                    <div className=' mx-auto d-flex flex-column  col-md-5 col-8   justify-content-center align-items-center   mt-4'>
                        <p className='fw-semibold text-start w-100 '>If you want another amount for pre-qualification, pleas enter below:</p>
                        <div className="input-group input-amount input-group-1 mb-1   w-100">
                            {/* Loan Amount Input */}
                            <span className="input-group-text m-0 p-0 input-group-1-text">
                                <img className=" " width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                            </span>
                            <InputNumber
                                type="text"
                                className="inputText w-75 ps-0 py-0"
                                placeholder="Enter your amount up to the max"
                                id="loan_amount"
                                style={{
                                    background: "white",
                                    fontSize: "14.187px",
                                    borderRadius: 11,
                                    color: "#797292",
                                    marginLeft: "-2px",
                                }}
                                value={loanAmount}
                                onValueChange={(e) => handleLoanAmountChange(e.value)}
                                locale="en-us"
                                minFractionDigits={2}
                            />
                        </div>
                        {loanAmountError && (
                            <div className='txt-12  mt-0 text-start w-100' style={{ color: 'red' }}>
                                {loanAmountError}
                            </div>
                        )}


                         {/* ADD ANOTHER FUNCTIONALITY  */}
                         <div className='d-flex flex-wrap w-100 p-0 mt-4  justify-content-start '>
                            {borrowerNames.map((name, index) => (
                                <div className=' w-100  '>
                                     <p className='fw-semibold text-start w-100  txt-14'>Additional Borrower</p>
                                    <div key={index} className=" input-amount input-group-1 mb-3   d-flex justify-content-between w-100 ">
                                       {/* <div  className='d-flex align-items-center py-2 ps-0'> */}
                                       <span className="input-group-text me-0 pe-0 m-0 py-0 ps-0 border input-group-1-text">
                                            <img className=" " width='25px' height='25px' src='/assets/icons/user1.png' />
                                        </span>
                                        <p className='txt-14 w-50 me-5 py-3 ps-2 ' > {name}</p>
                                       {/* </div> */}
                                        <a
                                            className="ps-3  d-flex align-items-center align-content-between text-decoration-none  me-3 ms-1 border-left  ps-1   gap-2 "
                                            onClick={() => handleRemoveBorrower(index)} type="button" // Add this line to trigger the addition
                                        >
                                            <img className='txt-sharp-red' height='20px' width='16px' src="./assets/icons/circle-minus.png" alt="icon-plus" />
                                            <p className="my-0 pe-4 m-0  txt-14 txt-sharp-red text-bold">Remove</p>
                                        </a>
                                    </div>
                                    {/* <div key={index} className=" p-1 px-2 m-1   box-shadow-borrower  d-flex justify-content-between align-items-center">
           <p className='txt-14 pe-3'> {name}</p>
            <a
                onClick={() => handleRemoveBorrower(index)}
               
            >
   <img className=" " width='18px' height='18px' src='/assets/icons/x.png' />
            </a>
        </div> */}
                                </div>
                            ))}
                        </div>

                        {/* ADD BORROWER NAME INPUT  */}
                        <p className='fw-semibold mt-3 text-start   w-100'>Please add names of the borrowers you want on pre-Qualaification</p>

                        <div className="input-group input-amount input-group-1 mb-3  border d-flex justify-content-start w-25">
                            {/* Borrower's Name Input */}
                            <span className="input-group-text m-0 p-0 ps-0 input-group-1-text">
                                <img className=" " width='25px' height='25px' src='/assets/icons/user1.png' />
                            </span>
                            <InputText
                                type="text"
                                className="inputText w-50 me-5  ps-3 py-3 "
                                placeholder="Enter Borrower's name"
                                id="borrower_name"
                                style={{
                                    background: "white",
                                    fontSize: "14.187px",
                                    borderRadius: 11,
                                    color: "#797292",
                                    marginLeft: "-2px",
                                }}
                                value={borrowerName}
                                onChange={(e) => setBorrowerName(e.target.value)} 
                                onKeyPress={(e) => {
                                    const charCode = e.which ? e.which : e.keyCode;
                                    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
                                        // Allow alphabetic characters
                                    } else {
                                        e.preventDefault(); // Prevent other characters
                                    }
                                }}
                            />
                            <Link
                                className="d-flex align-items-center align-content-between text-decoration-none  mx-auto border-left  ps-3 gap-2 "
                                onClick={handleAddAnotherName} type="button" // Add this line to trigger the addition
                            >
                                <img height='20px' width='16px' src="./assets/icons/circle-plus.png" alt="icon-plus" />
                                <p className="my-0 p-0 m-0  txt-14 text-primary text-bold">Add another</p>
                            </Link>
                        </div>
                       


                    </div>
                </div>
                <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                    <div>
                        <button onClick={handleButtonClick} type="button" className="next-btn-fill w-100 color-pink">Get your Pre-qualification letter</button>
                    </div>
                </div>
            </div>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                errorMessage={apiErrorMessage}
            />
        </>
    )
}

export default PreApprovalSelectedMoney