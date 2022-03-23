import React from "react";
import "./style1.css"
export default function SignupPro() {
    return (
        <div className="page">
            <div className="container">
                <div className="title">Registration for Professionals</div>
                <div className="content">
                    <form action="#">
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input type="text" placeholder="Enter your name" required />
                            </div>

                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" placeholder="Enter your password" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input type="password" placeholder="Confirm your password" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" placeholder="Enter your Address" required />
                            </div>
                            <div className="input-box">
                                <span className="details">City</span>
                                <input type="text" placeholder="Enter your Address" required />
                            </div>
                            <div className="input-box">
                                <span className="details">State</span>
                                <input type="text" placeholder="Enter your Address" required />
                            </div>
                            

                        </div>
                        <div className="pro-details">
                            <input type="radio" name="professional" id="dot-1" />
                            <input type="radio" name="professional" id="dot-2" />
                            <input type="radio" name="professional" id="dot-3" />
                            <input type="radio" name="professional" id="dot-4" />
                            <input type="radio" name="professional" id="dot-5" />
                            {/* <input type="radio" name="gender" id="dot-6" /> */}

                            <span className="pro-title">Select Professional</span>
                            <div className="category">
                                <label for="dot-1">
                                    <span className="dot one"></span>
                                    <span className="professional">Electrican</span>
                                </label>
                                <label for="dot-2">
                                    <span className="dot two"></span>
                                    <span className="professional">Carpenter</span>
                                </label>
                                <label for="dot-3">
                                    <span className="dot three"></span>
                                    <span className="professional">Plumber</span>
                                </label>
                                <label for="dot-4">
                                    <span className="dot four"></span>
                                    <span className="professional">Maids</span>
                                </label>
                                <label for="dot-5">
                                    <span className="dot five"></span>
                                    <span className="professional">Painter</span>
                                </label>
                            </div>
                        </div>
                        <div className="gender-details">
                            <input type="radio" name="gender" id="dot-1" />
                            <input type="radio" name="gender" id="dot-2" />
                            <input type="radio" name="gender" id="dot-3" />
                            <span className="gender-title">Gender</span>
                            <div className="category">
                                <label for="dot-1">
                                    <span className="dot one"></span>
                                    <span className="gender">Male</span>
                                </label>
                                <label for="dot-2">
                                    <span className="dot two"></span>
                                    <span className="gender">Female</span>
                                </label>
                                <label for="dot-3">
                                    <span className="dot three"></span>
                                    <span className="gender">Prefer not to say</span>
                                </label>
                            </div>
                        </div>
                        <div className="documents">
                            <p className="details">Upload Documents for verification</p>
                            <input type="file" id="myFile" name="filename" required />
                            <p className="details">Add Profile Picture</p>
                            <input type="file" id="myFile" name="filename" required />
                        </div>
                        <div className="button">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}