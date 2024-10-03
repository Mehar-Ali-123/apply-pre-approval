import React from 'react';
import { Calendar } from 'primereact/calendar';

const StepEight = ({formData, setFormData, step, setStep}) => {
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Provide Your Information</h1>
                <p className='text-gray-700'>These questions will help us verify your identity, check your credit score and complete your application. We're asking for this information now so that we can offer you personalized results sooner.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Birth Date</h4>
                <div className='w-11 md:w-6 m-auto my-5'>
                    <div className=" flex justify-content-center align-items-center m-auto">
                        <Calendar placeholder='Your date of birth' className='w-full' value={formData.dateOfBirth} 
                            onChange={(e)=> setFormData({...formData, dateOfBirth: e.value})} />
                    </div>
                    <span className='block text-start mt-3'>We use your birthdate to verify your identity.</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> {formData.coBorrower === 'Yes' ? setStep(step-1) : setStep(step-2)}}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.dateOfBirth ? false : true} onClick={()=> setStep(step+1)}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepEight;