import React, { useEffect } from "react"; 
import "@fontsource/poppins";
import './style.css'
import { Link } from "react-router-dom";
const SelectIncomeSources = () => {
  useEffect(()=>{
    localStorage.setItem('setIncomeSourceActive', false);
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
  })
  return (
    <> 
      <main className="container-fluid pe-5">
        <section className="row py-1 pb-4 ">
          {/* Take full size on Screens other than large screens */}
          <div className="col-12 col-lg-7 mx-auto  w-75">
            {/* Headings */}
            <div className="py-3 text-center">
              <h1 className="fw-semibold">Defining <span className="txt-secondary">Income </span><span className="txt-primary">Sources</span></h1>
              <p className="mx-auto px-3 text-muted">
              Please provide all income sources for yourself and any co-borrowers you're applying with, such  as a spouse
              </p>
            </div>

            {/* Note Para */}
            <div className="col-lg-12 mt-4 mx-auto col-11   ">
              <p className="text-muted text-center  w-100">
                <span className="fw-bolder txt-sharp-red"> NOTE: </span>If you're applying for a no-income loan, please proceed to the next step
              </p>
            </div>

            {/* Select Income */}
            <div className="mt-4  w-100 ">
              <h6 className="fw-bold ">Type of Income</h6>

              {/* Income Cards */}
              <div className="d-flex  w-100  pt-4 justify-content-center flex-column flex-lg-row gap-3 align-items-center">
                <Link
                  className="py-4    input-bg-white form-select-cards text-decoration-none text-dark"
                  to="/add-employment-sources"
                  style={{
                    width: "18rem",
                    height: "7rem",
                  }}
                >
   {/* <div className=" d-flex justify-content-center flex-column"> */}
                  <img  width="25px" height="25px" src="./assets/icons/user.png" alt="button-img" />
                  <p className="fw-semibold mt-0 w-100">Employment <br /> Income</p>
                  {/* </div> */}
                </Link>
                <Link
                  className="py-4   input-bg-white  form-select-cards text-decoration-none text-dark"
                  to="/business-income-info"
                  style={{
                    width: "18rem",
                    height: "7rem",
                  }}
                >
                  <img  src="./assets/icons/briefcase.png" alt="button-img" />
                  <p className="fw-semibold  mt-2  "> Business <br /> Income</p>
                </Link>
                <Link
                  className="py-4  w-100 input-bg-white form-select-cards text-decoration-none text-dark align-items-center"
                  to="/add-rental-income-information"
                  style={{
                    width: "18rem",
                    height: "7rem",
                  }}
                >
                  {/* <div className=" d-flex justify-content-center flex-column"> */}
                  <img    src="./assets/icons/home-2.png" alt="button-img" />
                  <p className="fw-semibold mt-2 pb-3 mb-2">Rental Income</p>
                  {/* </div> */}
                </Link>
                <Link
                  className="py-4   input-bg-white form-select-cards text-decoration-none text-dark"
                  to="/other-business-income"
                  style={{
                    width: "18rem",
                    height: "7rem",
                  }}
                >
                  {/* <div className="d-flex jutify-content-center flex-column"> */}
                  <img
                    src="./assets/icons/cash-banknote.png"
                    alt="button-img"
                  />
                  <p className="fw-semibold mt-2 pb-3 mb-2">Other Income</p>
                  {/* </div> */}
                </Link>
              </div>
              <div className="mt-5 input-bg-white d-flex justify-content-center gap-3">
                <Link to="/summary-income-sources">
                  <button className="back-btn">Back</button>
                </Link>
                <Link to="/summary-income-sources" onClick={()=>{
        localStorage.setItem('allIncomeSourcesExist', true);
      }}>
                  <button className="next-btn-fill">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SelectIncomeSources;
