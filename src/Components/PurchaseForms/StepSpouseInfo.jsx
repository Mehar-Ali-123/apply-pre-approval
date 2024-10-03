import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { InputMask } from 'primereact/inputmask';
import { updateMartialStatus } from '../../utils/api';
import axios from 'axios';
import { useSelector } from 'react-redux';

const StepSpouseInfo = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);    
    const { user } = useSelector((state)=> state.auth);
    const { handleSubmit, formState: { errors }, register } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                id: formData.loanId,
                spouse_first_name: data.spouseFirstName, spouse_last_name: data.spouseLastName,
                spouse_phone: data.spousePhone, spouse_email: data.spouseEmail
            }
            const loanData = {
                loan_number: formData.loan_number, loan_type: formData.loanType, client_id: user.user_id
            }
            const res = await axios.patch(updateMartialStatus, { data: dataObj, senderName: user.first_name, loanData: loanData });
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
                <h1 className='text-900 text-2xl md:text-4xl'>Provide Your Marital Status</h1>
                <p className='mt-3 text-gray-500'>If you're applying with another person, they'll become a co-borrower on this loan. Co-borrowers are equally responsible for honoring the loan agreement. Their income, assets, liabilities and credit history will also be considered. If you choose to add a co-borrower later, your credit report will be pulled again when the co-borrower's credit is pulled. No non-owner or non-occupant co-borrowers allowed for qualifying purposes.</p>
                <h4 className='text-900 text-xl md:text-2xl font-semibold mt-4 mb-4'> Spouse's Information</h4>
                <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='my-4'>
                        <label className='block mb-2 text-start'>First Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("spouseFirstName", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                        </span>
                        {errors?.spouseFirstName && <span className='text-red-600 text-start block mt-2'>{errors?.spouseFirstName?.message}</span>}
                    </div>
                    <div className='my-4'>
                        <label className='block mb-2 text-start'>Last Name</label>
                        <span className="p-input-icon-left w-full">
                            <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("spouseLastName", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your middle name' />
                        </span>
                        {errors?.spouseLastName && <span className='text-red-600 text-start block mt-2'>{errors?.spouseLastName?.message}</span>}
                    </div>
                    <div className='my-4'>
                        <label className='block mb-2 text-start'>Email</label>
                        <span className="p-input-icon-left w-full">
                            <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputText {...register("spouseEmail", {
                                required: 'Email Address is required', pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid Email Address',
                                },
                            })} className='w-full' placeholder='Enter email' />
                        </span>
                        {errors?.spouseEmail && <span className='text-red-600 text-start block mt-2'>{errors?.spouseEmail?.message}</span>}
                    </div>
                    <div className='my-4'>
                        <label className='block mb-2 text-start'>Phone Number</label>
                        <span className="p-input-icon-left w-full">
                            <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                            <InputMask {...register("spousePhone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                        </span>
                        {errors?.spousePhone && <span className='text-red-600 text-start block mt-2'>{errors?.spousePhone?.message}</span>}
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 2)}>Back</button>
                        <button className='btn-dark' type='submit'>
                            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepSpouseInfo;