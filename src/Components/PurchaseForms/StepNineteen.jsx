import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addAssets, deleteAssets, getAssets, updateAssets, updateLoan } from '../../utils/api';
import {RxCross2} from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import PopupModal from '../common/PopupModal';

const StepNineteen = ({ formData, setFormData, step, setStep }) => {
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

    const assetTypes = [
        {
            label: 'Common Asset Types',
            items: [
                { value: 'Checking Account', label: 'Checking Account' },
                { value: 'Savings Account', label: 'Savings Account' },
                { value: 'Money Market Fund', label: 'Money Market Fund' },
                { value: 'Certificate of Deposit', label: 'Certificate  of Deposit' },
                { value: 'Mutual Funds', label: 'Mutual Funds' },
                { value: 'Stocks', label: 'Stocks' },
                { value: 'Stock Options', label: 'Stock Options' },
                { value: 'Bonds', label: 'Bonds' },
                { value: 'Retirement Fund', label: 'Retirement Fund' },
                { value: 'Bridge Loan Proceeds', label: 'Bridge Loan Proceeds' },
                { value: 'Cash Value of Life Insurance', label: 'Cash Value of Life Insurance' },
            ]
        },
        {
            label: 'Other Asset Types',
            items: [
                { value: 'Secured Borrowed Funds', label: 'Secured Borrowed Funds' },
                { value: 'Unsecured Borrowed Funds', label: 'Unsecured Borrowed Funds' },
                { value: 'Individual Development Account', label: 'Individual Development Account' },
                { value: 'Trust Account', label: 'Trust Account' },
                { value: 'Other Liquid Asset', label: 'Other Liquid Asset' },
                { value: 'Other Non-liquid Asset', label: 'Other Non-liquid Asset' },
                { value: 'Cash on Hand', label: 'Cash on Hand' },
                { value: 'Proceeds from sale of Non-Real Estate Asset', label: 'Proceeds from sale of Non-Real Estate Asset' },
                { value: 'Proceeds from Real Estate to be Sold on or Before Closing', label: 'Proceeds from Real Estate to be Sold on or Before Closing' },
                { value: 'Relocation Funds', label: 'Relocation Funds' },
            ]
        },
        {
            label: 'Credit Types',
            items: [
                { value: 'Deposit/Earnest Money', label: 'Deposit/Earnest Money' },
                { value: 'Employer Assistance', label: 'Employer Assistance' },
                { value: 'Lot Equity', label: 'Lot Equity' },
                { value: 'Rent Credit', label: 'Rent Credit' },
                { value: 'Sweat Credit', label: 'Sweat Credit' },
                { value: 'Trade Equity', label: 'Trade Equity' }
            ]
        },
    ]

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getAssets(formData.loanId);
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
            const link = deleteAssets(rowData.id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if(res.data.status === true) {
                toast.success('Deleted Successfully.');
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
                loan_application_id: formData.loanId, asset_type: data.asset_type,
                account_name: data.account_name, estimate_amount: data.estimate_amount
            }
            const res = await axios.post(addAssets, { data: dataObj }, { headers: {
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
                id: editedData?.id, asset_type: data.asset_type,
                account_name: data.account_name, estimate_amount: data.estimate_amount
            }
            const res = await axios.patch(updateAssets, { ...dataObj }, { headers: {
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
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Assessment of <strong className='st-1'>Your</strong> <strong className='st-2'>Assets</strong></h1>
                <p className='mt-2 text-gray-700'>Assets play a critical role in mortgage applications, reflecting your financial health and reliability. By detailing your assets, we get a clear picture of your financial foundation, aiding in crzafting an optimal mortgage plan.</p>
                <p className='mt-3 text-gray-700'>We will use the information you provide to process your loan application.</p>
                <div>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Assets</h1>
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
                                                        <label className='block mb-2 text-start'>Type of asset</label>
                                                        <Controller
                                                            name="asset_type"
                                                            {...register('asset_type')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    optionGroupLabel="label" 
                                                                    optionGroupChildren="items"
                                                                    options={assetTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors?.asset_type && <span className='text-red-600 text-start block mt-2'>{errors?.asset_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Name of Account</label>
                                                        <InputText {...register("account_name", { required: 'Name is required' })}
                                                            className='w-full' placeholder='Enter name' />
                                                        {errors?.account_name && <span className='text-red-600 text-start block mt-2'>{errors?.account_name?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Amount (Estimate Okay)</label>
                                                        <Controller
                                                            name="estimate_amount"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Amount' />
                                                            )}
                                                        />
                                                        {errors?.estimate_amount && <span className='text-red-600 text-start block mt-2'>{errors?.estimate_amount?.message}</span>}
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
                                                        <label className='block mb-2 text-start'>Type of asset</label>
                                                        <Controller
                                                            name="asset_type"
                                                            {...register2('asset_type')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                    optionLabel="label"
                                                                    optionGroupLabel="label" 
                                                                    optionGroupChildren="items"
                                                                    options={assetTypes}
                                                                    placeholder="Choose"
                                                                    className="p-inputtext-lg text-start w-full"
                                                                    onChange={(e) => field.onChange(e.value)}
                                                                />
                                                            )}
                                                        />
                                                        {errors2?.asset_type && <span className='text-red-600 text-start block mt-2'>{errors2?.asset_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Name of Account</label>
                                                        <InputText {...register2("account_name", { required: 'Name is required' })}
                                                            className='w-full' placeholder='Enter name' />
                                                        {errors2?.account_name && <span className='text-red-600 text-start block mt-2'>{errors2?.account_name?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Amount (Estimate Okay)</label>
                                                        <Controller
                                                            name="estimate_amount"
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder='Enter Amount' />
                                                            )}
                                                        />
                                                        {errors2?.estimate_amount && <span className='text-red-600 text-start block mt-2'>{errors2?.estimate_amount?.message}</span>}
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
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add New Asset</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="asset_type" header="Asset Type"></Column>
                                                <Column field="account_name" header="Account Name"></Column>
                                                <Column field="estimate_amount" header="Estimate Amount"></Column>
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

export default StepNineteen;