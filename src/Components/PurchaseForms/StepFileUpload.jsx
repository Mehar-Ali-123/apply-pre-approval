import React, { useState } from 'react';
import { thanks } from '../../assets';
import styles from '../../styles/forms.module.css'
import FileUpload from '../common/FileUpload';

const StepFileUpload = ({ formData, setFormData, step, setStep }) => {

    const Faqsdata = [
        {
            title: 'What docs do I need to upload?',
            items: [
                'Last 2 years of W2 (for all employment income was entered)',
                'Recent month of Paystub (for all employment income entered)',
                'Last 2 year Tax returns  (if business or rental income is being considered)',
                'Any documents to support other income mentioned',
                'YTD profit and loss summary (if business income was entered)',
                'Submit last 2 month statement for assets that was entered to pre-qualify'
            ]
        },
        {
            title: 'If I have a question and I am not sure, what should I do?',
            text: "If you have questions or uncertainties, your loan officer is here to help.",
            items: [
                'Schedule a complimentary consultation with your loan officer.',
                'Reach out at +1 (551) 225-0733 for assistance.'
            ]
        },
        {
            title: 'Can I get a Pre-Approval without submitting the required docs?',
            text: 'Pre-approval involves submitting financial documents and a credit check by the lender to determine your loan eligibility. The process typically takes a few days to a week, depending on the lender and the completeness of submitted documents.'
        },
        {
            title: 'If I am applying for no income loan, what docs do I need to upload?',
            text: "Certainly, pre-approval generally requires a credit check to gauge your financial reliability and set loan conditions. Nonetheless, this doesn't always influence your credit score. At Oqvest, our approach involves a soft inquiry, ensuring your credit remains intact."
        }
    ]
    const [expandedItems, setExpandedItems] = useState([]);
    const toggleItem = (index) => {
        if (expandedItems.includes(index)) {
            setExpandedItems(expandedItems.filter((i) => i !== index));
        } else {
            setExpandedItems([...expandedItems, index]);
        }
    };
    return (
        <div className='w-full md:w-11 lg:w-9 m-auto text-center'>
            <img className="m-auto h-32" src={thanks} height={10} />
            <h1 className='st-2 text-2xl md:text-4xl mt-0 mb-6'>Your Loan Application Has Been Received & its under review</h1>
            <FileUpload setFormData={setFormData} formData={formData} loan_number={formData.loan_number} />
            <div className={`${styles.faqSection} my-6`}>
                <div className={`${styles.faqs} my-6`}>
                    <h2 className="mb-6">FAQs</h2>
                    <div className={styles.f}>
                        <div>
                            {Faqsdata.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.faqItem}
                                >
                                    <div
                                        className={`${styles.ic} flex align-items-center gap-3 cursor-pointer pt-2 pb-4`}
                                        onClick={() => toggleItem(index)}
                                    >
                                        <span style={{ fontWeight: '600', color: '#0CBC8B', fontSize: '16px' }}>{expandedItems.includes(index) ? '-' : '+'}</span>
                                        <h3 className="m-0 text-start">{item.title}</h3>
                                    </div>
                                    {expandedItems.includes(index) && (
                                        <div className={`mb-2 ${styles.itemText}`}>
                                            <p className='text-start'>{item?.text}</p>
                                            {
                                                item?.items && (
                                                    <ul className='ml-4 list-disc'>
                                                        {
                                                            item.items.map((i, index) => (
                                                                <li className='text-start' key={index}>{i}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex align-items-center justify-content-center gap-4">
                <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                <button className='btn-dark' onClick={()=> setStep(step + 1)} type='button'>
                    Next
                </button>
            </div>
        </div>
    )
}

export default StepFileUpload;