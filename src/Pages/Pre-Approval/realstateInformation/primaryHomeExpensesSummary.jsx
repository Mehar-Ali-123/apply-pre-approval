import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../Components/header";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import axios from "axios";
import { ICOME_SUMMARY } from "../../../constants";
import ErrorModal from "../../../Components/ErrorMessage";
import { setIsDataPresentPrimary } from "../incomeInformation/PrimaryDataSlice";
import { useDispatch } from "react-redux";

const PrimaryHomeExpensesSummary = () => {

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken')

  // const primaryHouse = JSON.parse(localStorage.getItem("primaryHouse"));
  // const {address, tax, proertyStatus }= primaryHouse;


  // const handleClick = () => {
  //   localStorage.setItem("editId", income?.id);
  //   // localStorage.setItem("newValue", true); 
  //   if (allIncomeSources && allIncomeSources.length > 0) {
  //     const hasPropertyStatusTrue = allIncomeSources.some(
  //       income => income.property_status === "true"
  //     );
  //     localStorage.setItem("newValue", hasPropertyStatusTrue ? "true" : "false");
  //   } else {
  //     localStorage.setItem("newValue", "true");
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
  const [allValues, setAllValues] = useState(null);
  const [addLiabilitybtnvalue, setAddLiabilitybtnvalue] = useState(JSON.parse(localStorage.getItem("addLiabilitybtnvalue")));


  const loan_number = localStorage.getItem("loanNo.");
  useLayoutEffect(() => {
    if (allIncomeSources && allIncomeSources.length > 0) {
      dispatch(setIsDataPresentPrimary(true)); // Dispatch action with true
    } else {
      dispatch(setIsDataPresentPrimary(false)); // Dispatch action with false
    }

  }, [allIncomeSources]);

  useEffect(() => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', false);
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    getAllSourses()
  }, []);
  const getAllSourses = async () => {
    try {
      await axios.get(`${ICOME_SUMMARY}/${loan_number}`,{ withCredentials: true, headers: {
        Authorization: token,
      }}).then((res) => {
        const { data } = res || {};
        localStorage.setItem('allPrimarySourcesExist', data?.rows && data.rows.length > 0);
        setAllIncomeSources(data?.rows);
        settotalIncome(data)
        console.log(data)
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
    }
  }
  const deleteIncomeInformation = async (id, source) => {
    try {
      await axios.delete(
        `https://api.oqteq.com/api/v1/income/remove/primaryHouseExpense/${id}`, { headers: {
          Authorization: token,
      }} );

      const updatedIncomeSources = allIncomeSources.filter(income => income.id !== id);
      const updatedTotal = updatedIncomeSources.reduce((acc, income) => acc + income.total_amount, 0);

      setAllIncomeSources(updatedIncomeSources);
      settotalIncome(prevTotalIncome => ({ ...prevTotalIncome, total: updatedTotal }));
      await getAllSourses()
    } catch (error) {
      if (error?.response) {
        const { status } = error.response;
        if (status === 404 || status === 400) {
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
    }
  };

  const handleBackClick = () => {
    if (allIncomeSources && allIncomeSources.length > 0) {
      const hasPropertyStatusTrue = allIncomeSources.some(
        income => income.property_status === "true"
      );
      localStorage.setItem("addPrimaryHousebtnvalue", hasPropertyStatusTrue ? "true" : "false");
    } else {
      localStorage.setItem("addPrimaryHousebtnvalue", "true");
    }
  };

  return (
    <>

      <main>
        <section className="income-section">
          <div className="income-source-container">
            <h2>Gathering <span className="txt-secondary">Primary Housing  </span><span className="txt-primary">Expense</span></h2>
            <p>
              Please provide Primary Housing Expense for yourself and any co-borrowers you're applying with, such as a spouse
            </p>
            <div className="col-lg-12 mx-auto col-11  mt-3 ">
              <p className="text-muted text-center  w-100 txt-14">
                <span className="fw-bolder txt-sharp-red "> NOTE: </span>Only input the expense once if you and the co-borrower have same primary housing expense.</p>
            </div>
            <div className="income-info-box">
              <div className="table-header">
                <h2>Your Primary Home Expense</h2>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    window.location.replace("/primary-home-expenses");
                    localStorage.setItem("editId", "");
                    // localStorage.setItem("newValue", true);
                    if (allIncomeSources && allIncomeSources.length > 0) {
                      const hasPropertyStatusTrue = allIncomeSources.some(
                        income => income.property_status === "true"
                      );
                      localStorage.setItem("newValue", hasPropertyStatusTrue ? "true" : "false");
                    } else {
                      localStorage.setItem("newValue", "true");
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <table className="income-info-table">
                <thead>
                  <tr>
                    <th>Property Address</th>
                    <th>Property Status</th>
                    <th>Value</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td data-label="Property Address">{address}</td>
                    <td data-label="Property Status">{proertyStatus}</td>
                    <td data-label="Value">{tax}</td>
                    <td data-label="ACTIONS">
                      <div style={{ display: "flex" }}>
                        <Link to="/primary-home-expenses">
                          <img
                            src="./assets/icons/pencil.png"
                            alt="pencil"
                            role="button"
                          />
                        </Link>
                        <img src="./assets/icons/x.png" alt="x" role="button" />
                      </div>
                    </td>
                  </tr>
                  <hr className="d-sm-none" />
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody> */}
                <tbody>
                  {allIncomeSources?.map((income, index) => (
                    <tr key={index}>
                      <td data-label="Property Address">{income?.property_address}</td>
                      <td data-label="Property Status">{income?.property_status}</td>
                      <td data-label="Value">
                        {formatCurrency(income?.net_monthly_expenses)}

                      </td>
                      <td data-label="ACTIONS" className="">
                        <div className="d-flex justify-content-center">
                          <Link
                            onClick={() => {
                              localStorage.setItem("editId", income?.id);
                              if (allIncomeSources && allIncomeSources.length > 0) {
                                const hasPropertyStatusTrue = allIncomeSources.some(
                                  income => income.property_status === "true"
                                );
                                localStorage.setItem("newValue", hasPropertyStatusTrue ? "true" : "false");
                              } else {
                                localStorage.setItem("newValue", "true");
                              }
                            }}
                            to={
                              // "primaryHomeExpense" === "primaryHomeExpense"
                              //   ? "/primary-home-expenses"
                              //   : "/"
                              "/primary-home-expenses"
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
              <div className="mt-3 w-100 text-end ">

              </div>
              <div className="buttons mt-5 mb-5">
                <a  href="/summary-income-sources">
                  <button onClick={handleBackClick} className="btn1">Back</button>
                </a>
                &nbsp;&nbsp;
                <a
                  //  href="/add-liability-info"
                  href={addLiabilitybtnvalue ? "/add-liability-info" :
                    "/verify-your-libility"}
                  onClick={() => {
                    localStorage.getItem('setDisableLiability', true)
                  }}
                >
                  <button className="btn2">Next</button>
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

export default PrimaryHomeExpensesSummary;
