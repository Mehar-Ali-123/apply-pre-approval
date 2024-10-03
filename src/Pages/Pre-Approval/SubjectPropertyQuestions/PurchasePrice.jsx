import React, { useState, useEffect } from 'react';
import Header from '../../../Components/header';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { Loader } from '../../../Components/common/Loader';
import "./styles.css"
import { InputNumber } from 'primereact/inputnumber';
function PurchasePrice() {
  const [errorField, setErrorField] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    loan_number: localStorage.getItem('loanNo.') || '',
    purchase_price: localStorage.getItem('purchasePrice') || '',
  };
  const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
    initialValues,
    onSubmit: async (values) => {

      if (!values.purchase_price || values.purchase_price <= 0) {
        setErrorMessage('This field is required.');
        setErrorField(true);
        return;
      } else {
        setErrorMessage('');
        setErrorField(false);
      }
      localStorage.setItem('purchasePrice', values.purchase_price);
      navigate('/add-loan-amount', { state: { ...values } });
    },
  });
  useEffect(() => {
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', false);
    localStorage.setItem('setDisableSubj', true)

    // Clear input field if localStorage changes
    if (localStorage.getItem('purchasePrice') !== values.purchase_price) {
      handleChange('purchase_price')('');
    }
  }, [localStorage.getItem('purchasePrice')]);

  return (
    <>
      {isSubmitting && <Loader />}
      <Header />
      <div className='row d-flex justify-content-center'>
        <section className="income-section row d-flex justify-content-center mt-5 col-md-9">
          <div className="income-source-container w-100 d-flex justify-content-center  flex-column  align-items-center">
            <h1 className='text-bold'> Gathering Your <span className="txt-secondary">Purchase Price </span><span className="txt-primary"> Details </span></h1>
            <p className="mx-auto px-3 text-muted text-center">
            To proceed with your Pre-Approval, we need some specifics. Starting with the purchase price of the property you're interested in. This information will aid us in tailoring the right Pre-Approved amount for you.
              </p>
            <form onSubmit={handleSubmit}>
              <div className="income-info-box mt-5">
                <div className="table-header">
                  <h5 className='fw-semibold mb-2'>Estimated Purchase Price</h5>
                </div>
                <div className="input  mb-3 py-3">
                  <img className=" bi bi-currency-dollar ms-2" width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                  {/* <input
                    className='ps-2 w-100 bg-transparent shadow-none'
                    name="purchase_price"
                    id="purchase_price"
                    placeholder="Estimated Purchase Price"
                    value={values.purchase_price}
                    onChange={handleChange}
                  /> */}
                  <InputNumber
                    className='ps-2 w-100 bg-transparent shadow-none'
                    name="purchase_price"
                    id="purchase_price"
                    placeholder="Estimated Purchase Price"
                    value={values.purchase_price}
                    onValueChange={(e) => handleChange({ target: { name: "purchase_price", value: e.value } })}
                    locale="en-us"
                    minFractionDigits={2}
                  />
                </div>
                {errorField && (
                  <span className="mt-2" style={{ color: 'red', marginLeft: 10 }}>
                    {errorMessage}
                  </span>
                )}             </div>

              <div className="mt-5 bg-white d-flex justify-content-center gap-3">
                <a>  <button
                  className="back-btn btn1"
                  type="button"
                  onClick={() => {
                    window.history.back(); // Navigate back one step
                    localStorage.setItem('setSubjActive', "");
                  }}
                >
                  Back
                </button>
                </a>
                <a>
                  <button type="submit" className="next-btn-fill">Next</button>
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>

    </>
  )
}

export default PurchasePrice