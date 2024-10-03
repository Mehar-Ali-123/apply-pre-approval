import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ownership1, ownership2, ownership3 } from '../../assets';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addRealEstate } from '../../utils/api';

const StepEighteen = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });

    const [state, setState] = useState(formData.realEstateStatus);
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const ownership = [
        {
            name: 'Up for Sale',
            img: ownership1
        },
        {
            name: 'Retained',
            img: ownership2
        },
        {
            name: 'Sold',
            img: ownership3
        },
    ]
    const propertyTypes = [
        { value: 'single_family_residence', name: 'Single family residence' },
        { value: 'condominium', name: 'Condominium' },
        { value: 'cooperative', name: 'Cooperative (CO-OP)' },
        { value: '2-4_unit_property', name: '2-4 unit property' },
        { value: 'townhouse', name: 'Townhouse' },
        { value: 'manufactured', name: 'Manufactured' },
        { value: 'land', name: 'Land' },
        { value: 'planned_unit_development', name: 'Planned unit development (PUD)' }
    ]

    const occupanyTypes = [
        { value: 'Primary Residence', name: 'Primary Residence' },
        { value: 'Second Home', name: 'Second Home' },
        { value: 'Investment', name: 'Investment' }
    ]
    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, street_address: data.realEstateAddress,
                city: data.realEstateCity, state: data.realEstateState, zip_code: data.realEstateZip, 
                property_status: data.realEstateStatus, owned_by: data.ownedBy, 
                intended_occupancy: data.intendedOccupancy, current_occupancy: data.currentOccupancy,
                property_type: data.propertyType, market_value: data.realEstateMarketValue, 
                monthly_rental_income: data.realEstateMonthlyRent, monthly_expense: data.realEstateMonthlyExpense
            }
            const res = await axios.post(addRealEstate, { data: dataObj });
            if (res.data.status === true) {
                const newData = {
                    realEstateAddress: data.realEstateAddress,
                    realEstateCity: data.realEstateCity,
                    realEstateState: data.realEstateState,
                    realEstateZip: data.realEstateZip,
                    realEstateStatus: formData.realEstateStatus,
                    ownedBy: data.ownedBy,
                    intendedOccupancy: data.intendedOccupancy,
                    currentOccupancy: data.currentOccupancy,
                    propertyType: data.propertyType,
                    realEstateMonthlyRent: data.realEstateMonthlyRent,
                    realEstateMarketValue: data.realEstateMarketValue,
                    realEstateMonthlyExpense: data.realEstateMonthlyExpense
                }
                const updatedFormData = {
                    ...formData,
                    realEstateInfo: [...formData.realEstateInfo, newData]
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
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Verify Your Real Estate Owned</h1>
                <p className='text-gray-700'>Please review and verify your other income sources. We will use the information you provide to process your loan application.</p>
                <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='inner-forms'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start p-3 md:text-xl'>Your Real Estate Owned</h1>
                            {
                                (formData.realEstateInfo.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside py-6'>
                            {
                                show ? (
                                    <div className='w-full md:w-11 lg:w-10 m-auto'>
                                        <div className='mb-3'>
                                            <label className='block mb-2 text-start'>Property Address</label>
                                            <InputText {...register("realEstateAddress", { required: 'Street address is required' })} className='w-full' placeholder='Street address' />
                                            {errors?.realEstateAddress && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateAddress?.message}</span>}
                                        </div>
                                        <div className='flex gap-3'>
                                            <div className='mb-2'>
                                                <InputText {...register("realEstateCity", { required: 'City is required' })} className='w-full' placeholder='City' />
                                                {errors?.realEstateCity && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateCity?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <InputText {...register("realEstateState", {
                                                    required: 'State is required'
                                                })} className='w-full' placeholder='State' />
                                                {errors?.realEstateState && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateState?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <InputMask {...register("realEstateZip", { required: 'Zip code is required' })} className='w-full' mask='99999' placeholder='Zip' />
                                                {errors?.realEstateZip && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateZip?.message}</span>}
                                            </div>
                                        </div>
                                        <h6 className='text-start mb-2 mt-4 text-lg font-semibold'>Property Status</h6>
                                        <div className="grid grid-cols-3 m-auto max-w-full animate">
                                            {
                                                ownership.map((data, index) => (
                                                    <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, realEstateStatus: data.name }) }} className={`col-12 md:col-6`}>
                                                        <Card className={`cursor-pointer w-10rem h-8rem py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                                            <img className='m-auto' src={data.img} />
                                                            <p className='text-sm font-600 m-0 mt-3'>{data.name}</p>
                                                        </Card>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                            <div className='mb-2 w-full'>
                                                <label className='block mb-2 text-start'>Owned by</label>
                                                <InputText {...register("ownedBy", {
                                                    required: 'Property Owner is required'
                                                })} className='w-full' placeholder='Owned by' />
                                                {errors?.ownedBy && <span className='text-red-600 text-start block mt-2'>{errors?.ownedBy?.message}</span>}
                                            </div>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Intended Occupancy</label>
                                                <Controller
                                                    name="intendedOccupancy"
                                                    {...register('intendedOccupancy')}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Dropdown
                                                            {...field}
                                                            value={field.value || ''}
                                                            optionLabel="name"
                                                            placeholder="Choose"
                                                            options={occupanyTypes}
                                                            className="p-inputtext-lg text-start w-full"
                                                            onChange={(e) => field.onChange(e.value)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Current Occupancy</label>
                                                <Controller
                                                    name="currentOccupancy"
                                                    {...register('currentOccupancy')}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Dropdown
                                                            {...field}
                                                            value={field.value || ''}
                                                            optionLabel="name"
                                                            placeholder="Choose"
                                                            options={occupanyTypes}
                                                            className="p-inputtext-lg text-start w-full"
                                                            onChange={(e) => field.onChange(e.value)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Property Type</label>
                                                <Controller
                                                    name="propertyType"
                                                    {...register('propertyType')}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Dropdown
                                                            {...field}
                                                            value={field.value || ''}
                                                            optionLabel="name"
                                                            placeholder="Choose"
                                                            options={propertyTypes}
                                                            className="p-inputtext-lg text-start w-full"
                                                            onChange={(e) => field.onChange(e.value)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Market Value</label>
                                                <InputText type='number' {...register("realEstateMarketValue", { required: 'Base income is required' })} className='w-full' />
                                                {errors?.realEstateMarketValue && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateMarketValue?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Monthly Rental Income</label>
                                                <InputText type='number' {...register("realEstateMonthlyRent")} className='w-full' />
                                                {errors?.realEstateMonthlyRent && <span className='text-red-600 text-start block mt-2'>{errors?.realEstateMonthlyRent?.message}</span>}
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <label className='block mb-2 text-start'>Monthly Expenses (if not included in monthly mortgage payment)</label>
                                            <InputText {...register("realEstateMonthlyExpense")}
                                                className='w-full' placeholder='Taxes...etc' />
                                        </div>
                                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                            <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                            <button className='btn-primary text-white px-7' type='submit'>
                                                {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    formData.realEstateInfo.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-4 my-0'><AiOutlinePlusCircle /> Add New Real Estate Agent</p>
                                    ) : (
                                        <div className='mx-3'>
                                            <DataTable stripedRows value={formData.realEstateInfo}>
                                                <Column field="realEstateAddress" header="Address"></Column>
                                                <Column field="realEstateStatus" header="Status"></Column>
                                                <Column field="ownedBy" header="Owner"></Column>
                                                <Column field="currentOccupancy" header="Current Occupancy"></Column>
                                                <Column field="intendedOccupancy" header="Intended Occupancy"></Column>
                                                <Column field="propertyType" header="Property Type"></Column>
                                                <Column field="realEstateMarketValue" header="Market Value"></Column>
                                                <Column field="realEstateMonthlyRent" header="Monthly Rent"></Column>
                                                <Column field="realEstateMonthlyExpense" header="Monthly Expense"></Column>
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

export default StepEighteen;