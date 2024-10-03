import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const StepSubmit = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        setIsClicked(true);
        try {
            setTimeout(() => setIsClicked(false), 500);
            navigate('/thank-you');
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <div>
            <div className='w-full md:w-11 lg:w-full m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0'>Verify Your Application</h1>
                <p className='mt-2 text-gray-700'>Once ready, click SUBMIT APPLICATION at the bottom of the page.</p>
                <form>
                    <div className='inner-forms w-full md:w-full m-auto my-4'>
                        <div className='heading heading-2 flex justify-between items-center p-3'>
                            <h1 className='text-lg text-start md:text-xl'>Loan Summary</h1>
                        </div>
                        <div className='form-inside px-3 py-4'>
                            <div className='flex justify-between items-center mb-3'>
                                <div className='flex gap-4'>
                                    <p>Borrower:</p>
                                    <h6 className='font-semibold'>Usama</h6>
                                </div>
                                <div className='flex gap-4'>
                                    <p>Occupancy:</p>
                                    <h6 className='font-semibold'>Primary</h6>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-3'>
                                <div className='flex gap-4'>
                                    <p>Subject Address:</p>
                                    <h6 className='font-semibold'>1899 Finwood Road New Brunswick, NJ 08901</h6>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-3'>
                                <div className='flex gap-4'>
                                    <p>Purpose:</p>
                                    <h6 className='font-semibold'>Purchase</h6>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-3'>
                                <div className='flex gap-4'>
                                    <p>Sales Price:</p>
                                    <h6 className='font-semibold'>$2,500,000.00</h6>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-3'>
                                <div className='flex gap-4'>
                                    <p>Loan Amount:</p>
                                    <h6 className='font-semibold'>$2,497,500.00</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='inner-forms w-full md:w-full m-auto my-4'>
                        <div className='heading heading-2 flex justify-between items-center p-3'>
                            <h1 className='text-lg text-start md:text-xl'>Debt to Income Ratio: 0.00%</h1>
                        </div>
                        <div className='form-inside flex justify-between px-3 py-4'>
                            <div className='mb-3'>
                                <div>
                                    <p className='text-start'>Monthly Debts:</p>
                                    <h6 className='font-semibold text-start my-2'>HOUSING</h6>
                                </div>
                                <hr className='border-gray-950' />
                                <div className='mt-2'>
                                    <p className='text-end'>$0.00</p>
                                </div>
                            </div>
                            <div>
                                <p className='mb-3 text-start'>Monthly Income:</p>
                                <div className='flex items-center gap-4'>
                                    <p>Base:</p>
                                    <h6 className='font-semibold my-2'>$2,500,000.00</h6>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p>Overtime</p>
                                    <h6 className='font-semibold my-2'>$2,497,500.00</h6>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p>Bonus</p>
                                    <h6 className='font-semibold my-2'>$2,497,500.00</h6>
                                </div>
                                <hr className='border-gray-950' />
                                <p className='text-end mt-2'>$3600.00</p>
                            </div>
                        </div>
                    </div>
                    <div className='inner-forms w-full md:w-full m-auto my-4'>
                        <div className='heading heading-2 flex justify-between items-center p-3'>
                            <h1 className='text-lg text-start md:text-xl'>Loan-To-Value Ratio: 99.90%</h1>
                        </div>
                        <div className='form-inside px-3 py-4'>
                            <div className='mb-3 w-full md:w-11 lg:w-8'>
                                <div>
                                    <p className='text-start mb-3'>Loan Amount:</p>
                                </div>
                                <div className='flex gap-4 mb-2'>
                                    <p>Base Loan Amount:</p>
                                    <h6 className='font-semibold'>$2,500,000.00</h6>
                                </div>
                                <hr className='border-gray-950' />
                                <div className='mt-2'>
                                    <p className='text-end'>$0.00</p>
                                </div>
                                <div className='flex gap-6'>
                                    <p>Purchase Price:</p>
                                    <h6 className='font-semibold'>$2,500,000.00</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button style={{color: '#E98862', background: '#222D39', border: '1px solid #222D39'}} className='btn-dark' type='submit' onClick={() => handleSubmit()}>
                            { isClicked ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> : 'Submit Application' }
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default StepSubmit;