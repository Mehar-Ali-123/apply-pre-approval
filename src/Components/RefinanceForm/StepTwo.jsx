import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { LuDollarSign } from 'react-icons/lu';

const StepTwo = ({formData, setFormData, step, setStep}) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1)
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Estimating Your <strong className='st-1'>Property </strong> <strong className='st-2'>Value</strong></h1>
                <p className='text-gray-700'>Your estimated property value sets the foundation for your refinancing options. Ensure the above value is as accurate as possible to tailor the best refinancing solutions for you.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Estimated Property Value</h4>
                <div className='w-full md:w-8 lg:w-6 m-auto'>
                    <span className="p-input-icon-left w-full">
                        <LuDollarSign style={{ marginTop: '-10px' }} className=' text-xl' />
                        <InputNumber value={formData.purchasePrice}
                            onChange={(e) => setFormData({ ...formData, purchasePrice: e.value })} type="text"
                            className='w-full' placeholder="Estimated property value" />
                    </span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' disabled={formData.purchasePrice ? false : true}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepTwo;