import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const StepThree = ({formData, setFormData, step, setStep}) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Defining Your <strong className='st-1'>Down Payment</strong></h1>
                <p className='text-gray-700'>The down payment you plan to make plays a pivotal role in shaping the mortgage terms and conditions. By providing the accurate down payment amount, you enable us to craft a financial solution that aligns closely with your budget and aspirations.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Down Payment</h4>
                <div className='w-11 md:w-6 m-auto'>
                    <div className="flex w-full justify-content-center align-items-center m-auto slides-main">
                        <div className="slider-labels">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                            <path d="M0.888 4.8C0.888 3.584 1.24 2.632 1.944 1.944C2.664 1.256 3.584 0.912 4.704 0.912C5.824 0.912 6.736 1.256 7.44 1.944C8.16 2.632 8.52 3.584 8.52 4.8C8.52 6.032 8.16 6.992 7.44 7.68C6.736 8.368 5.824 8.712 4.704 8.712C3.584 8.712 2.664 8.368 1.944 7.68C1.24 6.992 0.888 6.032 0.888 4.8ZM16.296 1.2L6.864 18H3.6L13.008 1.2H16.296ZM4.68 2.928C3.8 2.928 3.36 3.552 3.36 4.8C3.36 6.064 3.8 6.696 4.68 6.696C5.112 6.696 5.448 6.544 5.688 6.24C5.928 5.92 6.048 5.44 6.048 4.8C6.048 3.552 5.592 2.928 4.68 2.928ZM11.424 14.376C11.424 13.144 11.776 12.192 12.48 11.52C13.2 10.832 14.12 10.488 15.24 10.488C16.36 10.488 17.264 10.832 17.952 11.52C18.656 12.192 19.008 13.144 19.008 14.376C19.008 15.608 18.656 16.568 17.952 17.256C17.264 17.944 16.36 18.288 15.24 18.288C14.104 18.288 13.184 17.944 12.48 17.256C11.776 16.568 11.424 15.608 11.424 14.376ZM15.216 12.504C14.304 12.504 13.848 13.128 13.848 14.376C13.848 15.64 14.304 16.272 15.216 16.272C16.112 16.272 16.56 15.64 16.56 14.376C16.56 13.128 16.112 12.504 15.216 12.504Z" fill="black"/>
                        </svg>
                        </div>
                        <InputNumber locale="en-US" minFractionDigits={2} className='w-full' min={0} max={100} value={formData.downPayment} 
                            onChange={(e)=> setFormData({...formData, downPayment: e.value})} />
                    </div>
                    <span className='block mt-3 text-start'>Please provide the dollar amount or percentage you will be putting down.</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.downPayment ? false : true} onClick={onSubmit}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepThree;