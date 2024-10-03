import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import styles from '../../styles/sidebar.module.css'
import { logolight } from '../../assets';
import {MdClose} from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { TbFileDollar, TbSmartHome } from 'react-icons/tb';
import { FiDollarSign } from 'react-icons/fi';
import { BsCheck2Square } from 'react-icons/bs';

const ResponsiveSidebar = ({ visible, onHide }) => {
    return (
        <Sidebar showCloseIcon={false} className={styles.responsiveSidebar} fullScreen visible={visible} onHide={onHide}>
            <div className='flex justify-between items-center'>
                <img className='w-4' src={logolight} />
                <MdClose onClick={onHide} className='text-white text-xl cursor-pointer' />
            </div>
            <div id='sidebar-scroll' className={`${styles.sidebarItems} mt-4`}>
                <div>
                <li onClick={onHide} className={styles.links}>
                    <NavLink to='/dashboard' activeClassName={styles.activeLink} ><TbSmartHome /> Dashboard</NavLink>
                </li>
                <li onClick={onHide} className={styles.links}>
                    <NavLink to='/loans/closed' activeClassName={styles.activeLink}><FiDollarSign /> Closed Loans</NavLink>
                </li>
                <li onClick={onHide} className={styles.links}>
                    <NavLink to='/loans/opened' activeClassName={styles.activeLink}><TbFileDollar /> Open Loans</NavLink>
                </li>
                <li onClick={onHide} className={styles.links}>
                    <NavLink to='/loans/pre-approve' activeClassName={styles.activeLink}><BsCheck2Square /> Preapproved Loans</NavLink>
                </li>
                </div>
            </div>
        </Sidebar>
    )
}

export default ResponsiveSidebar;