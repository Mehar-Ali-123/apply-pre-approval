import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";
import Dashboard from "../Pages/client/Dashboard";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from "react-redux";
import { authActions, currentUser, getCompany } from "../Features/authSlice";
import { useSelector } from "react-redux";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import LoadingPage from "../Pages/LoadingPage";
import SetPassword from "../Pages/SetPassword";
import TestForm from "../Pages/TestForm";
import ClosedLoans from "../Pages/client/ClosedLoans";
import OpenLoans from "../Pages/client/OpenLoans";
import LoanForm from "../Pages/client/LoanForm";
import Thanks from "../Pages/Thanks";
import PreApprove from "../Pages/client/PreApprove";

// PRE APPROVAL IMPORTS

import AddIncomeSources from "../Pages/Pre-Approval/incomeInformation/addIncomeSources";
import SelectIncomeSources from "../Pages/Pre-Approval/incomeInformation/selectIncomeSources";
import SummaryOfIncomeInformation from "../Pages/Pre-Approval/incomeInformation/summaryOfIncomeInformation";
import EmplymentIncome from "../Pages/Pre-Approval/incomeInformation/employmentIncomeInformation/EmplymentIncome";
import AddLiabilityInformation from "../Pages/Pre-Approval/liability/addLiabilityInformation";
import AddRealStateExpenses from "../Pages/Pre-Approval/realstateInformation/addRealStateExpenses";
import { PrimaryHomeExpenses } from "../Pages/Pre-Approval/realstateInformation/primaryHomeExpenses";
import EnterNewLiability from "../Pages/Pre-Approval/liability/EnterNewLiability";
import VerifyYourLiability from "../Pages/Pre-Approval/liability/verifyYourLiabilities";
import VerifyYourAssests from "../Pages/Pre-Approval/assetsNew/assetsNewSources";
import VerifyYourAssetsForm from "../Pages/Pre-Approval/assetsNew/verifyYourAssestsForm";
import AssetsSummary from "../Pages/Pre-Approval/assetsNew/assetsSummary";
import PrimaryHomeExpensesSummary from "../Pages/Pre-Approval/realstateInformation/primaryHomeExpensesSummary";
import VerifyYourRealEstate from "../Pages/Pre-Approval/realstateInformation/verifyYourRealEstate";
import RealEstateSummary from "../Pages/Pre-Approval/realstateInformation/realestateSummary";
// import StartPage from "../Pages/incomeInformation/startPage";
import AddPrimaryHomeExpenses from "../Pages/Pre-Approval/realstateInformation/addPrimaryHomeExpenses";
import OtherBusinessIncome from "../Pages/Pre-Approval/incomeInformation/otherBusinessInformation/OtherBussinessIncome";
import BusinessIncome from "../Pages/Pre-Approval/incomeInformation/businessIncomeInformation/BusinessIncome";
import AddRentalIncomeInformation from "../Pages/Pre-Approval/incomeInformation/rentalIncomeInformation/addRentalIncomeInformation";
import AddRentalIncomeInformationForm from "../Pages/Pre-Approval/incomeInformation/rentalIncomeInformation/addRentalIncomeInformationForm";
import PurchasePrice from "../Pages/Pre-Approval/SubjectPropertyQuestions/PurchasePrice";
import LoanAmount from "../Pages/Pre-Approval/SubjectPropertyQuestions/LoanAmount";
import DownPaymemnt from "../Pages/Pre-Approval/SubjectPropertyQuestions/DownPayment";
import EstimatedInsurance from "../Pages/Pre-Approval/SubjectPropertyQuestions/EstimatedInsurance";
import EstimatedTaxes from "../Pages/Pre-Approval/SubjectPropertyQuestions/EstimatedTaxes";
import PropertyType from "../Pages/Pre-Approval/SubjectPropertyQuestions/PropertyType";
import OccupyProperty from "../Pages/Pre-Approval/SubjectPropertyQuestions/OccupyProperty";
import PreApprovalSelectedMoney from "../Pages/Pre-Approval/getPreApprocalAllData/PreApprovalSelectedMoney";
// import CongratulationsPage from '../Pages/Pre-Approval/getPreApprocalAllData/CongratulationsPage';
import PdfDownload from "../Pages/Pre-Approval/getPreApprocalAllData/PdfDownload";
import DocumentUploadPage from "../Pages/Pre-Approval/getPreApprocalAllData/DocumentUpload";
import RevisePreApproval from "../Pages/Pre-Approval/getPreApprocalAllData/RevisePreApproval";
import FolderLinksPage from "../Pages/Pre-Approval/getPreApprocalAllData/FolderLinksPage";
import DocumentsSubmitted from "../Pages/Pre-Approval/getPreApprocalAllData/DocumentsSubmitted";
import ReviseCongratulations from "../Pages/Pre-Approval/getPreApprocalAllData/ReviseCongratulations";
import StatusPageToShow from "../Pages/Pre-Approval/getPreApprocalAllData/StatusPageToShow";

// RENTAL CALCULATOR QUESIONS

