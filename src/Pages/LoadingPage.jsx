import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LoadingPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/set-password', {state: {token: token}})
    })
    return ( 
        <div className='flex justify-center items-center' style={{ height: '80vh' }}>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
            <h6>Loading...</h6>
        </div>
    );
}

export default LoadingPage;