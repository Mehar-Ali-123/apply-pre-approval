import React, { useEffect, useState } from "react";
import "./style.css";
import "@fontsource/poppins";
import axios from "axios";
import { ICOME_SUMMARY_ASSETS } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../../Components/ErrorMessage";
const AssetsSummary = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

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

  useEffect(() => { 
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive',"");
    localStorage.setItem('setAssetsActive', false);
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    getAllSourses()
  }, []);

  const getAllSourses = async () => {
    try {
      await axios.get(`${ICOME_SUMMARY_ASSETS}/${loan_number}`,{ withCredentials: true, headers: {
        Authorization: token,
      }}).then((res) => {
        const { data } = res || {};
        localStorage.setItem('allAssetsSourcesExist', data?.rows && data.rows.length > 0);

        setAllIncomeSources(data?.rows);
        settotalIncome(data) 
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
      await axios.delete( `https://api.oqteq.com/api/v1/income/remove/Assets/${id}`, { headers: {
        Authorization: token,
    }} );
      // setAllIncomeSources(prevIncomeSources =>
      //   prevIncomeSources.filter(income => income.id !== id)
      // );
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
        income => income.type_of_asset === "true"
      );
      localStorage.setItem("addAssetsbtnvalue", hasPropertyStatusTrue ? "true" : "false");
    } else {
      localStorage.setItem("addAssetsbtnvalue", "true");
    }
  };

  return (
    <>

      {/* {loader & <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
      >
        <Spinner />
      </div>} */}
      <main>
        <section className="income-section py-4">
          <div className="income-source-container w-75">
            <h2>Assessment of  <span className="txt-secondary">Your </span><span className="txt-primary">Assets</span></h2>
            <p>
            Assets play a critical role in mortgage applications, reflecting your financial health and reliability. By detailing your assets, we get a clear picture of your financial foundation, aiding in crzafting an optimal mortgage plan.            </p>
            <div className="income-info-box">
              <div className="table-header">
                <h2>Assets</h2>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    window.location.replace("/assets-form");
                    localStorage.setItem("editId", "");
                    // localStorage.setItem("newValue2", false)
                    // localStorage.setItem("addAssetsbtnvalue", true)
                    if (allIncomeSources && allIncomeSources.length > 0) {
                      const hasPropertyStatusTrue = allIncomeSources.some(
                        income => income.type_of_asset === "true"
                      );
                      localStorage.setItem("newValue2", hasPropertyStatusTrue ? "true" : "false");
                    } else {
                      localStorage.setItem("newValue2", "true");
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
              <div className="form  pb-0">
                <table className="table mb-0 pb-0">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">TYPE</th>
                      <th className="text-center" scope="col">Account Name</th>
                      <th className="text-center" scope="col">VALUE</th>
                      <th className="text-center" scope="col">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td data-label="TYPE">Otto</td>
                      <td data-label="NAME">@mdo</td>
                      <td data-label="VALUE">23432</td>
                      <td data-label="ACTIONS">
                        <div>
                          <img
                            src="./assets/icons/pencil.png"
                            alt="pencil"
                            role="button"
                          />
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
                        <td data-label="TYPE">{income?.type_of_asset} </td>
                        <td data-label="NAME">{income?.account_name}</td>
                        <td data-label="VALUE">
                          {formatCurrency(income?.total_value)}
                        </td>
                        <td data-label="ACTIONS">
                          <div className="d-flex justify-content-center">
                            <Link
                              onClick={() => {
                                localStorage.setItem("editId", income?.id);

                                if (allIncomeSources && allIncomeSources.length > 0) {
                                  const hasPropertyStatusTrue = allIncomeSources.some(
                                    income => income.type_of_asset === "true"
                                  );
                                  localStorage.setItem("newValue2", hasPropertyStatusTrue ? "true" : "false");
                                } else {
                                  localStorage.setItem("newValue2", "true");
                                }
                              }}
                              to={
                                // income?.source === "Liability"
                                //   ? "/add-new-liability"
                                //   : "/"
                                "/assets-form"
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
                    <tr className=" mb-0 ">
                      <td className="border-0 mb-0"></td>
                      <td className="border-0 mb-0 "></td>
                      <td className="border-0 mb-0 text-center"><h6>Total Amount:</h6></td>
                      <td className="border-0 mb-0 text-start"><div className="total  d-flex justify-content-center">
                        <p className="border-0 mb-0 text-start">{formatCurrency(totalIncome?.total)}</p>
                      </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="total">
                  <p>
                    <h6>Total Amount:</h6>
                    <span>
                      <h5>{formatCurrency(totalIncome?.total)}</h5>
                    </span>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="buttons mt-5 mb-5">
            <Link to="/verify-your-libility">
              <button onClick={handleBackClick} className="btn1">Back</button>
            </Link>
            &nbsp;&nbsp;
            {/* <a href="/">
              <button
                // onClick={handleSubmit}
                className="btn2"
                style={{ width: "300px", color: "#E98862" }}
              >
                Generate Pre-Approval
              </button>
            </a> */}
            {/* <Link to="/add-purchase-price"> */}
              <button
                onClick={() => {
                  localStorage.setItem('setAssetsActive', "");
                  localStorage.setItem('setDisableSubj', true)
                  navigate("/add-purchase-price")
                
                }}
                className="next-btn-fill"
              >
                Next
              </button>
            {/* </Link> */}
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

export default AssetsSummary;
