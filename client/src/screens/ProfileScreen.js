import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";
import axios from "axios";

import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  const [user,setUser]=useState([]);
  const user1 = JSON.parse(localStorage.getItem("currentUser"));
  const id=user1._id
  useEffect(() => {
    if (!user1) {
      window.location.href = "/login";
    }
    try{
      axios.get(`api/users/getuserbyid/${id}`)
      .then((user2)=>{
      console.log(user2.data);
      setUser(user2.data)
      })
    }catch(error){
      console.log(error);
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="myProfilebs">
                <p>My Profile</p>
                <p>Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>Reward Points : {user.rewardPoints}</p>
                <p>
                  IsAdmin :{" "}
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
