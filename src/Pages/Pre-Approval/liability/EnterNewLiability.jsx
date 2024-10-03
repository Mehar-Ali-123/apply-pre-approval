import React, { useEffect, useState } from "react";
import Header from "../../../Components/header";
import "./style.css";
import "@fontsource/poppins";
import { useFormik } from "formik";
import axios from "axios";
import { ADD_LIABILITY, EDIT_GET } from "../../../constants";
// import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import ErrorModal from "../../../Components/ErrorMessage";


const EnterNewLiability = () => {
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [errorMessage4, seterrorMessage4] = useState("");
  const [allValues, setAllValues] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [toSummary, setToSummary] = useState(JSON.parse(localStorage.getItem("newValue1")));
  // const [values, setValues] = useState({ type_of_liability: '', });
  const token = localStorage.getItem('accessToken')


  const typeOfLiabilityOptions = [
    { name: 'Resolving (e.g.,credit cards', value: 'Resolving (e.g.,credit cards' },
    { name: 'Lease(not real estate)', value: 'Lease(not real estate)' },
    { name: 'HELOC', value: 'HELOC' },
    { name: 'Alimony', value: 'Alimony' },
    { name: 'Seperate Maintenance', value: 'Seperate Maintenance' },
    { name: 'Job Related Expense', value: 'Job Related Expense' },
    { name: 'Open 30-Day(balance paid monthly)', value: 'Open 30-Day(balance paid monthly)' },
    { name: 'Other Liability', value: 'Other Liability' },
    { name: 'Installment(eg., car , student)', value: 'Installment(eg., car , student)' },
    { name: 'Mortgage', value: 'Mortgage' },
    { name: 'Child Support', value: 'Child Support' },
    { name: 'Child Care', value: 'Child Care' },
    { name: 'Taxes', value: 'Taxes' },
    { name: 'Collection Judgement or Lien', value: 'Collection Judgement or Lien' },
  ];


  const info = useLocation().state || {};
  const id = info?.info?.id;
  const navigate = useNavigate();
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    type_of_liability: "",
    open_balance: "",
    lenders_name: "",
    monthly_payment: "",
  }

  const { handleSubmit, handleChange, isSubmitting, values, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        if (values.type_of_liability === "") {
          seterrorMessage1("This field is require*");
        }
        else {
          seterrorMessage1("")
        }

        if (values.open_balance === null || values.open_balance < 0) {
          seterrorMessage2("This field is require*");
        }
        else {
          seterrorMessage2("")
        }
        if (values.lenders_name === "") {
          seterrorMessage3("This field is require*");
        }
        else {
          seterrorMessage3("")
        }

        if (values.monthly_payment === null || values.monthly_payment < 0) {
          seterrorMessage4("This field is require*");
        }
        else {
          seterrorMessage4("")
        }
        try {
          const response = await axios.put(id ? `${ADD_LIABILITY}/${id}` : `${ADD_LIABILITY}`, values,{
            headers: {
              Authorization: token,
            },
          });
          if (response?.status === 200) {
            // toast("Data updated successfully!");
            navigate("/verify-your-libility");
          }
          if (response?.status === 201) {
            // toast("Data added successfully!");
            navigate("/verify-your-libility");
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
        const response = await axios.get(`${EDIT_GET}/Liability/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          setFieldValue("type_of_liability", data.rows[0].type_of_liability);
          setFieldValue("open_balance", data.rows[0].open_balance);
          setFieldValue("lenders_name", data.rows[0].lenders_name);
          setFieldValue("monthly_payment", data.rows[0].monthly_payment);
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
        <section className="row py-4">
        <div className=" col-12 col-lg-9 mx-auto py-3 text-center">
              <h1 className="fw-semibold">Breaking Down Your  <span className="txt-secondary">Liabilities </span> </h1>
              <p className="mx-auto px-3 text-muted">
              Understanding your existing financial commitments and liabilities is crucial. It helps us gauge your financial health and determine the best mortgage terms suited to your situation. Let's detail your outstanding obligations to ensure a comprehensive mortgage evaluation.
               </p>
              <div className="col-lg-12 mx-auto col-11  txt-14 mb-3">
                <p className="text-muted text-center  w-100">
                  <span className="fw-bolder txt-sharp-red"> NOTE: </span> Do not enter Mortgage associated with Primary Housing or rental properties.
                </p>
              </div>
            </div>
          <div className="col-12 col-lg-8 mx-auto ">
           

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
                <h3 className="fw-semibold">Add another Liability</h3>
              </div>
              {/* Form */}
              <form
                className="px-3 py-2 col-10 mx-auto"
                oonSubmit={handleSubmit}
              >
                <div className="d-flex flex-wrap gap-3 justify-content-between">
                  <div className="d-flex flex-column mt-3 flex-grow-1 w-25 ">
                    <label className=" my-2">
                      <h5 className="fw-semibold ">Type of Liability</h5>
                    </label>
                    <div className="input-group-1 input-group mb-3 ">
                      <Dropdown
                        name="type_of_liability"
                        value={values.type_of_liability}
                        options={typeOfLiabilityOptions}
                        optionLabel="name"
                        optionGroupChildren={6} // Set the number of options to show
                        onChange={(e) => setFieldValue('type_of_liability', e.value)}
                        id="type_of_liability"
                        className=" w-100 input-1 py-1 focus-dropdown  my-dropdown  "
                        placeholder="Installment (e.g, car, student)"
                        style={{ maxHeight: '600px' }}
                      />

                      {/* <input
                        type="text"
                        name="type_of_liability"
                        value={values.type_of_liability}
                        onChange={handleChange}
                        id="type_of_liability"
                        className="form-control input-1 py-3"
                        placeholder="Installment (e.g, car, student)"
                        aria-describedby="basic-addon1"
                        style={{
                          background: "white",
                          fontSize: "14.187px",
                          borderRadius: 11,
                          color: "#797292",
                          marginLeft: "-2px",
                        }}
                      /> */}
                    </div>
                    {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}

                  </div>
                  <div className="d-flex flex-column mt-3 flex-grow-1 w-25">
                    <label className=" my-2">
                      <h5 className="fw-semibold ">Open Balance</h5>
                    </label>
                    <div className="input-group-1 input-group mb-3 ">
                      <span className="input-group-1-text input-group-text">
                        <img src="./assets/icons/businessplan.png" alt="" />
                      </span>
                      <InputNumber
                        type="text"
                        name="open_balance"
                        value={values.open_balance}
                        id="open_balance"
                        placeholder="Enter Balance"
                        className="form-control input-1 p-0 py-1 custom-input-number  w-25"
                        style={{
                          background: "white",
                          fontSize: "14.187px",
                          borderRadius: 11,
                          color: "#797292",
                          marginLeft: "-2px",
                        }}
                        onValueChange={(e) => handleChange({ target: { name: "open_balance", value: e.value } })}
                        locale="en-us"
                        minFractionDigits={2}
                      />
                      {/* <input
                        type="text"
                        name="open_balance"
                        value={values.open_balance}
                        onChange={handleChange}
                        id="open_balance"
                        placeholder="Enter Balance"
                        className="form-control input-1 py-3"
                        style={{
                          background: "white",
                          fontSize: "14.187px",
                          borderRadius: 11,
                          color: "#797292",
                          marginLeft: "-2px",
                        }}
                      /> */}
                    </div>
                    {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}

                  </div>
                </div>
                <div className="d-flex flex-wrap gap-3 justify-content-between mb-3">
                  <div className="d-flex flex-column mt-3 flex-grow-1 w-25">
                    <label className=" my-2">
                      <h5 className="fw-semibold ">Lender’s Name</h5>
                    </label>
                    <div className="input-group-1 input-group mb-3 ">
                      <span className="input-group-1-text input-group-text">
                        <img src="./assets/icons/brand-netflix.png" alt="" />
                      </span>
                      <input
                        type="text"
                        value={values.lenders_name}
                        onChange={(e) => {
                          if (validateAlphabets(e.target.value) || e.target.value === "") {
                            handleChange(e);
                          }
                        }}
                        name="lenders_name"
                        id="lenders_name"
                        placeholder="Enter Lender’s Name"
                        className="form-control input-1 py-3 ps-0 input-bg-white"
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
                    {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}

                  </div>
                  <div className="d-flex flex-column mt-3 flex-grow-1 w-25">
                    <label className=" my-2">
                      <h5 className="fw-semibold ">Monthly Payment</h5>
                    </label>
                    <div className="input-group-1 input-group mb-3 ">
                      <span className="input-group-1-text input-group-text">
                        <img src="./assets/icons/cash-banknote.png" alt="" />
                      </span>
                      <InputNumber
                        type="text"
                        name="monthly_payment"
                        value={values.monthly_payment}
                        onChange={handleChange}
                        id="monthly_payment"
                        placeholder="Enter Payment"
                        className="form-control input-1 p-0 py-1 w-50 custom-input-number"
                        style={{
                          background: "white",
                          fontSize: "14.187px",
                          borderRadius: 11,
                          color: "#797292",
                          marginLeft: "-2px",
                        }}
                        onValueChange={(e) => handleChange({ target: { name: "monthly_payment", value: e.value } })}
                        locale="en-us"
                        minFractionDigits={2}
                      />
                      {/* <input
                        type="text"
                        name="monthly_payment"
                        value={values.monthly_payment}
                        onChange={handleChange}
                        id="monthly_payment"
                        placeholder="Enter Payment"
                        className="form-control input-1 py-3"
                        style={{
                          background: "white",
                          fontSize: "14.187px",
                          borderRadius: 11,
                          color: "#797292",
                          marginLeft: "-2px",
                        }}
                      /> */}
                    </div>
                    {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage4}</span>}
                  </div>
                </div>
                <div className="call-to-action my-4">
                  <Link
                    type="button"
                    className="btn py-2 p-1  btn-cancel"
                    // href="/add-liability-info"
                    to={toSummary ? "/add-liability-info" : "/verify-your-libility"}
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-add ps-4 pe-4 "
                    to="/verify-your-libility"
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

export default EnterNewLiability;
