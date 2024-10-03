import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addMonthlyIncomes } from '../../utils/api';

const StepSeventeen = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const incomeTypes = [
        { value: 'Accessory Unit Income', name: 'Accessory Unit Income' },
        { value: 'Alimony', name: 'Alimony' },
        { value: 'Automobile Allowance', name: 'Automobile Allowance' },
        { value: 'Border Income', name: 'Border Income' },
        { value: 'Capital Gains', name: 'Capital Gains' },
        { value: 'Child Support', name: 'Child Support' },
        { value: 'Defined Contribution Plan', name: 'Defined Contribution Plan' },
        { value: 'Disability', name: 'Disability' },
        { value: 'Interest and Dividends', name: 'Interest and Dividends' },
        { value: 'Employment Related Account', name: 'Employment Related Account' },
        { value: 'Foster Care', name: 'Foster Care' },
        { value: 'Housing Allowance', name: 'Housing Allowance' },
        { value: 'Housing Choice Voucher Program', name: 'Housing Choice Voucher Program' },
        { value: 'Mortgage Credit Certificate', name: 'Mortgage Credit Certificate' },
        { value: 'Mortgage Differential Payments', name: 'Mortgage Differential Payments' },
        { value: 'Non Borrower Household Income', name: 'Non Borrower Household Income' },
        { value: 'Note Receivable', name: 'Note Receivable' },
        { value: 'Retirement', name: 'Retirement' },
        { value: 'Public Assistance', name: 'Public Assistance' },
        { value: 'Royalty Payments', name: 'Royalty Payments' },
        { value: 'Separate Maintenance', name: 'Separate Maintenance' },
        { value: 'Social Security', name: 'Social Security' },
        { value: 'Temporary Leave', name: 'Temporary Leave' },
        { value: 'Tip Income', name: 'Tip Income' },
        { value: 'Trust', name: 'Trust' },
        { value: 'Unemployment Benefits', name: 'Unemployment Benefits' },
        { value: 'VA Compensation', name: 'VA Compensation' },
        { value: 'Other', name: 'Other' },
    ]

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, income_type: data.monthylyIncomeType,
                monthly_income_amount: data.totalIncomeAmount
            }
            const res = await axios.post(addMonthlyIncomes, { data: dataObj });
            if (res.data.status === true) {
                const newData = {
                    monthylyIncomeType: data.monthylyIncomeType,
                    totalIncomeAmount: data.totalIncomeAmount
                }
                const updatedFormData = {
                    ...formData,
                    otherMonthlyIncomeReport: [...formData.otherMonthlyIncomeReport, newData]
                };
                setFormData(updatedFormData);
                setShow(false);
                reset();
                setIsClicked(false);
            } else {
                setIsClicked(false);
            }
        } catch (error) {
            setIsClicked(false);
        }
    }
    return (
        <div>
            <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Do You Have Any Other Income to Report?</h1>
                <p className='text-gray-700'>Please review and verify your other income sources. We will use the information you provide to process your loan application.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='inner-forms w-10 m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Other Monthly Income</h1>
                            {
                                (formData.otherMonthlyIncomeReport.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside pb-6 mt-4'>
                            {
                                show ? (
                                    <div className='w-full md:w-11 lg:w-10 m-auto'>
                                        <p className='text-center text-gray-600 mb-4'>NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY if you want it considered in determining your qualification for this loan.</p>

                                        <div className='grid grid-cols-2 gap-3 my-3 max-w-full m-auto'>
                                            <div className='mb-2 dropdown w-full'>
                                                <label className='block mb-2 text-start'>Type of income</label>
                                                <Controller
                                                    name="monthylyIncomeType"
                                                    {...register('monthylyIncomeType')}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Dropdown
                                                            {...field}
                                                            value={field.value || ''}
                                                            optionLabel="name"
                                                            options={incomeTypes}
                                                            placeholder="Choose"
                                                            className="p-inputtext-lg text-start w-full"
                                                            onChange={(e) => field.onChange(e.value)}
                                                        />
                                                    )}
                                                />
                                                {errors?.monthylyIncomeType && <span className='text-red-600 text-start block mt-2'>{errors?.monthylyIncomeType?.message}</span>}
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block mb-2 text-start'>Monthly Income Amount</label>
                                                <InputText type='number' {...register("totalIncomeAmount", { required: 'Amount is required' })}
                                                    className='w-full' placeholder='Enter monthly income amount' />
                                                {errors?.totalIncomeAmount && <span className='text-red-600 text-start block mt-2'>{errors?.totalIncomeAmount?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                            <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                            <button className='btn-primary text-white px-7' type='submit'>
                                                {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                            </button>
                                        </div>
                                    </div>

                                ) : (
                                    formData.otherMonthlyIncomeReport.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-4 my-0'><AiOutlinePlusCircle /> Add new other income</p>
                                    ) : (
                                        <div className='mx-3'>
                                            <DataTable stripedRows value={formData.otherMonthlyIncomeReport}>
                                                <Column field="monthylyIncomeType" header="Income Type"></Column>
                                                <Column field="totalIncomeAmount" header="Income Amount"></Column>
                                            </DataTable>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' type='button' onClick={() => { setStep(step + 1) }}>Next</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default StepSeventeen;