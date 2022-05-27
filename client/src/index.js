import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createRoot} from 'react-dom/client'
// import Drop from "./components/Drop"
// import NavBar2 from "./components/NavBar2"
const container= document.getElementById("root");
const root  = createRoot(container)

root.render(

    // <NavBar2 />
    <App/>

    // <h1 style={{color:"blue" ,backgroundColor:"red"}}>Hello</h1>
    
);