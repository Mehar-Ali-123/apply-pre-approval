import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const StepFourteen = ({formData, setFormData, step, setStep}) => {
    const options = [
        { value: 'single_family_residence', name: 'Single family residence' },
        { value: 'condominium', name: 'Condominium' },
        { value: 'cooperative', name: 'Cooperative (CO-OP)' },
        { value: '2-4_unit_property', name: '2-4 unit property' },
        { value: 'townhouse', name: 'Townhouse' },
        { value: 'manufactured', name: 'Manufactured' },
        { value: 'land', name: 'Land' },
        { value: 'planned_unit_development', name: 'Planned unit development (PUD)' }
    ]
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Tell Us More About Your Loan</h1>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-2'>Subject Property Type</h4>
                <div className='dropdown w-full lg:w-8 m-auto mt-3'>
                    <Dropdown options={options} value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.value})} optionLabel="name" 
                        placeholder="Choose Subject Property Type" className="p-inputtext-lg text-start w-10 md:w-8 lg:w-10" />
                    <span className='block text-gray-700 text-start mt-3'>The property type of {formData.primarystreetAddress}, {formData.primarycity}, {formData.primarystate} {formData.primaryzip} couldn't be determined automatically . Please indicate your subject property type or contact to your loan officer .</span>
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> {formData.propertyOccupience == 'working' ? setStep(step - 1) : setStep(step - 2)}}>Back</button>
                    <button className='btn-dark' type='submit' onClick={()=> setStep(step+1)}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default StepFourteen;