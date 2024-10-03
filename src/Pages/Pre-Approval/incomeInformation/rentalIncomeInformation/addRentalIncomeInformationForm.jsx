import React, { useEffect, useState } from "react";
import "@fontsource/poppins";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./style.css";
import "../businessIncomeInformation/style.css"
import '../businessIncomeInformation/style.css'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import "./verifyYourRealEstate.css";
import { ADD_RENTAL_INCOME, EDIT_GET } from "../../../../constants";
import MyVerticallyCenteredModal from "../../realstateInformation/Modal";
import Header from "../../../../Components/header";
import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import ErrorModal from "../../../../Components/ErrorMessage";
const AddRentalIncomeInformationForm = () => {
  const [show, setShow] = useState(false);
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [allValues, setAllValues] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const token = localStorage.getItem('accessToken')

  const showModal = () => {
    setShow(true)
  }
  const navigate = useNavigate();
  const info = useLocation().state || {};
  const id = info?.info?.id;
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    property_address: "",
    market_value: "",
    monthly_rental_income: "",
  };
  const { handleSubmit, handleChange, values, isSubmitting, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (values.property_address ===null || values.property_address <= 0) {
        seterrorMessage1("This field is require*");
      }
      else {
        seterrorMessage1("")
      }
      if (values.market_value ===null || values.market_value < 0) {
        seterrorMessage2("This field is require*");
      }
      else {
        seterrorMessage2("")
      }
      if (values.monthly_rental_income ===null || values.monthly_rental_income < 0) {
        seterrorMessage3("This field is require*");
      }
      else {
        seterrorMessage3("")
      }
      try {
        const response = await axios.put(id ? `${ADD_RENTAL_INCOME}/${id}` : `${ADD_RENTAL_INCOME}`, values, {
          headers: {
            Authorization: token,
          },
        });
        if (response?.status === 200) {
          // toast("Data updated successfully!");
          navigate("/summary-income-sources");
        }
        if (response?.status === 201) {
          // toast("Data added successfully!");
          navigate("/summary-income-sources");
        }
        console.log(
          "🚀 ~ file: verifyYourRealEstate.jsx:31 ~ onSubmit:async ~ response:",
          response
        );
        navigate("/summary-income-sources");
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
        const response = await axios.get(`${EDIT_GET}/Rental/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          setFieldValue("property_address", data.rows[0].property_address);
          setFieldValue("market_value", data.rows[0].market_value);
          setFieldValue("monthly_rental_income", data.rows[0].monthly_rental_income);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllSources();
  }, []);
  return (
    <>
      {isSubmitting && <div
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
      </div>}
      <Header />
      <main>
        <section className="row py-4 d-flex justify-content-center">
          <div className="py-3 text-center p-3 col-12 col-lg-9">
            <h1 className="fw-semibold">Monthly <span className="txt-secondary"> Rental </span><span className="txt-primary">Income</span> </h1>
            <p className="mx-auto px-3 text-muted w-100 txt-14">
              Please provide details of the property generating this rental income. Use our <Link className="d-inline" to="#/rental-calculator" onClick={showModal}> <span className="fw-semibold txt-sky"> Rental Income Calculator</span> </Link> to calculate your net monthly rental income.
            </p>
          </div>
          <div className="col-12 col-lg-7 mx-auto ">
            <div className="shadow mx-2 w-100" style={{ borderRadius: "10px" }}>
              <div
                className=" py-4 px-3"
                style={{
                  backgroundColor: "#D0FFF2",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h4 className="fw-semibold">Verify Your Rental Income</h4>
              </div>
              <form onSubmit={handleSubmit} className=" rental-form px-2">
                <div className="rental_container p-5 ">
                  <div className="p-5 px-3 ">
                    <h4 className="title_heading px-4 ">Property Address</h4>
                    <div className="address_container   ">
                      <div className="text-center choose-select-wrapper w-100 m-0 ">
                        <img src="./assets/icons/current-location.png" alt="" />
                        <input
                          className="property_input pe-2 mb-0 ps-5"
                          type="text"
                          placeholder="123 Primary Address ST."
                          value={values.property_address}
                          onChange={handleChange}
                          id="property_address"
                        />
                      </div>
                      {errorFeild && <span className="mt-2 w-100" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}
                    </div>
                    <div className="state-container">
                      <div className="state-select-container">
                        <h2 className="title_heading mb-4">Home Value</h2>
                        <div className="choose-select-wrapper">
                          <img className=" bi bi-currency-dollar " width='25px' height='25px' src='/assets/images/businessplan.png' />
                          {/* <input
                            className="property_input pe-2 ps-5 mb-0"
                            type="number"
                            value={values.market_value}
                            onChange={handleChange}
                            id="market_value"
                          /> */}
                          <InputNumber
                            type="text"
                            className="property_input pe-2 ps-5  py-2 mb-0"
                            placeholder="Enter home value"
                            name="market_value"
                            value={values.market_value}
                            onValueChange={(e) => handleChange({ target: { name: "market_value", value: e.value } })}
                            locale="en-us"
                            minFractionDigits={2}
                          />
                        </div>
                        {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}
                      </div>
                      <div className="state-select-container">
                        <div>
                          <h2 className="title_heading  p-0 mb-2">Monthly Rental Income</h2>
                          {/* <a className=" p-0 m-0 text-start " href="/address">(Calculate your rental income)</a> */}
                          {/* <a className=" p-0 mb-1 text-start text-primary" href="/tax-return">(Calculate your rental income)</a> */}
                          <Link to="#/rental-calculator" className=" p-0 mb-1 text-start text-primary" onClick={showModal}>(Calculate your rental income)</Link>

                          <div className="choose-select-wrapper">
                            <img className=" bi bi-currency-dollar " width='25px' height='25px' src='/assets/images/calculator.png' />
                            {/* <input
                              className="property_input pe-2 mb-0 ps-5"
                              type="number"
                              value={values.monthly_rental_income}
                              onChange={handleChange}
                              id="monthly_rental_income"
                            /> */}
                            <InputNumber
                              type="text"
                              className="property_input pe-2 ps-5 mb-0"
                              placeholder="Enter rental income"
                              name="monthly_rental_income"
                              value={values.monthly_rental_income}
                              onValueChange={(e) => handleChange({ target: { name: "monthly_rental_income", value: e.value } })}
                              locale="en-us"
                              minFractionDigits={2}
                            />
                          </div>
                          {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="btn-container buttons">
                      <button
                        className="button-cancel ps-3 pe-3 "
                        onClick={() => navigate("/select-income-sources")}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-add ps-4 pe-4 fw-semibold"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <MyVerticallyCenteredModal show={show} onHide={() => {
          setShow(false);
          navigate("/add-rental-income");
        }}>
          <iframe width="100%" height="700px" src="https://rentcal.oqvesthomeloans.com" frameborder="0"></iframe>
        </MyVerticallyCenteredModal>
        {/* <MyVerticallyCenteredModal show={show} onHide={() => setShow(false)} /> */}
      </main>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        errorMessage={apiErrorMessage}
      />
    </>
  );
};
export default AddRentalIncomeInformationForm;
