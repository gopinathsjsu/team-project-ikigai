import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  const login_user=JSON.parse(localStorage.getItem("currentUser"));
  function navigatehome(){
      if(login_user.isAdmin==true){
        window.location.href = "/admin"
      }else{
        window.location.href = "/home"
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
        
          <button className="btn btn-primary landingBtn" onClick={navigatehome}>Book</button>
        
      </div>
    </div>
  );
}

export default LandingScreen;
