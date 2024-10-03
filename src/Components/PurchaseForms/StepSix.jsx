import { Card } from 'primereact/card';
import React, { useState } from 'react'
import { tick, cross } from '../../assets';

const StepSix = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.coBorrower)
    const data = [
        {
            name: 'No',
            img: tick,
            text: 'I will only be applying by myself.'
        },
        {
            name: 'Yes',
            img: cross,
            text: 'I will be applying with another person(s).'
        }
    ]
    return (
        <form>
            <div className='w-full md:w-11 lg:w-12 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mb-2'>Sharing <strong className='st-1'>Information</strong> about Your <strong className='st-2'>Co-Borrower</strong></h1>
                <p className='text-gray-700 mt-3'>Including a co-borrower can have significant implications on the loan application, potentially increasing your borrowing power and affecting loan terms. Let's ensure we have all the details right.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-4'>Will You Be Applying With Anyone Else?</h4>
                <div className="flex justify-center w-full lg:w-5 lg:gap-0 gap-3 m-auto max-w-full animate">
                    {
                        data.map((data, index) => (
                            <div key={index} onClick={() => { setState(data.name); setTimeout(() => { data.name === 'Yes' ? setStep(step+1) : setStep(step+2) }, 0); setFormData({ ...formData, coBorrower: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                <Card className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                    <img className='m-auto' src={data.img} />
                                    <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                    <span className='subtext'>{data.text}</span>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(formData.martialStatus === 'Unmarried' ? step - 2 : formData.martialStatus === 'Married' ? step - 1 : step - 3)}>Back</button>
                    <button className='btn-dark' type='submit' onClick={()=> {state === 'Yes' ? setStep(step+1) : setStep(step+2)}}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepSix;