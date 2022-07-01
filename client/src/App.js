import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSigupPage/LoginSignup";
import SignupPro from "./pages/SignupPages/SignupPro";
import SignupCus from "./pages/SignupPages/SignupCus";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import AboutPro from "./pages/AboutPro"
import Search from "./pages/Search";
import ReviewsPage from "./pages/ReviewsPage";
import AdminPage from "./pages/AdminPage";
import ProPage from "./pages/ProPage";
import Error from './pages/Error';
import ConfirmPage from './pages/ConfirmPage';

// import NavBar2 from "./components/NavBar2";
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path='/login-signup' element={<LoginSignup />} />
                <Route path="/signup-pro" element={<SignupPro />} />
                <Route path="/signup-customer" element={<SignupCus />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/about-pro" exact element={<AboutPro />} />
                <Route path='/log-out' element={<Logout />} />
                <Route path="/search" exact element={<Search />} />
                <Route path="/reviews" exact element={<ReviewsPage />} />
                <Route path="/admin" exact element={<AdminPage />} />
                <Route path="/pro" exact element={<ProPage />} />
                <Route path="/confirm" exact element={<ConfirmPage />} />

                <Route path="*" exact element={<Error />} />

            </Routes>
        </Router>
    )
}