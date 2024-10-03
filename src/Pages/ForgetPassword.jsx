import React, { useState } from 'react'
import styles from '../styles/forms.module.css';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import axios from "axios";
import { forgetPassword } from '../utils/api'
import Navbar from '../Components/common/Navbar';
import { useSelector } from 'react-redux';

const ForgetPassword = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { handleSubmit, formState: { errors }, register, control } = useForm({
    mode: 'onBlur',
  });
  const { company } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    setIsClicked(true);
    try {
      const newData = {...data, company_id: company[0]?.id};
      const res = await axios.post(forgetPassword, { ...newData });
      if (res.data.success === true) {
        toast.success(res.data.message)
        setIsClicked(false);
      } else {
        toast.success(res.data.message)
        setIsClicked(false);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later');
      setIsClicked(false);
    }
  } 
  return (<>
    <Navbar />
    <div className={styles.form}>
      <div className={styles.formDiv}>
        <h1 className='text-center mb-2'>Regain <strong className='st-1'>Access to Your Account</strong> with a <strong className='st-2'>Password Reset</strong></h1>
        <p className='mt-2 mb-5 text-gray-700 text-center'>No need to stress if you've forgotten your password. We're here to help you regain access. By initiating a password reset, you'll be back on track to managing your mortgage journey in no time.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <label className='block mb-3'>Email</label>
            <span className="p-input-icon-left w-full">
              <MdOutlineMail style={{ marginTop: '-15px' }} className='text-3xl mr-3' />
              <InputText {...register("email", {
                required: 'Email Address is required', pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid Email Address',
                },
              })} className='w-full' placeholder='Enter email' />
            </span>
            {errors?.email && <span className='text-red-600 mt-2'>{errors?.email?.message}</span>}
          </div>
          <div>
            <button className='btn-primary w-full py-3'>
            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Send me the Password Rest link'}</>)}
            </button>
          </div>
          <div className='text-center mt-4'>
            <p><Link to='/login' className='link'>Back to login</Link></p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  </>)
}

export default ForgetPassword;