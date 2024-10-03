import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import { InputMask } from 'primereact/inputmask';
import { addBorrowers, deleteBorrowers, getBorrowers, updateCoBorrower, updateLoan } from '../../utils/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import { FaRegHandshake } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import PopupModal from '../common/PopupModal';

const StepSeven = ({ formData, setFormData, step, setStep }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur'
    });
    const { handleSubmit: handleSubmit2, formState: { errors: errors2 }, setValue, register: register2, control: control2, reset: reset2 } = useForm({
        mode: 'onBlur'
    });
    const [isClicked, setIsClicked] = useState(false);
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')
    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getBorrowers(formData.loan_number);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data?.length > 0) {
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
    }, [formData.loan_number]);

    useEffect(() => {
        if (Object.values(editedData).length > 0) {
            Object.keys(editedData).forEach(fieldName => {
                setValue(fieldName, editedData[fieldName]);
            });
        }
    }, [editedData, setValue]);

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
    const handleDelete = async (rowData) => {
        try {
            const link = deleteBorrowers(rowData.id, rowData.loan_application_id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
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
                loan_application_id: formData.loanId,
                borrower_first_name: data.borrower_first_name, borrower_last_name: data.borrower_last_name,
                borrower_phone: data.borrower_phone, borrower_email: data.borrower_email,
                borrower_martial_status: data.borrower_martial_status,
                relationship_to_primary_borrower: data.relationship_to_primary_borrower,
                is_authorized: data.is_authorized
            }
            const loanData = {
                loan_number: formData.loan_number, loan_type: formData.loanType, client_id: user.user_id,
                purchase_price: formData.purchasePrice, down_payment_percentage: formData.downPayment,
                payment_source: formData.downPaymentSource, is_veteran: formData.isVeteran,
                other_mortgage_loans: formData.mortgageLoans
            }
            const res = await axios.post(addBorrowers, { data: dataObj, senderName: user.first_name, loanData: loanData }, { headers: {
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
            let dataObj;
            if(editedData.borrower_email !== data.borrower_email) {
                dataObj = {
                    id: editedData.id,
                    borrower_first_name: data.borrower_first_name, borrower_last_name: data.borrower_last_name,
                    borrower_phone: data.borrower_phone, borrower_email: data.borrower_email, prev_email: editedData.borrower_email,
                    borrower_martial_status: data.borrower_martial_status, relationship_to_primary_borrower: data.relationship_to_primary_borrower
                }
            } else {
                dataObj = {
                    id: editedData.id,
                    borrower_first_name: data.borrower_first_name, borrower_last_name: data.borrower_last_name,
                    borrower_phone: data.borrower_phone,
                    borrower_martial_status: data.borrower_martial_status, relationship_to_primary_borrower: data.relationship_to_primary_borrower
                }
            }
            const res = await axios.patch(updateCoBorrower, { ...dataObj }, { headers: {
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
            <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
            <h1 className='text-900 text-2xl md:text-4xl mb-2'>Sharing <strong className='st-1'>Information</strong> about Your <strong className='st-2'>Co-Borrower</strong></h1>
                <p className='text-gray-700 mt-3'>Including a co-borrower can have significant implications on the loan application, potentially increasing your borrowing power and affecting loan terms. Let's ensure we have all the details right.</p>
                <div>
                    <div className='inner-forms w-full md:w-full m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Co- Borrower(s) Information</h1>
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
                                            <div className='w-full md:w-11 lg:w-11 m-auto'>

                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>First Name</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register("borrower_first_name", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                                                    </span>
                                                    {errors?.borrower_first_name && <span className='text-red-600 text-start block mt-2'>{errors?.borrower_first_name?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Last Name</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register("borrower_last_name", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your last name' />
                                                    </span>
                                                    {errors?.borrower_last_name && <span className='text-red-600 text-start block mt-2'>{errors?.borrower_last_name?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Email</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register("borrower_email", {
                                                            required: 'Email Address is required', pattern: {
                                                                value: /\S+@\S+\.\S+/,
                                                                message: 'Invalid Email Address',
                                                            },
                                                        })} className='w-full' placeholder='Enter email' />
                                                    </span>
                                                    {errors?.borrower_email && <span className='text-red-600 text-start block mt-2'>{errors?.borrower_email?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Primary Phone</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputMask {...register("borrower_phone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                                                    </span>
                                                    {errors?.borrower_phone && <span className='text-red-600 text-start block mt-2'>{errors?.borrower_phone?.message}</span>}
                                                </div>
                                                <div className='mb-2 dropdown'>
                                                    <label className='block mb-2 text-start'>Martial Status</label>
                                                    <Controller
                                                        name="borrower_martial_status"
                                                        {...register('borrower_martial_status')}
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
                                                    {errors?.borrower_martial_status && <span className='text-red-600 text-start block mt-2'>{errors?.borrower_martial_status?.message}</span>}
                                                </div>
                                                <div className='my-4'>
                                                    <label className='block mb-2 text-start'>Relationship to primary borrower</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <FaRegHandshake style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register("relationship_to_primary_borrower", { required: 'Please enter your relationship to primary borrower.' })} className='w-full' placeholder='Enter here' />
                                                    </span>
                                                    {errors?.relationship_to_primary_borrower && <span className='text-red-600 text-start block mt-2'>{errors?.relationship_to_primary_borrower?.message}</span>}
                                                </div>
                                                <div className="flex">
                                                    <Controller
                                                        name="is_authorized"
                                                        control={control}
                                                        defaultValue={false}
                                                        render={({ field }) => (
                                                            <div className="flex align-items-center">
                                                                <Checkbox
                                                                    inputId="ingredient1"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                />
                                                                <label htmlFor="ingredient1" className="ml-2">
                                                                I understand and authorize that loan information will be shared with co-borrower(s)
                                                                </label>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                                    <button className='btn-dark px-7' style={{color: 'rgba(233, 136, 98, 1)'}} type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSubmit2(onUpdate)}>
                                            <div className='w-full md:w-11 lg:w-11 m-auto'>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>First Name</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register2("borrower_first_name", { required: 'First Name is required' })} className='w-full' placeholder='Enter your first name' />
                                                    </span>
                                                    {errors2?.borrower_first_name && <span className='text-red-600 text-start block mt-2'>{errors2?.borrower_first_name?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Last Name</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BiUserCircle style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register2("borrower_last_name", { required: 'Last Name is required' })} className='w-full' placeholder='Enter your last name' />
                                                    </span>
                                                    {errors2?.borrower_last_name && <span className='text-red-600 text-start block mt-2'>{errors2?.borrower_last_name?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Email</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <MdOutlineMail style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register2("borrower_email", {
                                                            required: 'Email Address is required', pattern: {
                                                                value: /\S+@\S+\.\S+/,
                                                                message: 'Invalid Email Address',
                                                            },
                                                        })} className='w-full' placeholder='Enter email' />
                                                    </span>
                                                    {errors2?.borrower_email && <span className='text-red-600 text-start block mt-2'>{errors2?.borrower_email?.message}</span>}
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block mb-2 text-start'>Primary Phone</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <BsTelephone style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputMask {...register2("borrower_phone", { required: 'Phone Number is required' })} className='w-full' mask='(999)-999-9999' placeholder='(555)-555-5555' />
                                                    </span>
                                                    {errors2?.borrower_phone && <span className='text-red-600 text-start block mt-2'>{errors2?.borrower_phone?.message}</span>}
                                                </div>
                                                <div className='mb-2 dropdown'>
                                                    <label className='block mb-2 text-start'>Martial Status</label>
                                                    <Controller
                                                        name="borrower_martial_status"
                                                        {...register2('borrower_martial_status')}
                                                        control={control2}
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
                                                    {errors2?.borrower_martial_status && <span className='text-red-600 text-start block mt-2'>{errors2?.borrower_martial_status?.message}</span>}
                                                </div>
                                                <div className='my-4'>
                                                    <label className='block mb-2 text-start'>Relationship to primary borrower</label>
                                                    <span className="p-input-icon-left w-full">
                                                        <AiOutlineHeart style={{ marginTop: '-11px' }} className=' text-xl' />
                                                        <InputText {...register2("relationship_to_primary_borrower", { required: 'Please enter your relationship to primary borrower.' })} className='w-full' placeholder='Enter here' />
                                                    </span>
                                                    {errors2?.relationship_to_primary_borrower && <span className='text-red-600 text-start block mt-2'>{errors2?.relationship_to_primary_borrower?.message}</span>}
                                                </div>
                                                <div className="flex">
                                                    <Controller
                                                        name="is_authorized"
                                                        control={control2}
                                                        defaultValue={false}
                                                        render={({ field }) => (
                                                            <div className="flex align-items-center">
                                                                <Checkbox
                                                                    inputId="ingredient1"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.checked)}
                                                                />
                                                                <label htmlFor="ingredient1" className="ml-2">
                                                                    I understand and authorize that loan information will be shared with co-borrower(s)
                                                                </label>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setIsEditClicked(false)}>Cancel</button>
                                                    <button className='btn-dark px-7' style={{color: 'rgba(233, 136, 98, 1)'}} type='submit'>
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
                                    ) : (
                                        data.length === 0 ? (
                                            <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add New Co-Borrower</p>
                                        ) : (
                                            <div>
                                                <DataTable stripedRows value={data}>
                                                    <Column field="borrower_first_name" header="Name"></Column>
                                                    <Column field="borrower_phone" header="Phone"></Column>
                                                    <Column field="borrower_email" header="Email"></Column>
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

export default StepSeven;