import { Card } from 'primereact/card';
import React, { useState } from 'react'
import { tick, cross } from '../../assets';
const StepFiveMissed = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.isVeteran)
    const [state1, setState1] = useState(formData.mortgageLoans);
    const data = [
        {
            name: 'Yes',
            img: tick
        },
        {
            name: 'No',
            img: cross
        }
    ]
    const onSubmit = async(e)=> {
        e.preventDefault();
        setStep(step + 1);
    }
    return (
            <div className='w-full md:w-11 lg:w-12 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Exploring <strong className='st-1'>Additional</strong> <strong className='st-2'>Loan Options</strong></h1>
                <p className='text-gray-700'>Every borrower's journey is unique, and there might be more than one mortgage solution that fits your needs. Let's explore additional loan options to ensure you're presented with a full spectrum of possibilities.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-4'>Additional Loan Options</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-3 w-full md:w-10 m-auto'>
                    <div style={{borderRight: '1px solid #000000', paddingRight: '20px'}}>
                        <p className='text-start mb-2'>Did you or a borrower that will be on this loan application ever serve/currently serve in the United States Armed Forces, or is a surviving spouse of a deceased veteran?</p>
                        <div className="flex justify-center lg:gap-0 gap-2 m-auto max-w-full animate">
                            {
                                data.map((data, index) => (
                                    <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, isVeteran: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                        <Card style={{height: '60px'}} className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                            <div className='flex items-center justify-center gap-3'>
                                                <img height={32} width={32} className='m-auto' src={data.img} />
                                                <p className='text-sm font-600 m-0'>{data.name}</p>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                        <p className='text-start mt-3'>Veteran Affairs (VA) loans are available to veterans and spouses from these branches.</p>
                    </div>
                    <div className='mt-35' >
                        <p className='text-start mb-2'>Do you have other new mortgage loans for this property?</p>
                        <div className="flex justify-center lg:gap-0 gap-2 m-auto max-w-full animate">
                            {
                                data.map((data, index) => (
                                    <div key={index} onClick={() => { setState1(data.name); setFormData({ ...formData, mortgageLoans: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                        <Card style={{height: '60px'}} className={`cursor-pointer py-3 ${state1 === data.name ? 'active' : 'text-900'}`}>
                                            <div className='flex items-center justify-center gap-3'>
                                                <img height={32} width={32} className='m-auto' src={data.img} />
                                                <p className='text-sm font-600 m-0'>{data.name}</p>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                    <button className='btn-dark' disabled={(formData.mortgageLoans !== '' && formData.isVeteran !== '') ? false : true} onClick={()=> setStep(step + 1)} onSubmit={onSubmit}>
                        Next
                    </button>
                </div>
            </div>
    )
}

export default StepFiveMissed;