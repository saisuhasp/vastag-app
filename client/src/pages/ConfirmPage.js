
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams,useNavigate } from 'react-router-dom'
import "../styles/ConfirmPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const ConfirmPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    var id = searchParams.get("id");
    var tier = searchParams.get("tier");

    var [userData, setUserData] = useState("");
    var [cusData, setCusData] = useState("")
    useEffect(() => {

        if (userData === "" && cusData === "") {
            async function showAdminCus() {

                try {
                    const res = await fetch('/search', {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include"
                    })

                    const data = await res.json();
                    setUserData(data)
                    const response = await fetch('/confirm', {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include"
                    })
                    const cusRes = await response.json()
                    setCusData(cusRes)

                } catch (error) {
                    console.log(error)
                }
            }
            showAdminCus()
        }
    }, [])
    var myData = {};
    console.log(cusData)
    for (let i in userData) {
        // console.log(userData[i])
        if (id === userData[i]._id) {
            myData = userData[i]
        }
    }



    if (myData !== "") {
        if (myData.tiers !== undefined) {
            const putData = {
                customer: {
                    "name": cusData.name,
                    "email": cusData.email,
                    "phoneNo": cusData.phoneNo,
                    "address": cusData.address,
                    "city": cusData.city,
                    "state": cusData.state,

                },
                professional: {
                    "name": myData.name,
                    "email": myData.email,
                    "phoneNo": myData.phoneNo,
                    "rating": 4,
                    "profession": myData.profession,
                    "tier_name": myData.tiers[`tier${tier}_name`],
                    "tier_price": myData.tiers[`tier${tier}_price`]
                }
            }
            async function addTier() {
                alert(`You purchased Tier ${putData.professional.tier_name}`)

                const res = await fetch('/confirm', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ putData })
                });
                const data = res.json();
                navigate("/home")
                // navigateTo(trnsactionCreateAPI(putData))

                // add as create Functionn here(putData)

                //  Create call-{POST or PUT} (putData)

            }
            return (
                <div className="confirm-page" >
                    <Navbar />
                    <div className="confirm-content">
                        <h1 className="confirm-heading">This is to confirm you have chosen the service of </h1>
                        <div className="panel">
                            <img src={require('../images/download.png')} className="profile-pic" />
                            <div className="profile-details">
                                <div className="info-box">
                                    <p className="info">Full Name : </p>
                                    <p className="info-details">{putData.professional.name}</p>

                                </div>

                                <div className="info-box">
                                    <p className="info">Email: </p>
                                    <p className="info-details">{putData.professional.email}</p>
                                </div>
                                <div className="info-box">
                                    <p className="info">Phone Number : </p>
                                    <p className="info-details">{putData.professional.phoneNo}</p>
                                </div>

                                <div className="info-box">
                                    <p className="info">Rating: </p>
                                    <p className="info-details">{putData.professional.rating}/5</p>
                                </div>
                                <div className="info-box">
                                    <p className="info">Professional: </p>
                                    <p className="info-details">{putData.professional.profession}</p>
                                </div>
                                <div className="info-box">
                                    <p className="info">Tier Type: </p>
                                    <p className="info-details">{putData.professional.tier_name}</p>
                                </div>
                                <div className="info-box">
                                    <p className="info">Price </p>
                                    <p className="info-details">{putData.professional.tier_price}</p>
                                </div>
                            </div>
                        </div>
                        <button className='confirm-button' onClick={addTier}>Confirm</button>
                    </div>
                    <Footer />
                </div>

            )
        }
    }
}

export default ConfirmPage