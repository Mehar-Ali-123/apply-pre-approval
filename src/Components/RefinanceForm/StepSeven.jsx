import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { InputMask } from 'primereact/inputmask';
import { addBorrowers } from '../../utils/api';
import axios from 'axios';

const StepSeven = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [isClicked, setIsClicked] = useState(false);

    const martialStatuses = [
        {
            value: 'married',
            name: 'Married'
        },
        {
            value: 'single',
            name: 'Single'
        },
    ]

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId,
                borrower_first_name: data.coBorrowerFirstName, borrower_last_name: data.coBorrowerLastName,
                borrower_phone: data.coBorrowerPhone, borrower_email: data.coBorrowerEmail, 
                borrower_martial_status: data.coBorrowerMartial
            }
            const res = await axios.post(addBorrowers, { data: dataObj });
            if (res.data.status === true) {
                setIsClicked(false);
                setStep(step + 1);
                setFormData(data);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <div className='complete-form'>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Co-Borrower's Information</h1>
                <p className='text-gray-700'>Provide the contact information and marital status of the person you will also be applying with. If the co-borrower is not married to the primary borrower, we will send the borrower an email to login and proceed.</p>
                <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>First Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("coBorrowerFirstName", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                        </span>
                        {errors?.coBorrowerFirstName && <span className='text-red-600 text-start block mt-2'>{errors?.coBorrowerFirstName?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Last Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("coBorrowerLastName", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your last name' />
                        </span>
                        {errors?.coBorrowerLastName && <span className='text-red-600 text-start block mt-2'>{errors?.coBorrowerLastName?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Email</label>
                        <span className="p-input-icon-left w-full">
                            <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("coBorrowerEmail", {
                                required: 'Email Address is required', pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid Email Address',
                                },
                            })} className='w-full' placeholder='Enter email' />
                        </span>
                        {errors?.coBorrowerEmail && <span className='text-red-600 text-start block mt-2'>{errors?.coBorrowerEmail?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Primary Phone</label>
                        <span className="p-input-icon-left w-full">
                            <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputMask {...register("coBorrowerPhone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                        </span>
                        {errors?.coBorrowerPhone && <span className='text-red-600 text-start block mt-2'>{errors?.coBorrowerPhone?.message}</span>}
                    </div>
                    <div className='mb-4 dropdown'>
                        <label className='block mb-2 text-start'>Martial Status</label>
                        <Controller
                            name="coBorrowerMartial"
                            {...register('coBorrowerMartial')}
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    value={field.value || ''}
                                    optionLabel="name"
                                    options={martialStatuses}
                                    placeholder="Select Account"
                                    className="p-inputtext-lg text-start w-full"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                        {errors?.coBorrowerMartial && <span className='text-red-600 text-start block mt-2'>{errors?.coBorrowerMartial?.message}</span>}
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='submit'>
                            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepSeven;