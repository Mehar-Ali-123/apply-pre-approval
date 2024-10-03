import React, { useEffect } from "react";
import Header from "../../../Components/header";
import "@fontsource/poppins";
import { Link } from "react-router-dom";


const AddLiabilityInformation = () => {
  //  const [addLiabilitybtn , setAddLiabilitybtn] = useState(JSON.parse(localStorage.getItem("addLiabilitybtnvalue")));
  useEffect(() => {
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', false);
    localStorage.setItem('setDisableLiability', true)

  })
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="row py-4">
          <div className="col-12 col-lg-9 mx-auto ">
            {/* Headings */}
            <div className="py-3 text-center">
              <h1 className="fw-semibold ">Breaking Down Your  <span className="txt-secondary">Liabilities </span> </h1>
              <p className="mx-auto  text-muted fs-6">
              Understanding your existing financial commitments and liabilities is crucial. It helps us gauge your financial health and determine the best mortgage terms suited to your situation. Let's detail your outstanding obligations to ensure a comprehensive mortgage evaluation.

              </p>
              <div className="col-lg-12 mx-auto col-11  mt-3 ">
                <p className="text-muted text-center  w-100 ">
                  <span className="fw-bolder txt-sharp-red "> NOTE: </span>  Do not enter Mortgage associated with Primary Housing or rental properties.
                </p>
              </div>
            </div>

            {/* Income Source */}
            <div className="shadow mx-2 w-100" style={{ borderRadius: "10px" }}>
              {/* Income Source Head */}
              <div
                className=" py-3 px-3"
                style={{
                  backgroundColor: "#D0FFF2",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h2 className="fw-semibold py-2 ps-3" >Liabilities</h2>
              </div>
              {/* Add New Income Source */}
              <Link
                className="d-flex align-items-center align-content-between text-decoration-none  py-5 px-4 gap-2"
                to="/add-new-liability"
              >
                <img src="./assets/icons/circle-plus.png" alt="icon-plus" />
                <h3 className="my-0 fw-semibold text-primary">Add New Liabilities</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>


      <div className="buttons  mt-3 mb-5 gap-3">
        <button
          className="btn1"
          type="button"
          onClick={() => {
            window.history.back(); // Navigate back one step
          }}
        >
          Back
        </button>
        {/* { addLiabilitybtn &&  <a href="/verify-your-libility">
                  <button className="btn2">Next</button>
                </a> 
          } */}
      </div>
    </>
  );
};

export default AddLiabilityInformation;
