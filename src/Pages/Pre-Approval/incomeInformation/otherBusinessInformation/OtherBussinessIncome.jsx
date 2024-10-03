import React, { useEffect, useState } from "react";
// import upload from "../Icon.svg";
import "./style.css";
import Header from "../../../../Components/header";
import "@fontsource/poppins";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { ADD_OTHER_ICOM,EDIT_GET}from "../../../../constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import ErrorModal from "../../../../Components/ErrorMessage";

function OtherBusinessIncome() {
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [errorMessage4, seterrorMessage4] = useState("");
  const [allValues, setAllValues] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const token = localStorage.getItem('accessToken')

  const info = useLocation().state || {};
  const id = info?.info?.id;
  const navigate = useNavigate();

  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    type_of_income: "",
    antecedent_year_income: "",
    previous_year_income: "",
  };



  const { handleChange, handleSubmit, isSubmitting, values,setFieldValue} = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (values.type_of_income ===null  || values.type_of_income <= 0) {
        seterrorMessage1("This field is require*");
      }
      else {
        seterrorMessage1("")
      }
      if (values.antecedent_year_income ===null  || values.antecedent_year_income < 0 === "") {
        seterrorMessage2("This field is require*");
      }
      else {
        seterrorMessage2("")
      }
      if (values.previous_year_income ===null  || values.previous_year_income < 0 === "") {
        seterrorMessage3("This field is require*");
      }
      else {
        seterrorMessage3("")
      }
     
      try {
        const response = await axios.put(id ? `${ADD_OTHER_ICOM}/${id}` : `${ADD_OTHER_ICOM}`, values, {
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
          "🚀 ~ file: OtherBussinessIncome.jsx:24 ~ onSubmit:async ~ response:",
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
            setApiErrorMessage("little hiccup");
            // Display error message in modal
          } 
        } else {
          // Handle other error cases as needed
          console.log('Other error:', error);
        }
        setErrorFeild(true); // Set the error field flag
        console.log(
          "🚀 ~ file: OtherBussinessIncome.jsx:25 ~ onSubmit:async ~ error:",
          error
        );
      }
    },
  });

  useEffect(() => {
    const getAllSources = async () => {
      try {
        const response = await axios.get(`${EDIT_GET}/Other/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          setFieldValue("antecedent_year_income", data.rows[0].antecedent_year_income);
          setFieldValue("previous_year_income", data.rows[0].previous_year_income);
          setFieldValue("type_of_income", data.rows[0].type_of_income);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getAllSources();
  }, []);

  const currentYear = new Date().getFullYear(); // 2020
  const previousYear2 = currentYear - 2;
  const previousYear1 = currentYear - 1;


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
      <div className="container mt-5 pt-5">
        <div className="row position-relative">
          <div className="col-12 ">
            <div className="bIncome">
              <h2>Other <span className="txt-secondary">Income </span><span className="txt-primary">Information</span></h2>
              <div className="col-lg-12 mx-auto col-11   ">
                  <p className="text-muted text-center  w-100">
                    <span className="fw-bolder txt-sharp-red"> NOTE: </span>Enter “0” if there is no income</p>
                </div>
              <div className="text mb-2 ">
                <h6 className="mt-5  text-start mb-1 ">What do you call this source of income?</h6>
                <div className="input mb-3">
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg> */}
                  <img className=" bi bi-currency-dollar ms-2" width='15px' height="20px" src='/assets/icons/T.png' />

                  <input
                  type="text"
                  className="inputText ms-2 ps-3"
                  placeholder="Write the type of income"
                  name="type_of_income"
                  value={values.type_of_income}
                  onChange={handleChange}
                />
                </div>
                {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}

              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="row mb-5  d-flex justify-content-center">
            <div className="col-lg-5 col-md-12 col-sm-12 mt-5 d-flex justify-content-end   pe-4">
              <div>
                <div className="year mb-5 ">
                  <h4>Year {previousYear2} </h4>
                </div>
                <div className="text mb-2">
                  <h6>Enter your earnings from this source in {previousYear2}</h6>
                </div>
                <div className="input mb-3 py-3">
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg> */}
                  <img className=" bi bi-currency-dollar ms-2" width='25px' height='25px' src='/assets/images/currency-dollar.png' />

                  <InputNumber
                  type="text"
                  className="inputText ms-3 "
                  placeholder={`Enter your ${previousYear2} net profit`}
                  name="antecedent_year_income"
                  value={values.antecedent_year_income}
                  onValueChange={(e) => handleChange({ target: { name: "antecedent_year_income", value: e.value } })}
                  locale="en-us"
                  minFractionDigits={2}
                />
                </div>
                {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}

              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 businessIncome mt-5  d-flex justify-content-start ps-4 ">
              <div className="py-0">
                <div className="year mb-5 ">
                  <h4 id="secondyear">Year {previousYear1}</h4>
                </div>
                <div className="text mb-2">
                  <h6>Enter your earnings from this source in {previousYear1}</h6>
                </div>
                <div className="input mb-3  py-3 ">
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg> */}
                  <img className=" bi bi-currency-dollar ms-2" width='25px' height='25px' src='/assets/images/currency-dollar.png' />

    
                  <InputNumber
                  type="text"
                  className="inputText ms-3"
                  placeholder={`Enter your ${previousYear1} net profit`}
                  name="previous_year_income"
                  value={values.previous_year_income}
                  onValueChange={(e) => handleChange({ target: { name: "previous_year_income", value: e.value } })}
                  locale="en-us"
                  minFractionDigits={2}
                />
                </div>
                {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}

              </div>
            </div>
          </div>
          <div className="buttons mt-4 mb-5">
            <Link to="/select-income-sources">
              <button
                className="btn1"
                onClick={() => navigate("/select-income-sources")}
              >
                Back
              </button>
            </Link>
            &nbsp;&nbsp; 
              <button className="btn2" type="submit" onClick={handleSubmit}>
                Next
              </button> 
          </div>
        </form>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        errorMessage={apiErrorMessage}
      />
    </>
  );
}

export default OtherBusinessIncome;
