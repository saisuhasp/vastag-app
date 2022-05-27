import React from "react";
import CoverFront from "./CoverFront"
import Login from "./Login";
import Signup from "./Signup";
import "./style.css";
export default function LoginSignup() {
    return (
        <div className="page">
            <div className="container">

                <input type="checkbox" id="flip" />
                <CoverFront />
                <div className="forms">
                    <div className="form-content">
                        <Login />
                        <Signup />

                    </div>
                </div>
            </div>
        </div>



    )



}