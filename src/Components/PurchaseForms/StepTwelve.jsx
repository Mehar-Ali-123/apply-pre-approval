import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addAddress, deleteAddress, getAddress, updateAddress, updateLoan } from '../../utils/api';
import { ownership1, ownership2 } from '../../assets';
import { LuDollarSign } from 'react-icons/lu';
import { Card } from 'primereact/card';
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import AddressInput from '../common/AddressInput';
import PopupModal from '../common/PopupModal';

const StepTwelve = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, reset, control } = useForm({
        mode: 'onBlur'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [state, setState] = useState(formData.pimaryOwnership);
    const [isClicked, setIsClicked] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [data, setData] = useState([]);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')
    const { handleSubmit: handleSubmit2, formState: { errors: errors2 }, control: control2, setValue, register: register2, reset: reset2 } = useForm({
        mode: 'onBlur',
        defaultValues: editedData
    });
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

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getAddress(formData.loanId, 'former');
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data?.length > 0) {
                    setData(res.data.data);
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
    useEffect(() => {
        if (editedData) {
            Object.keys(editedData).forEach(fieldName => {
                setValue(fieldName, editedData[fieldName]);
            });
        }
    }, [editedData, setValue]);

    const handleDelete = async (rowData) => {
        try {
            const link = deleteAddress(rowData.address_id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                toast.success('Deleted Successfully.')
                getData();
            } else {
                toast.error('Something went wrong.')
            }
        } catch (error) {
            toast.error(error)
            throw new Error(error);
        }
    };
    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, primary_street_address: data.primary_street_address.name,
                rent_owned: formData.pimaryOwnership, primary_housing_expense: Number(data.primary_housing_expense),
                duration_year: data.duration_year,
                duration_month: data.duration_month, type: 'former'
            }
            const res = await axios.post(addAddress, { data: dataObj }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                const loanObj = {
                    id: formData.loanId, loan_application_stage: step
                }
                const loanAppRes = await axios.patch(updateLoan, { ...loanObj }, { headers: {
                    Authorization: token,
                }});
                
                setFormData({
                    ...formData, loanStage: step
                })
                getData();
                setShow(false);
                reset();
                setIsClicked(false);
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
    const onUpdate = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                id: editedData.address_id, primary_street_address: data.primary_street_address.name,
                rent_owned: formData.pimaryOwnership, primary_housing_expense: Number(data.primary_housing_expense),
                duration_year: data.duration_year,
                duration_month: data.duration_month
            }
            const res = await axios.patch(updateAddress, { ...dataObj }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                getData();
                setIsEditClicked(false);
                reset2();
                setIsClicked(false);
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
        <div>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            <Toaster />
            <div className='w-full md:w-11 lg:w-9 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Your <strong className='st-1'>Address History:</strong> <strong className='st-2'>Ensuring Accuracy</strong></h1>
                <p className='text-gray-700'>Your previous addresses can play a role in the mortgage process, especially if you've recently moved. If you've resided at your primary address for at least 2 years, there's no need for a former address. However, if your residency is shorter, please provide your former address</p>
                <div>
                    <div className='inner-forms w-full lg:w-10 m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Former Addresses</h1>
                            {
                                (data.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside pb-6 pt-4'>
                            {
                                (show || isEditClicked) ? (
                                    show ? (
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className='w-full md:w-11 lg:w-10 m-auto'>
                                                <div className='mb-3'>
                                                    <AddressInput control={control} placeholder='Street Address' name='primary_street_address' />
                                                    {/* <InputText {...register("primary_street_address", { required: 'Street address is required' })} className='w-full' placeholder='Street address' /> */}
                                                    {errors?.primary_street_address && <span className='text-red-600 text-start block mt-2'>{errors?.primary_street_address?.message}</span>}
                                                </div>
                                                <h6 className='text-start my-4 text-lg font-semibold'>Do you own or rent?</h6>
                                                <div className="flex justify-center w-full lg:gap-0 gap-2 lg:w-27rem m-auto max-w-full animate">
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
                                                            name="primary_housing_expense"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder="Housing Expense" />
                                                            )}
                                                        />
                                                        {errors?.primary_housing_expense && <span className='text-red-600 text-start block mt-2'>{errors?.primary_housing_expense?.message}</span>}
                                                    </span>
                                                </div>
                                                <h6 className=' text-start text-base font-semibold my-3'>Time living at primary address</h6>
                                                <div className='flex gap-4'>
                                                    <div className='mb-2 w-full'>
                                                        <InputText type='number' name='duration_year' {...register("duration_year", { required: 'Years is required' })} className='w-full' placeholder='Years' />
                                                        {errors?.duration_year && <span className='text-red-600 text-start block mt-2'>{errors?.duration_year?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 w-full'>
                                                        <InputText type='number' name='duration_month' {...register("duration_month", {
                                                            required: 'Months is required'
                                                        })} className='w-full' placeholder='Months' />
                                                        {errors?.duration_month && <span className='text-red-600 text-start block mt-2'>{errors?.duration_month?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                                    <button className='btn-primary text-white px-7' type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSubmit2(onUpdate)}>
                                            <div className='w-full md:w-11 lg:w-10 m-auto'>
                                                <div className='mb-3'>
                                                    <AddressInput control={control2} placeholder='Street Address' name='primary_street_address' />
                                                    {/* <InputText {...register2("primary_street_address", { required: 'Street address is required' })} className='w-full' placeholder='Street address' /> */}
                                                    {errors2?.primary_street_address && <span className='text-red-600 text-start block mt-2'>{errors2?.primary_street_address?.message}</span>}
                                                </div>
                                                <h6 className='text-start my-4 text-lg font-semibold'>Do you own or rent?</h6>
                                                <div className="flex justify-center w-full lg:gap-0 gap-2  lg:w-27rem m-auto max-w-full animate">
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
                                                            name="primary_housing_expense"
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder="Housing Expense" />
                                                            )}
                                                        />
                                                        {errors2?.primary_housing_expense && <span className='text-red-600 text-start block mt-2'>{errors2?.primary_housing_expense?.message}</span>}
                                                    </span>
                                                </div>
                                                <h6 className=' text-start text-base font-semibold my-3'>Time living at primary address</h6>
                                                <div className='flex gap-4'>
                                                    <div className='mb-2 w-full'>
                                                        <InputText type='number' name='duration_year' {...register2("duration_year", { required: 'Years is required' })} className='w-full' placeholder='Years' />
                                                        {errors2?.duration_year && <span className='text-red-600 text-start block mt-2'>{errors2?.duration_year?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 w-full'>
                                                        <InputText type='number' name='duration_month' {...register2("duration_month", {
                                                            required: 'Months is required'
                                                        })} className='w-full' placeholder='Months' />
                                                        {errors2?.duration_month && <span className='text-red-600 text-start block mt-2'>{errors2?.duration_month?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setIsEditClicked(false)}>Cancel</button>
                                                    <button className='btn-primary text-white px-7' type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Update'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )

                                ) : (
                                    isLoading ? (
                                        <div className='flex justify-center flex-col gap-4 items-center'>
                                            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="8" />
                                        </div>
                                    ) : data.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add Former Address</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="primary_street_address" header="Address"></Column>
                                                <Column field="rent_owned" header="Occupancy"></Column>
                                                <Column field='duration_year' header="Time at Address"></Column>
                                                <Column
                                                    header="Actions"
                                                    body={(rowData) => (
                                                        <div className='flex gap-3 items-center'>
                                                            <FiEdit2 className='cursor-pointer text-xl text-green-600' onClick={() => { setEditedData(rowData); setIsEditClicked(true) }} />
                                                            <RxCross2 className='cursor-pointer text-xl text-red-600' onClick={() => handleDelete(rowData)} />
                                                        </div>
                                                    )}
                                                ></Column>
                                            </DataTable>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='button' onClick={() => { setStep(step + 1) }}>Next</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StepTwelve;