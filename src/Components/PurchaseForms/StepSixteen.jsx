import React, { useEffect, useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addEmployments, deleteEmployment, getEmployment, updateEmployment, updateLoan } from '../../utils/api';
import axios from 'axios';
import { employments1, employments2, employments3, employments4, employments5 } from '../../assets';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import AddressInput from '../common/AddressInput';

const StepSixteen = ({ formData, setFormData, step, setStep }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { handleSubmit, register, control, reset, watch } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const { handleSubmit: handleSubmit2, setValue, register: register2, watch: watch2, control: control2, reset: reset2 } = useForm({
        mode: 'onBlur',
        defaultValues: editedData
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const token = localStorage.getItem('accessToken')

    const employment_statuses = [
        {
            name: 'Employed',
            image: employments1
        },
        {
            name: 'Not-Employed',
            image: employments2
        },
        {
            name: 'Self-Employed',
            image: employments3
        },
        {
            name: 'Military',
            image: employments4
        },
        {
            name: 'Other',
            image: employments5
        }
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

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getEmployment(formData.loanId);
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
        if (editedData) {
            Object.keys(editedData).forEach(fieldName => {
                setValue(fieldName, editedData[fieldName]);
            });
        }
    }, [editedData, setValue]);

    const base = useWatch({ control, name: 'base', defaultValue: 0 });
    const overtime = useWatch({ control, name: 'overtime', defaultValue: 0 });
    const bonus = useWatch({ control, name: 'bonus', defaultValue: 0 });
    const comission = useWatch({ control, name: 'comission', defaultValue: 0 });
    const other = useWatch({ control, name: 'other', defaultValue: 0 });

    // Calculate totalIncome whenever any of the income fields change
    const totalIncome = Number(base) + Number(overtime) + Number(bonus) + Number(comission) + Number(other);
    const handleDelete = async (rowData) => {
        try {
            const link = deleteEmployment(rowData.id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                toast.success('Deleted Successfully.')
                getData()
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
                loan_application_id: formData.loanId, employment_status: data.employment_status,
                employer_name: data.employer_name, street_address: data.street_address?.name, phone_number: data.phone_number,
                industry: data.industry, position: data.position, is_current_position: data.is_current_position,
                start_month: data.start_month, start_year: data.start_year,
                end_month: data.end_month, end_year: data.end_year,
                base: data.base, overtime: data.overtime, bonus: data.bonus,
                comission: data.comission, other: data.other, total: totalIncome,
                automatically_verify_income: data.automatically_verify_income, employed_transaction: data.employed_transaction,
                monthly_income: data.monthly_income, other_description: data.other_description
            }
            const res = await axios.post(addEmployments, { data: dataObj }, { headers: {
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
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    const onUpdte = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                id: editedData.id, employment_status: data.employment_status,
                employer_name: data.employer_name, street_address: data.street_address?.name, phone_number: data.phone_number,
                industry: data.industry, position: data.position,is_current_position: data.is_current_position,
                start_month: data.start_month, start_year: data.start_year,
                end_month: data.end_month, end_year: data.end_year,
                base: data.base, overtime: data.overtime, bonus: data.bonus,
                comission: data.comission, other: data.other, total: totalIncome,
                automatically_verify_income: data.automatically_verify_income, employed_transaction: data.employed_transaction,
                monthly_income: data.monthly_income, other_description: data.other_description
            }
            const res = await axios.patch(updateEmployment, { ...dataObj }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                getData();
                setIsEditClicked(false);
                reset2();
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
            <Toaster />
            <div className='w-full md:w-11 lg:w-11 mx-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Detailing Your <strong className='st-1'>Employment</strong> <strong className='st-2'>Information</strong></h1>
                <p className='text-gray-700'>Your employment details are integral to the mortgage process, influencing loan eligibility, interest rates, and more. Accurate employment data ensures we can provide you with optimal loan solutions tailored to your financial profile. <span className='text-red-700'>Note:</span> At least 2 years of employment history must be provided.</p>
                <div className='mt-5'>
                    <div className='inner-forms'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Employment History</h1>
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
                                            <div className='w-full md:w-11 lg:w-full m-auto'>
                                                <div className="flex gap-3 flex-row lg:flex-nowrap flex-wrap justify-center w-full lg:w-30rem m-auto max-w-full animate">
                                                    {
                                                        employment_statuses.map((data, index) => (
                                                            <div key={index}>
                                                                <Controller
                                                                    name="employment_status"
                                                                    control={control}
                                                                    defaultValue=""
                                                                    render={({ field }) => (
                                                                        <Card
                                                                            style={{ height: '147px', width: '147px' }}
                                                                            className={`cursor-pointer py-3 ${field.value === data.name ? 'active' : 'text-900'
                                                                                }`}
                                                                            onClick={() => field.onChange(data.name)}
                                                                        >
                                                                            <img className="m-auto" width={40} height={40} src={data.image} />
                                                                            <p className="text-sm font-600 m-0 mt-3">{data.name}</p>
                                                                        </Card>
                                                                    )}
                                                                />
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                {
                                                    watch('employment_status') && (
                                                        <div className='mt-4 lg:w-9 m-auto'>
                                                            {
                                                                (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed') && (
                                                                    <>
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Employer Name</label>
                                                                            <InputText {...register("employer_name")}
                                                                                className='w-full' placeholder='Name of employer' />
                                                                        </div>
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Employer Address</label>
                                                                            {/* <InputText {...register("street_address")} className='w-full' placeholder='Street address' /> */}
                                                                            <AddressInput control={control} placeholder='Street Address' name='street_address' />
                                                                        </div>
                                                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Phone</label>
                                                                                <InputMask {...register("phone_number")}
                                                                                    className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                                                                            </div>
                                                                            <div className='mb-2 dropdown w-full'>
                                                                                <label className='block mb-2 text-start'>Industry</label>
                                                                                <Controller
                                                                                    name="industry"
                                                                                    {...register('industry')}
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
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed') && (
                                                                    <Controller
                                                                        name="is_current_position"
                                                                        control={control}
                                                                        defaultValue={false}
                                                                        render={({ field }) => (
                                                                            <div className="flex align-items-start mb-4">
                                                                                <Checkbox
                                                                                    inputId="position"
                                                                                    checked={field.value}
                                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                                />
                                                                                <label htmlFor="position" className="ml-2 text-start">
                                                                                    Current Position
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                )
                                                            }
                                                            <div className={`grid ${(watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed') ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-3 max-w-full m-auto`}>
                                                                {
                                                                    (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed') && (
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Position/Title</label>
                                                                            <InputText {...register("position")}
                                                                                className='w-full' placeholder='Position/Title' />
                                                                        </div>
                                                                    )
                                                                }
                                                                {
                                                                    (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed' || watch('employment_status') === 'Other' || watch('employment_status') === 'Not-Employed') && (
                                                                        <>
                                                                            <div className='mb-3 dropdown'>
                                                                                <label className='block mb-2 text-start'>Start Month</label>
                                                                                <Controller
                                                                                    name="start_month"
                                                                                    {...register('start_month')}
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <Dropdown
                                                                                            {...field}
                                                                                            value={field.value || ''}
                                                                                            optionLabel="name"
                                                                                            options={months}
                                                                                            placeholder="Start Month"
                                                                                            className="p-inputtext-lg text-start w-full"
                                                                                            onChange={(e) => field.onChange(e.value)}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className='mb-3'>
                                                                                <label className='block mb-2 text-start'>Start Year</label>
                                                                                <Calendar view='year' dateFormat='yy' {...register("start_year")} placeholder='Start Year' className='w-full' />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    watch('is_current_position') === false && (
                                                                        <>
                                                                            <div className='mb-3 dropdown'>
                                                                                <label className='block mb-2 text-start'>Start Month</label>
                                                                                <Controller
                                                                                    name="start_month"
                                                                                    {...register('end_month')}
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <Dropdown
                                                                                            {...field}
                                                                                            value={field.value || ''}
                                                                                            optionLabel="name"
                                                                                            options={months}
                                                                                            placeholder="End Month"
                                                                                            className="p-inputtext-lg text-start w-full"
                                                                                            onChange={(e) => field.onChange(e.value)}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className='mb-3'>
                                                                                <label className='block mb-2 text-start'>Start Year</label>
                                                                                <Calendar view='year' dateFormat='yy' {...register("end_year")} placeholder='End Year' className='w-full' />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                            {
                                                                watch('employment_status') === 'Other' && (
                                                                    <>
                                                                        <div className='mb-2'>
                                                                            <label className='block mb-2 text-start'>Description</label>
                                                                            <InputText type='text' {...register("description")} className='w-full' />
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                watch('employment_status') === 'Self-Employed' && (
                                                                    <>
                                                                        <div className='mb-2'>
                                                                            <label className='block mb-2 text-start'>Total Income (per month)</label>
                                                                            <InputText type='number' {...register("monthly_income")} className='w-full' />
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                watch('employment_status') === 'Employed' && (
                                                                    <>
                                                                        <Controller
                                                                            name="employed_transaction"
                                                                            control={control}
                                                                            defaultValue={false}
                                                                            render={({ field }) => (
                                                                                <div className="flex align-items-start mb-4">
                                                                                    <Checkbox
                                                                                        inputId="employed_transaction"
                                                                                        checked={field.value}
                                                                                        onChange={(e) => field.onChange(e.checked)}
                                                                                    />
                                                                                    <label htmlFor="employed_transaction" className="ml-2 text-start">
                                                                                        I am employed by a family member, property seller, real estate agent, or other party to the transaction.
                                                                                    </label>
                                                                                </div>
                                                                            )}
                                                                        />
                                                                        <h6 className='my-3 font-semibold text-gray-900 text-start'>Gross Monthly Income (per month)</h6>
                                                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Base</label>
                                                                                <InputText type='number' {...register("base")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Overtime</label>
                                                                                <InputText type='number' {...register("overtime")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Bonus</label>
                                                                                <InputText type='number' {...register("bonus")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Comission</label>
                                                                                <InputText type='number' {...register("comission")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Other</label>
                                                                                <InputText type='number' {...register("other")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Total Income per month</label>
                                                                                <InputText type='number' {...register("totalIncome")} className='w-full' value={totalIncome} readOnly />
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed' || watch('employment_status') === 'Other') && (
                                                                    <Controller
                                                                        name="automatically_verify_income"
                                                                        control={control}
                                                                        defaultValue={false}
                                                                        render={({ field }) => (
                                                                            <div className="flex align-items-start mb-4">
                                                                                <Checkbox
                                                                                    inputId="automatically_verify_income"
                                                                                    checked={field.value}
                                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                                />
                                                                                <label htmlFor="automatically_verify_income" className="ml-2 text-start">
                                                                                    Automatically verify income with my employer
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                                    <button className='btn-primary text-white px-7' type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSubmit2(onUpdte)}>
                                            <div className='w-full md:w-11 lg:w-full m-auto'>
                                                <div className="flex gap-3 justify-center w-full lg:w-30rem m-auto max-w-full animate">
                                                    {
                                                        employment_statuses.map((data, index) => (
                                                            <div key={index}>
                                                                <Controller
                                                                    name="employment_status"
                                                                    control={control2}
                                                                    defaultValue=""
                                                                    render={({ field }) => (
                                                                        <Card
                                                                            style={{ height: '147px', width: '147px' }}
                                                                            className={`cursor-pointer py-3 ${field.value === data.name ? 'active' : 'text-900'
                                                                                }`}
                                                                            onClick={() => field.onChange(data.name)}
                                                                        >
                                                                            <img className="m-auto" width={40} height={40} src={data.image} />
                                                                            <p className="text-sm font-600 m-0 mt-3">{data.name}</p>
                                                                        </Card>
                                                                    )}
                                                                />
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                {
                                                    watch2('employment_status') && (
                                                        <div className='mt-4 lg:w-9 m-auto'>
                                                            {
                                                                (watch2('employment_status') === 'Employed' || watch2('employment_status') === 'Self-Employed') && (
                                                                    <>
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Employer Name</label>
                                                                            <InputText {...register2("employer_name")}
                                                                                className='w-full' placeholder='Name of employer' />
                                                                        </div>
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Employer Address</label>
                                                                            <AddressInput control={control2} placeholder='Street Address' name='street_address' />
                                                                            {/* <InputText {...register2("street_address")} className='w-full' placeholder='Street address' /> */}
                                                                        </div>
                                                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Phone</label>
                                                                                <InputMask {...register2("phone_number")}
                                                                                    className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                                                                            </div>
                                                                            <div className='mb-2 dropdown w-full'>
                                                                                <label className='block mb-2 text-start'>Industry</label>
                                                                                <Controller
                                                                                    name="industry"
                                                                                    {...register('industry')}
                                                                                    control={control2}
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
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                (watch('employment_status') === 'Employed' || watch('employment_status') === 'Self-Employed') && (
                                                                    <Controller
                                                                        name="is_current_position"
                                                                        control={control}
                                                                        defaultValue={false}
                                                                        render={({ field }) => (
                                                                            <div className="flex align-items-start mb-4">
                                                                                <Checkbox
                                                                                    inputId="is_current_position"
                                                                                    checked={field.value}
                                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                                />
                                                                                <label htmlFor="is_current_position" className="ml-2 text-start">
                                                                                    Current Position
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                )
                                                            }
                                                            <div className={`grid ${(watch2('employment_status') === 'Employed' || watch2('employment_status') === 'Self-Employed') ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-3 max-w-full m-auto`}>
                                                                {
                                                                    (watch2('employment_status') === 'Employed' || watch2('employment_status') === 'Self-Employed') && (
                                                                        <div className='mb-3'>
                                                                            <label className='block mb-2 text-start'>Position/Title</label>
                                                                            <InputText {...register2("position")}
                                                                                className='w-full' placeholder='Position/Title' />
                                                                        </div>
                                                                    )
                                                                }
                                                                {
                                                                    (watch2('employment_status') === 'Employed' || watch2('employment_status') === 'Self-Employed' || watch2('employment_status') === 'Other' || watch2('employment_status') === 'Not-Employed') && (
                                                                        <>
                                                                            <div className='mb-3 dropdown'>
                                                                                <label className='block mb-2 text-start'>Start Month</label>
                                                                                <Controller
                                                                                    name="start_month"
                                                                                    {...register('start_month')}
                                                                                    control={control2}
                                                                                    render={({ field }) => (
                                                                                        <Dropdown
                                                                                            {...field}
                                                                                            value={field.value || ''}
                                                                                            optionLabel="name"
                                                                                            options={months}
                                                                                            placeholder="Start Month"
                                                                                            className="p-inputtext-lg text-start w-full"
                                                                                            onChange={(e) => field.onChange(e.value)}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className='mb-3'>
                                                                                <label className='block mb-2 text-start'>Start Year</label>
                                                                                <Calendar view='year' dateFormat='yy' {...register2("start_year")} placeholder='Start Year' className='w-full' />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    watch('is_current_position') === false && (
                                                                        <>
                                                                            <div className='mb-3 dropdown'>
                                                                                <label className='block mb-2 text-start'>Start Month</label>
                                                                                <Controller
                                                                                    name="start_month"
                                                                                    {...register('end_month')}
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                        <Dropdown
                                                                                            {...field}
                                                                                            value={field.value || ''}
                                                                                            optionLabel="name"
                                                                                            options={months}
                                                                                            placeholder="End Month"
                                                                                            className="p-inputtext-lg text-start w-full"
                                                                                            onChange={(e) => field.onChange(e.value)}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className='mb-3'>
                                                                                <label className='block mb-2 text-start'>Start Year</label>
                                                                                <Calendar view='year' dateFormat='yy' {...register("end_year")} placeholder='End Year' className='w-full' />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                            {
                                                                watch2('employment_status') === 'Other' && (
                                                                    <>
                                                                        <div className='mb-2'>
                                                                            <label className='block mb-2 text-start'>Description</label>
                                                                            <InputText type='text' {...register2("description")} className='w-full' />
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                watch2('employment_status') === 'Self-Employed' && (
                                                                    <>
                                                                        <div className='mb-2'>
                                                                            <label className='block mb-2 text-start'>Total Income (per month)</label>
                                                                            <InputText type='number' {...register2("monthly_income")} className='w-full' />
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                watch2('employment_status') === 'Employed' && (
                                                                    <>
                                                                        <Controller
                                                                            name="employed_transaction"
                                                                            control={control2}
                                                                            defaultValue={false}
                                                                            render={({ field }) => (
                                                                                <div className="flex align-items-start mb-4">
                                                                                    <Checkbox
                                                                                        inputId="employed_transaction"
                                                                                        checked={field.value}
                                                                                        onChange={(e) => field.onChange(e.checked)}
                                                                                    />
                                                                                    <label htmlFor="employed_transaction" className="ml-2 text-start">
                                                                                        I am employed by a family member, property seller, real estate agent, or other party to the transaction.
                                                                                    </label>
                                                                                </div>
                                                                            )}
                                                                        />
                                                                        <h6 className='my-3 font-semibold text-gray-900 text-start'>Gross Monthly Income (per month)</h6>
                                                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Base</label>
                                                                                <InputText type='number' {...register2("base")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Overtime</label>
                                                                                <InputText type='number' {...register2("overtime")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Bonus</label>
                                                                                <InputText type='number' {...register2("bonus")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Comission</label>
                                                                                <InputText type='number' {...register2("comission")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Other</label>
                                                                                <InputText type='number' {...register2("other")} className='w-full' />
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className='block mb-2 text-start'>Total Income per month</label>
                                                                                <InputText type='number' {...register2("totalIncome")} className='w-full' value={totalIncome} readOnly />
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                (watch2('employment_status') === 'Employed' || watch2('employment_status') === 'Self-Employed' || watch2('employment_status') === 'Other') && (
                                                                    <Controller
                                                                        name="automatically_verify_income"
                                                                        control={control2}
                                                                        defaultValue={false}
                                                                        render={({ field }) => (
                                                                            <div className="flex align-items-start mb-4">
                                                                                <Checkbox
                                                                                    inputId="automatically_verify_income"
                                                                                    checked={field.value}
                                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                                />
                                                                                <label htmlFor="automatically_verify_income" className="ml-2 text-start">
                                                                                    Automatically verify income with my employer
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
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
                                    data.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add new employer</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="employment_status" header="Status"></Column>
                                                <Column field="employer_name" header="Name"></Column>
                                                <Column field="street_address" header="Address"></Column>
                                                <Column field="phone_number" header="Phone"></Column>
                                                <Column field="industry" header="Industry"></Column>
                                                <Column field="position" header="Position"></Column>
                                                <Column field="total" header="Total Income"></Column>
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
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(formData.propertyOccupience === 'Yes' ? step - 1 : step - 2)}>Back</button>
                        <button className='btn-dark' type='button' onClick={() => { setStep(step + 1) }}>Next</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StepSixteen;