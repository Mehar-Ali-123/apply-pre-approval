import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { tick, cross, primary_home, secondary_home, rental_home } from '../../assets';
import { Card } from 'primereact/card';

const StepThirteen = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.propertyAside)
    const [state2, setState2] = useState(formData.propertyOccupience)
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
        {
            name: 'Primary Home',
            image: primary_home,
        },
        {
            name: 'Secondary Home',
            image: secondary_home,
        },
        {
            name: 'Rental Property',
            image: rental_home,
        },
    ]
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Determining <strong className='st-1'>Occupancy</strong> <strong className='st-2'>Details</strong></h1>
                <p className='text-gray-700'>let's clarify the occupancy type for the property in question. This detail plays a significant role in tailoring the perfect mortgage plan.</p>
                <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                    <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-4'>How You Will Occupy Property</h4>
                    <div className="flex justify-center lg:flex-row flex-col lg:gap-0 gap-3 w-full lg:w-27rem m-auto max-w-full animate">
                        {
                            options.map((data, index) => (
                                <div key={index} onClick={() => { setState2(data.name); setFormData({ ...formData, propertyOccupience: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                    <Card className={`cursor-pointer py-3 ${state2 === data.name ? 'active' : 'text-900'}`}>
                                        <img className='m-auto' src={data.image} />
                                        <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                    <h6 className='mb-3 mt-5 text-lg text-start'>Will you set aside space within this property to operate your own business? <span className='text-sm'>(e.g., daycare facility, medical office, beauty/barber shop)</span></h6>
                    <div className="flex justify-center w-full lg:w-8 gap-5 m-auto max-w-full animate">
                        {
                            data.map((data, index) => (
                                <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, propertyAside: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
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
                        <button className='btn-dark' type='submit' onClick={() => setStep(step + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepThirteen;