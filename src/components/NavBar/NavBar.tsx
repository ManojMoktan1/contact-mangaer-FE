import React,  {Fragment } from 'react'
import {Link, Outlet} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <Fragment>
        <div className = 'navigation'>
            <Link className = 'logo-container' to='/'>
                CM
            </Link>
            <div className='nav-links-container'>
                
              <Link className='nav-link' to='/contacts'>
                List Contacts
              </Link>
              <Link className='nav-link' to='/contacts/add'>
                Add Contact
              </Link>
            </div>
        </div>
        <Outlet/>

    </Fragment>
  )
}

export default NavBar