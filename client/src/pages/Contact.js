import React from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Contact() {
  return (
    <>
    <Navbar />
    <div className="contact">
      <h1> Contact Us</h1>

      <form className ="contact-form" method="POST">
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" />
        <label htmlFor="message">Message</label>
        <textarea
          rows="6"
          placeholder="Enter message..."
          name="message"
          required
        ></textarea>
        <button type="submit"> Send Message</button>
      </form>
    </div>
    <Footer />
    </>
    
  );
}

export default Contact;
