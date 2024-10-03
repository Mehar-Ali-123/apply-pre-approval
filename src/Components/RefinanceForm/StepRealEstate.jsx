import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { InputMask } from 'primereact/inputmask';
import {HiOutlineBriefcase} from 'react-icons/hi'

const StepRealEstate = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });

    const onSubmit = async (data) => {
        setStep(step + 1);
        setFormData(data)
    }
    return (
        <div className='complete-form'>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Provide Your Information</h1>
                <p className='text-gray-700'>These questions will help us verify your identity, check your credit score and complete your application. We're asking for this information now so that we can offer you personalized results sooner.</p>
                <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Realtor First Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("realtorFirstName", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                        </span>
                        {errors?.realtorFirstName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorFirstName?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Realtor Last Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("realtorLastName", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your last name' />
                        </span>
                        {errors?.realtorLastName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorLastName?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Real Estate Agent Company</label>
                        <span className="p-input-icon-left w-full">
                            <HiOutlineBriefcase style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("realtorCompanyName", { required: 'Company Name is required' })} className='w-full' placeholder='Enter your company name' />
                        </span>
                        {errors?.realtorCompanyName && <span className='text-red-600 text-start block mt-2'>{errors?.realtorCompanyName?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Real Estate Agent Phone</label>
                        <span className="p-input-icon-left w-full">
                            <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputMask {...register("realtorPhone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(000)-000-0000' />
                        </span>
                        {errors?.realtorPhone && <span className='text-red-600 text-start block mt-2'>{errors?.realtorPhone?.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-start'>Real Estate Agent Email</label>
                        <span className="p-input-icon-left w-full">
                            <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("realtorEmail", {
                                required: 'Email Address is required', pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid Email Address',
                                },
                            })} className='w-full' placeholder='Enter email' />
                        </span>
                        {errors?.realtorEmail && <span className='text-red-600 text-start block mt-2'>{errors?.realtorEmail?.message}</span>}
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='submit'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepRealEstate;