import React, { useState } from "react";
import "./style1.css"
import Web3 from "web3";
import { CusABI } from "./CusABI";
import { useNavigate } from 'react-router-dom';

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
    CusABI,
    "0xE4af6670aB371Dc54d4D0c8f1ECc277a7c497B0A"
);
function SignupCus() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddres] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')



    const [data, setstr] = useState()


    const setData = async (e) => {
        console.log(name)
        e.preventDefault();
        const res = await fetch('/signup-customer',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:name,
                 email:email, 
                 phoneNo:phoneNo , 
                 password:password,
                 cpassword:cpassword, 
                 address:address, 
                 city:city,
                state:state,
                gender:gender
            })
        });
        const data = await  res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");

        }else{
            window.alert(" Registration Successful");
            console.log(" Registration Successful");
            navigate('/login-signup');
        }

        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        var lst = [
            ...customer, { name, email, phoneNo, gender, address, city, state }
        ];
        let str = ""
        for (let i in lst[0]) {
            let v = lst[0]
            str = str + String(i) + "_" + String(v[i]) + "_"
        }
        const gas = await RemixContract.methods.addData(str).estimateGas();

        const result = await RemixContract.methods
            .addData(str)
            .send({ from: account, gas });
        console.log(result);
       
    }


    const [dataset, setDatatobody] = useState()
    const getData = async e => {
        RemixContract.methods
            .getMessage()
            .call()
            .then((res) => { setDatatobody(res) });
        console.log(dataset)
    };


    // const handleSubmit=()=> { 
    //     const postURL = "http://localhost:5000/api/staff/" 
    //     fetch(postURL, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ 
    //             name: name,
    //             email: email,
    //             phoneNo:phoneNo,
    //             password:password,
    //         })
    //     })
    //     .then(()=>{

    //         alert('You have been added to the system!');
    //     })
    // }


    return (
        <div className="page">
            <div className="container">
                <div className="title">Registration for Customers</div>
                <div className="content">
                    <form method="POST" className="form-reg" >
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input type="text" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input type="password" placeholder="Confirm your password" required value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" placeholder="Enter your Address" required value={address} onChange={(e) => setAddres(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">City</span>
                                <input type="text" placeholder="Enter your City" required value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">State</span>
                                <input type="text" placeholder="Enter your State" required value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <span className="details">Gender</span>
                                <input type="text" placeholder="Enter your gender" required value={gender} onChange={e => setGender(e.target.value)} />
                            </div>

                        </div>

                        <div className="button">
                            <input type="submit" value="Register" onClick={setData} />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupCus;