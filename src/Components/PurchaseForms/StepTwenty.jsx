import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addLiabilities, deleteLiabilities, getLiabilities, updateLiabilities, updateLoan } from '../../utils/api';
import {RxCross2} from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import {TbBrandMastercard, TbBusinessplan, TbCashBanknote} from 'react-icons/tb'
import { BsCreditCard2Back } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import PopupModal from '../common/PopupModal';

const StepTwenty = ({ formData, setFormData, step, setStep }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const { handleSubmit: handleSubmit2, formState: { errors: errors2 }, setValue, register: register2, control: control2, reset: reset2 } = useForm({
        mode: 'onBlur'
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')

    const liabilityTypes = [
        {
            label: 'Common Liability Types',
            items: [
                { value: 'Revolving', label: 'Revolving (e.g card loan)' },
                { value: 'Installment', label: 'Installment (e.g car, student)' },
                { value: 'Lease', label: 'Lease (not real estate)' },
                { value: 'Mortgage', label: 'Mortgage' },
                { value: 'HELOC', label: 'HELOC' }
            ]
        },
        {
            label: 'Other Liability Types',
            items: [
                { value: 'Alimony', label: 'Alimony' },
                { value: 'Child Support', label: 'Child Support' },
                { value: 'Separate Maintenance', label: 'Separate Maintenance' },
                { value: 'Child Care', label: 'Child Care' },
                { value: 'Job Related Expense', label: 'Job Related Expense' },
                { value: 'Taxes', label: 'Taxes' },
                { value: 'Open 30-Day', label: 'Open 30-Day (balance paid monthly)' },
                { value: 'Collection', label: 'Collection, judgement or lien' },
                { value: 'Other liability', label: 'Other liability' }
            ]
        }
    ];

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getLiabilities(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
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
        if (Object.values(editedData).length > 0) {
          Object.keys(editedData).forEach(fieldName => {
            setValue(fieldName, editedData[fieldName]);
          });
        }
    }, [editedData, setValue]);

    const handleDelete = async(rowData) => {
        try {
            const link = deleteLiabilities(rowData.id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if(res.data.status === true) {
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
                loan_application_id: formData.loanId, liability_type: data.liability_type,
                account_number: data.account_number, owner: data.owner, 
                balance: data.balance, 
                payment: data.payment, term_months: data.term_months
            }
            const res = await axios.post(addLiabilities, { data: dataObj }, { headers: {
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
                id: editedData?.id, liability_type: data.liability_type,
                account_number: data.account_number, owner: data.owner, 
                balance: data.balance, 
                payment: data.payment, term_months: data.term_months
            }
            const res = await axios.patch(updateLiabilities, { ...dataObj }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                getData();
                setIsEditClicked(false);
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
    return (
        <div>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            <Toaster />
            <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>EBreaking Down Your <strong className='st-1'>Liabilities</strong></h1>
                <p className='mt-2 text-gray-700'>Understanding your existing financial commitments and liabilities is crucial. It helps us gauge your financial health and determine the best mortgage terms suited to your situation. Let's detail your outstanding obligations to ensure a comprehensive mortgage evaluation.</p>
                <p className='mt-2 text-gray-700'><span className='text-red-700'>Note:</span> Do not enter Primary Housing Information or rental income information </p>
                <div>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Liabilities</h1>
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
                                            <div className='w-full md:w-11 lg:w-11 m-auto'>

                                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type of liability</label>
                                                        <Controller
                                                            name="liability_type"
                                                            {...register('liability_type')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    optionGroupLabel="label" 
                                                                    optionGroupChildren="items"
                                                                    options={liabilityTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors?.liability_type && <span className='text-red-600 text-start block mt-2'>{errors?.liability_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Name of Creditor</label>
                                                        <span className="p-input-icon-left w-full">
                                                            <TbBrandMastercard style={{ marginTop: '-10px' }} className=' text-xl' />
                                                            <InputText {...register("owner", { required: 'Creditor Name is required' })}
                                                                className='w-full' placeholder='Enter name of creditor' />
                                                        </span>
                                                        {errors?.owner && <span className='text-red-600 text-start block mt-2'>{errors?.owner?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Account Number</label>
                                                        <span className="p-input-icon-left w-full">
                                                            <BsCreditCard2Back style={{ marginTop: '-10px' }} className=' text-xl' />
                                                            <InputText type='number' {...register("account_number")}
                                                                className='w-full' placeholder='Enter Account Number' />
                                                        </span>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Payment</label>
                                                        <Controller
                                                            name="payment"
                                                            {...register('payment')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <span className="p-input-icon-left w-full">
                                                                    <TbCashBanknote style={{ marginTop: '-10px' }} className=' text-xl' />
                                                                    <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                        className='w-full' placeholder='Enter Payment' />
                                                                </span>
                                                            )}
                                                        />
                                                        {errors?.payment && <span className='text-red-600 text-start block mt-2'>{errors?.payment?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Months Left on Term</label>
                                                        <span className="p-input-icon-left w-full">
                                                            <MdOutlineCalendarMonth style={{ marginTop: '-10px' }} className=' text-xl' />
                                                            <InputText type='number' {...register("term_months")}
                                                                className='w-full' placeholder='Enter Months Avalaible' />
                                                        </span>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Balance</label>
                                                        <Controller
                                                            name="balance"
                                                            {...register('balance')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <span className="p-input-icon-left w-full">
                                                                    <TbBusinessplan style={{ marginTop: '-10px' }} className=' text-xl' />
                                                                    <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                        className='w-full' placeholder='Enter Balance' />
                                                                </span>
                                                            )}
                                                        />
                                                        {errors?.balance && <span className='text-red-600 text-start block mt-2'>{errors?.balance?.message}</span>}
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
                                            <div className='w-full md:w-11 lg:w-11 m-auto'>

                                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type of liability</label>
                                                        <Controller
                                                            name="liability_type"
                                                            {...register2('liability_type')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    optionGroupLabel="label" 
                                                                    optionGroupChildren="items"
                                                                    options={liabilityTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors2?.liability_type && <span className='text-red-600 text-start block mt-2'>{errors2?.liability_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Name of Creditor</label>
                                                        <InputText {...register2("owner", { required: 'Creditor Name is required' })}
                                                            className='w-full' placeholder='Enter name of creditor' />
                                                        {errors2?.owner && <span className='text-red-600 text-start block mt-2'>{errors2?.owner?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Account Number</label>
                                                        <InputText type='number' {...register2("account_number")}
                                                            className='w-full' placeholder='Enter Account Number' />
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Payment</label>
                                                        <Controller
                                                            name="payment"
                                                            {...register2('payment')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Payment' />
                                                            )}
                                                        />
                                                        {errors2?.payment && <span className='text-red-600 text-start block mt-2'>{errors2?.payment?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Months Left on Term</label>
                                                        <InputText type='number' {...register2("term_months")}
                                                            className='w-full' placeholder='Enter Months Avalaible' />
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Balance</label>
                                                        <Controller
                                                            name="balance"
                                                            {...register2('balance')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Balance' />
                                                            )}
                                                        />
                                                        {errors2?.balance && <span className='text-red-600 text-start block mt-2'>{errors2?.balance?.message}</span>}
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
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add New Liability</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="liability_type" header="Liability Type"></Column>
                                                <Column field="account_number" header="Account Number"></Column>
                                                <Column field="owner" header="Owner"></Column>
                                                <Column field="balance" header="Balance"></Column>
                                                <Column field="payment" header="Payment"></Column>
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

export default StepTwenty;