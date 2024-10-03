import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useSelector} from 'react-redux'
import { getLoanApplicationData, updateLoan } from '../../utils/api';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { like } from '../../assets';

const StepSubmit = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [generalInfo, setgeneralInfo] = useState([]);
    const [coBorrower, setcoBorrower] = useState([]);
    const [primaryAddress, setprimaryAddress] = useState([]);
    const [formerAddress, setformerAddress] = useState([]);
    const [subjectProperty, setsubjectProperty] = useState([]);
    const [realtor, setrealtor] = useState([]);
    const [employments, setemployments] = useState([]);
    const [otherIncome, setotherIncome] = useState([]);
    const [realEstate, setrealEstate] = useState([]);
    const [assets, setassets] = useState([]);
    const [liabilities, setliabilities] = useState([]);
    const [giftsGrants, setgiftsGrants] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken')

    useLayoutEffect(()=> {
        setIsLoading(true);
        const timeout = setTimeout(async()=> {
            try {
                const link = getLoanApplicationData(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if(res.data.status === true) {
                    setgeneralInfo(res.data.data?.loanApplications);
                    setcoBorrower(res.data.data?.loan_app_co_borrowers);
                    setsubjectProperty(res.data.data?.loan_app_subject_properties);
                    const primary = res.data.data?.loan_app_addresses.filter((address)=> 
                        address.type === 'primary'
                    )
                    setprimaryAddress(primary);
                    const former = res.data.data?.loan_app_addresses.filter((address)=> 
                        address.type === 'former'
                    )
                    setformerAddress(former);
                    setrealtor(res.data.data?.loan_app_realtor_info);
                    setemployments(res.data.data?.loan_app_employments);
                    setrealEstate(res.data.data?.loan_app_real_estate);
                    setotherIncome(res.data.data?.loan_app_other_income);
                    setassets(res.data.data?.loan_app_assets);
                    setliabilities(res.data.data?.loan_app_liabilities);
                    setgiftsGrants(res.data.data?.loan_app_gifts_grants);
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                throw new Error(error);
            }
        }, 1000);

        return ()=> {
            clearInterval(timeout);
        }
    }, [formData.loanId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            const data = {
                id: formData.loanId, application_status: 'submitted'
            }
            const res = await axios.patch(updateLoan, { ...data }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                setIsClicked(false);
                navigate('/thank-you');
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <div>
            <div className='text-center'>
                <div className='w-full md:w-11 lg:w-10 m-auto'>
                    <div className='text-center mb-4'>
                        <img className='m-auto w-3 h-16' width={100} height={100} src={like} />
                    </div>
                    <h1 className='text-900 text-2xl md:text-4xl mt-0'>Application Submitted Successfully</h1>
                    <p className='mt-2 text-blue-900'>Thank you for entrusting us with your mortgage application. Our team is now reviewing your details and will be in touch shortly with the next steps. Below is the summary of your applicaiton</p>
                </div>
                {
                    isLoading ? (
                        <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                            <h6>Loading...</h6>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='mt-5 mx-4 submit-app'>
                            <h3 className='text-start mb-3 font-semibold text-black'>General Information</h3>
                            <div className="submit-card">
                                <DataTable value={generalInfo} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="purchase_price" header="Purchase Price"></Column>
                                    <Column field="down_payment_percentage" header="Down Payment"></Column>
                                    <Column field="payment_source" header="Source of Down Payment"></Column>
                                    <Column field="martial_status" header="Martial Status"></Column>
                                    <Column field="unmarried_addendum" header="Unmarried Addendum"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Co-Borrower(s) Information</h3>
                            <div className="submit-card">
                                <DataTable value={coBorrower} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="borrower_first_name" header="Name"></Column>
                                    <Column field="borrower_phone" header="Phone"></Column>
                                    <Column field="borrower_email" header="Email"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Primary  & Mailing Address</h3>
                            <div className="submit-card">
                                <DataTable value={coBorrower} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="borrower_first_name" header="Property Address"></Column>
                                    <Column field="borrower_phone" header="Occupancy Type"></Column>
                                    <Column field="borrower_email" header="Primary Housing Expense"></Column>
                                    <Column field="borrower_email" header="Time living at primary address"></Column>
                                    <Column field="borrower_email" header="Mailing Address"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Former Address</h3>
                            <div className="submit-card">
                                <DataTable value={coBorrower} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="borrower_first_name" header="Address"></Column>
                                    <Column field="borrower_phone" header="Occupancy Type"></Column>
                                    <Column field="borrower_email" header="Time living at address"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Subject Property Info</h3>
                            <div className="submit-card">
                                <DataTable value={subjectProperty} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="street_address" header="Address"></Column>
                                    <Column field="subject_property_type" header="Property Type"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Realtor Information</h3>
                            <div className="submit-card">
                                <DataTable value={realtor} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="realtor_first_name" header="Realtor Name"></Column>
                                    <Column field="realtor_company_name" header="Realtor Company "></Column>
                                    <Column field="realtor_email" header="Realtor Email"></Column>
                                    <Column field="realtor_phone_number" header="Realtor Phone"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Employment Information</h3>
                            <div className="submit-card">
                                <DataTable value={employments} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="employment_status" header="Employment Status"></Column>
                                    <Column field="employer_name" header="Employer Name "></Column>
                                    <Column field="street_address" header="Address"></Column>
                                    <Column field="phone_number" header="Phone"></Column>
                                    <Column field="industry" header="Industry"></Column>
                                    <Column field="position" header="Position"></Column>
                                    <Column field="monthly_income" header="Monthly Income"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Other Income Information</h3>
                            <div className="submit-card">
                                <DataTable value={otherIncome} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="income_type" header="Income Type"></Column>
                                    <Column field="monthly_income_amount" header="Monthly Income Amount"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Real Estate Owned Information</h3>
                            <div className="submit-card">
                                <DataTable value={realEstate} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="street_address" header="property address"></Column>
                                    <Column field="property_status" header="property status"></Column>
                                    <Column field="owned_by" header="Owner"></Column>
                                    <Column field="current_occupancy" header="Current Occupancy"></Column>
                                    <Column field="intended_occupancy" header="Intended Occupancy"></Column>
                                    <Column field="property_type" header="Property Type"></Column>
                                    <Column field="market_value" header="Market Value"></Column>
                                    <Column field="monthly_rental_income" header="Monthly Rental Income"></Column>
                                    <Column field="monthly_expense" header="Monthly Expenses"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Assets Information</h3>
                            <div className="submit-card">
                                <DataTable value={assets} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="asset_type" header="Type"></Column>
                                    <Column field="account_name" header="Account Name"></Column>
                                    <Column field="estimate_amount" header="Total Value"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Liabilities Information</h3>
                            <div className="submit-card">
                                <DataTable value={liabilities} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="owner" header="Lenders Name"></Column>
                                    <Column field="liability_type" header="Type"></Column>
                                    <Column field="balance" header="Open Balance"></Column>
                                    <Column field="payment" header="Monthly Payment"></Column>
                                </DataTable>
                            </div>
                            <h3 className='text-start mt-5 mb-3 font-semibold text-black'>Gifts & Grants</h3>
                            <div className="submit-card">
                                <DataTable value={giftsGrants} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="type" header="Type"></Column>
                                    <Column field="source" header="Source"></Column>
                                    <Column field="amount" header="Amount"></Column>
                                </DataTable>
                            </div>
                            <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                                <button style={{color: '#E98862', background: '#222D39', border: '1px solid #222D39'}} className='btn-dark' type='submit'>
                                    { isClicked ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> : 'Submit Application' }
                                </button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div >
    )
}

export default StepSubmit;