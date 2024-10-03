import React, { useState } from 'react';
import { condominium_home, mobile_home, multi_family_home, single_family_home, town_home } from '../../assets';
import { Card } from 'primereact/card';

const StepFourteen = ({formData, setFormData, step, setStep}) => {
    const [state, setState] = useState(formData.propertyType)

    const options = [
        {
            name: 'Single Family Home',
            image: single_family_home
        },
        {
            name: 'Condominium',
            image: condominium_home
        },
        {
            name: 'Townhome',
            image: town_home
        },
        {
            name: 'Multi-Family Home',
            image: multi_family_home
        },
        {
            name: 'Manufactured or Mobile Home',
            image: mobile_home
        },
    ];
    return (
            <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Identifying <strong className='st-1'>Property</strong> <strong className='st-2'>Type</strong></h1>
                <p className='text-gray-700'>The type of property you're interested in can dictate certain loan conditions, including down payment requirement and available loan types. By classifying your desired property, we can better streamline your mortgage options</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-5'>Subject Property Type</h4>
                <div className='w-full md:w-11 lg:w-full m-auto text-center'>
                    <div className="flex justify-center gap-2 flex-row lg:flex-nowrap flex-wrap w-full lg:w-27rem m-auto max-w-full animate">
                        {
                            options.map((data, index) => (
                                <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, propertyType: data.name }) }} className={`xs:col-12 sm:col-12 md:col-5`}>
                                    <Card className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                        <img className='m-auto' src={data.image} />
                                        <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' onClick={()=> setStep(step-1)} type='button'>Back</button>
                    <button className='btn-dark' onClick={()=> setStep(step+1)}>
                        Next
                    </button>
                </div>
            </div>
    )
}

export default StepFourteen;