import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { addLoanVerification } from '../../utils/api';
import axios from 'axios';

const StepFifteen = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, monthly_amount: formData.monthlyMortgagePayment,
                total_expenses: formData.totalMortgageExpense
            }
            const res = await axios.post(addLoanVerification, { data: dataObj });
            if (res.data.status === true) {
                setIsClicked(false);
                setStep(step + 1);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Verify Loan Application</h1>
                <p className='text-gray-700'>Please review and verify your information. We will use the information you provide to process your loan application</p>
                <h4 className='text-900 text-xl md:text-xl font-semibold mt-6 mb-5'>Your Current Expenses for {formData.primarystreetAddress}, {formData.primarycity}, {formData.primarystate} {formData.primaryzip}</h4>
                <div className='w-11 md:w-10'>
                    <h6 className='text-md font-semibold mb-3 text-start'>First Mortgage Payment</h6>
                    <div>
                        <div className=" flex justify-content-center align-items-center m-auto slides-main">
                            <div className="slider-labels w-11rem text-sm text-gray-500">Monthly Amount</div>
                            <InputText type='number' className='w-full h-full' value={formData.monthlyMortgagePayment}
                                onChange={(e) => setFormData({ ...formData, monthlyMortgagePayment: e.target.value })} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className=" flex justify-content-center align-items-center m-auto slides-main">
                            <div className="slider-labels w-11rem text-sm text-gray-500">Total Expenses</div>
                            <InputText type='number' className='w-full h-full' value={formData.totalMortgageExpense}
                                onChange={(e) => setFormData({ ...formData, totalMortgageExpense: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                    <button className='btn-dark' type='submit' onClick={onSubmit}>
                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default StepFifteen;