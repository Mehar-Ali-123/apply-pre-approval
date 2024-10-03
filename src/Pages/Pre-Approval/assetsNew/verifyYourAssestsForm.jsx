import React, { useEffect, useState } from "react";
import "./style.css";
import "@fontsource/poppins";
import { ErrorMessage, useFormik } from "formik";
import axios from "axios";
import { ADD_ASSET, EDIT_GET } from "../../../constants";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import ErrorModal from "../../../Components/ErrorMessage";
const VerifyYourAssetsForm = () => {
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [allValues, setAllValues] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [toSummary, setToSummary] = useState(JSON.parse(localStorage.getItem("newValue2")));
  const typeOfAssetsOptions = [
    { name: 'Money Market Fund', value: 'Money Market Fund' },
    { name: 'Checking Account', value: 'Money Market Fund' },
    { name: 'Certificate of Deposit', value: 'Certificate of Deposit' },
    { name: 'Mutual Fund', value: 'Mutual Fund' },
    { name: 'Stocks', value: 'Stocks' },
    { name: 'Saving Account', value: 'Saving Account' },
    { name: 'Stock Options', value: 'Stock Options' },
    { name: 'Bonds', value: 'Bonds' },
    { name: 'Retirement Fund (eg 401K, IRA)', value: 'Retirement Fund' },
    { name: 'Bridge Loan Proceeds', value: 'Bridge Loan Proceeds' },
    { name: 'Cash Value of Life Insurance (used for this transaction)', value: 'Cash Value of Life Insurance' },
    { name: 'Secured Borrowed Funds', value: 'Secured Borrowed Funds' },
    { name: 'Unsecured Borrowed Funds', value: 'Unsecured Borrowed Funds' },
    { name: 'Individual Development Account', value: 'Individual Development Account' },
    { name: 'Trust Account', value: 'Trust Account' },
    { name: 'Other Liquid Asset', value: 'Other Liquid Asset' },
    { name: 'Other Non-Liquid Asset', value: 'Other Non-Liquid Asset' },
    { name: 'Cash On Hand Proceeds from Sale of Non-Real Estate Asset', value: 'Cash On Hand Proceeds from Sale of Non-Real Estate Asset' },
    { name: 'Proceeds from Real Estate to be Sold on or Before Closing', value: 'Proceeds from Real Estate to be Sold on or Before Closing' },
    { name: 'Proceeds from sale of Non-Real Estate Asset', value: 'Proceeds from sale of Non-Real Estate Asset' },
    { name: 'Relocation Funds', value: 'Relocation Funds' },
    { name: 'Deposit/Earnest Money', value: 'Deposit/Earnest Money' },
    { name: 'Employer Assistance', value: 'Employer Assistance' },
    { name: 'Lot Equity', value: 'Lot Equity' },
    { name: 'Rent Credit', value: 'Rent Credit' },
    { name: 'Sweat Credit', value: 'Sweat Credit' },
    { name: 'Trade Equity', value: 'Trade Equity' },
  ];
  const maxOptions = window.innerWidth >= 992 ? 15 : 5; // Adjust the breakpoint and values as needed

  const token = localStorage.getItem('accessToken')

  const info = useLocation().state || {};
  const id = info?.info?.id;
  const navigate = useNavigate();
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    type_of_asset: "",
    account_name: "",
    total_value: "",
  }

  const { handleSubmit, handleChange, isSubmitting, values, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        if (values.type_of_asset === "") {
          seterrorMessage1("This field is require*");
        }
        else {
          seterrorMessage1("")
        }
        if (values.account_name === "") {
          seterrorMessage2("This field is require*");
        }
        else {
          seterrorMessage2("")
        }
        if (values.total_value === null || values.total_value < 0) {
          seterrorMessage3("This field is require*");
        }
        else {
          seterrorMessage3("")

        }

        try {
          const response = await axios.put(id ? `${ADD_ASSET}/${id}` : `${ADD_ASSET}`, values,{
            headers: {
              Authorization: token,
            },
          });
          if (response?.status === 200) {
            // toast("Data updated successfully!");
            navigate("/assets-summary");
          }
          if (response?.status === 201) {
            // toast("Data added successfully!");
            navigate("/assets-summary");
          }
          console.log("🚀 ~ file:  ~ response:", response);
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
          setErrorFeild(true)
          console.log(
            "🚀 ~ file: verifyYourRealEstate.jsx:32 ~ onSubmit:async ~ error:",
            error
          );
        }
      },
    });

  useEffect(() => {
    const getAllSources = async () => {
      try {
        const response = await axios.get(`${EDIT_GET}/Assets/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          setFieldValue("type_of_asset", data.rows[0].type_of_asset);
          setFieldValue("account_name", data.rows[0].account_name);
          setFieldValue("total_value", data.rows[0].total_value);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllSources();
  }, []);

  const validateAlphabets = (input) => /^[A-Za-z]+$/.test(input);

  return (
    <>

      <main>

        <section className="row py-4">
          <div className="py-3 text-center mx-auto col-12 col-lg-8">
            <h1 className="fw-semibold">Assessment of  <span className="txt-secondary">Your </span><span className="txt-primary">Assets</span></h1>
            <p>
              Assets play a critical role in mortgage applications, reflecting your financial health and reliability. By detailing your assets, we get a clear picture of your financial foundation, aiding in crzafting an optimal mortgage plan.            </p>
          </div>
          <div className="col-12 col-lg-8 mx-auto ">

            {/* Assets verify Form*/}
            <div className="shadow mx-2" style={{ borderRadius: "10px" }}>
              <div
                className=" py-4 px-3"
                style={{
                  backgroundColor: "#D0FFF2",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h4 className="fw-semibold">Add Another Asset</h4>
              </div>
              {/* Form */}
              <form className="px-3 py-2 row " onSubmit={handleSubmit}>
                <div class="col-lg-6 d-flex flex-column mt-3">
                  <label for="balance" className="fw-semibold py-1">
                    Type of Asset
                  </label>
                  <Dropdown
                    name="type_of_asset"
                    value={values.type_of_asset}
                    options={typeOfAssetsOptions}
                    optionLabel="name"
                    onChange={(e) => setFieldValue('type_of_asset', e.value)}
                    id="type_of_asset"
                    className="py-2 border-0 px-3 outline-0 dropdown-options " // Apply the CSS class
                    placeholder="Installment (e.g, car, student)"
                    maxOptions={15}
                    style={{
                      fontSize: "0.9rem",
                      background: "white",
                      boxShadow:
                        "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                      borderRadius: 15.07,
                      scrollHeight: 200
                    }}
                  />
                  {/* <input
                    type="text"
                    name="type_of_asset"
                    value={values.type_of_asset}
                    onChange={handleChange}
                    id="type_of_asset"
                    placeholder="Type of Asset"
                    className="py-4 border-0 px-3 outline-0"
                    style={{
                      fontSize: "0.9rem",
                      background: "white",
                      boxShadow:
                        "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                      borderRadius: 15.07,
                    }}
                  /> */}
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}

                </div>

                <div class="col-lg-6 d-flex flex-column mt-3 ">
                  <label for="balance" className="fw-semibold py-1">
                    Account Name
                  </label>
                  <div className="position-relative w-100 ">
                    <img className="  bi bi-currency-dollar  py-0 my-0  ms-2" width='25px' height='25px' src='/assets/icons/brand-netflix.png' />

                    <input
                      type="text"
                      name="account_name"
                      value={values.account_name}
                      onChange={(e) => {
                        if (validateAlphabets(e.target.value) || e.target.value === "") {
                          handleChange(e);
                        }
                      }}
                      id="account_name"
                      placeholder="Enter name of account"
                      className="py-4 px-5 border-0 outline-0 w-100"
                      style={{
                        fontSize: "0.9rem",
                        background: "white",
                        boxShadow:
                          "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                        borderRadius: 15.07,
                      }}
                    />
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}

                </div>

                <div class="col-lg-6 d-flex flex-column mt-3">
                  <label for="account" className="fw-semibold py-1">
                    Total Value
                  </label>
                  <div className="position-relative inputBox py-2 ">
                    <img className=" bi bi-currency-dollar  ms-2" width='25px' height='25px' src='/assets/icons/businessplan.png' />

                    <InputNumber
                      type="text"
                      name="total_value"
                      value={values.total_value}
                      id="total_value"
                      placeholder="Market Value"
                      className="py-2 ps-5 border-0 w-100 "
                      style={{
                        fontSize: "0.9rem",
                        background: "white",
                        boxShadow:
                          "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                        borderRadius: 15.07,
                      }}
                      onValueChange={(e) => handleChange({ target: { name: "total_value", value: e.value } })}
                      locale="en-us"
                      minFractionDigits={2}
                    />
                    {/* <input
                      type="text"
                      name="total_value"
                      value={values.total_value}
                      onChange={handleChange}
                      id="total_value"
                      placeholder="Market Value"
                      className="py-4 ps-5 border-0 w-100"
                      style={{
                        fontSize: "0.9rem",
                        background: "white",
                        boxShadow:
                          "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                        borderRadius: 15.07,
                      }}
                    /> */}

                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}
                </div>

                <div class="call-to-action my-4">
                  <Link
                    type="button"
                    class="btn btn-cancel p-2 ps-3 pe-3"
                    // href="/verify-your-assets"
                    to={toSummary ? "/verify-your-assets" : "/assets-summary"}
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    class="btn btn-add p-2 ps-3 pe-3 "
                    href="/assets-summary"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </form>
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

export default VerifyYourAssetsForm;
