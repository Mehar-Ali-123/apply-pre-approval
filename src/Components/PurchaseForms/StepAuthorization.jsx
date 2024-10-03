import React, { useState } from 'react';
import { filelike } from '../../assets';
import { Checkbox } from 'primereact/checkbox';
import { addProperty, updateLoan, updateProperty } from '../../utils/api';
import axios from 'axios';
import PopupModal from '../common/PopupModal';

const StepAuthorization = ({ formData, setFormData, step, setStep }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [resMessage, setResMessage] = useState('')
    const [modal, setModal] = useState(false);
    const token = localStorage.getItem('accessToken')
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            if(formData?.subject_property_id) {
                const dataObj = {
                    id: formData?.subject_property_id,street_address: formData.subjectPropertyStreetAddress,
                    realtor_info: formData.propertyOccupience, property_aside: formData.propertyAside,
                    subject_property_type: formData.propertyType, is_authorized: formData.is_authorized,
                    credit_report_access: formData.credit_report_access
                }
                const res = await axios.patch(updateProperty, { ...dataObj }, {  headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setStep(formData.propertyOccupience === 'Yes' ? step + 1 : step + 2);
                } else {
                    setResMessage(res.data.message);
                    setModal(true)
                    setIsClicked(false);
                }
            } else {
                const dataObj = {
                    loan_application_id: formData.loanId, street_address: formData.subjectPropertyStreetAddress,
                    realtor_info: formData.propertyOccupience, property_aside: formData.propertyAside,
                    subject_property_type: formData.propertyType, is_authorized: formData.is_authorized,
                    credit_report_access: formData.credit_report_access
                }
                const res = await axios.post(addProperty, { data: dataObj }, {  headers: {
                    Authorization: token,
                }});
                if (res.data.status === true) {
                    setIsClicked(false);
                    setFormData({
                        ...formData,
                        subject_property_id: res.data.data.id
                    })
                    setStep(formData.propertyOccupience === 'Yes' ? step + 1 : step + 2);
                } else {
                    setResMessage(res.data.message);
                    setModal(true)
                    setIsClicked(false);
                }
            }
            
            const loanObj = {
                id: formData.loanId, loan_application_stage: step
            }
            const loanAppRes = await axios.patch(updateLoan, { ...loanObj });
            
            setFormData({
                ...formData, loanStage: step
            })
        } catch (error) {
            setResMessage('Something went wrong. Please try again later');
      setModal(true)
            setIsClicked(false);
        }
    }
    return (
        <form>
                  <PopupModal message={resMessage} visible={modal} onHide={()=> setModal(false)} />
            <div className='w-full md:w-11 lg:w-full m-auto text-center'>
                <div className='flex items-center justify-center mb-3'>
                    <img src={filelike} />
                </div>
                <h1 className='text-900 text-2xl md:text-2xl mt-0 mb-2'><strong className='st-1'>Acknowledgement</strong> & <strong className='st-2'>Authorization</strong></h1>
                <div className='w-full md:w-11 lg:w-8 m-auto text-center mt-5'>
                    <div className="flex align-items-start mb-4">
                        <Checkbox inputId="is_authorized" name="is_authorized" value="is_authorized" onChange={(e)=> setFormData({...formData, is_authorized: e.checked})} checked={formData.is_authorized} />
                        <label htmlFor="is_authorized" className="ml-3 text-start text-gray-700">I authorize Oqvic LLC to contact me (including text messages, carrier fees may apply) at the number provided, regarding placement of insurance products. I may revoke my consent at any point by emailing support@oqvic.com or by calling 877-714-1000. I understand that I am not required to give my consent as a condition of purchasing any good or services, rather I am opting into a service to assist in obtaining insurance policies on my behalf for my review and acceptance separately.</label>
                    </div>
                    <div className="flex align-items-start">
                        <Checkbox inputId="credit_report_access" name="credit_report_access" value="credit_report_access" onChange={(e)=> setFormData({...formData, credit_report_access: e.checked})} checked={formData.credit_report_access} />
                        <label htmlFor="credit_report_access" className="ml-3 text-start text-gray-700">I allow my credit report to be accessed by Oqvest LLC*</label>
                    </div>
                    <div className="mt-6 flex align-items-center justify-content-center gap-4">
                        <button className='btn-outline-dark' type='button' onClick={() => setStep(step - 1)}>Back</button>
                        <button className='btn-dark' style={{color: 'rgba(233, 136, 98, 1)'}} type='submit' onClick={onSubmit}>
                            {isClicked ? <i className='pi pi-spin pi-spinner'></i> : (<>{'Save & Continue'}</>)}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepAuthorization;