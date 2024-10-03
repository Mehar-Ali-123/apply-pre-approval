import { useNavigate } from "react-router-dom";
import { thanks } from "../assets";
import { TbDashboard, TbReportSearch } from 'react-icons/tb'
import { BiFile } from 'react-icons/bi'

const Thanks = () => {
    const navigate = useNavigate();
    return (
        <div className="thanks">
            <div className="text-center w-11 md:w-8 lg:w-6 m-auto">
                <img className="m-auto h-36" src={thanks} height={10} />
                <h1 className="m-0">Your Loan Application Has Been Received</h1>
                <div className="mt-6">
                    <div className="flex items gap-3 mb-3">
                        <TbReportSearch className="h-10" />
                        <div>
                            <h3>1. I'm Reviewing Your Application</h3>
                            <p>Thank you for submitting the online portion of your loan application. From here I'll review the online portion of your application and get back to you shortly with loan options that best fit your needs. In the meantime, all you have to do is sit back and wait for a notification.</p>
                        </div>
                    </div>
                    <div className="flex items gap-3 mb-3">
                        <BiFile className="h-10" />
                        <div>
                            <h3>2. Review & Sign Initial Disclosures</h3>
                            <p>By law, we must deliver Initial Disclosures to you within 3 days of receiving your mortgage application, where applicable. We'll notify you as soon as they're ready for you to review and sign electronically.</p>
                        </div>
                    </div>
                    <div className="flex items gap-3 mb-3">
                        <TbDashboard className="h-10" />
                        <div>
                            <h3>3. Please visit your dashboard to upload documents or send us a message!</h3>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 flex-column md:flex-row justify-content-center my-5">
                    <button style={{ background: '#222D39', border: '1px solid #222D39' }} className='btn-dark' type='submit' onClick={() => navigate('/')}>Dashboard</button>
                </div>
            </div>
        </div>
    )
}

export default Thanks;