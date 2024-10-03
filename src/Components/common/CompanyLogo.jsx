import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SERVER_PUBLIC_URL = 'https://api.oqteq.com/';

const CompanyLogo = ({className}) => {
  const { company } = useSelector((state)=> state.auth);

  return (
    <div className='text-start my-0 mb-3 '>
        <Link className="mx-auto  w-50" to="/">
            {
                company?.length > 0 && (
                    company[0].logo ? (
                        <img width={120} height={200} className={`${className + ' block h-12 mx-auto'}`} src={SERVER_PUBLIC_URL + company[0].logo} />
                    ) : (
                        <h3 className='text-white'>{company[0].company_name}</h3>
                    )
                )
            }
        </Link>
    </div>
  )
}

export default CompanyLogo;