import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import styles from '../../styles/sidebar.module.css'
import { logolight } from '../../assets';
import { MdClose } from 'react-icons/md'
import { TbCashBanknote, TbDisabled2, TbFileUpload, TbSmartHome } from 'react-icons/tb';
import { AiOutlineEye, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiBuildingHouse, BiUserCircle } from 'react-icons/bi';
import { HiOutlineBriefcase, HiOutlineLocationMarker } from 'react-icons/hi';
import { CgUser } from 'react-icons/cg';
import { GoFileZip } from 'react-icons/go';
import { FiGift } from 'react-icons/fi';

const SmallSidebar = ({ visible, onHide, stage, step, setStep }) => {
    return (
        <Sidebar showCloseIcon={false} className={styles.responsiveSidebar} fullScreen visible={visible} onHide={onHide}>
            <div className='flex justify-between items-center'>
                <img className='w-4' src={logolight} />
                <MdClose onClick={onHide} className='text-white text-xl cursor-pointer' />
            </div>
            <div id='sidebar-scroll' className={`${styles.sidebarItems2} mt-4`}>
                <li className={styles.links}>
                    <span onClick={() => setStep(1)} className={`${styles.linkItems} ${(step >= 1 && step <= 6) ? styles.activeLink : ''}`}><AiOutlineInfoCircle /> General Info</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 6 && setStep(8)} className={`${styles.linkItems} ${stage >= 6 ? '' : styles.disabledLink} ${step === 8 ? styles.activeLink : ''}`}><BiUserCircle /> Co- Borrower’s Info</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 8 && setStep(9)} className={`${styles.linkItems} ${stage >= 8 ? '' : styles.disabledLink} ${(step >= 9 && step <= 11) && styles.activeLink}`}><BiUserCircle /> Personal Info</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 9 && setStep(12)} className={`${styles.linkItems} ${stage >= 9 ? '' : styles.disabledLink}  ${step === 12 && styles.activeLink}`}><HiOutlineLocationMarker /> Primary  & Mailing Address</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 12 && setStep(13)} className={`${styles.linkItems} ${stage >= 12 ? '' : styles.disabledLink}  ${step === 13 && styles.activeLink}`}><HiOutlineLocationMarker /> Former Address</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 13 && setStep(14)} className={`${styles.linkItems} ${stage >= 13 ? '' : styles.disabledLink} ${(step >= 14 && step <= 18) && styles.activeLink}`}><TbSmartHome /> Subject Property Info</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 14 && setStep(19)} className={`${styles.linkItems} ${stage >= 14 ? '' : styles.disabledLink} ${step == 19 && styles.activeLink}`}><CgUser /> Realtor Information</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 19 && setStep(20)} className={`${styles.linkItems} ${stage >= 19 ? '' : styles.disabledLink} ${step == 20 && styles.activeLink}`}><HiOutlineBriefcase /> Employment Information</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 20 && setStep(21)} className={`${styles.linkItems} ${stage >= 20 ? '' : styles.disabledLink} ${step == 21 && styles.activeLink}`}><TbCashBanknote /> Other Income Information</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 21 && setStep(22)} className={`${styles.linkItems} ${stage >= 21 ? '' : styles.disabledLink} ${step == 22 && styles.activeLink}`}><BiBuildingHouse /> Real Estate Owned</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 22 && setStep(23)} className={`${styles.linkItems} ${stage >= 22 ? '' : styles.disabledLink} ${step == 23 && styles.activeLink}`}><TbCashBanknote /> Assets</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 23 && setStep(24)} className={`${styles.linkItems} ${stage >= 23 ? '' : styles.disabledLink} ${step == 24 && styles.activeLink}`}><TbDisabled2 /> Liabiities</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 24 && setStep(25)} className={`${styles.linkItems} ${stage >= 24 ? '' : styles.disabledLink} ${step == 25 && styles.activeLink}`}><FiGift /> Gifts & Grants</span>
                </li>
                <li className={styles.links}>
                    <span onClick={() => stage >= 25 && setStep(26)} className={`${styles.linkItems} ${stage >= 25 ? '' : styles.disabledLink} ${step == 26 && styles.activeLink}`}><GoFileZip /> Declarations</span>
                </li>
                <li className={styles.links}>
                    <span  onClick={()=>stage >= 27 && setStep(28)} className={`${styles.linkItems} ${stage >= 27 ? '' : styles.disabledLink} ${step == 28 && styles.activeLink}`}><TbFileUpload /> Upload Files</span>
                </li>
                <li className={styles.links}>
                    <span  onClick={()=>stage >= 28 && setStep(29)} className={`${styles.linkItems} ${stage >= 28 ? '' : styles.disabledLink} ${step == 29 && styles.activeLink}`}><AiOutlineEye /> Status</span>
                </li>
            </div>
        </Sidebar>
    )
}

export default SmallSidebar;