import React, { useEffect, useState } from 'react';
import Header from '../../../Components/header';
import styles from './approvalData.module.css';
import { Link } from 'react-router-dom';
// import ErrorModal from '../../../Components/ErrorMessage';   

function DocumentsSubmitted() {


    const questions = [
        {
            question: "What's Next After Document Upload?",
            answer: "Your dedicated loan officer is currently assessing the documents you provided. They will proceed with crafting your pre-approval. They'll promptly connect with you either via email or phone.",
        },
        {
            question: "How Can I Access My Pre-Approval?",
            answer: "As soon as your pre-approval is finalized, an email containing your pre-approval letter will be sent to you. Additionally, you can view the status and details of your pre-approval directly in the 'STATUS' tab of your application dashboard.  ",
        },
        {
            question: "How long does it take to generate a pre-approval?",
            answer: "Typically, pre-approvals are processed within 24-48 hours, depending on application details and volume.",
        },
         
    ];


    const [isSecondOpen, setIsSecondOpen] = useState(false);

    const toggleSecondAccordion = () => {
        setIsSecondOpen(!isSecondOpen);
    };

    const AccordionItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="accordion-item border-bottom py-3 ">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <div className="accordion-question d-flex gap-2 ">
                        <h3 className={`fw-semibold ps-3 d-flex ${isOpen ? "hidden" : ""}`}>
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
                    <div className="row accordion-content d-flex justify-content-start align-items-center mt-2 ">
                        <div className='col-md-1 pe-0 me-0'>
                            <button className="close-accordion px-2 " onClick={toggleAccordion}>
                                <img src="./assets/icons/minusQues.png" alt="" />
                            </button>
                        </div>
                        <div className='col-md-11  ps-0'>
                            <p className="text-start left-border  ms-2 ps-2  text-grey">{answer}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <>
            <div>
                <Header />
                <div className='row'>
                    <div className="income-source-container  col-md-9 mx-auto d-flex justify-content-center  flex-column  align-items-center">
                        <img width='80px' height='80px' src="/assets/icons/done.png" alt="" />
                        <h1 className='fw-semibold mt-3 text-center mb-3'>Documents Successfully Submitted!

                        </h1>
                        <p className='text-center text-muted'>Thank you for providing the necessary documentation. Your application is now in progress, and we're diligently working to process it. Stay tuned for further updates.</p>
                    </div>
                    <div className="mt-5 bg-white d-flex justify-content-center gap-3 mb-4">
                        <Link to="/revise-Congratulations" className='mt-2' >
                            <button onClick={() => {
                                localStorage.setItem("editId", "");
                                localStorage.setItem('setDisableReviseStatus', true)
                                localStorage.setItem('setUploadActive', "");
                            }}
                                type="submit" className="next-btn-fill w-100 ">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                    <div className="container p-3">
                        <div className="row d-flex justify-content-center">
                            <div className="container-fluid p-2">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-9 col-sm-11 ">
                                        <div className='mt-5 '><img className='mx-auto' src="./assets/icons/faqs.png" alt="  " /></div>
                                        <div className=' text-center mt-5'>

                                            <div className="text-center mt-5">
                                                {questions.map((qna, index) => (
                                                    <AccordionItem
                                                        key={index}
                                                        question={qna.question}
                                                        answer={qna.answer}
                                                    />
                                                ))}
                                            </div>
                                            <div className="accordion-item py-3">
                                                <div className="accordion-header" onClick={toggleSecondAccordion}>
                                                    <div className="accordion-question d-flex  align-items-center gap-2">

                                                        <h3 className='fw-semibold ps-3 d-flex'><img
                                                            className={`accordion-icon pe-2 me-0  ${isSecondOpen ? "hidden" : ""}`}
                                                            src="./assets/icons/plusQues.png"
                                                            alt="Plus Icon"
                                                        />
                                                            If I have a question and I am not sure, what should I do?</h3>
                                                    </div>
                                                </div>
                                                {isSecondOpen && (
                                                    <div className="accordion-content d-flex  justify-content-start  align-items-center mt-2  pe-0">
                                                        <div className="col-md-1 pe-0 me-0  ">
                                                            <button className="close-accordion px-2" onClick={toggleSecondAccordion}>
                                                                <img src="./assets/icons/minusQues.png" alt="" />
                                                            </button>
                                                        </div>
                                                        <div className="col-md-11 ps-0  ">
                                                            <p className='text-start left-border ms-0 ps-2 '>
                                                            If you have questions or uncertainties, your loan officer is here to help.
                                                                <ul className='mt-2'>
                                                                    <li className='list-ans'>
                                                                         Schedule a complimentary consultation with your loan officer. 

                                                                    </li>
                                                                    <li className='list-ans'>
                                                                         Reach out at +1 (551) 225-0733 for assistance.

                                                                    </li>
                                                                    
                                                                </ul>
                                                            </p>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            {/* <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                errorMessage={apiErrorMessage}
            /> */}
        </>
    );
}

export default DocumentsSubmitted;