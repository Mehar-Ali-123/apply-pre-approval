import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addDeclarations, createDoc, getDeclaration, updateDeclaration, updateLoan } from '../../utils/api';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from "primereact/radiobutton";
import { declarationQuestions as questions, financeQuestion, otherQuestions, consumerInformationQuestions, raceQuestion } from '../../utils/data';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSelector } from 'react-redux';

const StepDemographic = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ defaultValues: formData });
    const { user } = useSelector((state)=> state.auth);
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

    const handleOptionChange = (mainOption, subOption) => {
        const updatedData = { ...formData, race: mainOption.value, subRace: subOption ? subOption.value : null };
        setFormData(updatedData);
    };

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            if (formData?.declaration_id) {
                const dataObj = {
                    loan_application_id: formData.loanId, primary_residence: formData.primary_residence,
                    ownership_last_three_years: formData.ownership_last_three_years, purchase_transaction: formData.purchase_transaction,
                    non_disclosed_money: formData.non_disclosed_money, non_disclosed_loan_on_property: formData.non_disclosed_loan_on_property,
                    non_disclosed_credit: formData.non_disclosed_credit, property_subject_to_lien: formData.property_subject_to_lien,
                    non_disclosed_debt_loan: formData.non_disclosed_debt_loan, outstanding_judgements: formData.outstanding_judgements,
                    federal_debt: formData.federal_debt, personal_financial_liability: formData.personal_financial_liability,
                    lieu_of_foreclosure: formData.lieu_of_foreclosure, pre_foreclosure_sale: formData.pre_foreclosure_sale,
                    property_foreclosed: formData.property_foreclosed, bankruptancy_declarancy: formData.bankruptancy_declarancy,
                    homeownership_education_housing_counseling: formData.homeownership_education_housing_counseling,
                    is_completed_homeownership_education: formData.is_completed_homeownership_education,
                    is_completed_housing_counseling: formData.is_completed_housing_counseling,
                    gender: data.gender, ethnicity: data.ethnicity,
                    race: formData.race, subRace: formData.subRace
                };
                const res = await axios.patch(updateDeclaration, { ...dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(step + 1);
                    setFormData(data);
                } else {
                    setIsClicked(false);
                }
            } else {
                const dataObj = {
                    loan_application_id: formData.loanId, primary_residence: formData.primary_residence,
                    ownership_last_three_years: formData.ownership_last_three_years, purchase_transaction: formData.purchase_transaction,
                    non_disclosed_money: formData.non_disclosed_money, non_disclosed_loan_on_property: formData.non_disclosed_loan_on_property,
                    non_disclosed_credit: formData.non_disclosed_credit, property_subject_to_lien: formData.property_subject_to_lien,
                    non_disclosed_debt_loan: formData.non_disclosed_debt_loan, outstanding_judgements: formData.outstanding_judgements,
                    federal_debt: formData.federal_debt, personal_financial_liability: formData.personal_financial_liability,
                    lieu_of_foreclosure: formData.lieu_of_foreclosure, pre_foreclosure_sale: formData.pre_foreclosure_sale,
                    property_foreclosed: formData.property_foreclosed, bankruptancy_declarancy: formData.bankruptancy_declarancy,
                    homeownership_education_housing_counseling: formData.homeownership_education_housing_counseling,
                    is_completed_homeownership_education: formData.is_completed_homeownership_education,
                    is_completed_housing_counseling: formData.is_completed_housing_counseling,
                    gender: data.gender, ethnicity: data.ethnicity,
                    race: formData.race, subRace: formData.subRace
                };
                const res = await axios.post(addDeclarations, { data: dataObj }, { headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    const loanObj = {
                        id: formData.loanId, loan_application_stage: step
                    }
                    const loanAppRes = await axios.patch(updateLoan, { ...loanObj }, { headers: {
                        Authorization: token,
                    }});
                    setFormData({
                        ...formData, loanStage: step
                    });
                    const createDocLink = createDoc(formData.loan_number, user.user_id);
                    const createDocRes = await axios.get(createDocLink);
                    setIsClicked(false);
                    setStep(step + 1);
                    const newData = { ...data, declaration_id: res.data.data.id }
                    setFormData(newData)
                } else {
                    setIsClicked(false);
                }
            }
        } catch (error) {
            setIsClicked(false);
        }
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
                        <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-3'>Your <strong className='st-1'>Demographic</strong> <strong className='st-2'>Information</strong></h1>
                        <p className='text-gray-700'>The purpose of collecting this information is to help ensure that all applicants are treated fairly and that the housing needs of communities and neighborhoods are being fulfilled. For residential mortgage lending, Federal law requires that we ask applicants for their demographic information (ethnicity, race, and sex) in order to monitor our compliance with equal credit opportunity, fair housing, and home mortgage disclosure laws. You are not required to provide this information, but are encouraged to do so. You may select one or more designations for "Ethnicity" and one or more designations for "Race." The law provides that we may not discriminate on the basis of this information, or on whether you choose to provide it. However, if you choose not to provide the information and you have made this application in person, Federal regulations require us to note your ethnicity, race, and sex on the basis of visual observation or surname. If you do not wish to provide some or all of this information, please check below.</p>
                        <div className='declarations'>
                            {otherQuestions.map((question, index) => (
                                <div>
                                    <h6 className='my-3 text-lg st-2 font-semibold text-left'>{question.heading}</h6>
                                    <h6 className='my-3 font-semibold text-gray-800 text-start text-lg'>{question.questionText}</h6>
                                    <div className='flex my-3' key={question.key}>
                                        <div>
                                            <Controller
                                                name={question.key}
                                                control={control}
                                                rules={{ required: 'Value is required.' }}
                                                render={({ field }) => (
                                                    <>
                                                        <div className="flex justify-content-center">
                                                            <div className="grid grid-cols-2 align-items-start gap-3">
                                                                {question.options.map((option, optionIndex) => (
                                                                    <div className='text-start' key={optionIndex}>
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
                                </div>
                            ))}
                        </div>
                        <div className='declarations'>
                            <h5 className='mt-3 st-2 text-lg font-semibold text-left'>Race</h5>
                            <h5 className='mb-3 text-lg font-semibold text-left'>{raceQuestion.questionText}</h5>
                            <div className='text-start'>
                                {raceQuestion.options.map((mainOption) => (
                                    <div className='my-4' key={mainOption.value}>
                                        <Controller
                                            name="raceOption"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <RadioButton
                                                        inputId={`radio-${mainOption.value}`}
                                                        {...field}
                                                        value={mainOption.value}
                                                        checked={formData.race === mainOption.value}
                                                        onChange={() => handleOptionChange(mainOption, null)}
                                                    />
                                                    <label htmlFor={`radio-${mainOption.value}`} className='ml-2'>{mainOption.label}</label>
                                                </div>
                                            )}
                                        />

                                        {mainOption.subOptions && (
                                            <div className='grid grid-cols-3 lg:w-11/12 gap-4 ml-5 my-3'>
                                                {mainOption.subOptions.map((subOption) => (
                                                    <div key={subOption.value}>
                                                        <Controller
                                                            name="subRaceOption"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <div>
                                                                    <RadioButton
                                                                        inputId={`radio-${subOption.value}`}
                                                                        {...field}
                                                                        value={subOption.value}
                                                                        checked={formData.subRace === subOption.value}
                                                                        onChange={() => handleOptionChange(mainOption, subOption)}
                                                                    />
                                                                    <label className='ml-2' htmlFor={`radio-${subOption.value}`}>{subOption.label}</label>
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                            <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                            <button style={{color: 'rgba(233, 136, 98, 1)'}} className='btn-dark' type='submit'>
                                {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                            </button>
                        </div>
                    </div>
                </form>
            )
        }
    </>)
}

export default StepDemographic;