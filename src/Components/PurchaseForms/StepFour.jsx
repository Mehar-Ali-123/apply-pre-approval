import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const StepFour = ({formData, setFormData, step, setStep}) => {
    const options = [
        { value: 'bridge_loan', name: 'Bridge Loan' },
        { value: 'cash_on_hand', name: 'Cash on Hand' },
        { value: 'checking_savings', name: 'Checking/Savings' },
        { value: 'deposit_on_sales_contract', name: 'Deposit on Sales Contract' },
        { value: 'equity_from_pending_sales', name: 'Equity from Pending Sale' },
        { value: 'equity_on_sold_property', name: 'Equity on Sold Property' },
        { value: 'equity_from_subject_property', name: 'Equity from Subject Property' },
        { value: 'gift_funds', name: 'Gift Funds' },
        { value: 'grant', name: 'Grant' },
        { value: 'life_insurance_cash_value', name: 'Life Insurance Cash Value' },
        { value: 'lot_equity', name: 'Lot Equity' },
        { value: 'rent_with_option_to_purchase', name: 'Rent with Option to Purchase' },
        { value: 'retirenment_funds', name: 'Retirement Funds' },
        { value: 'sale_of_chattel', name: 'Sale of Chattel' },
        { value: 'secured_loan', name: 'Secured Loan' },
        { value: 'stocks_and_bonds', name: 'Stocks and Bonds' },
        { value: 'sweat_equity', name: 'Sweat Equity' },
        { value: 'trade_equity', name: 'Trade Equity' },
        { value: 'trust_funds', name: 'Trust Funds' },
        { value: 'unsecured_borrowed_funds', name: 'Unsecured Borrowed Funds' }
    ]
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Identifying the <strong className='st-1'>Source of</strong> Your <strong className='st-2'>Down Payment</strong></h1>
                <p className='text-gray-700 mt-3'>Understanding the source of your down payment assists us in ensuring the process remains compliant and transparent. Whether it's from savings, a gift, or any other legitimate means, we are here to guide you every step of the way.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Source of Down Payment</h4>
                <div className='dropdown w-full md:w-full lg:w-6 m-auto'>
                    <Dropdown options={options} optionLabel='name' optionValue='value' value={formData.downPaymentSource} onChange={(e) => setFormData({...formData, downPaymentSource: e.value})}
                        placeholder="Choose Source of down payment" className="p-inputtext-lg text-start w-full" />
                    <span className='block mt-3 text-start'>Please provide your source of down payment.</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' onClick={(e)=> { formData.downPaymentSource !== '' && onSubmit(e)}}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepFour;