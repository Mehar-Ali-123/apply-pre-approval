import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addDeclarations, getDeclaration, updateDeclaration, updateLoan } from '../../utils/api';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from "primereact/radiobutton";
import { declarationQuestions as questions, financeQuestion, otherQuestions, consumerInformationQuestions } from '../../utils/data';
import { ProgressSpinner } from 'primereact/progressspinner';

const StepDeclarations = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ defaultValues: formData });
    const [aboutState, setAboutState] = useState("");
    const [financeState, setfinanceState] = useState("");
    const [consumerState, setconsumerState] = useState("");
    const token = localStorage.getItem('accessToken')

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className='text-red-600 mt-2'>{errors[name].message}</small> : <small className='text-red-600 text-start block mt-2'>&nbsp;</small>;
    };
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        if (Object.values(data).length > 0) {
            Object.keys(data).forEach(fieldName => {
                setValue(fieldName, data[fieldName]);
            });
        }
    }, [data, setValue]);
    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getDeclaration(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data[0]);
                    setFormData({
                        ...formData,
                        declaration_id: res.data.data[0]?.declaration_id
                    })
                    setIsLoading(false);
                } else {
                    setData([])
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

    const handleAboutCheck = (e)=> {
        setAboutState(e.value);
        setValue('primary_residence', e.value);
        setValue('ownership_last_three_years', e.value);
        setValue('purchase_transaction', e.value);
        setValue('non_disclosed_money', e.value);
        setValue('non_disclosed_loan_on_property', e.value);
        setValue('non_disclosed_credit', e.value);
        setValue('property_subject_to_lien', e.value);
    }

    const handleFinanceCheck = (e)=> {
        setfinanceState(e.value);
        setValue('non_disclosed_debt_loan', e.value);
        setValue('outstanding_judgements', e.value);
        setValue('federal_debt', e.value);
        setValue('personal_financial_liability', e.value);
        setValue('lieu_of_foreclosure', e.value);
        setValue('pre_foreclosure_sale', e.value);
        setValue('property_foreclosed', e.value);
        setValue('bankruptancy_declarancy', e.value);
    }

    const handleConsumerCheck = (e)=> {
        setconsumerState(e.value);
        setValue('homeownership_education_housing_counseling', e.value);
        setValue('is_completed_homeownership_education', e.value);
        setValue('is_completed_housing_counseling', e.value);
    }

    const onSubmit = async (data) => {
        setStep(step + 1);
        setFormData(data);
    };

    return (<>
        {
            isLoading ? (
                <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                    <h6>Loading...</h6>
                </div>
            ) : (
                <form onSubmit={(handleSubmit(onSubmit))}>
                    <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                        <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Important <strong className='st-1'>Application</strong> <strong className='st-2'>Disclosures</strong></h1>
                        <p className='text-gray-700'>Ensuring Transparency and Compliance. As we proceed with your application, it's vital to provide certain disclosures to maintain transparency and adhere to regulatory requirements.</p>
                        <div className='flex justify-between items-center mt-6 mb-4'>
                            <h5 className='text-lg md:text-lg font-semibold st-2 m-0 italic text-start'>About this Property & Your Money for this Loan</h5>
                            <div className='declarations'>
                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center gap-3 justify-end">
                                        <div>
                                            <RadioButton
                                                inputId={`about-yes-1`}
                                                value={"Yes"}
                                                onChange={(e)=> handleAboutCheck(e)}
                                                checked={aboutState === 'Yes'}
                                            />
                                            <label htmlFor={`about-yes-1`} className="ml-1">
                                            Select all as Yes
                                            </label>
                                        </div>
                                        <div>
                                            <RadioButton
                                                inputId={`about-no-1`}
                                                value={"No"}
                                                onChange={(e)=> handleAboutCheck(e)}
                                                checked={aboutState === 'No'}
                                            />
                                            <label htmlFor={`about-no-1`} className="ml-1">
                                            Select all as No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='declarations'>
                            {questions.map((question, index) => (
                                <div className='flex mb-2' key={question.key}>
                                    <div className='declaration-item'>
                                        <p><strong>{question.letter}.</strong> {question.questionText}</p>
                                    </div>
                                    <div className='declaration-item'>
                                        <Controller
                                            name={question.key}
                                            control={control}
                                            rules={{ required: 'Value is required.' }}
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex justify-content-center">
                                                        <div className="flex align-items-center gap-3 justify-end">
                                                            {question.options.map((option, optionIndex) => (
                                                                <div key={optionIndex}>
                                                                    <RadioButton
                                                                        inputId={`${question.key}-option-${optionIndex}`}
                                                                        {...field}
                                                                        value={option}
                                                                        checked={field.value === option}
                                                                    />
                                                                    <label htmlFor={`${question.key}-option-${optionIndex}`} className="ml-2 mr-3">
                                                                        {option}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {getFormErrorMessage(field.name)}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between items-center my-3'>
                            <h6 className='m-0 font-semibold italic st-2 text-start text-lg'>About Your Finances</h6>
                            <div className='declarations'>
                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center gap-3 justify-end">
                                        <div>
                                            <RadioButton
                                                inputId={`about-yes-2`}
                                                value={"Yes"}
                                                onChange={(e)=> handleFinanceCheck(e)}
                                                checked={financeState === 'Yes'}
                                            />
                                            <label htmlFor={`about-yes-2`} className="ml-1">
                                            Select all as Yes
                                            </label>
                                        </div>
                                        <div>
                                            <RadioButton
                                                inputId={`about-no-2`}
                                                value={"No"}
                                                onChange={(e)=> handleFinanceCheck(e)}
                                                checked={financeState === 'No'}
                                            />
                                            <label htmlFor={`about-no-2`} className="ml-1">
                                            Select all as No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='declarations'>
                            {financeQuestion.map((question, index) => (
                                <div className='flex mb-2' key={question.key}>
                                    <div className='declaration-item'>
                                        <p><strong>{question.letter}.</strong> {question.questionText}</p>
                                    </div>
                                    <div className='declaration-item'>
                                        <Controller
                                            name={question.key}
                                            control={control}
                                            rules={{ required: 'Value is required.' }}
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex justify-content-center">
                                                        <div className="flex align-items-center gap-3 justify-end">
                                                            {question.options.map((option, optionIndex) => (
                                                                <div key={optionIndex}>
                                                                    <RadioButton
                                                                        inputId={`${question.key}-option-${optionIndex}`}
                                                                        {...field}
                                                                        value={option}
                                                                        checked={field.value === option}
                                                                    />
                                                                    <label htmlFor={`${question.key}-option-${optionIndex}`} className="ml-2 mr-3">
                                                                        {option}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {getFormErrorMessage(field.name)}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between items-center my-3'>
                            <h6 className='m-0 font-semibold italic st-2 text-start text-lg'>Your Supplemental Consumer Information</h6>
                            <div className='declarations'>
                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center gap-3 justify-end">
                                        <div>
                                            <RadioButton
                                                inputId={`about-yes-3`}
                                                value={"Yes"}
                                                onChange={(e)=> handleConsumerCheck(e)}
                                                checked={consumerState === 'Yes'}
                                            />
                                            <label htmlFor={`about-yes-3`} className="ml-1">
                                            Select all as Yes
                                            </label>
                                        </div>
                                        <div>
                                            <RadioButton
                                                inputId={`about-no-3`}
                                                value={"No"}
                                                onChange={(e)=> handleConsumerCheck(e)}
                                                checked={consumerState === 'No'}
                                            />
                                            <label htmlFor={`about-no-3`} className="ml-1">
                                            Select all as No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='declarations'>
                            {consumerInformationQuestions.map((question, index) => (
                                <div className='flex mb-2' key={question.key}>
                                    <div className='declaration-item'>
                                        <p><strong>{question.letter}</strong> {question.questionText}</p>
                                    </div>
                                    <div className='declaration-item'>
                                        <Controller
                                            name={question.key}
                                            control={control}
                                            rules={{ required: 'Value is required.' }}
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex justify-content-center">
                                                        <div className="flex align-items-center gap-3 justify-end">
                                                            {question.options.map((option, optionIndex) => (
                                                                <div key={optionIndex}>
                                                                    <RadioButton
                                                                        inputId={`${question.key}-option-${optionIndex}`}
                                                                        {...field}
                                                                        value={option}
                                                                        checked={field.value === option}
                                                                    />
                                                                    <label htmlFor={`${question.key}-option-${optionIndex}`} className="ml-2 mr-3">
                                                                        {option}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {getFormErrorMessage(field.name)}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                            <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                            <button className='btn-dark' type='submit'>
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            )
        }
    </>)
}

export default StepDeclarations;