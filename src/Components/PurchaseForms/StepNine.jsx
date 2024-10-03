import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import {FiEye, FiEyeOff} from 'react-icons/fi';

const StepNine = ({formData, setFormData, step, setStep}) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    const [show, setShow] = useState(false);
    return (
        <form onSubmit={onSubmit}>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Safeguarding Your <strong className='st-1'>Application's</strong> <strong className='st-2'>Accuracy & Security</strong></h1>
                <p className='text-gray-700'>To ensure the accuracy and security of your loan application, we require your Social Security Number. This information enables us to process your application efficiently and accurately, while maintaining the utmost privacy and protection.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Social Security Number (or ITIN)</h4>
                <div className='w-11 md:w-6 my-6 m-auto'>
                    <div className=" flex gap-3 justify-content-center align-items-center m-auto">
                        <InputMask type={show ? 'text' : 'password'} className='h-full' mask='999' placeholder='999' value={formData.itin1} 
                            onChange={(e)=> setFormData({...formData, itin1: e.value})} />
                        <InputMask type={show ? 'text' : 'password'} className='h-full' mask='99' placeholder='99' value={formData.itin2} 
                            onChange={(e)=> setFormData({...formData, itin2: e.value})} />
                        <InputMask type={show ? 'text' : 'password'} className='h-full' mask='9999' placeholder='9999' value={formData.itin3} 
                            onChange={(e)=> setFormData({...formData, itin3: e.value})} />
                        <div onClick={()=> setShow(!show)}>
                            {
                                show ? (
                                    <FiEye />
                                ) : (
                                    <FiEyeOff />
                                )
                            }
                        </div>
                    </div>
                    <span className='block text-start mt-3'>Don't worry, this is private and is needed to securely complete the application process.</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' disabled={(formData.itin1 !== '' && formData.itin2 !== '' && formData.itin3 !== '') ? false : true}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepNine;