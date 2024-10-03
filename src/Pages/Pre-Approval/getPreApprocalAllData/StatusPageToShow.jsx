import React, { useEffect, useState } from 'react';
import ReviseCongratulationsPage from './ReviseCongratulations';
import DocumentsSubmitted from './DocumentsSubmitted';
import axios from 'axios';

function StatusPageToShow() {
    const [documentSubmitted, setDocumentSubmitted] = useState("");
    const [loader, setLoader] = useState(true)
    const loanNumber = localStorage.getItem("loanNo.");

    console.log("loanNumber", loanNumber);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.oqteq.com/api/v1/preapproval/summary/details/${loanNumber}`);
            const data = response?.data?.rows[0]; // Accessing the first item in the "rows" array
            if (data) {
                setLoader(false)
                setDocumentSubmitted(data.status);
                console.log(data);
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
          {
            !loader   && <div>{documentSubmitted === "Pre-Qualified" ? <DocumentsSubmitted /> : <ReviseCongratulationsPage />}</div>
                     }
        </>
    );
}

export default StatusPageToShow;