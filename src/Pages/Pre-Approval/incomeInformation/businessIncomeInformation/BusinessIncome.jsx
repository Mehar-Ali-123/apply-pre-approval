import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../../../Components/header";
import "@fontsource/poppins";
import { useNavigate, useLocation } from "react-router";
import axios, { all } from "axios";
import { useFormik } from "formik";
import { ADD_INCOME, EDIT_GET } from "../../../../constants";
// import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { InputNumber } from 'primereact/inputnumber';
import ErrorModal from "../../../../Components/ErrorMessage";

function BusinessIncome() {
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [allIncomeSources, setAllIncomeSources] = useState(null);
  const [allValues, setAllValues] = useState(null);
  const [editValues, setEditValues] = useState(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const token = localStorage.getItem('accessToken')

  const state = useLocation().state;
  const info = useLocation().state || {};
  console.log(
    "🚀 ~ file: summaryOfIncomeInformation.jsx:9 ~ SummaryOfIncomeInformation ~ state:",
    state
  );

  const id = info?.info?.id;
  const navigate = useNavigate();
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."),
    antecedent_year_income: "",
    previous_year_income: "",
  };

  const { handleChange, handleSubmit, values, isSubmitting, resetForm, setFieldValue } = useFormik({
    initialValues, enableReinitialize: true,
    onSubmit: async (values) => {

      console.log("🚀 ~ file:  ~ onSubmit: ~ values:", values);
      if (values.antecedent_year_income === null || values.antecedent_year_income < 0) {
        seterrorMessage1("This field is required.");
      } else {
        seterrorMessage1("");
      }
      
      if (values.previous_year_income === null || values.previous_year_income < 0) {
        seterrorMessage2("This field is required.");
      }  else {
          seterrorMessage2("");
        } 
      try {
        const response = await axios.put(id ? `${ADD_INCOME}/${id}` : `${ADD_INCOME}`, values, {
          headers: {
            Authorization: token,
          },
        });
        if (response?.status === 200) { 
          navigate("/summary-income-sources");
        }
        if (response?.status === 201) { 
          navigate("/summary-income-sources");
        }
        console.log("🚀 ~ file: BusinessIncome:", response);
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
        console.log("🚀 ~ error:", error);
      }
    },
  });

  useEffect(() => {
    const getAllSources = async () => {
      try {
        const response = await axios.get(`${EDIT_GET}/Business/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          setFieldValue("antecedent_year_income", data.rows[0].antecedent_year_income);
          setFieldValue("previous_year_income", data.rows[0].previous_year_income);
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
            <Header />
      <div className="container col-11 mx-auto">
        <div className="row position-relative mb-4">
          <div className="col-12">
            <div className="bIncome">
              <h2>Business <span className="txt-secondary">Income </span><span className="txt-primary">Information</span> </h2>
               <div className="col-lg-12 mx-auto col-11   ">
                  <p className="text-muted text-center  w-100">
                    <span className="fw-bolder txt-sharp-red"> NOTE: </span>Enter “0” if there is no income</p>
                </div>
            </div>  
                     </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-5 d-flex justify-content-center ">
            <div className="col-lg-5 col-md-12 col-sm-12 pe-4 ps-5 ">
              <div className="year mb-5 ">
                <h4>Year {previousYear2}</h4>
              </div>
              <div className="text mb-2">
                <h6> What was the year {previousYear2}'s net profit?</h6>
              </div>
              <div className="inputText mb-3">
                <img className=" bi bi-currency-dollar " width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                {/* <CurrencyInput
                  className="inputSelf"
                  id="input-example"
                  name="antecedent_year_income"
                  placeholder="Enter your 2021 net profit"
                  allowNegativeValue={false} 
                  suffix=""
                  value={values.antecedent_year_income} // Connect to formik value
                  onValueChange={(value, name) =>
                    handleChange({
                      target: {
                        name,
                        value: value,
                      },
                    })
                  }
                /> */}
                <InputNumber
                  className="inputSelf py-2 bg-none"
                  name="antecedent_year_income"
                  id="input-example"
                  placeholder={`Enter your ${previousYear2} net profit`} 
                  value={values.antecedent_year_income}
                  onValueChange={(e) => handleChange({ target: { name: "antecedent_year_income", value: e.value } })}
                  // mode="currency"
                  // currency="USD"
                  locale="en-us"
                  minFractionDigits={2}
                />
              </div>
              {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}
            </div>
            <div className="col-5 businessIncome pt-0 ps-4  pe-5">
              <div className="year mb-5 ">
                <h4 id="secondyear">Year {previousYear1}</h4>
              </div>
              <div className="text mb-2">
              <h6> What was the year {previousYear1}'s net profit?</h6>              </div>
              <div className="inputText mb-3">
                <img className=" bi bi-currency-dollar " width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                <InputNumber
                  type="text"
                  className=" inputSelf py-2 my-custom-padding "
                  placeholder={`Enter your ${previousYear1} net profit`} 
                  name="previous_year_income"
                  value={values.previous_year_income}
                  onValueChange={(e) => handleChange({ target: { name: "previous_year_income", value: e.value } })}
                  // mode="currency"
                  // currency="USD"
                  locale="en-us"
                  minFractionDigits={2}
                />
              </div>
              {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}

              {/* <div className="lastText mb-3">
              <h5>Attach Business tax return for year 2022</h5>
            </div>
            <div className="upload">
              <div className="uploadIcon">
                <label htmlFor="image">
                  <input type="file" name="busines_tax_file2" id="image" />
                  <img src={upload} alt="" className="mb-2" />
                  <div>
                    <h6>Drop files here or click to upload</h6>
                  </div>
                </label>
              </div>
            </div> */}
            </div>
          </div>
          <div className="buttons mt-4 mb-5">
            <Link to="/select-income-sources">
              <button className="btn1">Back</button>
            </Link>
            &nbsp;&nbsp; 
              <button type="submit" className="btn2" >
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

export default BusinessIncome;
