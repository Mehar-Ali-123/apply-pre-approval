import React, { useEffect, useState } from 'react';
import { homeOutline, refinance } from '../../assets';
import { Card } from 'primereact/card';
import { getApplication } from '../../utils/api';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

const StepOne = ({ formData, setFormData, step, setStep }) => {
    const [state, setState] = useState(formData.loanType);
    const options = [
        {
            name: 'Purchase',
            img: homeOutline,
            text: 'I’m buying a home and need a mortgage'
        },
        {
            name: 'Refinance',
            img: refinance,
            text: 'I want to refinance my existing mortgage'
        }
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('accessToken')

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getApplication(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setShow(true);
                    setFormData({
                        ...formData,
                        loanType: res.data.data[0]?.loan_type,
                        purchasePrice: res.data.data[0]?.purchase_price,
                        downPayment: res.data.data[0]?.down_payment_percentage,
                        downPaymentSource: res.data.data[0]?.payment_source,
                        martialStatus: res.data.data[0]?.martial_status,
                        isVeteran: res.data.data[0]?.is_veteran,
                        mortgageLoans: res.data.data[0]?.other_mortgage_loans
                    })
                    setIsLoading(false);
                } else {
                    // setData([])
                    setIsLoading(false);
                }
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

    return (
        <div className='py-3'>
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
                                <h1 className='text-900 text-lg text-start md:text-2xl'>General Information</h1>
                                <BiEdit onClick={() => setShow(false)} className='link text-xl cursor-pointer' />
                            </div>
                            <div className='grid grid-cols-2 max-w-full m-auto gap-3 my-3'>
                                <div className='info-div'>
                                    <h6>Purchase Price</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.purchase_price}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Down Payment</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.down_payment_percentage} %</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Source of down payment</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6 className='capitalize'>{data[0]?.payment_source.replace('_', ' ')}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Martial Status</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.martial_status}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Unmarried Adendum</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.unmarried_addendum != '0' ? data[0]?.unmarried_addendum : '-'}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Relation State</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.relationship_state != '0' ? data[0]?.relationship_state : '-'}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Relation Type</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.relationship_type ? data[0]?.relationship_type : '-'}</h6>
                                </div>
                                <div className='info-div'>
                                    <h6>Relation Description</h6>
                                </div>
                                <div className='heading-data'>
                                    <h6>{data[0]?.relationship_description != '0' ? data[0]?.relationship_description : '-'}</h6>
                                </div>
                            </div>
                            <button className='btn-dark' type='button' disabled={formData.loanType !== '' ? false : true} onClick={() => setStep(step + 6)}>Next</button>
                        </div>
                    ) : (
                        <div className='w-full md:w-11 lg:w-10 m-auto text-center'>
                            <h1 className='text-900 text-2xl md:text-4xl mb-2'>Let's <strong className='st-1'>Customize</strong> Your <strong className='st-2'>Loan Application</strong></h1>
                            <p className='text-gray-700'>As we begin your loan application journey, we'd like to understand your needs better. Are you looking for a loan for a property purchase or to refinance an existing one? Your response will help us create a mortgage solution that aligns with your goals.</p>
                            <h4 className='text-900 text-xl md:text-2xl font-semibold mt-7 mb-4'>What type of loan are you seeking?</h4>
                            <div className="flex lg:flex-row flex-col w-full lg:w-27rem m-auto max-w-full animate">
                                {
                                    options.map((data, index) => (
                                        <div key={index} onClick={() => { setState(data.name); setTimeout(() => { setStep(step + 1) }, 0); setFormData({ ...formData, loanType: data.name }) }} className={`col-12 col-md-6`}>
                                            <Card className={`cursor-pointer py-3 ${state === data.name ? 'active' : 'text-900'}`}>
                                                <img className='m-auto' src={data.img} />
                                                <p className='text-sm font-600 m-0 mt-3'>Home {data.name}</p>
                                                <p className='text-xs text-gray-600 m-0 mt-2'>{data.text}</p>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                <button className='btn-dark' type='button' disabled={formData.loanType !== '' ? false : true} onClick={() => setStep(step + 1)}>Next</button>
                            </div>
                        </div>
                    )

                )
            }
        </div>
    )
}

export default StepOne