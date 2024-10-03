import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getPersonalInfo } from '../../utils/api';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';

const StepEight = ({formData, setFormData, step, setStep}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('accessToken')

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getPersonalInfo(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setShow(true)
                    setFormData({
                        ...formData,
                        personal_info_id: res.data.data[0]?.id,
                        dateOfBirth: new Date(res.data.data[0]?.date_of_birth),
                        itin1: res.data.data[0]?.security_number.slice(0, 3),
                        itin2: res.data.data[0]?.security_number.slice(3, 5),
                        itin3: res.data.data[0]?.security_number.slice(5),
                        citizenship: res.data.data[0]?.citizen_status
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

    return (<>
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
                            <h1 className='text-900 text-lg text-start md:text-2xl'>Personal Information</h1>
                            <BiEdit onClick={() => setShow(false)} className='link text-xl cursor-pointer' />
                        </div>
                        <div className='grid grid-cols-2 max-w-full m-auto gap-3 my-3'>
                                <div className='info-div'>
                                    <h6>Date of Birth</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{new Date(data[0]?.date_of_birth).toLocaleDateString()}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Social Security Number</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.security_number}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Citizenship Status</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6 className='capitalize'>{data[0]?.citizen_status}</h6>
                                </div>
                            </div>
                            <button className='btn-dark' type='button' onClick={() => setStep(step + 3)}>Next</button>
                    </div>
                ) : (
                    <form>
                        <div className='w-full md:w-11 lg:w-8 m-auto text-center'>
                            <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Adding <strong className='st-1'>Personal</strong> <strong className='st-2'>Details</strong> </h1>
                            <p className='text-gray-700'>As we continue shaping your mortgage plan, we'd like to know a bit more about you. Your birthdate is an essential piece of information that allows us to provide you with accurate and personalized options.</p>
                            <h4 className='text-900 text-xl md:text-2xl font-semibold mt-6 mb-3'>Your Birth Date</h4>
                            <div className='w-11 md:w-6 m-auto my-5'>
                                <div className=" flex justify-content-center align-items-center m-auto">
                                    <Calendar placeholder='Your date of birth' className='w-full' value={formData.dateOfBirth} 
                                        onChange={(e)=> setFormData({...formData, dateOfBirth: e.value})} />
                                </div>
                                <span className='block text-start mt-3'>We use your birthdate to verify your identity.</span>
                            </div>
                            <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                <button className='btn-outline-dark' type='button' onClick={()=> {formData.coBorrower === 'Yes' ? setStep(step-1) : setStep(step-2)}}>Back</button>
                                <button className='btn-dark' type='submit' disabled={formData.dateOfBirth ? false : true} onClick={()=> setStep(step+1)}>Next</button>
                            </div>
                        </div>
                    </form>

                )
            )
        }
    </>)
}

export default StepEight;