import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FolderLinksPage() {
    const [folderLinks, setFolderLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const user_id = user.user_id;
    const loan_number = localStorage.getItem("loanNo.");

    useEffect(() => {
        fetchFolderLinks();
    }, []);

    const fetchFolderLinks = async () => {
        try {
            const response = await axios.get(`https://api.oqteq.com/api/v1/doc/get/${loan_number}/${user_id}`);
            console.log('API Response:', response.data.folderLinks);
            setFolderLinks(response.data.folderLinks);
            setIsLoading(false);
        } catch (error) {
            
            setIsLoading(false);
            console.error('Error fetching folder links:', error);
        }
    };

    console.log('folderLinks:', folderLinks);

    return (
        <div className="folder-links-page">
        <h2>Folder Links</h2>
        {isLoading ? (
            <p>Loading folder links...</p>
        ) : (
            <ul>
                {folderLinks.map((linkObj, index) => (
                    <li key={index}>
                        <h3>Links for Index {index}:</h3>
                        <ul>
                            {Object.entries(linkObj).map(([key, link]) => (
                                <li className='mt-2' key={key}>
                                    <Link to={link} target="_blank" rel="noopener noreferrer">
                                        {key}: {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}

export default FolderLinksPage;
