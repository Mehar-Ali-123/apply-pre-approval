import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { addProperty } from '../../utils/api';
import axios from 'axios';

const StepAgentInfo = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);

    const options = [
        { value: 'not_working', name: 'I am not currently working with a real estate agent' },
        { value: 'working', name: 'I am working with a real estate agent' }
    ]
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, street_address: formData.streetAddress,
                city: formData.city, state: formData.state, zip_code: formData.zip, 
                property_occupancy: formData.propertyOccupience,agent_info: formData.agentInfo
            }
            const res = await axios.post(addProperty, { data: dataObj });
            if (res.data.status === true) {
                setIsClicked(false);
                setStep(step + 2);
                // setStep(formData.propertyOccupience == 'working' ? step + 1 : step + 2);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <form>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Provide Your Information</h1>
                <p className='text-gray-700'>These questions will help us verify your identity, check your credit score and complete your application. We're asking for this information now so that we can offer you personalized results sooner.</p>
                <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                    <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Real Estate Agent Information (optional)</h4>
                    <div className='dropdown'>
                        <Dropdown options={options} value={formData.propertyOccupience} onChange={(e) => setFormData({ ...formData, propertyOccupience: e.value })} optionLabel="name"
                            placeholder="Choose Source of down payment" className="p-inputtext-lg text-start w-10 md:w-8 lg:w-10" />
                        <span className='block text-start mt-3 text-gray-700'>If you are not currently working with a real estate agent. click here.</span>
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='submit' onClick={onSubmit}>
                            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepAgentInfo;