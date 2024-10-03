import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const StepTwo = ({ formData, setFormData, step, setStep }) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Defining Your <strong className='st-1'>Loan</strong> <strong className='st-2'>Details</strong></h1>
                <p className='text-gray-700'>To proceed with your loan application, we need some specifics. Starting with the purchase price of the property you're interested in. This information will aid us in tailoring the right mortgage options for you.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Purchase Price</h4>
                <div className='w-full md:w-8 lg:w-6 m-auto'>
                    <span className="p-input-icon-left w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M3.84472 4.66833C3.84472 4.9385 4.0664 4.99392 5.25099 5.03549V3.8509C4.10103 3.96174 3.84472 4.37738 3.84472 4.66833ZM8.83247 7.79953C8.83247 7.4878 8.61772 7.40467 7.29458 7.34925V8.64468C8.59693 8.50613 8.83247 8.0697 8.83247 7.79953ZM0.138548 7.75797H3.70617C3.70617 8.10434 3.98327 8.47842 5.25099 8.63082V7.27305C3.47757 7.18299 2.20292 6.9336 1.43398 6.52488C0.665033 6.11617 0.277097 5.44421 0.277097 4.509C0.277097 2.74251 2.01588 1.73111 5.25099 1.57178V0.123945H7.29458V1.5787C10.3496 1.73111 12.22 2.61782 12.22 4.59906H8.65235C8.65235 4.28733 8.20207 4.05872 7.29458 3.91325V5.11169C10.4743 5.25717 12.4001 5.65896 12.4001 7.72333C12.4001 9.90547 10.5782 10.813 7.29458 10.9377V12.3855H5.25099V10.9446C1.96046 10.8199 0.131621 10.1271 0.138548 7.75797Z" fill="#797292"/>
                        </svg>
                        <InputNumber locale="en-US" minFractionDigits={2} value={formData.purchasePrice}
                            onChange={(e) => setFormData({ ...formData, purchasePrice: e.value })} type="text"
                            className='w-full' placeholder="Estimated Purchase Price" />
                    </span>
                    <span className='block mt-3 text-start'>An estimate is okay if you haven't found a property yet.</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={() => {setStep(step - 1)}}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.purchasePrice ? false : true} onClick={onSubmit}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepTwo;