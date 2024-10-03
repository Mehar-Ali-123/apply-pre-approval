import React, { useState } from 'react';
import { cross, tick } from '../../assets';
import { Card } from 'primereact/card';

const StepAgentInfo = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.propertyOccupience)

    const data = [
        {
            name: 'Yes',
            img: tick,
        },
        {
            name: 'No',
            img: cross,
        }
    ]
    const onSubmit = (e)=> {
        e.preventDefault();
        setStep(step+1);
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'> Real Estate <strong className='st-1'>Agent</strong> <strong className='st-2'>Information</strong> (optional)</h1>
                <p className='text-gray-700'>A real estate agent can be an invaluable ally in your homebuying journey. Sharing their information allows us to collaborate and ensure a smooth transaction.</p>
                <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                    <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-5'>Real Estate Agent Information (optional)</h4>
                    <div className="flex justify-center w-full lg:w-8 gap-5 m-auto max-w-full animate">
                        {
                            data.map((data, index) => (
                                <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, propertyOccupience: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                    <Card style={{ height: '60px' }} className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                        <div className='flex items-center justify-center gap-3'>
                                            <img height={32} width={32} className='m-auto' src={data.img} />
                                            <p className='text-sm font-600 m-0 mt-0'>{data.name}</p>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='submit' onClick={onSubmit}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepAgentInfo;