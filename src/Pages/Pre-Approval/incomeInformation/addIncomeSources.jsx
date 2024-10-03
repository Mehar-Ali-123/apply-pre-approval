import React, { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import Header from "../../../Components/header";
import { Link } from "react-router-dom";
const AddIncomeSources = () => {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="row py-4">
          <div className="col-12 col-lg-7 ms-auto me-auto w-50">
            {/* Headings */}
            <div className="py-3 text-center">
              <h1 className="fw-semibold">Your income Sourcess</h1>
              <p className="mx-auto px-3 text-muted">
                Please review and verify your income sources. We will use the
                information you provide to process your Pre-Approval.
              </p>
            </div>
            {/* Income Source */}
            <div className="shadow mx-2" style={{ borderRadius: "10px" }}>
              {/* Income Source Head */}
              <div
                className=" py-3 px-3 mt-5"
                style={{
                  backgroundColor: "#D0FFF2",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h3 className="fw-semibold text-bold">Your Income Information</h3>
              </div>
              {/* Add New Income Source */}
              <Link
                className="d-flex align-items-center align-content-between text-decoration-none  py-4 px-3 gap-2"
                to={`/select-income-sources`}
              >
                <img src="./assets/icons/circle-plus.png" alt="icon-plus" />
                <h3 className="my-0 fw-semibold text-primary text-bold">Add Income Source</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Calculator Button */}
      <div className="mt-5 bg-white d-flex justify-content-center gap-3">
        {/* <a href="/address">
          <button className="back-btn">Calculators</button>
        </a> */}
        {/* <a href="/mortgage-payment">
          <button className="next-btn-fill">Charts</button>
        </a> */}
      </div>
      {/* Floating Images */}
      <div className="d-none d-lg-block">
        {/* <img
          src="./assets/images/rectangle-left.png"
          className="position-absolute w-25"
          style={{ bottom: 0 }}
          alt="rectangle"
        /> */}
        {/* <img
          src="./assets/images/rectangle-right.png"
          className="position-absolute"
          style={{ right: 0, top: 50 }}
          width="18%"
          alt="rectangle"
        /> */}
      </div>
    </>
  );
};

export default AddIncomeSources;
