import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";
import "./profile.css"
import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="profile" style={{}}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Personal info" key="1">
          
            <div className="_169grxv2" style={{borderStyle:"solid", borderRadius:"20px", alignSelf:"center",opacity:"90%",height:"500px",width:"1500px",marginLeft:"200px"}}>
              
              <h1 tabindex="-1" elementtiming="LCP-target" class="_14i3z6h">
                <div class="_1yrl4d7p" style={{margin:"50px",fontWeight:"bold",fontSize:"25px", color:"black"}}>Personal info</div>
              </h1>
              <div class="_s50zru">
                <div id="legalName" aria-disabled="false" role="group" aria-labelledby="legalName-row-title" class="rcem0st dir dir-ltr">
                  <div class="_jro6t0">
                    <div class="_37qdzt">
                    <div id="legalName-row-title" class="_gw4xx4">
                      <section>
                        <h2 tabindex="-1" class="_14i3z6h" elementtiming="LCP-target">Name</h2></section>
                    </div>
                    <div id="legalName-row-subtitle" class="_hi9sy" style={{fontSize:"15px",margin:"10px"}}><span>{user.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="_s50zru" style={{marginTop:"20px"}}>
                <div id="legalName" aria-disabled="false" role="group" aria-labelledby="legalName-row-title" class="rcem0st dir dir-ltr">
                  <div class="_jro6t0">
                    <div class="_37qdzt">
                    <div id="legalName-row-title" class="_gw4xx4">
                      <section>
                        <h2 tabindex="-1" class="_14i3z6h" elementtiming="LCP-target" style={{margin:"20px"}}>Email Address</h2></section>
                    </div>  
                    <div id="legalName-row-subtitle" class="_hi9sy" style={{fontSize:"15px",margin:"10px"}}><span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="_s50zru" style={{marginTop:"20px"}}>
              <div id="legalName" aria-disabled="false" role="group" aria-labelledby="legalName-row-title" class="rcem0st dir dir-ltr">
                  <div class="_jro6t0">
                    <div class="_37qdzt">
                    <div id="legalName-row-title" class="_gw4xx4">
                      <section>
                        <h2 tabindex="-1" class="_14i3z6h" elementtiming="LCP-target">Reward Points </h2></section>
                    </div>
                    <div id="legalName-row-subtitle" class="_hi9sy" style={{margin:"10px"}}><span>{user.rewardPoints}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
             
                
                <p> </p>
                
              </div>
          
          
        </TabPane>
        {/* <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
