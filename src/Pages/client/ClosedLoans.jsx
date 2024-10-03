import React from 'react';
import { TbReportMoney } from 'react-icons/tb'
import Datatable from '../../Components/common/Datatable';
import { Link } from 'react-router-dom';

const ClosedLoans = () => {
    return (<>
        <div className='flex justify-between items-center my-5 mb-6 lg:px-4 px-2'>
            <h1 className='lg:text-4xl text-xl mb-0'>Your Closed Loans</h1>
            <Link to={'/loans'}>
                <button className='btn-light-dark flex lg:gap-2 gap-1 items-center lg:font-semibold font-normal lg:text-normal text-sm lg:py-3 py-3  lg:px-4 px-3'><TbReportMoney /> Create a New Loan</button>
            </Link>
        </div>
        <Datatable />
    </>)
}

export default ClosedLoans;