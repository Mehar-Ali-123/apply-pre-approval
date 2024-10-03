import React, { useEffect, useState } from 'react'
import styles from '../styles/forms.module.css';
import { InputText } from 'primereact/inputtext';
import PasswordInput from '../Components/common/PasswordInput';
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { login } from "../Features/authSlice";
import { MdOutlineMail } from 'react-icons/md';
import PopupModal from '../Components/common/PopupModal';
import Navbar from '../Components/common/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { user, error, message, company } = useSelector((state) => state.auth)
  const { handleSubmit, formState: { errors }, register, control } = useForm({
    mode: 'onBlur',
  });
  const [resMessage, setResMessage] = useState('')
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error && isClicked) {
      setIsClicked(false);
      setResMessage(message);
      setModal(true)
    }
    if (user) {
      setIsClicked(false);
      setTimeout(() => navigate('/'), 1500)
      toast.success('Logged in successfully')
    }
  }, [user, error, message, navigate, isClicked])

  const onSubmit = async (data) => {
    setIsClicked(true);
    try {
      const newData = {...data, company_id: company[0]?.id, user_type: "client"};
      const res = await dispatch(login(newData));
      if (res?.payload?.success === true) {
        toast.success('Logged in successfully')
        navigate('/dashboard');
      }
      setIsClicked(false);

    } catch (error) {
      setResMessage('Something went wrong. Please try again later');
      setModal(true)
      setIsClicked(false);
    }
  }
  return (<>
    <Navbar />
    <div className={styles.form}>
      <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
      <Toaster />
      <div className={styles.formDiv}>
        <h1 className='text-center mb-2'>Log in to Your Account & <strong className='st-1'>Manage</strong> Your <strong className='st-2'>Mortgage Journey</strong></h1>
        <p className='mt-2 mb-5 text-gray-700 text-center'>Access your account to explore exclusive features. View live pricing, review pre-approvals, and conveniently manage your submitted loan applications. Your personalized mortgage experience awaits within your account.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block mb-2'>Email</label>
            <span className="p-input-icon-left w-full">
            <MdOutlineMail style={{ marginTop: '-12px' }} className=' text-2xl' />
              <InputText {...register("email", {
                required: 'Email Address is required', pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid Email Address',
                },
              })} className='w-full' placeholder='Enter email' />
            </span>
            {errors?.email && <span className='text-red-600 mt-2'>{errors?.email?.message}</span>}
          </div>
          <div className='mb-5'>
            <PasswordInput
              control={control}
              feedback={false}
              name="password"
              label="Password"
              placeholder='Enter Password'
              rules={{ required: "Password is required" }}
            />
          </div>
          <div>
            <button className='btn-primary w-full py-3'>
              {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Login'}</>)}
            </button>
          </div>
          <div className='text-center mt-4'>
            <p className='mb-2'><Link to='/forget-password' className='link'>Forgot Password?</Link></p>
            <p>Don’t have an account? <Link to='/register' className='link'>Create one</Link></p>
          </div>
        </form>
      </div>
    </div>
  </>)
}

export default Login;