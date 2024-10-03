import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { Link } from "react-router-dom";
// import { Link } from  "react-router-dom";

const AddPrimaryHomeExpenses = () => {
  // const [addPrimaryHousebtn , setAddPrimaryHousebtn] = useState(JSON.parse(localStorage.getItem("addPrimaryHousebtnvalue")));
 
  useEffect(() => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', false);
    localStorage.setItem('setDisablePrimary', true);
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
  }, [window.location.pathname]); // This will trigger the effect whenever the route changes

  
  return (
    <>
      <Header />
      <main>
        <section className="income-section mt-0">
          <div className="income-source-container mt-0">
            <h2 > Gathering <span className="txt-secondary">Primary Housing  </span><span className="txt-primary">Expense</span></h2>
            <p>
            Please provide Primary Housing Expense for yourself and any co-borrowers you're applying with, such as a spouse
            </p>
                {/* Note Para */}
                <div className="col-lg-12 mt-4 mx-auto col-11    ">
              <p className="text-muted text-center  w-100 ">
                <span className="fw-bolder txt-sharp-red"> NOTE: </span>Only input the expense once if you and the co-borrower have same primary housing expense.
              </p>
            </div>
            <div className="income-info-box">
              <h2>Your Primary home expense</h2>
              <div className="income-info-body">
                <div className="income-info-item">
                  <Link className="d-flex justify-content-start align-items-center" to="/primary-home-expenses">
                    <button className="ps-0 pe-0">
                      <img
                        src="./assets/icons/circle-plus.png"
                        alt="icon-plus"
                      />
                    </button>
                    <p className="p-0 m-0 fs-5 text-bold" >Add Primary House Expense</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
         
          <div className="buttons  mb-5  mt-5 gap-3 ">
          <button
            className="btn1"
            type="button"
            onClick={() => {
              window.history.back(); // Navigate back one step
            }}
          >
            Back
          </button> 
          {/* { addPrimaryHousebtn &&  <a href="/primary-home-expenses-summary">
                  <button className="btn2">Next</button>
                </a> 
          } */}
         
        </div>
        </section>
        

      </main>
    </>
  );
};

export default AddPrimaryHomeExpenses;
