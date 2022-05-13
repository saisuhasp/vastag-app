import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';
import {Tabs,Tab} from 'react-bootstrap'
import AdminCus from '../components/AdminCus';
import AdminPro from '../components/AdminPro';
import AdminContact from '../components/AdminContact';

function AdminPage() {
  const [click, setClick] = useState(false);
  // const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);



  return (
    <div className='admin-page'>
      <nav className='admin-navbar'>
        <Link to='/' className='admin-navbar-logo' onClick={closeMobileMenu}>
          VASTAG
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li className='nav-item'>
            <Link
              to='/log-out'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Log Out
            </Link>
          </li>

        </ul>

      </nav>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="customer-details" title="Customer Details">
          <AdminCus />
        </Tab>
        <Tab eventKey="pro-verify" title="Professional Verification">
        <AdminPro />
        </Tab>
        <Tab eventKey="customer-req" title="Customer Requests" >
        <AdminContact />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminPage;
