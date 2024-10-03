import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { tick, cross } from '../../assets';
import { Card } from 'primereact/card';

const StepThirteen = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.propertyAside)
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
    const options = [
        { value: 'primary_residence', name: 'Primary Residence' },
        { value: 'second_home', name: 'Second/Vacation Home' },
        { value: 'rental', name: 'Investment/Rental' }
    ]
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Provide Your Information</h1>
                <p className='text-gray-700'>These questions will help us verify your identity, check your credit score and complete your application. We're asking for this information now so that we can offer you personalized results sooner.</p>
                <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                    <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>How You Will Occupy Property</h4>
                    <div className='dropdown'>
                        <Dropdown options={options} value={formData.propertyOccupience} onChange={(e) => setFormData({ ...formData, propertyOccupience: e.value })} optionLabel="name"
                            placeholder="Choose Source of down payment" className="p-inputtext-lg text-start w-10 md:w-8 lg:w-10" />
                        <span className='block text-center mt-3 text-gray-700'>How you intend to occupy your home affects your loan terms.</span>
                    </div>
                    <h6 className='mb-3 mt-5 text-lg text-start'>Will you set aside space within this property to operate your own business? (e.g., daycare facility, medical office, beauty/barber shop)</h6>
                    <div className="flex justify-center w-full lg:w-8 gap-5 m-auto max-w-full animate">
                        {
                            data.map((data, index) => (
                                <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, propertyAside: data.name }) }} className={`col-12 md:col-6`}>
                                    <Card  style={{ height: '60px' }} className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
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
                        <button className='btn-dark' type='submit' onClick={() => setStep(step + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepThirteen;