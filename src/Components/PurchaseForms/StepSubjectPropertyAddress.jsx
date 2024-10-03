import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddressInput from '../common/AddressInput';
import axios from 'axios';
import { getProperty } from '../../utils/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BiEdit } from 'react-icons/bi';

const StepSubjectPropertyAddress = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, setValue, control } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('accessToken')

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getProperty(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setShow(true)
                    setData(res.data.data);
                    const subjectPropertyStreetAddress = {
                        name: res.data.data[0]?.street_address,
                        value: res.data.data[0]?.street_address
                    }
                    setValue('subjectPropertyStreetAddress', subjectPropertyStreetAddress)
                    setFormData({
                        ...formData,
                        subjectPropertyStreetAddress,
                        subject_property_id: res.data.data[0]?.id,
                        propertyOccupience: res.data.data[0]?.realtor_info,
                        propertyAside: res.data.data[0]?.property_aside,
                        propertyType: res.data.data[0]?.subject_property_type,
                        is_authorized: res.data.data[0]?.is_authorized === 1 ? true : false,
                        credit_report_access: res.data.data[0]?.credit_report_access === 1 ? true : false,
                    })
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

    const onSubmit = async (data) => {
        setStep(step + 1);
        setFormData({...data, subjectPropertyStreetAddress: data.subjectPropertyStreetAddress.name});
    }
    return (
        <div>
            {
                isLoading ? (
                    <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                        <h6>Loading...</h6>
                    </div>
                ) : (
                    show ? (
                        <div className='data-exists'>
                            <div className='heading-data flex justify-between items-center'>
                                <h1 className='text-900 text-lg text-start md:text-2xl'>Subject Property Info</h1>
                                <BiEdit onClick={() => setShow(false)} className='link text-xl cursor-pointer' />
                            </div>
                            <div className='grid grid-cols-2 max-w-full m-auto gap-3 my-3'>
                                <div className='info-div'>
                                    <h6>Subject Property Address</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.street_address}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Expected Occupancy</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.property_aside}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Subject property Type</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6 className='capitalize'>{data[0]?.subject_property_type}</h6>
                                </div>
                            </div>
                            <button className='btn-dark' type='button' onClick={() => setStep(step + 5)}>Next</button>
                        </div>
                    ) : (
                        <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                            <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Address of the <strong className='st-1'>Subject</strong> <strong className='st-2'>Property</strong></h1>
                            <p className='text-gray-700'>As we proceed, we'll dive into the intricate details of the subject property you're either purchasing or refinancing. Commencing with the address of the subject property, a pivotal element for crafting a mortgage solution that aligns perfectly.</p>
                            <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-2'>Address of Subject Property</h4>
                            <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-4' onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-3'>
                                    <AddressInput control={control} placeholder='Street Address' name='subjectPropertyStreetAddress' />
                                    {errors?.subjectPropertyStreetAddress && <span className='text-red-600 text-start block mt-2'>{errors?.subjectPropertyStreetAddress?.message}</span>}
                                </div>
                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                    <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                                    <button className='btn-dark' type='submit'>Next</button>
                                </div>
                            </form>
                        </div>

                    )
                )
            }
        </div>
    )
}

export default StepSubjectPropertyAddress;