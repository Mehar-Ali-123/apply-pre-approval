import React, { useEffect, useState } from "react";
import "./style.css";
import "@fontsource/poppins";
import axios from "axios";
import { ICOME_SUMMARY_LIABILITY } from "../../../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Spinner } from "react-bootstrap";
import ErrorModal from "../../../Components/ErrorMessage";


const VerifyYourLiability = () => {
  const token = localStorage.getItem('accessToken')

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  // const handleClick = () => {
  //   localStorage.setItem("newValue1", true);
  // };
  // const handleClick = () => {
  //   localStorage.setItem("editId", income?.id);

  //   if (allIncomeSources && allIncomeSources.length > 0) {
  //     const hasPropertyStatusTrue = allIncomeSources.some(
  //       income => income.type_of_liability === "true"
  //     );
  //     localStorage.setItem("newValue1", hasPropertyStatusTrue ? "true" : "false");
  //   } else {
  //     localStorage.setItem("newValue1", "true");
  //   }
  // };

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
  const loan_number = localStorage.getItem("loanNo.");
  const [addAssetsbtnvalue, setAddAssetsbtnvalue] = useState(JSON.parse(localStorage.getItem("addAssetsbtnvalue")));



  useEffect(() => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', false);
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    getAllSourses()
  }, []);
  const getAllSourses = async () => {
    try {
      await axios.get(`${ICOME_SUMMARY_LIABILITY}/${loan_number}`,{ withCredentials: true, headers: {
        Authorization: token,
      }}).then((res) => {
        const { data } = res || {};
        localStorage.setItem('allLiabilitySourcesExist', data?.rows && data.rows.length > 0);

        settotalIncome(data)
        setAllIncomeSources(data?.rows);
      });
    } catch (error) {
      console.log(error);
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
    }
  }


  const deleteIncomeInformation = async (id, source) => {
    try {
      await axios.delete(
        `https://api.oqteq.com/api/v1/income/remove/Liability/${id}`, { headers: {
          Authorization: token,
      }}  );
      const updatedIncomeSources = allIncomeSources.filter(income => income.id !== id);
      const updatedTotal = updatedIncomeSources.reduce((acc, income) => acc + income.total_amount, 0);

      setAllIncomeSources(updatedIncomeSources);
      settotalIncome(prevTotalIncome => ({ ...prevTotalIncome, total: updatedTotal }));

      await getAllSourses()
    } catch (error) {
      // toast("Something went wrong!");
      console.log(error);
    }
  };

  const handleBackClick = () => {
    if (allIncomeSources && allIncomeSources.length > 0) {
      const hasPropertyStatusTrue = allIncomeSources.some(
        income => income.type_of_liability === "true"
      );
      localStorage.setItem("addLiabilitybtnvalue", hasPropertyStatusTrue ? "true" : "false");
    } else {
      localStorage.setItem("addLiabilitybtnvalue", "true");
    }
  };

  return (
    <>
      <main>
        <section className="liability-section w-75">
          <div className="income-source-container liablity-container">
            <h2>Breaking Down Your  <span className="txt-secondary">Liabilities </span> </h2>
            <p>              Understanding your existing financial commitments and liabilities is crucial. It helps us gauge your financial health and determine the best mortgage terms suited to your situation. Let's detail your outstanding obligations to ensure a comprehensive mortgage evaluation.
            </p>
            <div className="col-lg-12 mx-auto col-11   txt-14">
              <p className="text-muted text-center  w-100">
                <span className="fw-bolder txt-sharp-red"> NOTE: </span>Do not enter Mortgage associated with Primary Housing or rental properties.
              </p>
            </div>
            <div className="income-info-box">
              <div className="table-header">
                <h2>Liabilities</h2>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    window.location.replace("/add-new-liability");
                    localStorage.setItem("editId", "");
                    //   localStorage.setItem("newValue1", false),
                    // localStorage.setItem("addLiabilitybtnvalue", true)
                    if (allIncomeSources && allIncomeSources.length > 0) {
                      const hasPropertyStatusTrue = allIncomeSources.some(
                        income => income.property_status === "true"
                      );
                      localStorage.setItem("newValue1", hasPropertyStatusTrue ? "true" : "false");
                    } else {
                      localStorage.setItem("newValue1", "true");
                    }

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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="table-wrapper">
                <table className="income-info-table">
                  <thead>
                    <tr>
                      {/* <th>COMPANY</th> */}
                      <th>TYPE</th>
                      {/* <th>ACCOUNT NO.</th> */}
                      <th>LENDER NAME</th>
                      <th>BALANCE</th>
                      <th>PAYMENT</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td data-label="COMPANY">United WHSLE Mort</td>
                      <td data-label="TYPE">Mortgage</td>
                      <td data-label="ACCOUNT NO.">1000000000000</td>
                      <td data-label="OWNER.">Lorem Ipsum</td>
                      <td data-label="BALANCE">250,000.00</td>
                      <td data-label="PAYMENT">1,000.00</td>
                      <td data-label="ACTIONS">
                        <div style={{ display: "flex" }}>
                          <Link to={"/add-new-liability"}>
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
                          />
                        </div>
                      </td>
                    </tr> */}
                    {allIncomeSources?.map((income, index) => (
                      <tr key={index}>
                        {/* <td data-label="COMPANY">{`-`}</td> */}
                        <td data-label="TYPE">{income?.type_of_liability}</td>
                        {/* <td data-label="ACCOUNT"> {`-`} </td> */}

                        <td data-label="OWNER.">
                          {income?.lenders_name}
                        </td>
                        <td data-label="BALANCE">
                          {formatCurrency(income?.open_balance)}
                        </td>
                        <td data-label="BALANCE">
                          {formatCurrency(income?.monthly_payment)}
                        </td>
                        <td data-label="ACTIONS">
                          <div className="d-flex justify-content-center">
                            <Link
                              onClick={() => {
                                {
                                  localStorage.setItem("editId", income?.id);

                                  if (allIncomeSources && allIncomeSources.length > 0) {
                                    const hasPropertyStatusTrue = allIncomeSources.some(
                                      income => income.type_of_liability === "true"
                                    );
                                    localStorage.setItem("newValue1", hasPropertyStatusTrue ? "true" : "false");
                                  } else {
                                    localStorage.setItem("newValue1", "true");
                                  }
                                }
                              }}
                              to={
                                // income?.source === "Liability"
                                //   ? "/add-new-liability"
                                //   : "/"
                                "/add-new-liability"
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
              </div>
              <div className="buttons mt-5 mb-5">
                <a href="/primary-home-expenses-summary">
                  <button onClick={handleBackClick} className="btn1">Back</button>
                </a>
                &nbsp;&nbsp;
                <a 
                  href={addAssetsbtnvalue ? "/verify-your-assets" :
                    "/assets-summary"}
                >

                  <button className="btn2" onClick={() => {
                    localStorage.setItem("editId", "");
                    localStorage.setItem('setDisableAssets', true)

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

export default VerifyYourLiability;