const Redirect = () => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const ui = localStorage.getItem("ui");
  const dispatch = useDispatch();
  const { user, loading, company } = useSelector((state) => state.auth);
  var currentURL = "https://portal.oqvesthomeloans.com/login";
  // var currentURL = window.location.href;
  var url = new URL(currentURL);
  var hostname = url.hostname;

  useLayoutEffect(() => {
    if (!company) {
      dispatch(getCompany(hostname));
    }
    if (!user) {
      if (token) {
        dispatch(currentUser(ui));
      } else {
        dispatch(authActions.logout());
      }
    } else {
      if (!token) {
        dispatch(authActions.logout());
      }
    }
  }, [dispatch, ui, token, location]);

  useEffect(() => {
    if (token) {
      const tag = document.createElement("script");
      tag.src = "https://app.aminos.ai/js/chat_plugin.js";
      tag.setAttribute("data-bot-id", "3362"); // Add this line
      const body = document.getElementsByTagName("body")[0];
      body.appendChild(tag);

      return () => {
        body.removeChild(tag);
      };
    }
  }, [token]);

  if (loading) {
    // Show loading screen or spinner while fetching user data
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="flex justify-center flex-col gap-4 items-center"
      >
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
        />
        <h6>Loading...</h6>
      </div>
    );
  } else {
    return (
      <>
        <Routes>
          {user && token ? (
            <Route
              path="*"
              element={
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="loans/closed" element={<ClosedLoans />} />
                    <Route path="loans/opened" element={<OpenLoans />} />
                    <Route path="loans/pre-approve" element={<PreApprove />} />
                    <Route path="" element={<Dashboard />} />
                    {/* <Route path="/" element={<StartPage />} /> */}
                    {/* <Route path="/:id" element={<AddIncomeSources />} />
                  <Route path="/add-income-sources" element={<AddIncomeSources />} /> */}
                    <Route
                      path="/select-income-sources"
                      element={<SelectIncomeSources />}
                    />
                    <Route
                      path="/business-income-info"
                      element={<BusinessIncome />}
                    />
                    <Route
                      path="/add-employment-sources"
                      element={<EmplymentIncome />}
                    />
                    <Route
                      path="/add-real-estate-info"
                      element={<AddRealStateExpenses />}
                    />
                    <Route
                      path="/verify-real-estate"
                      element={<VerifyYourRealEstate />}
                    />
                    <Route
                      path="/real-estate-summary"
                      element={<RealEstateSummary />}
                    />
                    <Route
                      path="/add-liability-info"
                      element={<AddLiabilityInformation />}
                    />
                    <Route
                      path="/add-new-liability"
                      element={<EnterNewLiability />}
                    />
                    <Route
                      path="/verify-your-libility"
                      element={<VerifyYourLiability />}
                    />
                    <Route
                      path="/other-business-income"
                      element={<OtherBusinessIncome />}
                    />
                    <Route
                      path="/summary-income-sources"
                      element={<SummaryOfIncomeInformation />}
                    />
                    <Route
                      path="/add-primary-home-expenses"
                      element={<AddPrimaryHomeExpenses />}
                    />
                    <Route
                      path="/primary-home-expenses"
                      element={<PrimaryHomeExpenses />}
                    />
                    <Route
                      path="/primary-home-expenses-summary"
                      element={<PrimaryHomeExpensesSummary />}
                    />
                    <Route
                      path="/verify-your-assets"
                      element={<VerifyYourAssests />}
                    />
                    <Route
                      path="/assets-form"
                      element={<VerifyYourAssetsForm />}
                    />
                    <Route path="/assets-summary" element={<AssetsSummary />} />

                    <Route
                      path="/add-rental-income-information"
                      element={<AddRentalIncomeInformation />}
                    />
                    <Route
                      path="/add-rental-income"
                      element={<AddRentalIncomeInformationForm />}
                    />

                    {/* Questions */}
                    <Route
                      path="/add-purchase-price"
                      element={<PurchasePrice />}
                    />
                    <Route path="/add-loan-amount" element={<LoanAmount />} />
                    <Route
                      path="/add-down-payment"
                      element={<DownPaymemnt />}
                    />
                    <Route
                      path="/how-occupy-property"
                      element={<OccupyProperty />}
                    />
                    <Route
                      path="/add-property-type"
                      element={<PropertyType />}
                    />
                    <Route
                      path="/estimated-taxes"
                      element={<EstimatedTaxes />}
                    />
                    <Route
                      path="/estimated-insurance"
                      element={<EstimatedInsurance />}
                    />
                    <Route
                      path="/pre-approval-selected-amount"
                      element={<PreApprovalSelectedMoney />}
                    />
                    <Route path="/download-pdf" element={<PdfDownload />} />
                    <Route
                      path="/pre-approval-document-upload"
                      element={<DocumentUploadPage />}
                    />
                    <Route
                      path="/revise-pre-approval"
                      element={<RevisePreApproval />}
                    />
                    <Route
                      path="/view-documents"
                      element={<FolderLinksPage />}
                    />
                    <Route
                      path="/documents-submitted"
                      element={<DocumentsSubmitted />}
                    />
                    <Route
                      path="/revise-Congratulations"
                      element={<ReviseCongratulations />}
                    />
                    <Route
                      path="/status-pre-approved"
                      element={<StatusPageToShow />}
                    />
                  </Route>
                  <Route path="loans" element={<LoanForm />} />
                  <Route path="thank-you" element={<Thanks />} />

                  <Route exact path="/login" element={<Navigate to="/" />} />
                  <Route exact path="*" element={<Navigate to="/" />} />
                </Routes>
              }
            />
          ) : (
            <>
              <Route 
                path="*"
                element={
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/purchase" element={<TestForm />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forget-password"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/set-password/:token"
                      element={<LoadingPage />}
                    />
                    <Route path="/set-password" element={<SetPassword />} />
                    <Route
                      exact
                      path="*"
                      element={token ? <Outlet /> : <Navigate to="/login" />}
                    />
                  </Routes>
                }
              />
            </>
          )}
        </Routes>
      </>
    );
  }
};

export default Redirect;
