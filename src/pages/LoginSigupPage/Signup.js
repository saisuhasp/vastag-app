import React from "react";
import { useNavigate } from "react-router-dom";


export default function Signup() {
    let navigate = useNavigate();
    return (
        <div className="signup-form">
            <div className="title">Signup</div>

            <div className="sign-up-btn-div">
                <form onSubmit={()=>{ navigate('/signup-pro')}}>
                    <div className="button input-box">
                        <input type="submit" value="I am a Professional" />
                    </div>
                </form>

                <form onSubmit={()=>{ navigate('/signup-customer')}}>
                    <div className="button input-box">
                        <input type="submit" value="I am a Customer" />
                    </div>
                </form>
            </div>
            <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label>
            </div>
        </div>


    )
}