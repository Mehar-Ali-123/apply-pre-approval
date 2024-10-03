import { Card } from 'primereact/card';
import React, { useState } from 'react'
import { married, marriedNot, separatedMarried, unmarried } from '../../assets';
import axios from 'axios';
import { updateClient } from '../../utils/api';
import { useSelector } from 'react-redux';

const StepFive = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.martialStatus);
    const [isClicked, setIsClicked] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const data = [
        {
            key: 'Unmarried',
            name: 'Unmarried',
            img: unmarried,
            text: 'I am NOT married'
        },
        {
            key: 'Married',
            name: 'Married',
            img: married,
            text: 'I am married and will be applying with my spouse'
        },
        {
            key: 'MarriedNot',
            name: 'Married',
            img: marriedNot,
            text: 'I am married but will not be applying with my spouse'
        },
        {
            key: 'Separated',
            name: 'Separated',
            img: separatedMarried,
            text: 'I am married, but currently separated'
        }
    ]
    const onSubmit = async(e)=> {
        e.preventDefault();
        setIsClicked(true);
        try {
            const data = {
                id: user.user_id, martial_status: formData.martialStatus
            }
            const res = await axios.patch(updateClient, { ...data });
            if (res.data.status === true) {
                console.log('ok2', formData);
                setIsClicked(false);
                setStep(formData.martialStatus === 'Unmarried' ? step + 1 : formData.martialStatus === 'Married' ? step + 2 : step + 3)
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
                <h1 className='text-900 text-2xl md:text-4xl mb-2'>Provide Your Marital Status</h1>
                <p className='text-gray-700'>If you're applying with another person, they'll become a co-borrower on this loan. Co-borrowers are equally responsible for honoring the loan agreement. Their income, assets, liabilities and credit history will also be considered. If you choose to add a co-borrower later, your credit report will be pulled again when the co-borrower's credit is pulled. No non-owner or non-occupant co-borrowers allowed for qualifying purposes.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-4 mb-3'>Are You Married?</h4>
                <div className="flex justify-center w-full lg:w-27rem m-auto max-w-full animate">
                    {
                        data.map((data, index) => (
                            <div key={index} onClick={() => { setState(data.key); setTimeout(() => { setStep(data.key === 'Unmarried' ? step + 1 : data.key === 'Married' ? step + 2 : step + 3) }, 0); setFormData({ ...formData, martialStatus: data.key }) }} className={`col-12 md:col-6`}>
                                <Card className={`cursor-pointer py-3 ${state === data.key ? 'active' : 'text-900'}`}>
                                    <img className='m-auto' src={data.img} />
                                    <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                    <span className='subtext'>{data.text}</span>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button disabled={formData.martialStatus !== '' ? false : true} className='btn-dark' type='submit' onClick={onSubmit}>
                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default StepFive;