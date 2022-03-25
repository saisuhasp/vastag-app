import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        {/* <img src={Logo} /> */}
        <h2 className="logo">VASTAG</h2>
        <div className="hiddenLinks">
          <Link to="/home"> Home </Link>
          <Link to="/contact"> Contact </Link>
          <Link to="/profile"> Profile </Link>
          <Link to="/log-out"> Log Out </Link>
        </div>
      </div>
      <div className="rightSide">
      <Link to="/home"> Home </Link>
          <Link to="/contact"> Contact </Link>
          <Link to="/profile"> Profile </Link>
          <Link to="/log-out"> Log Out </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
