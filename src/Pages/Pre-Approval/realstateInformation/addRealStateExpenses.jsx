import React from "react";
import "./style.css";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { Link } from "react-router-dom";

const AddRealStateExpenses = () => {
  return (
    <>
      <Header />
      <main>
        <section className="income-section">
          <div className="income-source-container">
            <h2>Verify Your Real Estate Owned</h2>
            <p>
              Please review and verify your other income sources. We will use
              the information you provide to process your loan application.
            </p>
            <div className="income-info-box">
              <h2>Your Real Estate Owned</h2>
              <div className="income-info-body">
                <div className="income-info-item">
                  <Link to="/verify-real-estate">
                    <button>
                      <img
                        src="./assets/icons/circle-plus.png"
                        alt="icon-plus"
                        style={{ paddingBottom: "12px" }}
                      />
                    </button>
                    <p>Add new real estate owned</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons mt-5 mb-5">
            <Link to="/summary-income-sources">
              <button className="btn1">Back</button>
            </Link>
          </div>
          <img
            src="./assets/images/rectangle.png"
            alt="rectangle"
            className="rectangle"
          />
        </section>
      </main>
    </>
  );
};

export default AddRealStateExpenses;
