import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Features/authSlice';
import CompanyLogo from './CompanyLogo';

const Navbar = () => {
  const {user} = useSelector((state)=> state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = ()=> {
    dispatch(authActions.logout())
  }
  return (
    <>
     {/* <nav className='flex items-center justify-between py-4 px-32'> */}
      <nav className='flex items-center justify-between py-4 w-100 ps-5 pe-5'>
        <CompanyLogo className={'h-16 w-52'} />
      <div>
        {
          user ? (
              <button onClick={logout} className='btn-light-dark'>Logout</button>
          ) : (
            location.pathname === '/login' ? (
              <Link to='/register'>
                <button className='btn-light-dark'>Sign Up</button>
              </Link>
            ) : (
              <Link to='/login'>
                <button className='btn-light-dark'>Login</button>
              </Link>
            )
          )
        }
      </div>
    </nav>
    </>
  )
}

export default Navbar;