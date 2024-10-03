import React from "react";
import "./style.css";
import "@fontsource/poppins";
import Header from "../../../../Components/header"
import { Link } from "react-router-dom";
const AddRentalIncomeInformation = () => {
  return (
    <>
    <Header/>
      <div className="absolute top-[236px] left-[594px] w-[540px] h-[84px] text-13xl">
        {/* <div className="absolute top-[0px] left-[0px] font-semibold inline-block w-[540px]">
          Provide your Information
        </div> */}
        {/* <div className="absolute top-[48px] left-[55px] text-base text-slategray inline-block w-[430px] h-9">
          Use information from your Tax return.
        </div> */}
      </div>
      <main>
        <section className="income-section ">
          <div className="income-source-container d-flex justify-content-center align-items-center flex-column ">
            <h1 className="text-center">Monthly<span className="txt-secondary">Rental</span><span className="txt-primary">Income</span> </h1>
            <p>
            Please provide rental income for yourself and any co-borrowers you're applying with, such as a spouse
            </p>
            <div className="income-info-box w-100 ">
              <h2>Rental Income Information</h2>
              <div className="income-info-body">
                <div className="income-info-item">
                  <Link className="d-flex justify-content-start align-items-center" to="/add-rental-income">
                    <button className="ps-0 pe-0">
                      <img
                        src="./assets/icons/circle-plus.png"
                        alt="icon-plus"
                      />
                    </button>
                    <p className="p-0 m-0 fs-5 text-bold">Add new rental Income</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
         
            <div className="buttons mt-5 mb-5">
  <button
    className="btn1"
    type="button"
    onClick={() => {
      window.history.back(); // Navigate back one step
    }}
  >
    Back
  </button>
</div>
        </section>
      </main>
    

    </>
  );
};

export default AddRentalIncomeInformation;
