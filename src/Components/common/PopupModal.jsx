import React from 'react';
import { Dialog } from 'primereact/dialog';
import {error_img}  from './../../assets'
import {IoMdClose} from 'react-icons/io'
import styles from '../../styles/popModal.module.css'

const PopupModal = ({visible, onHide, message}) => {
    return (
        <Dialog className={styles.customModal} closeIcon={<IoMdClose />} draggable={false} visible={visible} onHide={onHide}>
            <div>
                <div className='mb-3'>
                    <img className='mx-auto w-32 h-16' src={error_img} />
                </div>
                <p className='text-normal text-center text-gray-900 font-semibold'>{message}</p>
            </div>
        </Dialog>
    )
}

export default PopupModal;