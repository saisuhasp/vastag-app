import React,{useEffect,useState} from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link , useNavigate} from 'react-router-dom';
function ProContact() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  const [userData,setUserData] = useState({
    name :"",
    email : "",
    message:""
  });

  const callContactPage = async()=>{
    try {
      const res = await fetch('/pro-contact',{
        method:"GET",
        headers:{
           "Content-Type":"application/json",

        }
      });
      const data  = await res.json();
      setUserData({...userData, name:data.name,email:data.email});

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
    callContactPage();
    
  },[]);
  const handleInputs = (e)=>{
    const name  = e.target.name;
    const value  = e.target.value;
    setUserData({...userData,[name]:value})
    
  }
  const contactForm =async(e)=>{
    
    e.preventDefault();
    const {name,email,message} = userData;
    const res = await fetch('/pro-contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        name:name,
        email:email,
        message:message
      })
    });
    const  data  =await res.json();
    if(!data){
      console.log("message not sent");
    }else{
      alert("Message Sent");
      setUserData({...userData,message:""})
    }
  }
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
    <div className="contact">
      <h1> Contact Us</h1>

      <form className ="contact-form" method="POST">
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text"  defaultValue={userData.name}
          
        />
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" defaultValue={userData.email}
           />
        <label htmlFor="message">Message</label>
        <textarea
          rows="6"
          placeholder="Enter message..."
          name="message"
          onChange={handleInputs}
          required
        ></textarea>
        <button type="submit" onClick={contactForm}> Send Message</button>
      </form>
    </div>
    <Footer />
    </>
    
  );
}

export default ProContact;
