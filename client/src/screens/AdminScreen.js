import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import AdminBookingScreen from "./AdminBookingScreen";
import AdminRoomScreen from "./AdminRoomScreen";
import AdminUserScreen from "./AdminUserScreen";
import AdminAddRoomScreen from "./AdminAddRoomScreen";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="admin_screen" >
      <h1 className="text-center" style={{fontWeight:"bold",fontSize:"20px"}}>Hotel Employee portal</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        {/* <TabPane tab="Bookings" key="1">
          <AdminBookingScreen></AdminBookingScreen>
        </TabPane> */}
        {/* <TabPane tab="Rooms" key="2">
          <AdminRoomScreen></AdminRoomScreen>
        </TabPane> */}
        <TabPane tab="Add Room" key="3">
          <AdminAddRoomScreen></AdminAddRoomScreen>
        </TabPane>
        <TabPane tab="Users" key="4">
          <AdminUserScreen></AdminUserScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
