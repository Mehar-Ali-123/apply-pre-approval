import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addGiftsGrants } from '../../utils/api';

const StepTwentyOne = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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
    ]

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, type: data.giftType,
                source: data.giftSource, amount: data.giftAmount
            }
            const res = await axios.post(addGiftsGrants, { data: dataObj });
            if (res.data.status === true) {
                const newData = {
                    giftType: data.giftType,
                    giftSource: data.giftSource,
                    giftAmount: data.giftAmount
                }
                const updatedFormData = {
                    ...formData,
                    gifts: [...formData.gifts, newData]
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
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Gifts and Grants</h1>
                <p className='mt-2 text-gray-700'>If you have (or will) receive any gift and/or grant, please provide those details below.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Gifts & Grants</h1>
                            {
                                (formData.gifts.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside pb-6 mt-4'>
                            {
                                show ? (
                                    <div className='w-full md:w-11 lg:w-11 m-auto'>

                                        <div className='grid grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Type</label>
                                                <Controller
                                                    name="giftType"
                                                    {...register('giftType')}
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
                                                {errors?.giftType && <span className='text-red-600 text-start block mt-2'>{errors?.giftType?.message}</span>}
                                            </div>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Source</label>
                                                <Controller
                                                    name="giftSource"
                                                    {...register('giftSource')}
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
                                                {errors?.giftSource && <span className='text-red-600 text-start block mt-2'>{errors?.giftSource?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Amount</label>
                                                <InputText type='number' {...register("giftAmount", { required: 'Payment is required' })}
                                                    className='w-full' placeholder='Enter Amount' />
                                                {errors?.giftAmount && <span className='text-red-600 text-start block mt-2'>{errors?.giftAmount?.message}</span>}
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
                                    formData.gifts.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-4 my-0'><AiOutlinePlusCircle /> Add New Gifts & Grants</p>
                                    ) : (
                                        <div className='mx-3'>
                                            <DataTable stripedRows value={formData.gifts}>
                                                <Column field="giftType" header="Gift Type"></Column>
                                                <Column field="giftSource" header="Gift Source"></Column>
                                                <Column field="giftAmount" header="Amount"></Column>
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
                </form>
            </div>
        </div >
    )
}

export default StepTwentyOne;