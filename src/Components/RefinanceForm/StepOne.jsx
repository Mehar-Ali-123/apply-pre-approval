import React from 'react';
import {InputMask} from 'primereact/inputmask';
import { FiMapPin } from 'react-icons/fi';

const StepOne = ({formData, setFormData, step, setStep}) => {
    return (
        <form>
            <div className='w-full md:w-11 lg:w-12 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Tell Us About the Loan You Want</h1>
                <p className='text-gray-700'>Your data is protected using bank level security.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Subject Property Zip Code</h4>
                <div className=' w-full md:w-8 lg:w-10 m-auto'>
                    <span className="p-input-icon-left p-inputtext-lg w-full">
                        <FiMapPin style={{ marginTop: '-10px' }} className=' text-xl' />
                        <InputMask value={formData.propertyZipCode} mask="99999" onChange={(e)=> setFormData({...formData, propertyZipCode: e.target.value})} type="text" className="" placeholder="Enter your Zip Code here" />
                    </span>
                    <span className='block mt-3 text-start'>This is the zip code where you wish to purchase</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> {setStep(step-1); setFormData({...formData, loanType: ''})}}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.propertyZipCode ? false : true} onClick={()=> setStep(step+1)}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepOne