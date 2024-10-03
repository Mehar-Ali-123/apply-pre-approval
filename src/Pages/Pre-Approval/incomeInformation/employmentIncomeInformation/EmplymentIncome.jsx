// import upload from "../Icon.svg";
import camera from "../../cash-banknote.svg";
import "./style.css";
import "@fontsource/poppins";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { ADD_EMPLOYMENT_INCOME, EDIT_GET } from "../../../../constants";
// import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from 'primereact/calendar';
import ErrorModal from "../../../../Components/ErrorMessage";
import { Link } from "react-router-dom";

function EmplymentIncome() {
  const info = useLocation().state || {};
  const locationState = useLocation().state;
  const token = localStorage.getItem('accessToken')

  if (locationState) {
    // The location state has data, you can use it here
    console.log("Location state has data:", locationState);
  } else {
    // The location state is empty
    console.log("Location state is empty");
  }
  const [errorFeild, setErrorFeild] = useState(false)
  const [errorMessage1, seterrorMessage1] = useState("");
  const [errorMessage2, seterrorMessage2] = useState("");
  const [errorMessage3, seterrorMessage3] = useState("");
  const [errorMessage4, seterrorMessage4] = useState("");
  const [errorMessage5, seterrorMessage5] = useState("");
  const [allValues, setAllValues] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');



  const handleError = () => {
    // setIsErrorModalOpen(true);
    // setApiErrorMessage("3432");
    // Resetting all error messages
    seterrorMessage1("");
    seterrorMessage2("");
    seterrorMessage3("");
    seterrorMessage4("");
    seterrorMessage5("");

    // Validation checks for required fields
    if (values.antecedent_year_income ===null || values.antecedent_year_income < 0) {
      seterrorMessage1("This field is required.");
    }
    if (values.previous_year_income ===null || values.previous_year_income < 0) {
      seterrorMessage2("This field is required.");
    }
    if (values.ytd_income ===null || values.ytd_income < 0) {
      seterrorMessage3("This field is required.");
    }
    if (!values.current_date_user  || values.current_date_user <= 0) {
      seterrorMessage4("This field is required.");
    }
    if (!values.position_start_date  || values.position_start_date <= 0) {
      seterrorMessage5("This field is required.");
    }
  }

  // const handleError = () => {
  //   if (values.antecedent_year_income === "") {
  //     seterrorMessage1("This field is require*");
  //   }
  //   else {
  //     seterrorMessage1("")
  //   }
  //   if (values.previous_year_income === "") {
  //     seterrorMessage2("This field is require*");
  //   }
  //   else {
  //     seterrorMessage2("")
  //   }
  //   if (values.ytd_income === "") {
  //     seterrorMessage3("This field is require*");
  //   }
  //   else {
  //     seterrorMessage3("")
  //   }
  //   if (values.current_date_user === "") {
  //     seterrorMessage4("This field is require*");
  //   }
  //   else {
  //     seterrorMessage4("")
  //   } if (values.position_start_date === "") {
  //     seterrorMessage5("This field is require*");
  //   }
  //   else {
  //     seterrorMessage5("")
  //   }
  // }

  console.log(
    "🚀 ~ file: EmplymentIncome.jsx:13 ~ EmplymentIncome ~ info:",
    info?.info?.id
  );
  const id = info?.info?.id;
  const navigate = useNavigate();
console.log(id)
  // Setting Initial Values
  const initialValues = {
    loan_number: localStorage.getItem("loanNo."), 
    antecedent_year_income: "",
    previous_year_income: "",
    ytd_income: "",
    position_start_date: " ",
    current_date_user: "",
  };

  const { handleChange, handleSubmit, values, isSubmitting, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          id ? `${ADD_EMPLOYMENT_INCOME}/${id}` : `${ADD_EMPLOYMENT_INCOME}`,
          values, {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response?.status === 200) {
          // toast("Data updated successfully!");
          navigate("/summary-income-sources");
        }
        if (response?.status === 201) {
          // toast("Data added successfully!");
          navigate("/summary-income-sources");
        }
        console.log("🚀 ~ :", response);
        
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
        // toast("Something went wrong!");
        setErrorFeild(true)
        console.log(
          "🚀 ~ file: EmplymentIncome.jsx:31 ~ onSubmit: ~ error:",
          error
        );
      }
    },
  });
  const currentYear = new Date().getFullYear(); // 2020
  const previousYear2 = currentYear - 2;
  const previousYear1 = currentYear - 1;

  useEffect(() => {
    const getAllSources = async () => {
      try {
        const response = await axios.get(`${EDIT_GET}/Employment/${localStorage.getItem("editId")}`,{ withCredentials: true, headers: {
          Authorization: token,
        }});
        const { data } = response || {};
        if (data?.rows && data.rows.length > 0) {
          setAllValues(data.rows[0]); // Set data from API to allValues
          console.log(data.rows[0]);

          const currentDateUser = new Date(data.rows[0].current_date_user);
          const positionStartDate = new Date(data.rows[0].position_start_date)
          setFieldValue("antecedent_year_income", data.rows[0].antecedent_year_income);
          setFieldValue("previous_year_income", data.rows[0].previous_year_income);
          setFieldValue("ytd_income", data.rows[0].ytd_income);
          setFieldValue("position_start_date", positionStartDate);
          setFieldValue("current_date_user", currentDateUser);
          console.log(data.rows[0].current_date_user)
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
      <div className="container-fluid m-0   p-0  pe-4">
        <div className="container-fluid  m-0 ">
          <div className="row position-relative">
            <div className="col-12">
              <div className="bIncome mb-3">
                <h2>Employment <span className="txt-secondary">Income </span><span className="txt-primary">Information</span></h2>
                <div className="col-lg-12 mx-auto col-11   ">
                  <p className="text-muted text-center  w-100">
                    <span className="fw-bolder txt-sharp-red"> NOTE: </span>Enter “0” if there is no income</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-5  ">
              <div
                className="col-lg-12 col-md-12 col-sm-12 mb-3 pe-3 d-flex align-items-center  border-0"
                style={{ borderRight: "1px solid #000000" }}
              >
                <div className="col-md-2">
                  <div className="year ">
                    <p className=" fw-semibold txt-26 txt-sky">Year {previousYear2}</p>
                  </div>
                </div>
                <div className="col-md-5  pe-3  ">
                  <div className="input  py-3" style={{ width: "100%" }}>
                    {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-currency-d9+8*4
                    7+336+63333333333333333333333ollar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                  </svg> */}
                    <img className=" bi bi-currency-dollar m-0 ms-2  " width='25px' height='25px' src='/assets/images/currency-dollar.png' />

                    {/* <input
                    type="number"
                    name="antecedent_year_income"
                    className="inputText ms-3"
                    placeholder="Enter your 2021 income"
                    value={values.antecedent_year_income}
                    onChange={handleChange}
                  /> */}

                    <InputNumber
                      type="text"
                      className="inputText ms-3  mt-0 bg-none"
                      placeholder={`Enter your ${previousYear2} income`}
                      name="antecedent_year_income"
                      value={values.antecedent_year_income}
                      onValueChange={(e) => handleChange({ target: { name: "antecedent_year_income", value: e.value } })}
                      locale="en-us"
                      minFractionDigits={2}
                    />

                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage1}</span>}

                </div>
                {/* <div className="text mb-2">
                  <h6>How much did you earn in year 2021</h6>
                </div> */}
                {/* <div className="lastText mb-3">
                  <h5>Attach W-2 for year 2021</h5>
                </div>
                <div className="upload" style={{ width: "100%" }}>
                  <div className="uploadIcon">
                    <label htmlFor="image">
                      <input
                        type="file"
                        name="file_2021"
                        id="image"
                        style={{ width: "100%" }}
                      />
                      <img src={upload} alt="" className="mb-2" />
                      <div>
                        <h6>Drop files here or click to upload</h6>
                      </div>
                    </label>
                  </div>
                </div> */}
              </div>
              <div
                className="col-lg-12 col-md-12 col-sm-12 pe-3 ps-3 mb-3 d-flex align-items-center mt-3  "
              // style={{ borderRight: "1px solid #000000" }}
              >
                <div className="col-md-2">
                  <div className="year ">
                    <h4 id="secondyear" className=" fw-semibold txt-26">Year {previousYear1}</h4>
                  </div>
                </div>
                <div className="col-md-5  pe-3  ">
                  <div className="input  py-3" style={{ width: "100%" }}>
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
                    <img className=" bi bi-currency-dollar ms-2 " width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                    {/* 
                  <input
                    type="number"
                    className="inputText ms-3"
                    name="previous_year_income"
                    placeholder="Enter your 2022 income"
                    value={values.previous_year_income}
                    onChange={handleChange}
                  /> */}
                    <InputNumber
                      type="text"
                      className="inputText ms-3  bg-none"
                      placeholder={`Enter your ${previousYear1} income`}
                      name="previous_year_income"
                      value={values.previous_year_income}
                      onValueChange={(e) => handleChange({ target: { name: "previous_year_income", value: e.value } })}
                      locale="en-us"
                      minFractionDigits={2}
                    />
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage2}</span>}
                </div>

              </div>
              <div className="col-lg-12  col-md-12 col-sm-12 ps-3 pe-3 d-flex ">
                <div className="col-md-2  d-flex justify-content-center align-items-center">
                  <div className="year  ">
                    <p id="secondyear" className=" fw-semibold txt-26 text-success">
                      Year to Date    (YTD)
                    </p>
                  </div>
                </div>
                <div className="col-md-5 pe-3 ">
                  <div className="text mb-4">
                  </div>
                  <div
                    className="input mb-3"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img className=" bi bi-currency-dollar ms-2 " width='25px' height='25px' src='/assets/images/currency-dollar.png' alt="" />
                    {/* <input
                    type="number"
                    className="inputText ms-3"
                    placeholder="Enter your YTD"
                    style={{ width: "100%" }}
                    name="ytd_income"
                    value={values.ytd_income}
                    onChange={handleChange}
                  /> */}
                    <InputNumber
                      type="text"
                      className="inputText ms-3  bg-none"
                      placeholder="Enter your YTD"
                      name="ytd_income"
                      value={values.ytd_income}
                      onValueChange={(e) => handleChange({ target: { name: "ytd_income", value: e.value } })}
                      locale="en-us"
                      minFractionDigits={2}
                    />
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage3}</span>}

                </div>
                <div className="col-md-5   pe-3 ">
                  <div className="text ">
                    <h6>Date of Year to Date Paystub</h6>
                  </div>

                  <div
                    className="input mb-3 "
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img className=" bi bi-currency-dollar ms-2 " width='25px' height='25px' src='/assets/images/calenderEvent.png' alt="" />

                    <Calendar value={values.current_date_user}
                      id="current_date_user"
                      className="inputText input_calender ms-3"
                      placeholder="Enter date of YTD Paystub"
                      style={{ width: "100%" }}
                      name="current_date_user"
                      onChange={handleChange}
                    />

                    {/* <input
                    type="date"
                    id="current_date_user"
                    className="inputText ms-3"
                    style={{ width: "100%" }}
                    name="current_date_user"
                    value={values.current_date_user}
                    onChange={handleChange}
                  /> */}
                  </div>
                  {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage4}</span>}

                </div>

                {/* <div className="lastText mb-3">
                  <h5>Attach most recent paystubs</h5>
                </div>
                <div className="upload" style={{ width: "100%" }}>
                  <div className="uploadIcon">
                    <label htmlFor="image">
                      <input
                        type="file"
                        id="image"
                        style={{ width: "100%" }}
                        name="ytd_file"
                      />
                      <img src={upload} alt="" className="mb-2" />
                      <div>
                        <h6>Drop files here or click to upload</h6>
                      </div>
                    </label>
                  </div>
                </div> */}
              </div>
              <div >
                <div className=" col-md-12 w-100  mt-3 ">
                  <div className="d-flex ps-0  align-items-center">
                    <div className=" me-1 col-md-2 ">
                      <h4 className="txt-26 fw-semibold mb-2 h2  txt-red">Current Job start date</h4>
                    </div>
                    <div className="col-lg-5 col-md-5  pe-3 col-sm-12 mx-0">
                      <div
                        className="input  w-100 mb-3 "
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img className=" bi bi-currency-dollar ms-2 " width='25px' height='25px' src='/assets/images/calenderEvent.png' alt="" />
                        {/* <input
                        type="date"
                        id="position_start_date"
                        className="inputText ms-3"
                        style={{ width: "100%" }}
                        name="position_start_date"
                        value={values.position_start_date}
                        onChange={handleChange}
                      /> */}

                        <Calendar
                          id="position_start_date"
                          className="inputText ms-2  "
                          placeholder="Enter start date of current job"
                          style={{ width: "100%" }}
                          name="position_start_date"
                          value={values.position_start_date}
                          onChange={handleChange}
                        />
                      </div>
                      {errorFeild && <span className="mt-2" style={{ color: "red", marginLeft: 10 }}>{errorMessage5}</span>}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons mt-4 mb-5 gap-3">
              <Link to="/select-income-sources">
                <button className="btn1" type="button">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              {/* <Link to="/summary-income-sources"> */}
                <button onClick={handleError} className="btn2" type="submit">
                  Next
                </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        errorMessage={apiErrorMessage}
      />
    </>
  );
}

export default EmplymentIncome;
