import { InputNumber } from 'primereact/inputnumber'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const questions = [
    {
        question: "Why would I need multiple pre-approvals?",
        answer: "Depending on your property search or financial strategy, you might be considering homes in different price ranges or exploring varied mortgage terms. Generating multiple pre-approvals allows you flexibility in your options.",
    },
    {
        question: "Is there a limit to how many pre-approvals I can generate?",
        answer: "While our system allows for multiple pre-approvals, it's recommended to keep your requests reasonable to ensure each pre-approval is tailored to your needs",
    },
    {
        question: "Will generating multiple pre-approvals affect my credit score?",
        answer: "As long as we generate pre - approval to the approved amount, we do not need to access to your credit as such there will be no impact on credit score.",
    },
    {
        question: "Do all my pre-approvals expire at the same time?",
        answer: "Yes, all pre-approvals have a standard expiration duration, typically 60-90 days, regardless of when they were generated",
    },

];
const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item border-bottom py-3">
            <div className="accordion-header" onClick={toggleAccordion}>
                <div className="accordion-question d-flex gap-2">
                    <h3 className={`fw-semibold ps-4 d-flex ${isOpen ? "hidden" : ""}`}>
                        <img
                            className={`accordion-icon pe-2 me-0  ${isOpen ? "hidden" : ""}`}
                            src="./assets/icons/plusQues.png"
                            alt="Plus Icon"
                        />
                        {question}
                    </h3>
                </div>
            </div>
            {isOpen && (
                <div className="accordion-content d-flex justify-content-start align-items-center mt-2">
                    <div className='col-md-1'>
                        <button className="close-accordion px-2" onClick={toggleAccordion}>
                            <img src="./assets/icons/minusQues.png" alt="" />
                        </button>
                    </div>
                    <div className="col-md-11 ps-0 ">
                        <p className="text-start left-border ms-2 ps-2 text-grey">{answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};


function RevisePreApproval() {
    return (<>
        <div className='mb-5'>
            <div>
                <div className="income-source-container  w-100 d-flex justify-content-center  flex-column  align-items-center">
                    <img width='80px' height='80px' src="/assets/images/file.png" alt="" />

                    <h2 className='fw-semibold mt-3 text-center mb-3'>Revise your Pre-Approval </h2>
                </div>
                <div className="container p-3">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <div className='w-100   d-flex flex-column  justify-content-center align-items-center   mt-5'>
                                <h6 className='w-100 fw-semibold mb-2'>If you want another amount for pre-approval, please enter below:</h6>
                                <div className="input-group input-amount input-group-1 mb-1   w-100">
                                    {/* Loan Amount Input */}
                                    <span className="input-group-text m-0 p-0 input-group-1-text">
                                        <img className=" " width='25px' height='25px' src='/assets/images/currency-dollar.png' />
                                    </span>
                                    <InputNumber
                                        type="text"
                                        className="inputText w-75 ps-0 py-0"
                                        placeholder="Enter your amount up to the max"
                                        id="loan_amount"
                                        style={{
                                            background: "white",
                                            fontSize: "14.187px",
                                            borderRadius: 11,
                                            color: "#797292",
                                            marginLeft: "-2px",
                                        }}
                                        // value={loanAmount}
                                        // onValueChange={(e) => handleLoanAmountChange(e.value)}
                                        locale="en-us"
                                        minFractionDigits={2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                <Link to="/" className='mt-2'>
                    <button type="submit" className="next-btn-fill w-100 color-pink">                                        Generate  pre-approval with new amount
                    </button>
                </Link>
            </div>

            <div className="container-fluid p-2">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-9 col-sm-11 ">
                                        <div className='mt-5 '><img className='mx-auto' src="./assets/icons/faqs.png" alt="  " /></div>
                                        <div className=' text-center mt-5'>  
                                                {questions.map((qna, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        question={qna.question}
                                                        answer={qna.answer}
                                                    />
                                                ))} 
                                        </div>

                                    </div>
                                </div>
                            </div>
        </div>
    </>
    )
}

export default RevisePreApproval