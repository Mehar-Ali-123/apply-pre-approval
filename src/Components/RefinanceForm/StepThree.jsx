import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const StepThree = ({formData, setFormData, step, setStep}) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Current <strong className='st-1'>Loan </strong> <strong className='st-2'>Balance</strong></h1>
                <p className='text-gray-700'>The outstanding balance on your current loan plays a significant role in determining your refinancing options. Please enter amount to ensure it represents your current financial commitment accurately.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Current Loan Balance</h4>
                <div className='w-11 md:w-6 m-auto'>
                    <div className="flex justify-content-center align-items-center m-auto slides-main">
                        <div className="slider-labels">%</div>
                        <InputNumber className='w-full' min={0} max={100} value={formData.downPayment} 
                            onChange={(e)=> setFormData({...formData, downPayment: e.value})} />
                    </div>
                    <span className='block mt-3 text-start'>Get this from your most recet statement. Otherwise, provide your best estimate</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.downPayment ? false : true}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepThree;