import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../Components/header";
import axios from "axios";
import { GET_ALL_INCOME_RESOURCES } from "../../../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Spinner } from "react-bootstrap";
import ErrorModal from "../../../Components/ErrorMessage";
import { setActivePreApprovalDashboard } from "./DataSlice";
import { useDispatch } from "react-redux";
const SummaryOfIncomeInformation = () => {
  const token = localStorage.getItem('accessToken')

  const dispatch = useDispatch();

  function formatCurrency(amount) {
    // Convert the amount to a number if it's not already
    const numericAmount = Number(amount);

    // Check if the numericAmount is a valid number
    if (!isNaN(numericAmount)) {
      // Use toLocaleString to format the numericAmount as currency
      return numericAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return amount; // Return the original value if it's not a valid number
  }

  const [allIncomeSources, setAllIncomeSources] = useState(null);
  const [totalIncome, settotalIncome] = useState(null);
  const [addPrimaryHousebtnvalue, setAddPrimaryHousebtnvalue] = useState(JSON.parse(localStorage.getItem("addPrimaryHousebtnvalue")));
  const [loader, setLoader] = useState(false);
  const loan_number = localStorage.getItem("loanNo.");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [incomeSourceData, setIncomeSourceData] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(false);
  // useLayoutEffect(() => {
  //   if (allIncomeSources && allIncomeSources.length > 0) {
  //     dispatch(setActivePreApprovalDashboard(true)); // Dispatch action with true
  //   } else {
  //     dispatch(setActivePreApprovalDashboard(false)); // Dispatch action with false
  //   }

  // }, [allIncomeSources]); 
  useEffect(() => {
    localStorage.setItem('setIncomeSourceActive', false);
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', ""); 
    setLoader(true);
    getAllSourses()
    // setIsDataPresent(allIncomeSources && allIncomeSources.length > 0);
  }, []);
  const getAllSourses = async () => {
    try {
      await axios.get(`${GET_ALL_INCOME_RESOURCES}/${loan_number}`,{ withCredentials: true, headers: {
        Authorization: token,
      }}).then((res) => { 
        const { data } = res || {};
        // localStorage.setItem('allIncomeSourcesExist', data?.rows && data.rows.length > 0);
        localStorage.setItem('allIncomeSourcesExist',true);

        setAllIncomeSources(data?.rows);
        console.log(data?.rows)
        settotalIncome(data)
        setLoader(false);
      });
    } catch (error) {
      if (error?.response) {
        const { status } = error.response;
        if (status === 404) {
          setIsErrorModalOpen(true);
          setApiErrorMessage('404');
        } else if (status === 500) {
          setIsErrorModalOpen(true);
          setApiErrorMessage('500');
          // Display error message in modal
        } 
      } else {
        // Handle other error cases as needed
        console.log('Other error:', error);
      }

      console.log(error);
      setLoader(false);
    }
  }
  const deleteIncomeInformation = async (id, source) => {
    setLoader(true);
    try {
      await axios.delete(
        `https://api.oqteq.com/api/v1/income/remove/${source}/${id}`, { headers: {
          Authorization: token,
      }}  );
      const updatedIncomeSources = allIncomeSources.filter(income => income.id !== id);
      const updatedTotal = updatedIncomeSources.reduce((acc, income) => acc + income.total_amount, 0);
      setAllIncomeSources(updatedIncomeSources);
      settotalIncome(prevTotalIncome => ({ ...prevTotalIncome, total: updatedTotal }));
      await getAllSourses()
      setLoader(false);
    } catch (error) {
      if (error?.response) {error.response.data.message
        const { status } = error.response;
        if (status === 400) {
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
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <section className="income-section row">
          <div className="income-source-container col-10">
            <h2><span className="txt-secondary">Income </span><span className="txt-primary">Sources</span></h2>
            <p>
              Please review and confirm the income information for both yourself and any co-borrowers you're applying with, such as a spouse
            </p>
            <div className="income-info-box">
              <div class="table-header">
                <h2>Your income information</h2>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    window.location.replace("/select-income-sources");
                    localStorage.setItem("editId", "");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <ellipse
                    cx="16"
                    cy="15.5"
                    rx="12"
                    ry="11.625"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15.5H20"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.9997 11.625V19.375"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <table className="income-info-table">
                <thead>
                  <tr>
                    <th>SOURCE</th>
                    <th>TYPE</th>
                    <th>MONTHLY INCOME</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {allIncomeSources?.map((income, index) => (
                    <tr key={index}>
                      <td data-label="Source">{income?.source}
                        {/* {formatCurrency(income?.source)} */}
                      </td>
                      <td  className="px-3" data-label="TYPE">{`${income?.type_of_income ? income?.type_of_income : "" } `}</td>
                      <td data-label="MONTHLY INCOME">
                        {/* ${income?.net_monthly_income} */}
                        {formatCurrency(income?.net_monthly_income)}
                      </td>
                      <td data-label="ACTIONS">
                        <div className="d-flex justify-content-center">
                          <Link
                            onClick={() => { localStorage.setItem("editId", income?.id); }}
                            to={
                              income?.source === "Employment"
                                ? "/add-employment-sources"
                                : income?.source === "Business"
                                  ? "/business-income-info"
                                  : income?.source === "Other"
                                    ? "/other-business-income"
                                    : income?.source === "Rental"
                                      ? "/add-rental-income"
                                      : "/"
                            }
                            state={{ info: income }}
                          >
                            <img
                              src="./assets/icons/pencil.png"
                              alt="pencil"
                              role="button"
                            />
                          </Link>
                          <img
                            src="./assets/icons/x.png"
                            alt="x"
                            role="button"
                            onClick={() =>
                              deleteIncomeInformation(income?.id, income.source)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <hr className="d-sm-none" />
                  <tr>
                    <td></td>
                    <td></td>
                    <td><h6>Total Amount:</h6></td>
                    <td><div className="total d-flex justify-content-center">
                      <p>
                        <span>
                          <h5>{formatCurrency(totalIncome?.total)}</h5>
                        </span>
                      </p>
                    </div></td>
                  </tr>
                </tbody>
              </table>

              <div className="buttons mt-5 mb-5">
                &nbsp;&nbsp;
                <a href={addPrimaryHousebtnvalue ? "/add-primary-home-expenses" :
                  "/primary-home-expenses-summary"
                }>
                  <button className="btn2" onClick={() => {
                    localStorage.setItem("editId", "");
                    localStorage.setItem('setDisablePrimary', true)
                    localStorage.setItem('allIncomeSourcesExist',"true");

                  }}>Next</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        errorMessage={apiErrorMessage}
      />
    </>
  );
};

export default SummaryOfIncomeInformation;
