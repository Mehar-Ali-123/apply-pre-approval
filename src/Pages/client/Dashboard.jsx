import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setActivePreApprovalDashboard } from '../Pre-Approval/incomeInformation/DataSlice'; // Import your action
import styles from '../../styles/loans.module.css';
import { BsArrowUpRightCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addLoan, getLoanByClientId, getPreapprovalProgress } from '../../utils/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import datatablestyles from '../../styles/Datatable.module.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import StartPage from '../Pre-Approval/incomeInformation/startPage';
import { loan_app, pre_approved } from '../../assets';
import PopupModal from '../../Components/common/PopupModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activePreApprovalDashboard, setActivePreApprovalDashboardLocal] = useState(true); // Default value can be 'true'

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState([]);
  const [preApproveData, setPreApproveData] = useState([]);
  const [resMessage, setResMessage] = useState('');
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem('accessToken')
  // const [preApprovalState,setPreApprovalState]=useState(false)
  useEffect(() => {
    dispatch(setActivePreApprovalDashboard(false));
    localStorage.setItem('pre_app_dash', false);
    const timeout = setTimeout(async () => {
      try {
        const link = getLoanByClientId(user.user_id);
        const res = await axios.get(link, { withCredentials: true, headers: {
          Authorization: token,
        }});
        if (res.data.status === true) {
          setLoanData(res.data.data.reverse());
          setIsLoading(false);
        } else {
          setLoanData([]);
          setIsLoading(false);
        }
      } catch (error) {
        setLoanData([]);
        setIsLoading(false);
        throw new Error(error);
      }
      getPreapproveData()
    }, 1500);
    return () => {
      clearTimeout(timeout);
    }
  }, [dispatch, user]);

  const getPreapproveData = ()=> {
    const timeout = setTimeout(async () => {
      try {
        const link = getPreapprovalProgress(user.user_id);
        const res = await axios.get(link);
        setPreApproveData(res.data.results);
        setIsLoading(false);
      } catch (error) {
        setPreApproveData([]);
        setIsLoading(false);
        throw new Error(error);
      }
    }, 1500);
    return () => {
      clearTimeout(timeout);
    }
  }

  const statusBodyTemplate = (loan) => {
    return <Tag value={loan.status} severity={getSeverity(loan)}></Tag>;
  };

  const getDate = (preApproveData) => {
    return new Date(preApproveData.created_at).toLocaleDateString();
  };

  const loanNumberTemplate = (loan)=> {
    return (
      loan.status !== 'submitted' ? (
        <p className='link cursor-pointer font-normal text-sm underline' onClick={()=> navigate('/loans', {state: {id: loan.id, loan_number: loan.loan_number}})}>View Application</p>
      ) : (
        <p className='link cursor-pointer font-normal text-sm underline' onClick={()=> navigate('/loans', {state: {id: loan.id, loan_number: loan.loan_number}})}>View Application</p>
      )
    )
  }

  const getSeverity = (loan) => {
    switch (loan.status) {
      case 'submitted':
        return 'success';

      case 'pending':
        return 'warning';

      case 'in process':
        return 'info';
         
      case 'closed':
        return 'danger';

      default:
        return null;
    }
  };
  const createLoan = async () => {
    setIsClicked(true);
    try {
      const data = {
        client_id: user.user_id, loan_application_stage: 1
      }
      const res = await axios.post(addLoan, { data }, { headers: {
        Authorization: token,
      }});
      if (res.data.status === true) {
        setIsClicked(false);
        navigate('/loans', { state: res.data.data });
      } else {
        navigate('/loans')
        setResMessage(res.data.message);
        setModal(true)
        setIsClicked(false);
      }
    } catch (error) {
      navigate('/loans')
      setResMessage('Something went wrong. Please try again later');
      setModal(true)
      setIsClicked(false);
    }
  }

  
 
  return (
    <div className='px-4'>
      <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
      <h3 className='font-semibold'>Dashboard</h3>
      <h1>Good day, Ali Hussnain Jamil</h1>
      <div className='flex gap-4 items-center flex-col lg:flex-row my-3'>
        <div className={styles.cards}>
          <div className='mb-2'>
            <img src={pre_approved} />
          </div>
          <h3 className='mb-2 '>Get Pre- Approved</h3>
          <p className='mb-2'>Not sure about how much you can  qualify for? <br /> Get pre-approved now. <br />
          <span className=' invisible'>aa</span>
          </p> 
       <StartPage/> 
        </div>
        <div className={styles.cards}>
          <div className='mb-2'>
            <img src={loan_app} />
          </div>
          <h3 className='mb-2'>Submit a Loan Application</h3>
          <p className='mb-2'>Do you already have property? Submit  a  <br /> loan application and  sort through thousand <br /> of options. </p>
          <button onClick={createLoan} disabled={isClicked} className='btn-primary text-white flex gap-2 items-center py-3 px-5 mt-3'>
            <BsArrowUpRightCircle className='text-xl ' /> <span className='txt-15'>Apply Now</span> {isClicked && <i className='pi pi-spin pi-spinner'></i>}
          </button>
        </div>
      </div>
      <h1 className='my-3 text-lg'>Your Loan Progress</h1>
      {
        isLoading ? (
          <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
            <h6>Loading...</h6>
          </div>
        ) : (<>
          <div className={datatablestyles.table}>
            <DataTable stripedRows value={loanData} tableStyle={{ minWidth: '50rem' }}>
              <Column field='loan_number' header="Loan #"></Column>
              <Column field="created_at" header="Date"></Column>
              <Column field="loan_type" header="Purpose"></Column>
              <Column field="street_address" header="Address"></Column>
              <Column body={statusBodyTemplate} header="Status"></Column>
              <Column body={loanNumberTemplate}></Column>
            </DataTable>
          </div>
          <h1 className='my-3 text-lg'>Your Pre Approval Progress</h1>
          <div className={datatablestyles.table}>
            <DataTable stripedRows value={preApproveData} tableStyle={{ minWidth: '50rem' }}>
              <Column field='loan_number' header="Loan #"></Column>
              <Column body={getDate} header="Date"></Column>
              <Column field="purpose" header="Purpose"></Column>
              <Column field="max_papp_amount" header="Pre-aproval amount"></Column>
              <Column body={statusBodyTemplate} header="Status"></Column>
            </DataTable>
          </div>
        </>)
      }
    </div>
  )
}

export default Dashboard;