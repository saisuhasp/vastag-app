import React,{useEffect,useState} from "react";

import Footer from "../components/Footer";

import ProfilePic from '../images/download.png'
import { Link , useNavigate} from 'react-router-dom';
import '../styles/AdminPage.css';



export default function ProProfile() {
    const closeMobileMenu = () => setClick(false);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const navigate = useNavigate();
    const [userData,setUserData] = useState("");
  const callProfilePage = async()=>{
    try {
      const res = await fetch('/pro-profile',{
        method:"GET",
        headers:{
           Accept:"application/json",
           "Content-Type":"application/json",

        },
        credentials:"include"
      });
      const data  = await res.json();
      setUserData(data);
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
    callProfilePage();
    
  }, []);
 
    return (
        <>
        <nav className='admin-navbar'>
        <Link to='/pro' className='admin-navbar-logo' onClick={closeMobileMenu}>
          VASTAG
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
            <Link
              to='/pro-profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/pro-contact'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
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
        <div className="page">
            <div className="container">
                <div className="title">Profile</div>
                <div className="content">
                    <div className="user-information">

                        <div className="info-box">
                            <p className="info">Profile Picture</p>
                            <img src={ProfilePic} className="profile-pic" />
                        </div>
                        <div className="info-box">
                            <p className="info">Full Name : </p>
                            <p className="info-details">{userData.name}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Email: </p>
                            <p className="info-details">{userData.email}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Phone Number : </p>
                            <p className="info-details">{userData.phoneNo}</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Address: </p>
                            <p className="info-details">{userData.address}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">City: </p>
                            <p className="info-details">{userData.city}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">State: </p>
                            <p className="info-details">{userData.state}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Professional: </p>
                            <p className="info-details">{userData.profession}</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Rating: </p>
                            <p className="info-details">{userData.rating}/5</p>
                        </div>
                        {/* <div className="button">
                            <button>Edit Profile</button>
                        </div> */}
                    </div>



                </div>
            </div>
        </div>
        <Footer />
        </>
        
    )
}