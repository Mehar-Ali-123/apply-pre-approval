import React, { useEffect, useState } from "react";
import "./primaryhome.css";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { useFormik } from "formik";
import axios from "axios";
import { ADD_PRIMARY_HOUSE, EDIT_GET } from "../../../constants";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import ErrorModal from "../../../Components/ErrorMessage";
export const PrimaryHomeExpenses = () => {
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [allValues, setAllValues] = useState(null);
  const [toSummary, setToSummary] = useState(JSON.parse(localStorage.getItem("newValue")));
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const token = localStorage.getItem('accessToken')

  // const toSummary = JSON.parse(localStorage.getItem("newValue"));
  // const location = useLocation();

  // const [toSummary , setToSummary]=useState(false)

  const info = useLocation().state || {};
  const id = info?.info?.id;
  const navigate = useNavigate();
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    property_address: "",
    net_monthly_expenses: "",
    property_status: "",
  }
  const { handleSubmit, handleChange, isSubmitting, values, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        if (values.property_address === "") {
          seterrorMessage1("This field is require*");
        }
        else {
          seterrorMessage1("")
        }
        if (values.net_monthly_expenses ===null || values.net_monthly_expenses < 0 === "") {
          seterrorMessage2("This field is require*");
        }
        else {
          seterrorMessage2("")
        }
        if (values.property_status === "") {
          seterrorMessage3("This field is require*");
        }
        else {
          seterrorMessage3("")
        }

        try {
          const response = await axios.put(id ? `${ADD_PRIMARY_HOUSE}/${id}` : `${ADD_PRIMARY_HOUSE}`, values,{
            headers: {
              Authorization: token,
            },}
          );
          if (response?.status === 200) {
            // toast("Data updated successfully!");
            navigate("/primary-home-expenses-summary");
          }
          if (response?.status === 201) {
            // toast("Data added successfully!");
            navigate("/primary-home-expenses-summary");
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
        const response = await axios.get(`${EDIT_GET}/primaryHouseExpense/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          console.log(data.rows[0])
          setFieldValue("property_address", data.rows[0].property_address);
          setFieldValue("net_monthly_expenses", data.rows[0].net_monthly_expenses);
          setFieldValue("property_status", data.rows[0].property_status);

          if (data.rows[0].property_status === "owned") {
            setSelectedCardIndex(0);
          } else if (data.rows[0].property_status === "rent") {
            setSelectedCardIndex(1);
          }
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllSources();
  }, []);


  return (
    <>
      <Header />
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
      <main>
        <section className="row py-4 ">
        <div className="py-3 text-center p-3 col-12 col-lg-9  mx-auto">
            <h1 className="fw-semibold">Gathering <span className="txt-secondary">Primary Housing  </span><span className="txt-primary">Expense</span></h1>
            <p className="mx-auto px-3 text-muted w-100 txt-14">
            Please provide Primary Housing Expense for yourself and any co-borrowers you're applying with, such as a spouse </p>
            <div className="col-lg-12 mx-auto col-11  my-4">
                  <p className="text-muted text-center  w-100 txt-14">
                    <span className="fw-bolder txt-sharp-red "> NOTE: </span>Only input the expense once if you and the co-borrower have same primary housing expense.</p>
                </div>
          </div>
          <div className="col-12 col-lg-7 mx-auto ">
              
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
                <h4 className="fw-semibold">Primary Housing Expense</h4>
              </div>
              {/* Form */}
              <form
                className="px-3 py-2 col-10 mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="d-flex flex-column mt-3">
                  <label className=" my-2">
                    <h5 className="fw-semibold ">Property Address</h5>
                  </label>
                <div className="address_container " >
                <div className="text-center choose-select-wrapper w-100 m-0">
                      <img src="./assets/icons/current-location.png" alt="" />
                    <input
                      type="text"
                      value={values.property_address}
                      id="property_address"
                      onChange={handleChange}
                      className="property_input pe-2 mb-0 ps-5  w-100 py-4 input-shadow outline-none"
                      placeholder="123 Primary Address St."
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
                  {errorFeild && <span className="mt-2 w-100" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}
                </div>
                </div>
                <div className="d-flex flex-column mt-3 ">
                  <label className=" my-2">
                    <h5 className="fw-semibold ">Property Status</h5>
                  </label>
                  <div className="primary-cards d-flex justify-content-start   flex-column flex-lg-row gap-4  align-items-center">
                    <a
                      className={`p-4 bg-white form-primary-cards text-decoration-none text-dark ${selectedCardIndex === 0 ? "selected" : ""
                        }`}
                      // href="#"
                      onClick={() => {
                        setFieldValue("property_status", "owned");
                        setSelectedCardIndex(0); // Set the selected index when the card is clicked
                      }}
                    >
                      <img
                        src="./assets/icons/house-fill-svgrepo-com 1.png"
                        alt="button-img"
                      />
                      <p className="fw-semibold mt-2 py-1">Owned</p>
                    </a>
                    {/* <a
                      className="py-3 px-4 bg-white form-btn text-decoration-none text-dark"
                      href="#"
                      onClick={() => {
                        setFieldValue("property_status", "owned");
                      }}
                    >
                      <img
                        src="./assets/icons/house-fill-svgrepo-com 1.png"
                        alt="button-img"
                      />
                      <p className="fw-semibold mt-2">Owned</p>
                    </a> */}
                    <a
                      className={`p-4 bg-white form-primary-cards text-decoration-none text-dark ${selectedCardIndex === 1 ? "selected" : ""
                        }`}
                      // href="#"
                      onClick={() => {
                        setFieldValue("property_status", "rent");
                        setSelectedCardIndex(1); // Set the selected index when the card is clicked
                      }}
                    >
                      <img src="./assets/icons/mortgage.png" alt="button-img" />
                      <p className="fw-semibold mt-2">Rent</p>
                    </a>
                    {/* <a
                      className="py-3 px-4 bg-white form-btn text-decoration-none text-dark"
                      href="#"
                      onClick={() => {
                        setFieldValue("property_status", "rent");
                      }}
                    >
                      <img src="./assets/icons/mortgage.png" alt="button-img" />
                      <p className="fw-semibold mt-2">Rent</p>
                    </a> */}
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}

                </div>

                <div className="d-flex flex-column mt-5">
                  <label>
                    <h6 className="fw-semibold mb-2">
                      {" "}
                      Total Monthly Expenses (rent, mortgage, insurance, taxes, HOA)
                    </h6>
                  </label>
                  <div className="text-center choose-select-wrapper w-100 m-0"> 
                      <img src="./assets/icons/clipboard-list.png" alt="" /> 
                  
                    <InputNumber
                      type="text"
                      className="property_input pe-2 mb-0 ps-5  w-100 py-3 input-shadow outline-none"
                      placeholder="Enter monthly primary housing expense"
                      id="net_monthly_expenses"
                      style={{
                        background: "white",
                        fontSize: "14.187px",
                        borderRadius: 11,
                        color: "#797292",
                        marginLeft: "-2px",
                      }}
                      value={values.net_monthly_expenses}
                      onValueChange={(e) => handleChange({ target: { name: "net_monthly_expenses", value: e.value } })}
                      locale="en-us"
                      minFractionDigits={2}
                    />
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}

                </div>

                <div className="call-to-action my-4">
                  <Link
                    type="button"
                    className="btn btn-cancel"
                    to={toSummary ? "/add-primary-home-expenses" : "/primary-home-expenses-summary"}
                  >
                    Cancel
                  </Link>
                  <Link
                    type="button"
                    className="btn btn-add"
                    to="/primary-home-expenses-summary"
                    onClick={handleSubmit}
                  >
                    Add
                  </Link>
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
