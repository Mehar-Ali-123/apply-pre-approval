import React, { useState } from "react";
import "./primaryhome.css";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import "./verifyYourRealEstate.css";
import { ADD_RENTAL_INCOME } from "../../../constants";
import MyVerticallyCenteredModal from "./Modal";
import { toast } from "react-toastify";

import { Spinner } from "react-bootstrap";
const VerifyYourRealEstate = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    customer_name: "",
    property_address: "",
    city: "",
    state: "",
    zip: "",
    property_status: "rent",
    owned_by: "john doe",
    intended_occupancy: "Investment",
    current_occupancy: "Second Home",
    property_type: "Single Family",
    market_value: "",
    user_monthly_expenses: "",
    expected_rental_income: "",
  };

  const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(ADD_RENTAL_INCOME, values);
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
        console.log(
          "🚀 ~ file: verifyYourRealEstate.jsx:32 ~ onSubmit:async ~ error:",
          error
        );
      }
    },
  });
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
        <section className="row py-4">
          <div className="col-12 col-lg-7 mx-auto ">
            {/* Headings */}
            <div className="py-3 text-center">
              <h2 className="fw-semibold">Verify Your Rental Income </h2>
              <p className="mx-auto px-3 text-muted">
                Please review and verify your information. We will use the
                information you provide to process your loan application.
              </p>
            </div>

            {/* Real Estate Form*/}
            <div className="shadow mx-2" style={{ borderRadius: "10px" }}>
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
              {/* {<pre>{JSON.stringify(values, null, 2)}</pre>} */}
              {/* Form */}
              {/* <form
                className="px-3 py-2 col-10 mx-auto"
                onSubmit={handleSubmit}
              >
                <div class="d-flex flex-column mt-3">
                  <label className=" my-2">
                    <h5 className="fw-semibold ">Property Address</h5>
                  </label>
                  <div className="input-group input-group-1 mb-3 ">
                    <span className="input-group-text input-group-1-text ">
                      <img
                        src="./assets/icons/current-location.png"
                        alt="current-location-icon"
                      />
                    </span>
                    <input
                      type="text"
                      name="property_address"
                      value={values.property_address}
                      onChange={handleChange}
                      className="form-control input-1 py-2"
                      placeholder="123 primary address ST."
                      aria-describedby="basic-addon1"
                      style={{
                        background: "white",
                        fontSize: "14.187px",
                        borderRadius: 11,
                        color: "#797292",
                        marginLeft: "-2px",
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    id="city"
                    placeholder="City"
                    className="py-3 border-0 px-3"
                    style={{
                      background: "white",
                      width: "180px",
                      boxShadow:
                        "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                      borderRadius: 15.07,
                    }}
                  />
                  <input
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    id="State"
                    placeholder="State"
                    className="py-3 border-0 px-3"
                    style={{
                      background: "white",
                      width: "180px",
                      boxShadow:
                        "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                      borderRadius: 15.07,
                    }}
                  />
                  <input
                    type="text"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    id="zip"
                    placeholder="Zip"
                    className="py-3 border-0 px-3"
                    style={{
                      background: "white",
                      width: "180px",
                      boxShadow:
                        "0px 19.5076px 70.9368px rgba(0, 0, 0, 0.07), 0px 8.14982px 29.6357px rgba(0, 0, 0, 0.0503198), 0px 4.35728px 15.8447px rgba(0, 0, 0, 0.0417275), 0px 2.44266px 8.88239px rgba(0, 0, 0, 0.035), 0px 1.29728px 4.71737px rgba(0, 0, 0, 0.0282725), 0px 0.539826px 1.963px rgba(0, 0, 0, 0.0196802)",
                      borderRadius: 15.07,
                    }}
                  />
                </div>
                <div className="d-flex flex-column mt-3">
                  <label className=" my-2">
                    <h5 className="fw-semibold ">Property Status</h5>
                  </label>
                  <div className="d-flex justify-content-center flex-column flex-lg-row gap-5  align-items-center">
                    <a
                      className="py-3 px-4 bg-white form-btn text-decoration-none text-dark"
                      href="/verify-real-estate"
                    >
                      <img
                        src="./assets/icons/house-fill-svgrepo-com 1.png"
                        alt="button-img"
                      />
                      <p className="fw-semibold mt-2">Owned</p>
                    </a>
                    <a
                      className="py-3 px-4 bg-white form-btn text-decoration-none text-dark"
                      href="/verify-real-estate"
                    >
                      <img src="./assets/icons/mortgage.png" alt="button-img" />
                      <p className="fw-semibold mt-2">Rent</p>
                    </a>
                    <a
                      className="py-3 px-4 bg-white form-btn text-decoration-none text-dark"
                      href="/verify-real-estate"
                    >
                      <img src="./assets/icons/sold.png" alt="button-img" />
                      <p className="fw-semibold mt-2">Sold</p>
                    </a>
                  </div>
                </div>

                <div className="d-flex flex-column mt-3">
                  <label>
                    <h5 className="fw-semibold">
                      {" "}
                      Monthly Expenses (if not included in monthly mortgage
                      payment)
                    </h5>
                  </label>
                  <div className="input-group input-group-1 mb-3 ">
                    <span className="input-group-text input-group-1-text ">
                      <img src="./assets/icons/clipboard-list.png" alt="" />
                    </span>
                    <input
                      type="text"
                      name="user_monthly_expenses"
                      value={values.user_monthly_expenses}
                      onChange={handleChange}
                      className="form-control input-1 py-2"
                      placeholder="taxes...etc"
                      aria-describedby="basic-addon1"
                      style={{
                        background: "white",
                        fontSize: "14.187px",
                        borderRadius: 11,
                        color: "#797292",
                        marginLeft: "-2px",
                      }}
                    />
                  </div>
                </div>
                <div class="call-to-action my-4">
                  <a
                    type="button"
                    class="btn btn-cancel"
                    href="/verify-your-assets"
                  >
                    Cancel
                  </a>
                  <a
                    type="button"
                    class="btn btn-add"
                    href="/assets-summary"
                    onClick={handleSubmit}
                  >
                    Add
                  </a>
                </div>
              </form> */}
              <form onSubmit={handleSubmit}>
                <div className="rental_container">
                  <div>
                    <h4 className="title_heading">Property Address</h4>
                    <div className="address_container">
                      <div className="text-center">
                        <input
                          className="property_input"
                          type="text"
                          placeholder="123 Primary Address ST."
                          value={values.property_address}
                          onChange={handleChange}
                          id="property_address"
                        />
                      </div>
                      {/* <div className="property_address">
                        <input
                          className="property_address_input"
                          type="text"
                          placeholder="city"
                          value={values.city}
                          onChange={handleChange}
                          id="city"
                        />
                        <div className="custom-select-wrapper">
                          <select className="property_address_input_select">
                            <option
                              defaultValue
                              value={values.state}
                              onChange={handleChange}
                              id="state"
                            >
                              State
                            </option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                          <i className="fas fa-chevron-down property_address_input_icon"></i>
                        </div>
                        <input
                          className="property_address_input"
                          type="text"
                          placeholder="Zip"
                          value={values.zip}
                          onChange={handleChange}
                          id="zip"
                        />
                      </div> */}
                    </div>

                    {/* <div className="status_container">
                      <h2 className="title_heading">Property Status</h2>
                      <div className="status_sub_container">
                        <div className="status_card">
                          <img
                            className="custom-icon"
                            src="./assets/realstate/house.png"
                            alt=""
                          />
                          <span className="status_text">Up for sale</span>
                        </div>
                        <div className="status_card">
                          <img
                            className="custom-icon"
                            src="./assets/realstate/mortgage.png"
                            alt=""
                          />
                          <span className="status_text">Retained</span>
                        </div>
                        <div className="status_card">
                          <img
                            className="custom-icon"
                            src="./assets/realstate/cashapp.png"
                            alt=""
                          />
                          <span className="status_text">Sold</span>
                        </div>
                      </div>
                    </div> */}

                    <div className="state-container">
                      <div className="state-select-container">
                        <h2 className="title_heading">Owned By</h2>
                        <div className="choose-select-wrapper">
                          <input
                            className="property_input"
                            type="text"
                            placeholder="123 Primary Address ST."
                            value={values.property_address}
                            onChange={handleChange}
                            id="property_address"
                          />
                        </div>
                      </div>
                      <div className="state-select-container">
                        <h2 className="title_heading">
                          Independent Occuparacy
                        </h2>
                        <div className="choose-select-wrapper">
                          <input
                            className="property_input"
                            type="text"
                            placeholder="123 Primary Address ST."
                            value={values.property_address}
                            onChange={handleChange}
                            id="property_address"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="state-container">
                      <div className="state-select-container">
                        <h2 className="title_heading">Owned By</h2>
                        <div className="choose-select-wrapper">
                          <select className="select-button">
                            <option defaultValue>Choose</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                          <div className="state-select-icon">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                      </div>
                      <div className="state-select-container">
                        <h2 className="title_heading">
                          Independent Occuparacy
                        </h2>
                        <div className="choose-select-wrapper">
                          <select className="select-button">
                            <option defaultValue>Choose</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                          <div className="state-select-icon">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="state-value">
                      <div className="state-input-container">
                        <h2 className="title_heading">Market Value</h2>
                        <input
                          className="state-input-one"
                          type="text"
                          placeholder=""
                        />
                      </div>
                      <div className="state-input-container">
                        <h2 className="title_heading">
                          Monthly Rental Income <br />
                          <span
                            className="custom-subtitle"
                            onClick={() => {
                              setShow(true);
                            }}
                            style={{ color: "blue" }}
                          >
                            (calculate your rental income)
                          </span>
                        </h2>
                        <input
                          className="state-input-two"
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </div> */}

                    <div className="btn-container">
                      <button
                        className="mybtn btn-cancel"
                        onClick={() => navigate("/select-income-sources")}
                      >
                        Cancel
                      </button>
                      <button
                        className="mybtn btn-add"
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

        <MyVerticallyCenteredModal show={show} onHide={() => setShow(false)} />
      </main>
    </>
  );
};

export default VerifyYourRealEstate;
