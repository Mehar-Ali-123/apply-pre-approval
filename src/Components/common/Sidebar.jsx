import React, { useEffect, useState } from 'react';
import styles from '../../styles/sidebar.module.css';
import { logolight } from '../../assets';
import { NavLink } from 'react-router-dom';
import { TbSmartHome, TbFileDollar } from 'react-icons/tb';
import { BsArrowLeft, BsCheck2Square } from 'react-icons/bs';
import { FiDollarSign } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_ALL_INCOME_RESOURCES } from '../../constants';
import CompanyLogo from './CompanyLogo';
const Sidebar = () => {
  const [allIncomeSources, setAllIncomeSources] = useState([]);
  const loan_number = localStorage.getItem("loanNo.");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${GET_ALL_INCOME_RESOURCES}/${loan_number}`);
      const { data } = response || {};
      setAllIncomeSources(data?.rows);
    } catch (error) {
      console.log(error);
    }
  };


  const setDisablePrimary = localStorage.getItem('setDisablePrimary')
  const setDisableLiability = localStorage.getItem('setDisableLiability')
  const setDisableAssets = localStorage.getItem('setDisableAssets')
  const setDisableSubj = localStorage.getItem('setDisableSubj')
  const setDisableStatus = localStorage.getItem('setDisableStatus')
  const setDisableUpload = localStorage.getItem('setDisableUpload')
  const setDisableView = localStorage.getItem('setDisableView')
  const setDisableReviseStatus = localStorage.getItem('setDisableReviseStatus')



  const isLoansPath = ["/closed", "/dashboard", "/loans"].some(path =>
    window.location.pathname.includes(path) || window.location.pathname === '/'
  );

  const setIncomeSourceActive = localStorage.getItem('setIncomeSourceActive');
  const setPrimaryActive = localStorage.getItem('setPrimaryActive');
  const setLiabilityActive = localStorage.getItem('setLiabilityActive');
  const setSubjActive = localStorage.getItem('setSubjActive');
  const setStatusActive = localStorage.getItem('setStatusActive');
  const setAssetsActive = localStorage.getItem('setAssetsActive');
  const setUploadActive = localStorage.getItem('setUploadActive');
  const setViewDocumentActive = localStorage.getItem('setViewDocumentActive');
  const setReviseStatusActive = localStorage.getItem('setReviseStatusActive');

  const allIncomeSourcesExist = localStorage.getItem('allIncomeSourcesExist') === 'true';
  const allPrimarySourcesExist = localStorage.getItem('allPrimarySourcesExist') === 'true';
  const allAssetsSourcesExist = localStorage.getItem('allAssetsSourcesExist') === 'true';
  const allLiabilitySourcesExist = localStorage.getItem('allLiabilitySourcesExist') === 'true';



  const handleClickIncome = () => {
    localStorage.setItem('setIncomeSourceActive', false);
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "");
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");
    fetchData();
    setActiveIncomeSummary(allIncomeSources.length > 0);

  }
  const handleClickPrimary = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', false);
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");

  }
  const handleClickLiability = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', false);
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");

  }
  const handleClickAssets = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', false);
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");

  }
  const handleClickSubj = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', false);
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");

  }
  const handleClickStatus = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', false);
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");
  }

  const handleClickUpload = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', false)
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");
  }
  const handleClickViewDocument = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', false);
    localStorage.setItem('setReviseStatusActive', "");
    localStorage.setItem('editId', "");
  }
  const handleClickReviseStatus = () => {
    localStorage.setItem('setIncomeSourceActive', "");
    localStorage.setItem('setPrimaryActive', "");
    localStorage.setItem('setLiabilityActive', "");
    localStorage.setItem('setAssetsActive', "");
    localStorage.setItem('setSubjActive', "");
    localStorage.setItem('setStatusActive', "");
    localStorage.setItem('setUploadActive', "")
    localStorage.setItem('setViewDocumentActive', "");
    localStorage.setItem('setReviseStatusActive', false);
    localStorage.setItem('editId', "");
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <CompanyLogo />
        <div id='sidebar-scroll' className={`${styles.sidebarItems} mt-7`}>

          {isLoansPath ?
            <div>
              <li className={styles.links}>
                <NavLink to='/' activeClassName={styles.activeLink} ><TbSmartHome /> Dashboard</NavLink>
              </li>
              <li className={styles.links}>
                <NavLink to='/loans/closed' activeClassName={styles.activeLink}><FiDollarSign /> Closed Loans</NavLink>
              </li>
              <li className={styles.links}>
                <NavLink to='/loans/opened' activeClassName={styles.activeLink}><TbFileDollar /> Open Loans</NavLink>
              </li>
              <li className={styles.links}>
                <NavLink to='/loans/pre-approve' activeClassName={styles.activeLink}><BsCheck2Square /> Preapproved Loans</NavLink>
              </li>
            </div>
            :
            
            <div>

              <li className={styles.links}>
                <NavLink
                  to={allIncomeSourcesExist ? "/summary-income-sources" : "/select-income-sources"}
                  activeClassName={styles.activeLink}
                  className={`${!setIncomeSourceActive ? "" : styles.bg_green}  `}
                  onClick={handleClickIncome}
                ><div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}><img src="./assets/icons/cash-banknote (1).png" alt="" /> <p> Income Information</p></div></NavLink>
              </li>
              <li className={styles.links}>
                <NavLink
                  to={allPrimarySourcesExist ? "/primary-home-expenses-summary" : "/add-primary-home-expenses"}
                  // to="/add-primary-home-expenses"
                  className={`${!setPrimaryActive ? "" : styles.bg_green} ${setDisablePrimary ? "" : styles.disabledLink}`}
                  activeClassName={styles.activeLink}
                  isActive={isLoansPath}
                  onClick={handleClickPrimary}>
                  <div className={`d-flex gap-2  align-items-center ${styles.txt_center} ${styles.hover_navlink}`} >
                    <img src="./assets/icons/Address.png" alt="" />
                    Primary  Housing Expense</div>
                </NavLink>
              </li>

              <li className={styles.links}>
                <NavLink
                  to={allLiabilitySourcesExist ? "/verify-your-libility" : '/add-liability-info'}
                  activeClassName={styles.activeLink}
                  className={`${!setLiabilityActive ? "" : styles.bg_green} ${setDisableLiability ? "" : styles.disabledLink}`}
                  onClick={handleClickLiability}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/disabled-2.png" alt="" />
                    <p>Liabilities</p>
                  </div>
                </NavLink>
              </li>

              <li className={styles.links}>
                <NavLink
                  to={allAssetsSourcesExist ? "/assets-summary" : '/verify-your-assets'}
                  activeClassName={styles.activeLink}
                  className={`${!setAssetsActive ? "" : styles.bg_green} ${setDisableAssets ? "" : styles.disabledLink}`}
                  onClick={handleClickAssets}
                >
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/cash-banknote (1).png" alt="" />
                    <p>Assets</p>
                  </div>
                </NavLink>
              </li>

              <li className={styles.links}>
                <NavLink
                  to='/add-purchase-price'
                  activeClassName={styles.activeLink}
                  className={`${!setSubjActive ? "" : styles.bg_green} ${setDisableSubj ? "" : styles.disabledLink}`}
                  onClick={handleClickSubj}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/smart-home.png" alt="" />
                    <p>Subject Property Info</p>
                  </div>
                </NavLink>
              </li>

              {/* <li className={styles.links}>
                <NavLink to='/add-purchase-price' className={activePreApprovalDashboard ? "" : styles.disabledLink} activeClassName={styles.activeLink} ><div className={`d-flex gap-2 align-items-center ${styles.hover_navlink}`}><img src="./assets/icons/smart-home.png" alt="" /><p>Subject Property Info</p></div></NavLink>
              </li> */}

              <li className={styles.links}>
                <NavLink to='/pre-approval-selected-amount'
                  activeClassName={styles.activeLink}
                  className={`${!setStatusActive ? "" : styles.bg_green} ${setDisableStatus ? "" : styles.disabledLink}`}
                  onClick={handleClickStatus}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/file-check.png" alt="" />
                    <p>Pre-Qualification</p>
                  </div>
                </NavLink>
              </li>
             {setDisableUpload &&  <li className={styles.links}>
                <NavLink to='/pre-approval-document-upload'
                  activeClassName={styles.activeLink}
                  className={`${!setUploadActive ? "" : styles.bg_green} ${setDisableUpload ? "" : styles.disabledLink}`}
                  onClick={handleClickUpload}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/file-upload.png" alt="" />
                    <p>Document Upload</p>
                  </div>
                </NavLink>
              </li>}

          {setDisableView &&   <li className={styles.links}>
                <NavLink to='/view-documents'
                  activeClassName={styles.activeLink}
                  className={`${!setViewDocumentActive ? "" : styles.bg_green} ${setDisableView ? "" : styles.disabledLink}`}
                  onClick={handleClickViewDocument}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/file-download.png" alt="" />
                    <p>View Documents</p>
                  </div>
                </NavLink>
              </li>}

             {setDisableReviseStatus &&  <li className={styles.links}>
                <NavLink to='/status-pre-approved'
                  activeClassName={styles.activeLink}
                  className={`${!setReviseStatusActive ? "" : styles.bg_green} ${setDisableReviseStatus ? "" : styles.disabledLink}`}
                  onClick={handleClickReviseStatus}>
                  <div className={`d-flex gap-2 align-items-center ${styles.txt_center} ${styles.hover_navlink}`}>
                    <img src="./assets/icons/eye.png" alt="" />
                    <p>Status</p>
                  </div>
                </NavLink>
              </li>
             }

              {/* <li className={styles.links}>
                <NavLink to='/pre-approval-selected-amount' className={activePreApprovalDashboard ? "" : styles.disabledLink} activeClassName={styles.activeLink}><div className='d-flex gap-2 align-items-center'><img src="./assets/icons/eye.png" alt="" /><p>Status</p></div></NavLink>
              </li> */}
            </div>
          }
        </div>
      </div>
      <div className={styles.powered}>
        <a target='_blank'
          //  href='https://oqvest.com/'
          href='/'>
          <h6 className='flex items-center gap-2'><BsArrowLeft className='font-bold' /> Back to Dashboard</h6>
        </a>
      </div>
    </div>
  )
}

export default Sidebar;