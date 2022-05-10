import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import { useState } from "react";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  const login_user=JSON.parse(localStorage.getItem("currentUser"));
  const [error,setError]=useState("")
  function navigatehome(){
      if(login_user){
        window.location.href = "/home"
      }else{
        setError("Please login")
      }
    }
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "100px" }}>
          ITC'S HOTEL GROUP
        </h2>
        {/* <h1 data-aos="zoom-out" style={{ color: "black" }}>
        
        </h1> */}
          <span style={{fontSize:"15px",fontWeight:"bold"}}>{error}</span><br></br>
          <button className="btn btn-primary landingBtn" onClick={navigatehome}>Book</button>
        
      </div>
    </div>
  );
}

export default LandingScreen;
