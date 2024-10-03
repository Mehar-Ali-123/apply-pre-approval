import { Card } from 'primereact/card';
import React, { useState } from 'react'
import { married, separatedMarried, unmarried } from '../../assets';
import axios from 'axios';
import { updateLoan } from '../../utils/api';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { tick, cross } from '../../assets';
import PopupModal from '../common/PopupModal';

const StepFive = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.martialStatus);
    const [state2, setState2] = useState(formData.otherLegalStatus);
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')
    const data2 = [
        {
            name: 'Yes',
            img: tick
        },
        {
            name: 'No',
            img: cross
        }
    ]

    const relationshipStatus = [
        { value: 'civil_union', name: 'Civil union' },
        { value: 'domestic_partnership', name: 'Domestic partnership' },
        { value: 'registered_reciprocal_beneficiary_relationship', name: 'Registered Reciprocal Beneficiary Relationship' },
        { value: 'other', name: 'Other' }
    ]

    const usaStates = [
        { value: "AL", label: "Alabama" },
        { value: "AK", label: "Alaska" },
        { value: "AZ", label: "Arizona" },
        { value: "AR", label: "Arkansas" },
        { value: "CA", label: "California" },
        { value: "CO", label: "Colorado" },
        { value: "CT", label: "Connecticut" },
        { value: "DE", label: "Delaware" },
        { value: "FL", label: "Florida" },
        { value: "GA", label: "Georgia" },
        { value: "HI", label: "Hawaii" },
        { value: "ID", label: "Idaho" },
        { value: "IL", label: "Illinois" },
        { value: "IN", label: "Indiana" },
        { value: "IA", label: "Iowa" },
        { value: "KS", label: "Kansas" },
        { value: "KY", label: "Kentucky" },
        { value: "LA", label: "Louisiana" },
        { value: "ME", label: "Maine" },
        { value: "MD", label: "Maryland" },
        { value: "MA", label: "Massachusetts" },
        { value: "MI", label: "Michigan" },
        { value: "MN", label: "Minnesota" },
        { value: "MS", label: "Mississippi" },
        { value: "MO", label: "Missouri" },
        { value: "MT", label: "Montana" },
        { value: "NE", label: "Nebraska" },
        { value: "NV", label: "Nevada" },
        { value: "NH", label: "New Hampshire" },
        { value: "NJ", label: "New Jersey" },
        { value: "NM", label: "New Mexico" },
        { value: "NY", label: "New York" },
        { value: "NC", label: "North Carolina" },
        { value: "ND", label: "North Dakota" },
        { value: "OH", label: "Ohio" },
        { value: "OK", label: "Oklahoma" },
        { value: "OR", label: "Oregon" },
        { value: "PA", label: "Pennsylvania" },
        { value: "RI", label: "Rhode Island" },
        { value: "SC", label: "South Carolina" },
        { value: "SD", label: "South Dakota" },
        { value: "TN", label: "Tennessee" },
        { value: "TX", label: "Texas" },
        { value: "UT", label: "Utah" },
        { value: "VT", label: "Vermont" },
        { value: "VA", label: "Virginia" },
        { value: "WA", label: "Washington" },
        { value: "WV", label: "West Virginia" },
        { value: "WI", label: "Wisconsin" },
        { value: "WY", label: "Wyoming" }
    ];
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
                id: formData.loanId, martial_status: formData.martialStatus,
                loan_type: formData.loanType,
                purchase_price: formData.purchasePrice, payment_source: formData.downPaymentSource, 
                down_payment_percentage: formData.downPayment,is_veteran: formData.isVeteran, 
                other_mortgage_loans: formData.mortgageLoans,
                unmarried_addendum: formData.martialStatus === 'Unmarried' && formData.otherLegalStatus,
                relationship_state: (formData.martialStatus === 'Unmarried' && formData.otherLegalStatus === 'Yes') && formData.relationshipStatus, 
                relationship_type: (formData.martialStatus === 'Unmarried'  && formData.otherLegalStatus === 'Yes') ? formData.relationshipType : null,
                relationship_description: (formData.martialStatus === 'Unmarried'  && formData.otherLegalStatus === 'Yes' && formData.relationshipType === 'other') && formData.otherExplanation
            }
            const res = await axios.patch(updateLoan, { ...data }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                setIsClicked(false);
                setFormData({
                    ...formData, loanStage: step
                })
                setStep(step + 1);
            } else {
                setResMessage(res.data.message);
                setModal(true)
                setIsClicked(false);
            }
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
                <h1 className='text-900 text-2xl md:text-4xl mb-3'>Your <strong className='st-1'>Marital Status</strong> <strong className='st-2'>Insights</strong></h1>
                <p className='text-gray-700'>Your marital status holds significance in tailoring your mortgage experience. Whether you're single, married, or in a unique situation, we're here to ensure your application is handled with care and consideration</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-5 mb-3'>Are You Married?</h4>
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 justify-center w-full lg:w-27rem m-auto max-w-full animate">
                    {
                        data.map((data, index) => (
                            <div key={index} onClick={() => { setState(data.key); setFormData({ ...formData, martialStatus: data.key }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                <Card className={`cursor-pointer py-3 ${state === data.key ? 'active' : 'text-900'}`}>
                                    <img className='m-auto' src={data.img} />
                                    <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                    <span className='subtext'>{data.text}</span>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                {
                    formData.martialStatus === 'Unmarried' && (<>
                        <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-4'>Unmarried Addendum</h4>
                        <div className='w-full md:w-8 m-auto'>
                            <div>
                                <p className='text-center mb-2 text-gray-700'>Do you have a significant financial or property relationship with another individual that should be considered in this mortgage application?</p>
                                <div className='w-full m-auto md:w-11'>
                                    <div className="flex justify-center gap-0 m-auto max-w-full animate">
                                        {
                                            data2.map((data, index) => (
                                                <div key={index} onClick={() => { setState2(data.name); setFormData({ ...formData, otherLegalStatus: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                                    <Card style={{ height: '60px' }} className={`cursor-pointer py-3 ${state2 === data.name ? 'active' : 'text-900'}`}>
                                                        <div className='flex items-center justify-center gap-3'>
                                                            <img height={32} width={32} className='m-auto' src={data.img} />
                                                            <p className='text-sm font-600 m-0'>{data.name}</p>
                                                        </div>
                                                    </Card>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        formData.otherLegalStatus === 'Yes' && (
                                            <div className='mt-4 text-start'>
                                                <div className='dropdown'>
                                                    <label className='block mb-2'>What state was this relationship formed?</label>
                                                    <Dropdown options={usaStates} value={formData.relationshipStatus} onChange={(e) => setFormData({ ...formData, relationshipStatus: e.value })} optionLabel="label"
                                                        placeholder="State" className="p-inputtext-lg w-full text-start" />
                                                </div>
                                                <div className='dropdown mt-5'>
                                                    <label className='block mb-2'>What type of relationship is this?</label>
                                                    <Dropdown options={relationshipStatus} value={formData.relationshipType} onChange={(e) => setFormData({ ...formData, relationshipType: e.value })} optionLabel="name"
                                                        placeholder="Choose" className="p-inputtext-lg w-full text-start" />
                                                </div>
                                                {
                                                    formData.relationshipType === 'other' && (
                                                        <div className='mt-5'>
                                                            <label className='block mb-2'>Because you chose "Other", please provide an explanation:</label>
                                                            <InputTextarea placeholder='Write here...' className='bg-white w-full' value={formData.otherExplanation} onChange={(e) => setFormData({ ...formData, otherExplanation: e.target.value })} rows={5} cols={30} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>)
                }
                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                    <button className='btn-outline-dark' type='button' onClick={()=> setStep(step-1)}>Back</button>
                    <button disabled={formData.martialStatus !== '' ? false : true} style={{color: 'rgba(233, 136, 98, 1)'}} className='btn-dark px-4' type='submit' onClick={onSubmit}>
                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default StepFive;