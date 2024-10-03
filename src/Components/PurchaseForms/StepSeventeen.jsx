import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import { addMonthlyIncomes, deleteMonthlyIncome, getMonthlyIncome, updateLoan, updateMonthlyIncome } from '../../utils/api';
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from 'primereact/inputnumber';
import PopupModal from '../common/PopupModal';

const StepSeventeen = ({ formData, setFormData, step, setStep }) => {
    const { handleSubmit, formState: { errors }, register, control, watch, reset } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { handleSubmit: handleSubmit2, formState: { errors: errors2 }, setValue, register: register2, control: control2, reset: reset2 } = useForm({
        mode: 'onBlur'
    });
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')

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
    ];

    const getData = () => {
        const timeout = setTimeout(async () => {
            setIsLoading(true);
            try {
                const link = getMonthlyIncome(formData.loanId);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if (res.data.data.length > 0) {
                    setData(res.data.data);
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

    useEffect(() => {
        if (Object.values(editedData).length > 0) {
            Object.keys(editedData).forEach(fieldName => {
                setValue(fieldName, editedData[fieldName]);
            });
        }
    }, [editedData, setValue]);

    const handleDelete = async (rowData) => {
        try {
            const link = deleteMonthlyIncome(rowData.monthly_income_id);
            const res = await axios.delete(link, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                toast.success('Deleted Successfully.');
                getData()
            } else {
                toast.error('Something went wrong.')
            }
        } catch (error) {
            toast.error(error)
            throw new Error(error);
        }
    };
    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                loan_application_id: formData.loanId, income_type: data.income_type,
                monthly_income_amount: data.monthly_income_amount
            }
            const res = await axios.post(addMonthlyIncomes, { data: dataObj }, { headers: {
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
                })
                getData();
                setShow(false);
                reset();
                setIsClicked(false);
            } else {
                setResMessage(res.data.message);
                setModal(true)
                setIsClicked(false);
            }
        } catch (error) {
            setResMessage('Something went wrong. Please try again later');
            setModal(true)
            setIsClicked(false);
        }
    }
    const onUpdate = async (data) => {
        setIsClicked(true);
        try {
            const dataObj = {
                id: editedData?.monthly_income_id, income_type: data.income_type,
                monthly_income_amount: data.monthly_income_amount
            }
            const res = await axios.patch(updateMonthlyIncome, { ...dataObj }, { headers: {
                Authorization: token,
            }});
            if (res.data.status === true) {
                getData();
                setIsEditClicked(false);
                reset2();
                setIsClicked(false);
            } else {
                setResMessage(res.data.message);
        setModal(true)
                setIsClicked(false);
            }
        } catch (error) {
            setResMessage('Something went wrong. Please try again later');
      setModal(true)
            setIsClicked(false);
        }
    }
    return (
        <div>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            <Toaster />
            <div className='w-full md:w-11 lg:w-11 m-auto text-center'>
                <h1 className='text-900 text-2xl md:text-4xl mt-0 mb-2'>Disclosing <strong className='st-1'>Other Income</strong> <strong className='st-2'>Sources</strong></h1>
                <p className='text-gray-700'>Beyond traditional employment, other sources of income can significantly impact your mortgage journey. By sharing these details, we ensure your overall financial picture is accurately represented.
</p>
                <div>
                    <div className='inner-forms w-full lg:w-10 m-auto mt-4'>
                        <div className='heading flex justify-between items-center p-3'>
                            <h1 className='text-900 text-lg text-start md:text-xl'>Your Other Monthly Income</h1>
                            {
                                (data.length !== 0 && show === false) &&
                                <AiOutlinePlusCircle onClick={() => setShow(true)} className='link text-xl cursor-pointer' />
                            }
                        </div>
                        <div className='form-inside pb-6 pt-4'>
                            {
                                (show || isEditClicked) ? (
                                    show ? (
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className='w-full md:w-11 lg:w-10 m-auto'>
                                                <p className='text-center text-gray-600 mb-4'>NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY if you want it considered in determining your qualification for this loan.</p>

                                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type of income</label>
                                                        <Controller
                                                            name="income_type"
                                                            {...register('income_type')}
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
                                                        {errors?.income_type && <span className='text-red-600 text-start block mt-2'>{errors?.income_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Income Amount</label>
                                                        <Controller
                                                            name="monthly_income_amount"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder="Monthly Income" />
                                                            )}
                                                        />
                                                        {errors?.monthly_income_amount && <span className='text-red-600 text-start block mt-2'>{errors?.monthly_income_amount?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setShow(false)}>Cancel</button>
                                                    <button className='btn-primary text-white px-7' type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Add'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSubmit2(onUpdate)}>
                                            <div className='w-full md:w-11 lg:w-10 m-auto'>
                                                <p className='text-center text-gray-600 mb-4'>NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY if you want it considered in determining your qualification for this loan.</p>

                                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 my-3 max-w-full m-auto'>
                                                    <div className='mb-2 dropdown w-full'>
                                                        <label className='block mb-2 text-start'>Type of income</label>
                                                        <Controller
                                                            name="income_type"
                                                            {...register2('income_type')}
                                                            control={control2}
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
                                                        {errors2?.income_type && <span className='text-red-600 text-start block mt-2'>{errors2?.income_type?.message}</span>}
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className='block mb-2 text-start'>Monthly Income Amount</label>
                                                        <Controller
                                                            name="monthly_income_amount"
                                                            control={control2}
                                                            render={({ field }) => (
                                                                <InputNumber locale="en-US" value={field.value} minFractionDigits={2} onChange={(e) => field.onChange(e.value)}
                                                                    className='w-full' placeholder="Housing Expense" />
                                                            )}
                                                        />
                                                        {errors2?.monthly_income_amount && <span className='text-red-600 text-start block mt-2'>{errors2?.monthly_income_amount?.message}</span>}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex align-items-center justify-content-center gap-4">
                                                    <button className='btn-outline-secondary' type='button' onClick={() => setIsEditClicked(false)}>Cancel</button>
                                                    <button className='btn-primary text-white px-7' type='submit'>
                                                        {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Update'}</>)}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                ) : (
                                    isLoading ? (
                                        <div className='flex justify-center flex-col gap-4 items-center'>
                                            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="8" />
                                        </div>
                                    ) : data.length === 0 ? (
                                        <p onClick={() => setShow(true)} className='link cursor-pointer flex items-center gap-1 text-start mx-3 my-0'><AiOutlinePlusCircle /> Add new other income</p>
                                    ) : (
                                        <div>
                                            <DataTable stripedRows value={data}>
                                                <Column field="income_type" header="Income Type"></Column>
                                                <Column field="monthly_income_amount" header="Income Amount"></Column>
                                                <Column
                                                    header="Actions"
                                                    body={(rowData) => (
                                                        <div className='flex gap-3 items-center'>
                                                            <FiEdit2 className='cursor-pointer text-xl text-green-600' onClick={() => { setEditedData(rowData); setIsEditClicked(true) }} />
                                                            <RxCross2 className='cursor-pointer text-xl text-red-600' onClick={() => handleDelete(rowData)} />
                                                        </div>
                                                    )}
                                                ></Column>
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
                </div>
            </div>
        </div >
    )
}

export default StepSeventeen;