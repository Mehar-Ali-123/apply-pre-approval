import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { ownership1, ownership2, ownership3 } from '../../assets';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addRealEstate, deleteRealEstate, getRealEstate, updateLoan, updateRealEstate } from '../../utils/api';
import {RxCross2} from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import AddressInput from '../common/AddressInput';
import PopupModal from '../common/PopupModal';

const StepEighteen = ({ formData, setFormData, step, setStep }) => {
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
    const [state, setState] = useState(formData.property_status);
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')

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
    ];
    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getRealEstate(formData.loanId);
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
            const link = deleteRealEstate(rowData.real_estate_id);
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
                loan_application_id: formData.loanId, street_address: data.street_address.name,
                property_status: data.property_status, owned_by: data.owned_by, 
                intended_occupancy: data.intended_occupancy, current_occupancy: data.current_occupancy,
                property_type: data.property_type, market_value: data.market_value, 
                monthly_rental_income: data.monthly_rental_income, monthly_expense: data.monthly_expense
            }
            const res = await axios.post(addRealEstate, { data: dataObj }, { headers: {
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
                id: editedData?.real_estate_id, street_address: data.street_address.name,
                property_status: data.property_status, owned_by: data.owned_by, 
                intended_occupancy: data.intended_occupancy, current_occupancy: data.current_occupancy,
                property_type: data.property_type, market_value: data.market_value, 
                monthly_rental_income: data.monthly_rental_income, monthly_expense: data.monthly_expense
            }
            const res = await axios.patch(updateRealEstate, { ...dataObj }, { headers: {
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
            <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Cataloging Your <strong className='st-1'>Real Estate</strong> <strong className='st-2'>Portfolio</strong></h1>
                <p className='text-gray-700'>Properties you currently own can influence your new mortgage application. Detailing your real estate portfolio gives us a fuller understanding of your assets and commitments, ensuring tailored mortgage advice.</p>
                <div className='mt-5'>
                    <div className='inner-forms'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start p-3 md:text-xl'>Your Real Estate Owned</h1>
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
                                                    <label className='block mb-2 text-start'>Property Address</label>
                                                    <AddressInput control={control} placeholder='Street Address' name='street_address' />
                                                    {/* <InputText {...register("street_address", { required: 'Street address is required' })} className='w-full' placeholder='Street address' /> */}
                                                    {errors?.street_address && <span className='text-red-600 text-start block mt-2'>{errors?.street_address?.message}</span>}
                                                </div>
                                                <h6 className='text-start mb-2 mt-4 text-lg font-semibold'>Property Status</h6>
                                                <div className="flex justify-start items-center gap-4 m-auto max-w-full animate">
                                                    {
                                                        ownership.map((data, index) => (
                                                            <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, property_status: data.name }) }}>
                                                                <Card className={`cursor-pointer h-8rem py-3 ${state === data.name ? 'active' : 'text-900'}`}>
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
                                                        <InputText {...register("owned_by", {
                                                            required: 'Property Owner is required'
                                                        })} className='w-full' placeholder='Owned by' />
                                                        {errors?.owned_by && <span className='text-red-600 text-start block mt-2'>{errors?.owned_by?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Intended Occupancy</label>
                                                        <Controller
                                                            name="intended_occupancy"
                                                            {...register('intended_occupancy')}
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
                                                            name="current_occupancy"
                                                            {...register('current_occupancy')}
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
                                                            name="property_type"
                                                            {...register('property_type')}
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
                                                        <Controller
                                                            name="market_value"
                                                            {...register('market_value')}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' />
                                                            )}
                                                        />
                                                        {errors?.market_value && <span className='text-red-600 text-start block mt-2'>{errors?.market_value?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Rental Income</label>
                                                        <Controller
                                                            name="monthly_rental_income"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' />
                                                            )}
                                                        />
                                                        {errors?.monthly_rental_income && <span className='text-red-600 text-start block mt-2'>{errors?.monthly_rental_income?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='block mb-2 text-start'>Monthly Expenses (if not included in monthly mortgage payment)</label>
                                                    <InputText {...register("monthly_expense")}
                                                        className='w-full' placeholder='Taxes...etc' />
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
                                                    <label className='block mb-2 text-start'>Property Address</label>
                                                    <AddressInput control={control2} placeholder='Street Address' name='street_address' />
                                                    {/* <InputText {...register2("street_address", { required: 'Street address is required' })} className='w-full' placeholder='Street address' /> */}
                                                    {errors2?.street_address && <span className='text-red-600 text-start block mt-2'>{errors2?.street_address?.message}</span>}
                                                </div>
                                                <h6 className='text-start mb-2 mt-4 text-lg font-semibold'>Property Status</h6>
                                                <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-0 gap-2 m-auto max-w-full animate">
                                                    {
                                                        ownership.map((data, index) => (
                                                            <div key={index} onClick={() => { setState(data.name); setFormData({ ...formData, property_status: data.name }) }} className={`xs:col-12 sm:col-12 md:col-6`}>
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
                                                        <InputText {...register2("owned_by", {
                                                            required: 'Property Owner is required'
                                                        })} className='w-full' placeholder='Owned by' />
                                                        {errors2?.owned_by && <span className='text-red-600 text-start block mt-2'>{errors2?.owned_by?.message}</span>}
                                                    </div>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Intended Occupancy</label>
                                                        <Controller
                                                            name="intended_occupancy"
                                                            {...register2('intended_occupancy')}
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
                                                            name="current_occupancy"
                                                            {...register2('current_occupancy')}
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
                                                            name="property_type"
                                                            {...register2('property_type')}
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
                                                        <Controller
                                                            name="market_value"
                                                            {...register2('market_value')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' />
                                                            )}
                                                        />
                                                        {errors2?.market_value && <span className='text-red-600 text-start block mt-2'>{errors2?.market_value?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Rental Income</label>
                                                        <Controller
                                                            name="monthly_rental_income"
                                                            {...register2('monthly_rental_income')}
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' />
                                                            )}
                                                        />
                                                        {errors2?.monthly_rental_income && <span className='text-red-600 text-start block mt-2'>{errors2?.monthly_rental_income?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='block mb-2 text-start'>Monthly Expenses (if not included in monthly mortgage payment)</label>
                                                    <InputText {...register2("monthly_expense")}
                                                        className='w-full' placeholder='Taxes...etc' />
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
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add New Real Estate Agent</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="street_address" header="Address"></Column>
                                                <Column field="property_status" header="Status"></Column>
                                                <Column field="current_occupancy" header="Current Occupancy"></Column>
                                                <Column field="intended_occupancy" header="Intended Occupancy"></Column>
                                                <Column field="property_type" header="Property Type"></Column>
                                                <Column field="market_value" header="Market Value"></Column>
                                                <Column field="monthly_rental_income" header="Monthly Rent"></Column>
                                                <Column field="monthly_expense" header="Monthly Expense"></Column>
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

export default StepEighteen;