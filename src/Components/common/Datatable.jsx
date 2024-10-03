
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from '../../styles/Datatable.module.css';

export default function Datatable() {
    const [products, setProducts] = useState([
        {
            loan: 'A12B3C',
            date: '5/1/2023',
            purpose: 'Purchase',
            address: '14 Crifton Down Road Crifton, NJ 07470',
            status: 'Approved',
        },
        {
            loan: 'A12B3C',
            date: '5/1/2023',
            purpose: 'Purchase',
            address: '14 Crifton Down Road Crifton, NJ 07470',
            status: 'Approved',
        },
    ]);

    return (
        <div className={styles.table}>
            <DataTable stripedRows  value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="loan" header="Loan #"></Column>
                <Column field="date" header="Date"></Column>
                <Column field="purpose" header="Purpose"></Column>
                <Column field="address" header="Address"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </div>
    );
}