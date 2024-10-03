import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { Link } from "react-router-dom";

const VerifyYourAssests = () => {
  // const [addAssetsbtn, setAddAssetsbtn] = useState(JSON.parse(localStorage.getItem("addAssetsbtnvalue")));

  useEffect(()=>{
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', false);

    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', false);
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
  })
  return (
    <>
      <Header />
      <main>
        <section className="income-section">
          <div className="income-source-container">
            <h2 style={{ fontFamily: "Poppins" }}> Assessment of  <span className="txt-secondary">Your </span><span className="txt-primary">Assets</span> </h2>
            <p>
            Assets play a critical role in mortgage applications, reflecting your financial health and reliability. By detailing your assets, we get a clear picture of your financial foundation, aiding in crzafting an optimal mortgage plan.    
            </p>
            {/* <!-- Green Box --> */}
            <div className="income-info-box">
              <h2 className="ps-4"> Assets</h2>
              <div className="income-info-body p-0 py-5 px-4">
                <div className="income-info-item  w-100">
                  <Link className="d-flex justify-content-start align-items-center " to="/assets-form">
                    <button className="p-0 m-0 ">
                      <img
                        src="./assets/icons/circle-plus.png"
                        alt="icon-plus"
                        />
                    </button>
                    <h3 className=" ps-2 text-primary text-bold fw-semibold">Add new Asset</h3>
                  </Link>
                </div>
              </div>
              <div className="buttons gap-3  mt-3 mb-5 gap-3">
                <button
                  className="btn1 mt-4"
                  type="button"
                  onClick={() => {
                    window.history.back(); // Navigate back one step
                  }}
                >
                  Back
                </button>
                {/* {addAssetsbtn && <a href="">
                  <button className="btn2">Next</button>
                </a>
                } */}
              </div>
            </div>
          </div>
         
        </section>
      </main>
    </>
  );
};
export default VerifyYourAssests;
