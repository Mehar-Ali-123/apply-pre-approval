import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addEmployments } from '../../utils/api';
import axios from 'axios';

const StepSixteen = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, watch, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const employmentStatuses = [
        { value: 'employed', name: 'Employed' },
        { value: 'sel-employed', name: 'Self-Employed' },
        { value: 'un-employed', name: 'Un-employed' },
        { value: 'retired', name: 'Retired' },
        { value: 'student', name: 'Student' },
        { value: 'homemaker', name: 'Homemaker' },
        { value: 'military', name: 'Military' },
        { value: 'other', name: 'Other' },
    ]

    const industries = [
        { value: 'Agriculture', name: 'Agriculture' },
        { value: 'Automotive', name: 'Automotive' },
        { value: 'Banking/Finance', name: 'Banking/Finance' },
        { value: 'Construction', name: 'Construction' },
        { value: 'Education', name: 'Education' },
        { value: 'Energy/Utilities', name: 'Energy/Utilities' },
        { value: 'Entertainment', name: 'Entertainment' },
        { value: 'Food and Beverage', name: 'Food and Beverage' },
        { value: 'Government/Non-profit', name: 'Government/Non-profit' },
        { value: 'Healthcare', name: 'Healthcare' },
        { value: 'Hospitality/Tourism', name: 'Hospitality/Tourism' },
        { value: 'Information Technology (IT)', name: 'Information Technology (IT)' },
        { value: 'Manufacturing', name: 'Manufacturing' },
        { value: 'Media/Advertising', name: 'Media/Advertising' },
        { value: 'Real Estate', name: 'Real Estate' },
        { value: 'Retail', name: 'Retail' },
        { value: 'Telecommunications', name: 'Telecommunications' },
        { value: 'Transportation/Logistics', name: 'Transportation/Logistics' },
        { value: 'E-commerce', name: 'E-commerce' },
        { value: 'Pharmaceutical', name: 'Pharmaceutical' },
        { value: 'Aerospace/Aviation', name: 'Aerospace/Aviation' },
        { value: 'Insurance', name: 'Insurance' },
        { value: 'Consulting', name: 'Consulting' },
        { value: 'Legal', name: 'Legal' },
        { value: 'Architecture/Design', name: 'Architecture/Design' }
    ];

    const months = [
        { value: 'January', name: 'January' },
        { value: 'February', name: 'February' },
        { value: 'March', name: 'March' },
        { value: 'April', name: 'April' },
        { value: 'May', name: 'May' },
        { value: 'June', name: 'June' },
        { value: 'July', name: 'July' },
        { value: 'August', name: 'August' },
        { value: 'September', name: 'September' },
        { value: 'October', name: 'October' },
        { value: 'November', name: 'November' },
        { value: 'December', name: 'December' }
    ];

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, employment_status: data.employmentStatus,
                employer_name: data.employerName, street_address: data.employerAddress, city: data.employerCity,
                state: data.employerState,zip_code: data.employerZip, phone_number: data.employerPhone, 
                industry: data.employerIndustry, position: data.employerPosition,
                start_month: data.employerStartMonth, start_year: data.employerStartYear, 
                base: data.baseIncome, overtime: data.overtimeIncome,bonus: data.bonusIncome, 
                comission: data.comissionIncome, other: data.otherIncome, total: data.totalIncome
            }
            const res = await axios.post(addEmployments, { data: dataObj });
            if (res.data.status === true) {
                const newData = {
                    employmentStatus: data.employmentStatus,
                    employerName: data.employerName,
                    employerAddress: data.employerAddress,
                    employerCity: data.employerCity,
                    employerState: data.employerState,
                    employerZip: data.employerZip,
                    employerPhone: data.employerPhone,
                    employerIndustry: data.employerIndustry,
                    employerPosition: data.employerPosition,
                    employerStartMonth: data.employerStartMonth,
                    employerStartYear: data.employerStartYear,
                    baseIncome: data.baseIncome,
                    overtimeIncome: data.overtimeIncome,
                    bonusIncome: data.bonusIncome,
                    comissionIncome: data.comissionIncome,
                    otherIncome: data.otherIncome,
                    totalIncome: data.totalIncome
                }
                const updatedFormData = {
                    ...formData,
                    employements: [...formData.employements, newData]
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
            <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Verify Employment</h1>
                <p className='text-gray-700'>Please review and verify your employment history. At least 2 years of employment history must be provided.</p>
                <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='inner-forms'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Employment History</h1>
                            {
                                (formData.employements.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside py-6'>
                            {
                                show ? (
                                    <div className='w-full md:w-11 lg:w-10 m-auto'>
                                        <div className='dropdown mb-3'>
                                            <label className='block mb-2 text-start'>Employment Status</label>
                                            <Controller
                                                name="employmentStatus"
                                                {...register('employmentStatus')}
                                                control={control}
                                                render={({ field }) => (
                                                    <Dropdown
                                                        {...field}
                                                        value={field.value || ''}
                                                        optionLabel="name"
                                                        options={employmentStatuses}
                                                        placeholder="Select Employment Status"
                                                        className="p-inputtext-lg text-start w-full"
                                                        onChange={(e) => field.onChange(e.value)}
                                                    />
                                                )}
                                            />
                                            {errors?.employmentStatus && <span className='text-red-600 text-start block mt-2'>{errors?.employmentStatus?.message}</span>}
                                        </div>
                                        {
                                            watch('employmentStatus') !== 'un-employed' && watch('employmentStatus') && (
                                                <>
                                                    <div className='mb-3'>
                                                        <label className='block mb-2 text-start'>Employer Name</label>
                                                        <InputText {...register("employerName", { required: 'Street address is required' })}
                                                            className='w-full' placeholder='Name of employer' />
                                                        {errors?.employerName && <span className='text-red-600 text-start block mt-2'>{errors?.employerName?.message}</span>}
                                                    </div>
                                                    <div className='mb-3'>
                                                        <label className='block mb-2 text-start'>Employer Address</label>
                                                        <InputText {...register("employerAddress", { required: 'Street address is required' })} className='w-full' placeholder='Street address' />
                                                        {errors?.employerAddress && <span className='text-red-600 text-start block mt-2'>{errors?.employerAddress?.message}</span>}
                                                    </div>
                                                    <div className='flex gap-3'>
                                                        <div className='mb-2'>
                                                            <InputText {...register("employerCity", { required: 'City is required' })} className='w-full' placeholder='City' />
                                                            {errors?.employerCity && <span className='text-red-600 text-start block mt-2'>{errors?.employerCity?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <InputText {...register("employerState", {
                                                                required: 'State is required'
                                                            })} className='w-full' placeholder='State' />
                                                            {errors?.employerState && <span className='text-red-600 text-start block mt-2'>{errors?.employerState?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <InputMask {...register("employerZip", { required: 'Zip code is required' })} className='w-full' mask='99999' placeholder='Zip' />
                                                            {errors?.employerZip && <span className='text-red-600 text-start block mt-2'>{errors?.employerZip?.message}</span>}
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Phone</label>
                                                            <InputMask {...register("employerPhone", { required: 'Phone number is required' })}
                                                                className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                                                            {errors?.employerPhone && <span className='text-red-600 text-start block mt-2'>{errors?.employerPhone?.message}</span>}
                                                        </div>
                                                        <div className='mb-2 dropdown w-full'>
                                                            <label className='block mb-2 text-start'>Industry</label>
                                                            <Controller
                                                                name="employerIndustry"
                                                                {...register('employerIndustry')}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Dropdown
                                                                        {...field}
                                                                        value={field.value || ''}
                                                                        optionLabel="name"
                                                                        options={industries}
                                                                        placeholder="Choose"
                                                                        className="p-inputtext-lg text-start w-full"
                                                                        onChange={(e) => field.onChange(e.value)}
                                                                    />
                                                                )}
                                                            />
                                                            {errors?.employerIndustry && <span className='text-red-600 text-start block mt-2'>{errors?.employerIndustry?.message}</span>}
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-3 gap-3 mb-3 max-w-full m-auto'>
                                                        <div className='mb-3'>
                                                            <label className='block mb-2 text-start'>Position/Title</label>
                                                            <InputText {...register("employerPosition", { required: 'Position is required' })}
                                                                className='w-full' placeholder='Position/Title' />
                                                            {errors?.employerPosition && <span className='text-red-600 text-start block mt-2'>{errors?.employerPosition?.message}</span>}
                                                        </div>
                                                        <div className='mb-3 dropdown'>
                                                            <label className='block mb-2 text-start'>Start Month</label>
                                                            <Controller
                                                                name="employerStartMonth"
                                                                {...register('employerStartMonth')}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <Dropdown
                                                                        {...field}
                                                                        value={field.value || ''}
                                                                        optionLabel="name"
                                                                        options={months}
                                                                        placeholder="Choose Month"
                                                                        className="p-inputtext-lg text-start w-full"
                                                                        onChange={(e) => field.onChange(e.value)}
                                                                    />
                                                                )}
                                                            />
                                                            {errors?.employerStartMonth && <span className='text-red-600 text-start block mt-2'>{errors?.employerStartMonth?.message}</span>}
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label className='block mb-2 text-start'>Start Year</label>
                                                            <Calendar view='year' dateFormat='yy' {...register("employerStartYear", { required: 'Year is required' })} placeholder='Start Year' className='w-full' />
                                                            {errors?.employerStartYear && <span className='text-red-600 text-start block mt-2'>{errors?.employerStartYear?.message}</span>}
                                                        </div>
                                                    </div>
                                                    <label className='my-3 text-start'>Gross Monthly Income (per month)</label>
                                                    <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Base</label>
                                                            <InputText type='number' {...register("baseIncome", { required: 'Base income is required' })} className='w-full' />
                                                            {errors?.baseIncome && <span className='text-red-600 text-start block mt-2'>{errors?.baseIncome?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Overtime</label>
                                                            <InputText type='number' {...register("overtimeIncome")} className='w-full' />
                                                            {errors?.overtimeIncome && <span className='text-red-600 text-start block mt-2'>{errors?.overtimeIncome?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Bonus</label>
                                                            <InputText type='number' {...register("bonusIncome")} className='w-full' />
                                                            {errors?.bonusIncome && <span className='text-red-600 text-start block mt-2'>{errors?.bonusIncome?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Comission</label>
                                                            <InputText type='number' {...register("comissionIncome")} className='w-full' />
                                                            {errors?.comissionIncome && <span className='text-red-600 text-start block mt-2'>{errors?.comissionIncome?.message}</span>}
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Other</label>
                                                            <InputText type='number' {...register("otherIncome")} className='w-full' />
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className='block mb-2 text-start'>Total Income per month</label>
                                                            <InputText type='number' {...register("totalIncome")} className='w-full' />
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                            <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                            <button className='btn-primary text-white px-7' type='submit'>
                                                {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    formData.employements.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-4 my-0'><AiOutlinePlusCircle /> Add New Employements</p>
                                    ) : (
                                        <div className='mx-3'>
                                            <DataTable stripedRows value={formData.employements}>
                                                <Column field="employmentStatus" header="Status"></Column>
                                                <Column field="employerName" header="Name"></Column>
                                                <Column field="employerAddress" header="Address"></Column>
                                                <Column field="employerPhone" header="Phone"></Column>
                                                <Column field="employerIndustry" header="Industry"></Column>
                                                <Column field="employerPosition" header="Position"></Column>
                                                {/* <Column field="employerStartYear" header="Start Year"></Column> */}
                                                <Column field="totalIncome" header="Total Income"></Column>
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

export default StepSixteen;