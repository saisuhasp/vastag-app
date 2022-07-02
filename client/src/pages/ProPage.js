import React, { useState ,useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../styles/AdminPage.css';
import {Tabs,Tab} from 'react-bootstrap'
import CusNotifiaction from '../components/CusNotifiaction';
import ProPricing from '../components/ProPricing';
import CusReview from '../components/CusReview';

function AdminPage() {
  const [click, setClick] = useState(false);
  // const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  const callProPage = async()=>{
    try {
      const res = await fetch('/pro',{
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json",

        },
        credentials:"include"
      });
      const data  = await res.json();
      // console.log(data);
      if(!res.status === 200){
        const error = new Error(res.error)
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login-signup");
    }
  }

  useEffect(() => {
    callProPage();
    
  }, []);



  return (
    <>
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
        <Tab eventKey="price-details" title="Pricing Details">
          <ProPricing />
        </Tab>
        <Tab eventKey="cus-notify" title="Customer Notification">
        <CusNotifiaction />
        </Tab>
        <Tab eventKey="customer-reviews" title="Customer Reviews" >
        <CusReview />
        </Tab>
      </Tabs>
    </>
  );
}

export default AdminPage;
