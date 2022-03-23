import React from "react";

export default function SignupCus() {
    return (
        <div className="page">
            <div className="container">
                <div className="title">Profile</div>
                <div className="content">
                    <div className="user-information">

                        <div className="info-box">
                            <p className="info">Profile Picture</p>
                            <img src={require('./download.png')} className="profile-pic" />
                        </div>
                        <div className="info-box">
                            <p className="info">Full Name : </p>
                            <p className="info-details">John Joe</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Email: </p>
                            <p className="info-details">johnjoe@gmail.com</p>
                        </div>
                        <div className="info-box">
                            <p className="info">Phone Number : </p>
                            <p className="info-details">9999999999</p>
                        </div>

                        <div className="info-box">
                            <p className="info">Address: </p>
                            <p className="info-details">1005, A Wing, Mittal Towers, M G Road</p>
                        </div>
                        <div className="info-box">
                            <p className="info">City: </p>
                            <p className="info-details">Bangalore</p>
                        </div>
                        <div className="info-box">
                            <p className="info">State: </p>
                            <p className="info-details">Karnataka</p>
                        </div>
                        <div className="button">
                            <button>Edit Profile</button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}