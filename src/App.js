import React from "react";
import {BrowserRouter as Router ,Route, Routes, Switch } from "react-router-dom";
import LoginSignup from "./components/LoginSigupPage/LoginSignup";
import SignupPro from "./components/SignupPages/SignupPro";
import SignupCus from "./components/SignupPages/SignupCus";
export default function App(){
    return (
        <Router>
                    <Routes>
                    <Route path='/' element={<LoginSignup />} />
                    <Route path ="/signup-pro" element={<SignupPro />} />
                    <Route path ="/signup-customer" element={<SignupCus />} />
                    </Routes>
         </Router>
    )
}