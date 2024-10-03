import React from 'react';
import { TbReportMoney } from 'react-icons/tb'
import Datatable from '../../Components/common/Datatable';
import { Link } from 'react-router-dom';

const PreApprove = () => {
    return (<>
        <div className='flex justify-between my-5 mb-6 px-4'>
            <h1>Pre-Approved Loans</h1>
            <Link to={'/add-income-sources'}>
                <button className='btn-light-dark flex gap-2 items-center py-3 px-4 mt-3'><TbReportMoney /> Create a New Loan</button>
            </Link>
        </div>
        <Datatable />
    </>)
}

export default PreApprove;