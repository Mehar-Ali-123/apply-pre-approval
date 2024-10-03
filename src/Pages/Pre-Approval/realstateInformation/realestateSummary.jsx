import React from "react";
import Header from "../../../Components/header";
const RealEstateSummary = () => {
  return (
    <>
      <Header />
      <main>
        <section className="income-section">
          <div className="income-source-container">
            <h2>Verify Your Real Estate Owned</h2>
            <p>
              Please review and verify your primary house expense. We will use
              the information you provide to process your loan application.
            </p>
            <div className="income-info-box">
              <div class="table-header">
                <h2>Your Real Estate Owned</h2>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    window.location.replace("/add-real-estate-info")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <ellipse
                    cx="16"
                    cy="15.5"
                    rx="12"
                    ry="11.625"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15.5H20"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.9997 11.625V19.375"
                    stroke="#222D39"
                    strokeWidth="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <table className="income-info-table">
                <thead>
                  <tr>
                    <th>Property Address</th>
                    <th>Property Status</th>
                    <th>Expected Rental Income</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Property Address">
                      123 Main St. Hoboken, NJ, 07030
                    </td>
                    <td data-label="Property Status">Owned</td>
                    <td data-label="Expected Rental Income">23456</td>
                    <td data-label="ACTIONS">
                      <div>
                        <img
                          src="./assets/icons/pencil.png"
                          alt="pencil"
                          role="button"
                        />
                        <img src="./assets/icons/x.png" alt="x" role="button" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="buttons mt-5 mb-5">
                <Link to="/summary-income-sources">
                  <button className="btn1">Back</button>
                </Link>
                &nbsp;&nbsp;
                <Link to="/verify-your-assets">
                  <button className="btn2">Next</button>
                </Link>
              </div>
            </div>
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

export default RealEstateSummary;
