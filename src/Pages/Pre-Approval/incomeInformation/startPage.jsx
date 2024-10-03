import React, { useEffect, useState } from "react";
import "@fontsource/poppins";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setActivePreApprovalDashboard } from './DataSlice';
import { Link, useNavigate } from "react-router-dom";

const StartPage = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { activePreApprovalDashboard } = useSelector((state) => state.data); // Access data from the store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')
  const createRandomLoanNumber = async () => {
    try {
  
      const response = await axios.put(
        "https://api.oqteq.com/api/v1/preapproval/summary",
        {
          user_id: user.user_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.status === 200) {
        const loan_number = response?.data?.loanNumber;
        localStorage.setItem("loanNo.", loan_number);
        // Reset the purchase price to empty
        localStorage.setItem('purchasePrice', "");
        localStorage.setItem('downPayment', "");
        localStorage.setItem('estimatedInsurance', "");
        localStorage.setItem('propertyType', "");
        localStorage.setItem('occupyProperty', "");
        localStorage.setItem('estimatedTaxes', "");
        localStorage.setItem('loanAmount', "");
        localStorage.setItem("newValue", false);
        localStorage.setItem("addPrimaryHousebtnvalue", true);
        localStorage.setItem("newValue1", false);
        localStorage.setItem("addLiabilitybtnvalue", true);
        localStorage.setItem("newValue2", false);
        localStorage.setItem("addAssetsbtnvalue", true);
        localStorage.setItem("activeCommonDashboard", false)
        localStorage.setItem('loan-Amount', "");
        localStorage.setItem('borrowerName', "");
        localStorage.setItem('editId', "");
        localStorage.setItem('setIncomeSourceActive', false)
        localStorage.setItem('setPrimaryActive', "")
        localStorage.setItem('setLiabilityActive', "")
        localStorage.setItem('setAssetsActive', "")
        localStorage.setItem('setSubjActive', "")
        localStorage.setItem('setStatusActive', "")
        localStorage.setItem('setUploadActive', "")
        localStorage.setItem('setViewDocumentActive', "")
        localStorage.setItem('setReviseStatusActive', "")
        localStorage.setItem('setDisablePrimary', "")
        localStorage.setItem('setDisableLiability', "")
        localStorage.setItem('setDisableAssets', "")
        localStorage.setItem('setDisableSubj', "")
        localStorage.setItem('setDisableStatus', "")
        localStorage.setItem('setDisableUpload', "")
        localStorage.setItem('setDisableView', "")
        localStorage.setItem('setDisableReviseStatus', "")
        localStorage.setItem('borrowerNames', "");
        localStorage.setItem('loan-Amount', "");



        localStorage.setItem('activePreApprovalDashboard', false);
        dispatch(setActivePreApprovalDashboard(true)); // Dispatch action to update the state

        navigate("/select-income-sources");
      }
    } catch (error) {
      navigate("/select-income-sources");
      console.log(
        "🚀 ~ file: vvverifyYourRealEstate.jsx:32 ~ onSubmit:async ~ error:",
        error
      );
    }
  };
  return (
    <>
      <Link type="button" className=" d-flex">
        <button
          className="btn-primary text-white d-flex gap-2 items-center py-3  mt-3 txt-15 "
          onClick={createRandomLoanNumber}>
          <img className="pre-image" width="15" height="15" src="./assets/icons/phone.svg" alt="" />  Pre-Approval
        </button>
      </Link>
    </>
  );
};
export default StartPage;
