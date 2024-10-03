import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../common/Sidebar';
import { Outlet, useLocation } from 'react-router-dom'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu';
import { useDispatch } from 'react-redux'
import { authActions } from '../../Features/authSlice'
import { Badge } from 'primereact/badge';
import { logodark } from '../../assets';
import {RxHamburgerMenu} from 'react-icons/rx'
import ResponsiveSidebar from '../common/ResponsiveSidebar';

const DashboardLayout = (props) => {
    const [visible, setVisible] = useState(false);
    const menu = useRef(null);
    const dispatch = useDispatch();
    const items = [
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
                dispatch(authActions.logout())
            }
        }
    ];
    
    return (
        <div>
            <ResponsiveSidebar visible={visible} onHide={()=>  setVisible(false)} />
            <div className='sidebar-layout' style={{ maxWidth: '100%',  margin: 'auto' }}>
                <div className='px-0 m-0 sidebar'>
                    <Sidebar />
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
                    <div className='mt-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;