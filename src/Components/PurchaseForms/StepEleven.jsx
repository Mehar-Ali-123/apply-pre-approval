import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Card } from 'primereact/card';
import { ownership1, ownership2, ownership3 } from '../../assets';
import { InputNumber } from 'primereact/inputnumber';
import { LuDollarSign } from 'react-icons/lu'
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import { addAddress, getAddress, updateAddress, updateLoan } from '../../utils/api';
import AddressInput from '../common/AddressInput';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BiEdit } from 'react-icons/bi';
import PopupModal from '../common/PopupModal';

const StepEleven = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, setValue } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });

    const [state, setState] = useState(formData.pimaryOwnership);
    const [isClicked, setIsClicked] = useState(false);
    const ownership = [
        {
            name: 'Own',
            img: ownership1
        },
        {
            name: 'Rent',
            img: ownership2
        }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getAddress(formData.loanId, 'primary');
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setShow(true);
                    setFormData({
                        ...formData,
                        address_id: res.data.data[0]?.address_id,
                        pimaryOwnership: res.data.data[0]?.rent_owned,
                        primaryAddressRent: res.data.data[0]?.primary_housing_expense,
                        mailingAddress: res.data.data[0]?.mailing_street_address,
                        primarystreetAddress: {name: res.data.data[0]?.primary_street_address, value: res.data.data[0]?.primary_street_address}
                    })
                    setValue('primarystreetAddress', {name: res.data.data[0]?.primary_street_address, value: res.data.data[0]?.primary_street_address})
                    setValue('pimaryOwnership', res.data.data[0]?.rent_owned)
                    setValue('primaryAddressRent', res.data.data[0]?.primary_housing_expense)
                    setValue('pimaryLivingYear', res.data.data[0]?.duration_year)
                    setValue('pimaryLivingMonths', res.data.data[0]?.duration_month)
                    setValue('mailingStreetAddress', res.data.data[0]?.mailing_street_address)
                } else {
                    setData([])
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw new Error(error);
            }
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        getData();
    }, [formData.loanId]);

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            if (formData?.address_id) {
                const dataObj = {
                    id: formData?.address_id, primary_street_address: data.primarystreetAddress.name,
                    rent_owned: formData.pimaryOwnership, primary_housing_expense: formData.primaryAddressRent,
                    duration_year: data.pimaryLivingYear,
                    duration_month: data.pimaryLivingMonths, mailing_street_address: formData.mailingAddress === false ? data.primarystreetAddress?.name : data.mailingStreetAddress
                }
                const res = await axios.patch(updateAddress, { ...dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(step + 1);
                    setFormData(data);
                } else {
                    setResMessage(res.data.message);
                    setModal(true)
                    setIsClicked(false);
                }
            } else {
                const dataObj = {
                    loan_application_id: formData.loanId, primary_street_address: data.primarystreetAddress.name,
                    rent_owned: formData.pimaryOwnership, primary_housing_expense: data.primaryAddressRent,
                    duration_year: data.pimaryLivingYear,
                    duration_month: data.pimaryLivingMonths, mailing_street_address: formData.mailingAddress === false ? data.primarystreetAddress.name : data.mailingStreetAddress,
                    type: 'primary'
                }
                const res = await axios.post(addAddress, { data: dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(step + 1);
                    setFormData({
                        ...data,
                        address_id: res.data.data.id
                    });
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
        <div>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            {
                isLoading ? (
                    <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                        <h6>Loading...</h6>
                    </div>
                ) : (
                    show ? (
                        <div className='data-exists'>
                            <div className='heading-data flex justify-between items-center'>
                                <h1 className='text-900 text-lg text-start md:text-2xl'>Primary & Mailing Address</h1>
                                <BiEdit onClick={() => setShow(false)} className='link text-xl cursor-pointer' />
                            </div>
                            <div className='grid grid-cols-2 max-w-full m-auto gap-3 my-3'>
                                <div className='info-div'>
                                    <h6>Property Address</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.primary_street_address}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Occupancy</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.rent_owned}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Primary Housing Expense</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6 className='capitalize'>{data[0]?.primary_housing_expense}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Time living at primary address</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.duration_year} years {data[0]?.duration_month} months</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Mailing Address</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.mailing_street_address}</h6>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                            <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Details for Your <strong className='st-1'>Primary</strong> <strong className='st-2'>Residence</strong></h1>
                            <p className='text-gray-700'>To proceed with precision, we're focusing on your primary residence. Additionally, to facilitate a comprehensive assessment, we'll need a 2-year address history. If you haven't resided at this address for the full period, you'll have an opportunity to provide your former address on the next screen.</p>
                            <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-2'>Your Primary & Mailing Address</h4>
                            <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-5' onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-3'>
                                    <AddressInput control={control} placeholder='Street Address' name='primarystreetAddress' />
                                    {/* <InputText {...register("primarystreetAddress", { required: 'Street address is required' })} className='w-full' placeholder='Street address' /> */}
                                    {errors?.primarystreetAddress && <span className='text-red-600 text-start block mt-2'>{errors?.primarystreetAddress?.message}</span>}
                                </div>
                                <h6 className='text-start my-4 text-lg font-semibold'>Do you own or rent?</h6>
                                <div className="flex justify-center w-full lg:gap-0 gap-3 lg:w-27rem m-auto max-w-full animate">
                                    {
                                        ownership.map((data, index) => (
                                            <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, pimaryOwnership: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
                                                <Card className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                                    <img className='m-auto' src={data.img} />
                                                    <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                                <p className='text-start text-gray-700 my-2'>Select Own if you own your primary address, Rent if you pay rent at your primary address, or No primary housing expense if you do not own your primary address and do not have to pay rent.</p>
                                <div className='my-3 mb-5 text-start'>
                                    <label className='mb-2 font-semibold block'>Housing Expense</label>
                                    <span className="p-input-icon-left w-full">
                                        <LuDollarSign style={{ marginTop: '-10px' }} className=' text-xl' />
                                        <Controller
                                            name="primaryAddressRent"
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                    className='w-full' placeholder="Housing Expense" />
                                            )}
                                        />
                                    </span>
                                    {errors?.primaryAddressRent && <span className='text-red-600 text-start block mt-2'>{errors?.primaryAddressRent?.message}</span>}
                                </div>
                                <h6 className=' text-start text-base font-semibold my-3'>Time living at primary address</h6>
                                <div className='flex gap-4'>
                                    <div className='mb-2 w-full'>
                                        <InputText type='number' name='pimaryLivingYear' {...register("pimaryLivingYear", { required: 'Years is required' })} className='w-full' placeholder='Years' />
                                        {errors?.pimaryLivingYear && <span className='text-red-600 text-start block mt-2'>{errors?.pimaryLivingYear?.message}</span>}
                                    </div>
                                    <div className='mb-2 w-full'>
                                        <InputText type='number' name='pimaryLivingMonths' {...register("pimaryLivingMonths", {
                                            required: 'Months is required'
                                        })} className='w-full' placeholder='Months' />
                                        {errors?.pimaryLivingMonths && <span className='text-red-600 text-start block mt-2'>{errors?.pimaryLivingMonths?.message}</span>}
                                    </div>
                                </div>
                                <p className='text-start my-3 text-gray-700'>Enter a <b>whole number of years</b> and a <b> whole number of months</b> that you have lived at your primary address (ex: 5 and 0 for 5 years and less than one month). <b>Minimum 2 years of living history is required.</b></p>
                                <div className="flex align-items-center">
                                    <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setFormData({ ...formData, mailingAddress: e.checked })} checked={formData.mailingAddress} />
                                    <label htmlFor="ingredient1" className="ml-2">Check if mailing address is different from primary address.</label>
                                </div>
                                {
                                    formData.mailingAddress && (
                                        <div className='my-3'>
                                            <InputText {...register("mailingStreetAddress")} className='w-full' placeholder='Street address' />
                                        </div>
                                    )
                                }
                                <p className='text-start my-3 text-gray-700'>Your <b>mailing address</b> is the address that you use for important mail, such as bank statements and credit cards.</p>
                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                    <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                                    <button className='btn-dark' style={{ color: 'rgba(233, 136, 98, 1)' }} type='submit'>
                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                                    </button>
                                </div>
                            </form>
                        </div>

                    )
                )
            }
        </div>
    )
}

export default StepEleven;