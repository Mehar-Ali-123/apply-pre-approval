import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addAssets } from '../../utils/api';

const StepNineteen = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, asset_type: data.assetType,
                mutual_fund: data.assetName, market_value: data.marketValue
            }
            const res = await axios.post(addAssets, { data: dataObj });
            if (res.data.status === true) {
                const newData = {
                    assetType: data.assetType,
                    assetName: data.assetName,
                    marketValue: data.marketValue
                }
                const updatedFormData = {
                    ...formData,
                    assets: [...formData.assets, newData]
                };
                setFormData(updatedFormData);
                setShow(false);
                reset();
                setIsClicked(false);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <div>
            <div className='w-full md:w-11 lg:w-full m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Verify Your Assets</h1>
                <p className='mt-2 text-gray-700'>Please review and verify your information.</p>
                <p className='mt-3 text-gray-700'>We will use the information you provide to process your loan application.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Assets</h1>
                            {
                                (formData.assets.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside pb-6 mt-4'>
                            {
                                show ? (
                                    <div className='w-full md:w-11 lg:w-11 m-auto'>

                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Type of asset</label>
                                                <Controller
                                                    name="assetType"
                                                    {...register('assetType')}
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
                                                {errors?.assetType && <span className='text-red-600 text-start block mt-2'>{errors?.assetType?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Name of Account</label>
                                                <InputText {...register("assetName", { required: 'Name is required' })}
                                                    className='w-full' placeholder='Enter name' />
                                                {errors?.assetName && <span className='text-red-600 text-start block mt-2'>{errors?.assetName?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Amount (Estimate Okay)</label>
                                                <InputText type='number' {...register("marketValue", { required: 'Marlet Value is required' })}
                                                    className='w-full' placeholder='Enter Amount' />
                                                {errors?.marketValue && <span className='text-red-600 text-start block mt-2'>{errors?.marketValue?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                            <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                            <button className='btn-primary text-white px-7' type='submit'>
                                                {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                            </button>
                                        </div>
                                    </div>

                                ) : (
                                    formData.assets.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-4 my-0'><AiOutlinePlusCircle /> Add New Asset</p>
                                    ) : (
                                        <div className='mx-3'>
                                            <DataTable stripedRows value={formData.assets}>
                                                <Column field="assetType" header="Asset Type"></Column>
                                                <Column field="assetName" header="Asset Name"></Column>
                                                <Column field="marketValue" header="Market Value"></Column>
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
                </form>
            </div>
        </div >
    )
}

export default StepNineteen;