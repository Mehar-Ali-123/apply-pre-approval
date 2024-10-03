import React, { useEffect, useState } from 'react'
import { thanks } from '../../assets';
import { useSelector } from 'react-redux'
import { getDoc, updateLoan } from '../../utils/api';
import axios from 'axios';
import Iframe from 'react-iframe';
import {FcFolder} from 'react-icons/fc'
import { ProgressSpinner } from 'primereact/progressspinner';

const StepViewFiles = ({ formData, setFormData, step, setStep }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.auth)
    const [isClicked, setIsClicked] = useState(false);
    const token = localStorage.getItem('accessToken')

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getDoc(formData.loan_number, user.user_id);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                setData([
                    { name: 'User', link: res.data.folderLinks[0]?.user_link },
                    { name: 'Property', link: res.data.folderLinks[0]?.property },
                    { name: 'Disclosure', link: res.data.folderLinks[0]?.disclosure },
                    { name: 'Underwriting Conditions', link: res.data.folderLinks[0]?.underwriting_conditions },
                    { name: 'Closing Documents', link: res.data.folderLinks[0]?.closing_documents },
                ])
                setIsLoading(false);
            } catch (error) {
                setData([])
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
    }, [formData.loan_number, user.user_id]);

    
    const handleSubmit = async () => {
        setIsClicked(true);
        try {
            const data = {
                id: formData.loanId, loan_application_stage: step
            }
            const res = await axios.patch(updateLoan, { ...data }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                setIsClicked(false);
                setStep(step + 1);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }

    return (<>
        {
            isLoading ? (
                <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                    <h6>Loading...</h6>
                </div>
            ) : (
                <div className='w-full md:w-11 lg:w-9 m-auto text-center'>
                    <img className="m-auto h-32" src={thanks} height={10} />
                    <h1 className='st-2 text-2xl md:text-4xl mt-0 mb-6'>Your Loan Application Has Been Received & its under review</h1>
                    {
                        data.length > 0 ? (
                            <div className='py-5 lg:w-10 m-auto'>
                                <div className='flex justify-center flex-wrap items-center gap-4'>
                                    {
                                        data.map((data)=> (
                                                <div className='bg-white w-1/4 cursor-pointer shadow-lg p-3 rounded-lg flex justify-center items-center flex-col'>
                                                    <a target='_blank' href={data.link}>
                                                        <FcFolder className='mb-3 text-6xl m-auto' />
                                                        <h4>{data.name}</h4>
                                                    </a>
                                                </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                                <h6>No folder exists yet.</h6>
                            </div>
                        )
                    }
                    <div className="mt-3 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button disabled={isClicked} className='btn-dark' type='button' onClick={handleSubmit}>
                            { isClicked ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> : 'Next' }
                        </button>
                    </div>
                </div>
            )
        }
    </>)
}

export default StepViewFiles;