import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addGiftsGrants, deleteGifts, getGifts, updateGifts, updateLoan } from '../../utils/api';
import {RxCross2} from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import PopupModal from '../common/PopupModal';

const StepTwentyOne = ({ formData, setFormData, step, setStep }) => {
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

    const giftTypes = [
        { value: 'Cash Gift', label: 'Cash Gift' },
        { value: 'Gift of Equity', label: 'Gift of Equity' },
        { value: 'Grant', label: 'Grant' }
    ]

    const giftSources = [
        { value: 'Company Nonprofit', label: 'Company Nonprofit' },
        { value: 'Employer', label: 'Employer' },
        { value: 'Federal Agency', label: 'Federal Agency' },
        { value: 'Local Agency', label: 'Local Agency' },
        { value: 'NonParent Relative', label: 'NonParent Relative' },
        { value: 'Other', label: 'Other' },
        { value: 'Parent', label: 'Parent' },
        { value: 'Relative', label: 'Relative' },
        { value: 'Religious NonProfit', label: 'Religious NonProfit' },
        { value: 'State Agency', label: 'State Agency' },
        { value: 'Unmarried Partner', label: 'Unmarried Partner' },
        { value: 'Unrelated Friend', label: 'Unrelated Friend' },
        { value: 'Lender', label: 'Lender' }
    ];
    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getGifts(formData.loanId);
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
            const link = deleteGifts(rowData.id);
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
                loan_application_id: formData.loanId, type: data.type,
                source: data.source, amount: data.amount
            }
            const res = await axios.post(addGiftsGrants, { data: dataObj }, { headers: {
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
                id: editedData?.id, type: data.type,
                source: data.source, amount: data.amount
            }
            const res = await axios.patch(updateGifts, { ...dataObj }, { headers: {
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
                <h1 className='text-900 text-2xl md:text-4xl mt-0'><strong className='st-1'>Gifts</strong> and <strong className='st-2'>Grants</strong> Disclosure</h1>
                <p className='mt-2 text-gray-700'>Moving forward, we'd like to gather information about any gifts or grants you've received. This detail is crucial for ensuring accuracy in your mortgage application.</p>
                <div>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Gifts & Grants</h1>
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
                                                <div className='grid grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type</label>
                                                        <Controller
                                                            name="type"
                                                            {...register('type')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    options={giftTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors?.type && <span className='text-red-600 text-start block mt-2'>{errors?.type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Source</label>
                                                        <Controller
                                                            name="source"
                                                            {...register('source')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    options={giftSources}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors?.source && <span className='text-red-600 text-start block mt-2'>{errors?.source?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Amount</label>
                                                        <Controller
                                                            name="amount"
                                                            {...register('amount')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Amount' />
                                                            )}
                                                        />
                                                        {errors?.amount && <span className='text-red-600 text-start block mt-2'>{errors?.amount?.message}</span>}
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
                                                <div className='grid grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type</label>
                                                        <Controller
                                                            name="type"
                                                            {...register('type')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    options={giftTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors2?.type && <span className='text-red-600 text-start block mt-2'>{errors2?.type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Source</label>
                                                        <Controller
                                                            name="source"
                                                            {...register('source')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    options={giftSources}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors2?.source && <span className='text-red-600 text-start block mt-2'>{errors2?.source?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Amount</label>
                                                        <Controller
                                                            name="amount"
                                                            {...register2('amount')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Amount' />
                                                            )}
                                                        />
                                                        {errors2?.amount && <span className='text-red-600 text-start block mt-2'>{errors2?.amount?.message}</span>}
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
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add New Gifts & Grants</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="type" header="Gift Type"></Column>
                                                <Column field="source" header="Gift Source"></Column>
                                                <Column field="amount" header="Amount"></Column>
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
                        <button className='btn-dark' type='submit' onClick={() => { setStep(step + 1) }}>Next</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StepTwentyOne;