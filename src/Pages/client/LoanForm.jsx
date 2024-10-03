import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { logodark, logolight } from '../../assets';
import StepTwo from '../../Components/PurchaseForms/StepTwo';
import StepThree from '../../Components/PurchaseForms/StepThree';
import StepFour from '../../Components/PurchaseForms/StepFour';
import StepFive from '../../Components/PurchaseForms/StepFive';
import StepSix from '../../Components/PurchaseForms/StepSix';
import StepSeven from '../../Components/PurchaseForms/StepSeven';
import StepEight from '../../Components/PurchaseForms/StepEight';
import StepNine from '../../Components/PurchaseForms/StepNine';
import StepTen from '../../Components/PurchaseForms/StepTen';
import StepEleven from '../../Components/PurchaseForms/StepEleven';
import StepTwelve from '../../Components/PurchaseForms/StepTwelve';
import StepThirteen from '../../Components/PurchaseForms/StepThirteen';
import StepFourteen from '../../Components/PurchaseForms/StepFourteen';
import StepSixteen from '../../Components/PurchaseForms/StepSixteen';
import StepSeventeen from '../../Components/PurchaseForms/StepSeventeen';
import StepEighteen from '../../Components/PurchaseForms/StepEighteen';
import StepFiveMissed from '../../Components/PurchaseForms/StepFiveMissed';
import StepAgentInfo from '../../Components/PurchaseForms/StepAgentInfo';
import StepNineteen from '../../Components/PurchaseForms/StepNineteen';
import StepTwenty from '../../Components/PurchaseForms/StepTwenty';
import StepTwentyOne from '../../Components/PurchaseForms/StepTwentyOne';
import { StepAgentInfoRefinance, StepEightRefinance, StepEighteenRefinance, StepElevenRefinance, StepFifteenRefinance, StepFiveMissedRefinance, StepFiveRefinance, StepFourRefinance, StepFourteenRefinance, StepNineRefinance, StepNineteenRefinance, StepOneRefinance, StepRealEstateRefinance, StepSevenRefinance, StepSeventeenRefinance, StepSixRefinance, StepSixteenRefinance, StepSpouseInfoRefinance, StepSubmitRefinance, StepTenRefinance, StepThirteenRefinance, StepThreeRefinance, StepTwelveRefinance, StepTwentyOneRefinance, StepTwentyRefinance, StepTwoRefinance, StepUnmarriedRefinance } from '../../Components/RefinanceForm';
import StepRealEstate from '../../Components/PurchaseForms/StepRealEstate';
import StepSubmit from '../../Components/PurchaseForms/StepSubmit';
import { useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import StepSubjectPropertyAddress from '../../Components/PurchaseForms/StepSubjectPropertyAddress';
import StepDeclarations from '../../Components/PurchaseForms/StepDeclarations';
import { Link, useLocation } from 'react-router-dom';
import StepAuthorization from '../../Components/PurchaseForms/StepAuthorization';
import { authActions } from '../../Features/authSlice';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu';
import styles from '../../styles/sidebar.module.css'
import { AiOutlineEye, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiBuildingHouse, BiUserCircle } from 'react-icons/bi';
import { TbCashBanknote, TbDisabled2, TbFileDownload, TbFileUpload, TbSmartHome } from 'react-icons/tb';
import { HiOutlineBriefcase, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiGift } from 'react-icons/fi';
import { GoFileZip } from 'react-icons/go'
import { CgUser } from 'react-icons/cg'
import StepOne from '../../Components/PurchaseForms/StepOne';
import { getLoan } from '../../utils/api';
import axios from 'axios';
import SmallSidebar from '../../Components/PurchaseForms/SmallSidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import StepDemographic from '../../Components/PurchaseForms/StepDemographic';
import StepFileUpload from '../../Components/PurchaseForms/StepFileUpload';
import StepViewFiles from '../../Components/PurchaseForms/StepViewFiles';
import CompanyLogo from '../../Components/common/CompanyLogo';

const LoanForm = () => {
    const menu = useRef(null);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const items = [
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
                dispatch(authActions.logout())
            }
        }
    ];
    const [formData, setFormData] = useState({
        loan_number: '',
        loanId: '',
        loanType: '',
        loanStage: 1,
        purchasePrice: '',
        downPayment: '',
        cashoutAmount: '',
        downPaymentSource: '',
        isVeteran: '',
        mortgageLoans: '',
        martialStatus: '',
        otherLegalStatus: '',
        relationshipStatus: '',
        relationshipType: '',
        otherExplanation: '',
        spouseFirstName: '',
        spouseLastName: '',
        spousePhone: '',
        spouseEmail: '',
        coBorrowers: [],
        coBorrower: '',
        coBorrowerFirstName: '',
        coBorrowerLastName: '',
        coBorrowerPhone: '',
        coBorrowerEmail: '',
        coBorrowerMartial: '',
        dateOfBirth: '',
        itin1: null,
        itin2: null,
        itin3: null,
        citizenship: '',
        personal_info_id: null,
        primarystreetAddress: '',
        mailingStreetAddress: '',
        pimaryOwnership: '',
        primaryAddressRent: '',
        pimaryLivingYear: '',
        pimaryLivingMonths: '',
        address_id: null,
        mailingAddress: false,
        streetAddress: '',
        propertyOccupience: '',
        is_authorized: false,
        credit_report_access: false,
        realtor_info_id: '',
        realtorFirstName: '',
        realtorLastName: '',
        realtorCompanyName: '',
        realtorPhone: '',
        realtorEmail: '',
        loan_share_authorization: false,
        propertyAside: '',
        propertyType: '',
        subject_property_id: null,
        monthlyMortgagePayment: '',
        totalMortgageExpense: '',
        subjectPropertyStreetAddress: '',
        primary_housing_expense: '',
        formerAddresses: [],
        employements: [],
        otherMonthlyIncomeReport: [],
        realEstateInfo: [],
        realEstateAddress: '',
        realEstateCity: '',
        realEstateState: '',
        realEstateZip: '',
        realEstateStatus: '',
        realEstateMarketValue: '',
        realEstateMonthlyRent: '',
        realEstateMonthlyExpense: '',
        assets: [],
        liabilities: [],
        gifts: [],
        declaration_id: '',
        primary_residence: '',
        ownership_last_three_years: '',
        purchase_transaction: '',
        non_disclosed_money: '',
        non_disclosed_loan_on_property: '',
        non_disclosed_credit: '',
        property_subject_to_lien: '',
        non_disclosed_debt_loan: '',
        outstanding_judgements: '',
        federal_debt: '',
        personal_financial_liability: '',
        lieu_of_foreclosure: '',
        pre_foreclosure_sale: '',
        property_foreclosed: '',
        bankruptancy_declarancy: '',
        homeownership_education_housing_counseling: '',
        is_completed_homeownership_education: '',
        is_completed_housing_counseling: '',
        ethnicity: '',
        gender: '',
        race: '',
        subRace: ''
    });
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [stage, setStage] = useState(1);
    const [onlyView, setOnlyView] = useState(false);
    const token = localStorage.getItem('accessToken')

    // useEffect(() => {
    //     setFormData({ ...formData, loanId: location.state.id, loan_number: location.state.loan_number });
    // }, [location]);

    useLayoutEffect(()=> {
        const timeout = setTimeout(async()=> {
            setIsLoading(true);
            try {
                const link = getLoan(location.state.id);
                const res = await axios.get(link, { withCredentials: true, headers: {
                    Authorization: token,
                }});
                if(Number(res.data.data[0]?.loan_application_stage) >= 29) {
                    setStep(30);
                    setStage(30);
                    setOnlyView(true)
                } else {
                    setOnlyView(false)
                    setStage(Number(res.data.data[0]?.loan_application_stage));
                }
                setFormData({
                    ...formData,
                    loanId: location.state.id, loan_number: location.state.loan_number,
                    loanStage: Number(res.data.data[0]?.loan_application_stage)
                })
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw new Error(err);
            }
        }, 0);

        return ()=> {
            clearInterval(timeout);
        }
    }, [location]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepOne handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 2:
                if(formData.loanType === 'Purchase') {
                    return <StepTwo handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                } else {
                    return <StepTwoRefinance handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                }
            case 3:
                if(formData.loanType === 'Purchase') {
                    return <StepThree handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                } else {
                    return <StepThreeRefinance handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                }
            case 4:
                if(formData.loanType === 'Purchase') {
                    return <StepFour handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                } else {
                    return <StepFourRefinance handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
                }
            case 5:
                return <StepFiveMissed handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 6:
                return <StepFive handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 7:
                return <StepSix handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 8:
                return <StepSeven handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 9:
                return <StepEight handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 10:
                return <StepNine handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 11:
                return <StepTen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 12:
                return <StepEleven handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 13:
                return <StepTwelve handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 14:
                return <StepSubjectPropertyAddress handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 15:
                return <StepThirteen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 16:
                return <StepFourteen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 17:
                return <StepAgentInfo handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 18:
                return <StepAuthorization handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 19:
                return <StepRealEstate handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 20:
                return <StepSixteen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 21:
                return <StepSeventeen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 22:
                return <StepEighteen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 23:
                return <StepNineteen handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 24:
                return <StepTwenty handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 25:
                return <StepTwentyOne handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 26:
                return <StepDeclarations handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 27:
                return <StepDemographic handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 28:
                return <StepFileUpload handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 29:
                return <StepViewFiles handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            case 30:
                return <StepSubmit handleChange={handleChange} step={step} setStep={setStep} formData={formData} setFormData={setFormData} />;
            default:
                return null;
        }
    }
    return (<>
        <div>
            <SmallSidebar visible={visible} onHide={()=> setVisible(false)} stage={formData.loanStage} step={step} setStep={setStep} />
            <div className='sidebar-layout' style={{ maxWidth: '100%', margin: 'auto' }}>
                <div className='px-0 m-0 sidebar'>
                    <div className={styles.sidebar}>
                        <div>
                            <CompanyLogo />
                            <div id='sidebar-scroll' className={`${styles.sidebarItems2} mt-4`}>
                                {
                                    !onlyView ? (<>
                                        <li className={styles.links}>
                                            <span onClick={()=> setStep(1)} className={`${styles.linkItems} ${(step >= 1 && step <= 6) ? styles.activeLink : ''}`}><AiOutlineInfoCircle /> General Info</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span onClick={()=> formData.loanStage >= 6 && setStep(8)} className={`${styles.linkItems} ${formData.loanStage >= 6 ? '' : styles.disabledLink} ${step === 8 ? styles.activeLink : ''}`}><BiUserCircle /> Co- Borrower’s Info</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span onClick={()=> formData.loanStage >= 8 && setStep(9)} className={`${styles.linkItems} ${formData.loanStage >= 8 ? '' : styles.disabledLink} ${(step >= 9 && step <= 11) && styles.activeLink}`}><BiUserCircle /> Personal Info</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span onClick={()=> formData.loanStage >= 9 && setStep(12)} className={`${styles.linkItems} ${formData.loanStage >= 9 ? '' : styles.disabledLink}  ${step === 12 && styles.activeLink}`}><HiOutlineLocationMarker /> Primary  & Mailing Address</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span onClick={()=> formData.loanStage >= 12 && setStep(13)} className={`${styles.linkItems} ${formData.loanStage >= 12 ? '' : styles.disabledLink}  ${step === 13 && styles.activeLink}`}><HiOutlineLocationMarker /> Former Address</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 13 && setStep(14)} className={`${styles.linkItems} ${formData.loanStage >= 13 ? '' : styles.disabledLink} ${(step >= 14 && step <= 18) && styles.activeLink}`}><TbSmartHome /> Subject Property Info</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 14 && setStep(19)} className={`${styles.linkItems} ${formData.loanStage >= 14 ? '' : styles.disabledLink} ${step == 19 && styles.activeLink}`}><CgUser /> Realtor Information</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 19 && setStep(20)} className={`${styles.linkItems} ${formData.loanStage >= 19 ? '' : styles.disabledLink} ${step == 20 && styles.activeLink}`}><HiOutlineBriefcase /> Employment Information</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 20 && setStep(21)} className={`${styles.linkItems} ${formData.loanStage >= 20 ? '' : styles.disabledLink} ${step == 21 && styles.activeLink}`}><TbCashBanknote /> Other Income Information</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 21 && setStep(22)} className={`${styles.linkItems} ${formData.loanStage >= 21 ? '' : styles.disabledLink} ${step == 22 && styles.activeLink}`}><BiBuildingHouse /> Real Estate Owned</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 22 && setStep(23)} className={`${styles.linkItems} ${formData.loanStage >= 22 ? '' : styles.disabledLink} ${step == 23 && styles.activeLink}`}><TbCashBanknote /> Assets</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 23 && setStep(24)} className={`${styles.linkItems} ${formData.loanStage >= 23 ? '' : styles.disabledLink} ${step == 24 && styles.activeLink}`}><TbDisabled2 /> Liabiities</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 24 && setStep(25)} className={`${styles.linkItems} ${formData.loanStage >= 24 ? '' : styles.disabledLink} ${step == 25 && styles.activeLink}`}><FiGift /> Gifts & Grants</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 25 && setStep(26)} className={`${styles.linkItems} ${formData.loanStage >= 25 ? '' : styles.disabledLink} ${step == 26 && styles.activeLink}`}><GoFileZip /> Declarations</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 27 && setStep(28)} className={`${styles.linkItems} ${formData.loanStage >= 27 ? '' : styles.disabledLink} ${step == 28 && styles.activeLink}`}><TbFileUpload /> Upload Files</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 28 && setStep(29)} className={`${styles.linkItems} ${formData.loanStage >= 28 ? '' : styles.disabledLink} ${step == 29 && styles.activeLink}`}><TbFileDownload /> View Files</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 29 && setStep(30)} className={`${styles.linkItems} ${formData.loanStage >= 29 ? '' : styles.disabledLink} ${step == 30 && styles.activeLink}`}><AiOutlineEye /> Status</span>
                                        </li>
                                    </>) : (<>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 27 && setStep(28)} className={`${styles.linkItems} ${formData.loanStage >= 27 ? '' : styles.disabledLink} ${step == 28 && styles.activeLink}`}><TbFileUpload /> Upload Files</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 28 && setStep(29)} className={`${styles.linkItems} ${formData.loanStage >= 28 ? '' : styles.disabledLink} ${step == 29 && styles.activeLink}`}><TbFileDownload /> View Files</span>
                                        </li>
                                        <li className={styles.links}>
                                            <span  onClick={()=> formData.loanStage >= 29 && setStep(30)} className={`${styles.linkItems} ${formData.loanStage >= 29 ? '' : styles.disabledLink} ${step == 30 && styles.activeLink}`}><AiOutlineEye /> Status</span>
                                        </li>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-0 m-0 mt-4 content'>
                    <div className='flex justify-between lg:justify-end'>
                        <div className='flex items-center gap-3 ml-3 lg:hidden'>
                            <RxHamburgerMenu onClick={()=> setVisible(true)} className='fs-3 cursor-pointer' />
                            <img className='w-8' src={logodark} />
                        </div>
                        <div className='flex justify-end'>
                            <div className='text-end pe-4 flex gap-4 justify-end items-center'>
                                <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1rem' }}>
                                    <Badge value="2"></Badge>
                                </i>
                                <Avatar icon="pi pi-user" onClick={(e) => menu.current.toggle(e)} size="medium" shape="circle" />
                                <Menu model={items} popup ref={menu} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            isLoading ? (
                                <div style={{ minHeight: 'calc(100vh - 100px)' }} className='flex justify-center flex-col gap-4 items-center'>
                                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                                    <h6>Loading...</h6>
                                </div>
                            ) : (
                                <div className='steps flex-col'>
                                    {/* <div>
                                        <Steps currentStep={currentStep} steps={steps} />
                                    </div> */}
                                    <div className="step-in w-full">
                                        <div className='py-3 px-3'>
                                            {renderStep()}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default LoanForm;