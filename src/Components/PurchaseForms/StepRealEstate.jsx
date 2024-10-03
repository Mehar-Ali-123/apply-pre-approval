import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { BiEdit, BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { InputMask } from 'primereact/inputmask';
import { HiOutlineBriefcase } from 'react-icons/hi'
import { addRealtorInfo, getRealtor, updateLoan, updateRealtor } from '../../utils/api';
import axios from 'axios';
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PopupModal from '../common/PopupModal';

const StepRealEstate = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, control, setValue, register } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [isClicked, setIsClicked] = useState(false);
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
                const link = getRealtor(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setShow(true);
                    setFormData({
                        ...formData,
                        realtor_info_id: res.data.data[0]?.realor_info_id,
                        realtorFirstName: res.data.data[0]?.realtor_first_name,
                        realtorLastName: res.data.data[0]?.realtor_last_name,
                        realtorCompanyName: res.data.data[0]?.realtor_company_name,
                        realtorPhone: res.data.data[0]?.realtor_phone_number,
                        realtorEmail: res.data.data[0]?.realtor_email,
                        loan_share_authorization: res.data.data[0]?.loan_share_authorization === 1 ? true : false
                    })
                    setValue('realtorFirstName',res.data.data[0]?.realtor_first_name)
                    setValue('realtorLastName',res.data.data[0]?.realtor_last_name)
                    setValue('realtorCompanyName',res.data.data[0]?.realtor_company_name)
                    setValue('realtorPhone',res.data.data[0]?.realtor_phone_number)
                    setValue('realtorEmail',res.data.data[0]?.realtor_email)
                    setValue('loan_share_authorization',res.data.data[0]?.loan_share_authorization === 1 ? true : false)
                    setIsLoading(false);
                } else {
                    setData([])
                    setIsLoading(false);
                }
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
    }, [formData.loanId, formData?.realtor_info_id]);

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            if (formData?.realtor_info_id) {
                const dataObj = {
                    id: formData.realtor_info_id, realtor_first_name: data.realtorFirstName,
                    realtor_last_name: data.realtorLastName, realtor_company_name: data.realtorCompanyName,
                    realtor_phone_number: data.realtorPhone, realtor_email: data.realtorEmail,
                    loan_share_authorization: data.loan_share_authorization
                }
                const res = await axios.patch(updateRealtor, { ...dataObj }, { headers: {
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
                    loan_application_id: formData.loanId, realtor_first_name: data.realtorFirstName,
                    realtor_last_name: data.realtorLastName, realtor_company_name: data.realtorCompanyName,
                    realtor_phone_number: data.realtorPhone, realtor_email: data.realtorEmail,
                    loan_share_authorization: data.loan_share_authorization
                }
                const res = await axios.post(addRealtorInfo, { data: dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(step + 1);
                    const newData = { ...data, realtor_info_id: res.data.data.id }
                    setFormData(newData)
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
        <div className='complete-form'>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            {
                isLoading ? (
                    <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                        <h6>Loading...</h6>
                    </div>
                ) : (
                    show ? (
                        data.length > 0 ? (
                            <div className='data-exists w-75'>
                                <div className='heading-data my-0 flex justify-between items-center'>
                                    <h1 className='text-900 text-lg text-start md:text-2xl'>Real Estate Agent Info</h1>
                                    <BiEdit onClick={() => setShow(false)} className='link text-xl cursor-pointer' />
                                </div>
                                <div>
                                    <DataTable stripedRows value={data}>
                                        <Column field="realtor_first_name" header="Realtor Name"></Column>
                                        <Column field="realtor_company_name" header="Realtor Company"></Column>
                                        <Column field="realtor_email" header="Realtor Email"></Column>
                                        <Column field="realtor_phone_number" header="Realtor Phone"></Column>
                                    </DataTable>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className='text-2xl text-black'>You did not add any realtor information while doing the application</h1>
                            </div>
                        )
                    ) : (
                        <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                            <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Real Estate <strong className='st-1'>Agent</strong> <strong className='st-2'>Information</strong> (optional)</h1>
                            <p className='text-gray-700 mb-5'>A real estate agent can be an invaluable ally in your homebuying journey. Sharing their information allows us to collaborate and ensure a smooth transaction.</p>
                            <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-6' onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-start'>Realtor First Name</label>
                                    <span className="p-input-icon-left w-full">
                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                        <InputText {...register("realtorFirstName", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                                    </span>
                                    {errors?.realtorFirstName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorFirstName?.message}</span>}
                                </div>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-start'>Realtor Last Name</label>
                                    <span className="p-input-icon-left w-full">
                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                        <InputText {...register("realtorLastName", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your last name' />
                                    </span>
                                    {errors?.realtorLastName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorLastName?.message}</span>}
                                </div>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-start'>Real Estate Agent Company</label>
                                    <span className="p-input-icon-left w-full">
                                        <HiOutlineBriefcase style={{ marginTop: '-11px' }} className=' text-xl' />
                                        <InputText {...register("realtorCompanyName", { required: 'Company Name is required' })} className='w-full' placeholder='Enter your company name' />
                                    </span>
                                    {errors?.realtorCompanyName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorCompanyName?.message}</span>}
                                </div>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-start'>Real Estate Agent Phone</label>
                                    <span className="p-input-icon-left w-full">
                                        <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                                        <InputMask {...register("realtorPhone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(000)-000-0000' />
                                    </span>
                                    {errors?.realtorPhone && <span className='text-red-600 text-start block mt-2'>{errors?.realtorPhone?.message}</span>}
                                </div>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-start'>Real Estate Agent Email</label>
                                    <span className="p-input-icon-left w-full">
                                        <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                                        <InputText {...register("realtorEmail", {
                                            required: 'Email Address is required', pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Invalid Email Address',
                                            },
                                        })} className='w-full' placeholder='Enter email' />
                                    </span>
                                    {errors?.realtorEmail && <span className='text-red-600 text-start block mt-2'>{errors?.realtorEmail?.message}</span>}
                                </div>
                                <Controller
                                    name="loan_share_authorization"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <div className="flex align-items-center">
                                            <Checkbox
                                                inputId="ingredient1"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.checked)}
                                            />
                                            <label htmlFor="ingredient1" className="ml-2">
                                                I authorize sharing my real estate agent info.
                                            </label>
                                        </div>
                                    )}
                                />
                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                    <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                                    <button style={{ color: 'rgba(233, 136, 98, 1)' }} className='btn-dark' type='submit'>
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

export default StepRealEstate;