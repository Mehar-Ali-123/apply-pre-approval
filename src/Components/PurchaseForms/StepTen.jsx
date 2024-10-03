import React, { useState } from 'react';
import axios from 'axios';
import { addPersonalInfo, updateLoan, updatePersonalInfo } from '../../utils/api';
import { non_permanent_alien, permanent_alien, us_citizen } from '../../assets';
import { Card } from 'primereact/card';
import PopupModal from '../common/PopupModal';

const StepTen = ({formData, setFormData, step, setStep}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [state, setState] = useState(formData.citizenship);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')

    const options = [
        {
            name: 'US Citizen',
            image: us_citizen,
        },
        {
            name: 'Permanent Resident Alien',
            image: permanent_alien,
        },
        {
            name: 'Non-Permanent Resident Alien',
            image: non_permanent_alien,
        },
    ];
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            if(formData?.personal_info_id) {
                const dataObj = {
                    id: formData.personal_info_id, date_of_birth: new Date(formData.dateOfBirth).toISOString().replace("T", " ").split(".")[0], 
                    security_number: formData.itin1 + formData.itin2 + formData.itin3,
                    citizen_status: formData.citizenship
                }
                const res = await axios.patch(updatePersonalInfo, { ...dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(step + 1);
                } else {
                    setResMessage(res.data.message);
                    setModal(true)
                    setIsClicked(false);
                }
            } else {
                const dataObj = {
                    loan_application_id: formData.loanId, date_of_birth: new Date(formData.dateOfBirth).toISOString().replace("T", " ").split(".")[0], 
                    security_number: formData.itin1 + formData.itin2 + formData.itin3,
                    citizen_status: formData.citizenship
                }
                const res = await axios.post(addPersonalInfo, { data: dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setFormData({
                        ...formData,
                        personal_info_id: res.data.data.id
                    })
                    setIsClicked(false);
                    setStep(step + 1);
                } else {
                    setResMessage(res.data.message);
                    setModal(true)
                    setIsClicked(false);
                }
            }
            const loanObj = {
                id: formData.loanId, loan_application_stage: step
            }
            const loanAppRes = await axios.patch(updateLoan, { ...loanObj }, { headers: {
                Authorization: token,
            }});
            setFormData({
                ...formData, loanStage: step
            })
        } catch (error) {
            setResMessage('Something went wrong. Please try again later');
            setModal(true)
            setIsClicked(false);
        }
    }
    return (
        <form>
            <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Confirming Your <strong className='st-1'>Citizenship</strong> <strong className='st-2'>Details</strong></h1>
                <p className='text-gray-700'>Your citizenship status can influence certain elements of your mortgage process. Whether you're a U.S. citizen, permanent resident, or hold another status, it's crucial for us to understand this to ensure compliance and provide you with the best guidance.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-5'>Your Citizenship Status</h4>
                <div className="flex justify-center w-full lg:flex-row flex-col lg:gap-0 gap-3 lg:w-27rem m-auto max-w-full animate">
                    {
                        options.map((data, index) => (
                            <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, citizenship: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                <Card className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                    <img className='m-auto' src={data.image} />
                                    <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                <p className='my-2 text-gray-600'>Your citizenship status is required for any mortgage loan application.</p>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button className='btn-dark' type='submit' style={{color: 'rgba(233, 136, 98, 1)'}} onClick={onSubmit}>
                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default StepTen;