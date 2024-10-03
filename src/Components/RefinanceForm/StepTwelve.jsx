import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';

const StepTwelve = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });

    const onSubmit = async (data) => {
        setStep(step + 1);
        setFormData(data);
    }
    return (
        <div>
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Provide Your Information</h1>
                <p className='text-gray-700'>These questions will help us verify your identity, check your credit score and complete your application. We're asking for this information now so that we can offer you personalized results sooner.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-2'>Address of Property</h4>
                <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <InputText {...register("streetAddress", { required: 'Street address is required' })} className='w-full' placeholder='Street address' />
                        {errors?.streetAddress && <span className='text-red-600 text-start block mt-2'>{errors?.streetAddress?.message}</span>}
                    </div>
                    <div className='flex gap-3'>
                        <div className='mb-2'>

                            <InputText {...register("city", { required: 'City is required' })} className='w-full' placeholder='City' />
                            {errors?.city && <span className='text-red-600 text-start block mt-2'>{errors?.city?.message}</span>}
                        </div>
                        <div className='mb-2'>

                            <InputText {...register("state", {
                                required: 'State is required'
                            })} className='w-full' placeholder='State' />
                            {errors?.state && <span className='text-red-600 text-start block mt-2'>{errors?.state?.message}</span>}
                        </div>
                        <div className='mb-2'>

                            <InputMask {...register("zip", { required: 'Zip code is required' })} className='w-full' mask='99999' placeholder='Zip' />
                            {errors?.zip && <span className='text-red-600 text-start block mt-2'>{errors?.zip?.message}</span>}
                        </div>
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

export default StepTwelve;