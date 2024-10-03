import React, { useRef, useState } from 'react'
import styles from '../styles/forms.module.css';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import axios from "axios";
import { testSubmit } from '../utils/api'

const TestForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { handleSubmit, formState: { errors }, register, control } = useForm({
    mode: 'onBlur',
  });
  const widgetIframeRef = useRef(null);

  const onSubmit = async (data) => {
    setIsClicked(true);
    try {
      const res = await axios.post(testSubmit, { ...data });
      if (res.data.status === true) {
        toast.success('Email have been sent to your mail address. Click on the link to set new password.')
        setIsClicked(false);
        // submitWidgetForm(data);

      } else {
        toast.error(res.data.message)
        setIsClicked(false);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later');
      setIsClicked(false);
    }
  }
  const submitWidgetForm = (data) => {
    const widgetForm = document.createElement('form');
    widgetForm.action = 'https://api.clixlo.com/widget/form/gXI6I2fe3nn0BMk4fHoS';  // Replace with the correct form submission URL
    widgetForm.method = 'POST';
    
    // Create form fields and set their values
    Object.keys(data).forEach((fieldName) => {
      const inputField = document.createElement('input');
      inputField.type = 'hidden';
      inputField.name = fieldName;
      inputField.value = data[fieldName];
      widgetForm.appendChild(inputField);
    });
  
    // Append the form to the document and submit it
    document.body.appendChild(widgetForm);
    widgetForm.submit();
  
    // Cleanup: Remove the form after submission if desired
    // document.body.removeChild(widgetForm);
  };
  
  return (
    <div className={styles.form}>
      <div className={styles.formDiv}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-7'>
            <label className='block mb-3'>Full Name</label>
            <span className="p-input-icon-left w-full">
              <MdOutlineMail style={{ marginTop: '-15px' }} className='m-0 text-3xl' />
              <InputText {...register("full_name", {
                required: 'Full name is required',
              })} className='w-full' placeholder='Enter full name' />
            </span>
            {errors?.full_name && <span className='text-red-600 mt-3'>{errors?.full_name?.message}</span>}
          </div>
          <div className='mb-7'>
            <label className='block mb-3'>Email</label>
            <span className="p-input-icon-left w-full">
              <MdOutlineMail style={{ marginTop: '-15px' }} className='m-0 text-3xl' />
              <InputText {...register("email", {
                required: 'Email Address is required', pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid Email Address',
                },
              })} className='w-full' placeholder='Enter email' />
            </span>
            {errors?.email && <span className='text-red-600 mt-3'>{errors?.email?.message}</span>}
          </div>
          <div className='mb-7'>
            <label className='block mb-3'>Subject</label>
            <span className="p-input-icon-left w-full">
              <MdOutlineMail style={{ marginTop: '-15px' }} className='m-0 text-3xl' />
              <InputText {...register("organization", {
                required: 'Subject is required'
              })} className='w-full' placeholder='Enter subject' />
            </span>
            {errors?.organization && <span className='text-red-600 mt-3'>{errors?.organization?.message}</span>}
          </div>
          <div className='mb-7'>
            <label className='block mb-3'>Message</label>
            <span className="p-input-icon-left w-full">
              <MdOutlineMail style={{ marginTop: '-15px' }} className='m-0 text-3xl' />
              <InputText {...register("address", {
                required: 'Message is required',
              })} className='w-full' placeholder='Enter message' />
            </span>
            {errors?.address && <span className='text-red-600 mt-3'>{errors?.address?.message}</span>}
          </div>
          <div>
            <button className='btn-primary w-full py-4'>
            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Submit'}</>)}
            </button>
          </div>
        </form>
      </div>
      <iframe
      ref={widgetIframeRef}
        src="https://api.clixlo.com/widget/form/gXI6I2fe3nn0BMk4fHoS"
        style={{width:'100%',height:'100%',border:'none',borderRadius:'4px', display: 'none'}}
        id="inline-gXI6I2fe3nn0BMk4fHoS"
        data-layout={JSON.stringify({ id: 'INLINE' })}
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Contact Form - Sara"
        data-height="573"
        data-layout-iframe-id="inline-gXI6I2fe3nn0BMk4fHoS"
        data-form-id="gXI6I2fe3nn0BMk4fHoS"
        title="Contact Form - Sara"
      >
      </iframe>
    </div>
  )
}

export default TestForm;