import React, { useRef, useState } from 'react';
import axios from 'axios';
import PopupModal from '../common/PopupModal';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { AiOutlineFilePdf, AiOutlinePaperClip } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { uploadDoc } from '../../utils/api';
import { Toast } from 'primereact/toast';

const FileUpload = ({ formData, setFormData, loan_number }) => {
    const { handleSubmit, formState: { errors }, register, reset, control } = useForm({
        mode: 'onBlur',
        defaultValues: formData
    });
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const toast = useRef(null);
    const token = localStorage.getItem('accessToken')

    const show = () => {
        toast.current.show({ severity: 'success', detail: 'File Uploaded Successfully.' });
    };
    const options = [
        { value: 'application', label: 'Application or Id' },
        { value: 'credit', label: 'Credit' },
        { value: 'income', label: 'Income' },
        { value: 'taxes', label: 'Taxes' },
        { value: 'w2', label: 'W2 or 1099' },
        { value: 'paystub', label: 'Paystub or Ytd income' },
        { value: 'assets', label: 'Assets' },
        { value: 'mortgage', label: 'Mortgage Statement and Insurance' },
        { value: 'property', label: 'Property' },
        { value: 'title', label: 'Title' },
        { value: 'appraisal', label: 'Appraisal' },
        { value: 'purchase_contract', label: 'Purchase contract' },
        { value: 'disclosure', label: 'Disclosure' },
        { value: 'closing_documents', label: 'Closing documents' },
        { value: 'underwriting_conditions', label: 'Underwriting conditions' },
        { value: 'other', label: 'Other' }
    ];

    const handleFileChange = (files) => {
        if (files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const onSubmit = async (data) => {
        setIsClicked(true);
        try {
            const formData = new FormData();
            formData.append('file_type', data.file_type);
            formData.append('files', selectedFile);
            formData.append('user_id', user.user_id);
            formData.append('loan_number', loan_number);
            const res = await axios.post(uploadDoc, formData, { headers: {
                Authorization: token,
            }});
            setIsClicked(false);
            if (res) {
                show()
                reset();
                setSelectedFile(null);
                localStorage.setItem('setDisableView', true)
                localStorage.setItem('setDisableReviseStatus', true)
            }
            // setStep(step + 1);
        } catch (error) {
            setResMessage(error.response.data.message);
            setModal(true);
            setIsClicked(false);
            throw new Error(error);
        }
    }
    return (<>
        <PopupModal visible={modal} onHide={() => setModal(false)} message={resMessage} />
        <Toast className='text-left' ref={toast} />
        <form className='w-full md:w-11 lg:w-8 m-auto text-center mt-0' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2 dropdown'>
                <label className='block mb-2 text-start'>Select type of document</label>
                <Controller
                    name="file_type"
                    {...register('file_type')}
                    rules={{ required: 'Please select type of document.' }}
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            {...field}
                            value={field.value || ''}
                            optionLabel="label"
                            options={options}
                            placeholder="Select"
                            className="p-inputtext-lg text-start w-full"
                            onChange={(e) => field.onChange(e.value)}
                        />
                    )}
                />
                {errors?.file_type && <span className='text-red-600 text-start block mt-2'>{errors?.file_type?.message}</span>}
            </div>
            {
                selectedFile ? (
                    <div className='p-4 shadow-lg my-4 rounded-lg'>
                        <div className='flex items-start gap-3'>
                            <div className='p-2 bg-green-100 rounded-md'>
                                <BsCheckLg className='text-green-600' />
                            </div>
                            <div className='text-left'>
                                <h6 className='text-gray-800 text-normal font-semibold my-1'>Upload Successful</h6>
                                <strong className='m-0 font-normal text-sm text-gray-800 flex gap-1 mt-1 mb-2'>
                                    <AiOutlineFilePdf className='text-red-600 text-xl' />
                                    {selectedFile ? selectedFile.name + ' was uploaded successfully' : ''}
                                </strong>
                                <div className='flex gap-3 mt-3'>
                                    <button disabled={isClicked} className='btn-dark px-3 font-normal text-xs' type='submit'>
                                        {
                                            isClicked ?
                                                <i className="pi pi-spin pi-spinner px-3 " style={{ fontSize: '1rem' }}></i> :
                                                'Submit'
                                        }
                                    </button>
                                    <button onClick={() => { setSelectedFile(null); }} disabled={isClicked} className='bg-gray-300 text-red-500 px-3 font-normal text-sm' type='button'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-4'>
                        <input
                            {...register('files', { required: 'Please upload a file.' })}
                            type='file'
                            id='file-upload'
                            className='hidden'
                            name='files'
                            onChange={(e) => handleFileChange(e.target.files)}
                        />
                        <label htmlFor='file-upload' className='border-2 border-dashed border-gray-600 rounded-md w-100 p-3'>
                            <div className='flex justify-center gap-1'>
                                <AiOutlinePaperClip className='text-2xl text-blue-500' />
                                <div className='text-left'>
                                    <p className='m-0 text-sm text-gray-700'>
                                        <strong className='text-blue-500 m-0 font-semibold'>Add files </strong>or click here to upload
                                    </p>
                                    <span className='text-red-500 text-left text-xs m-0'>*Supported formats: PDF</span>
                                </div>
                            </div>
                        </label>
                        {errors.files && <span className='text-red-600 text-start block mt-2'>{errors.files.message}</span>}
                    </div>
                )
            }
        </form>
    </>)
}

export default FileUpload;