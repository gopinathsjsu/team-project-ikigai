
import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Link, Navigate} from "react-router-dom";

import moment from "moment";

// import Room from "../components/Room";
// import Loader from "../components/Loader";
// import Error from "../components/Error";


import "./EditBooking.css";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

function EditBooking() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [message,setMessage]=useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.post(`/api/rooms/getroombyid`,{roomid:id})).data;
        console.log(data);
        setRoom(data);

      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);
  function changeDates() {
    try{
      console.log("t"+toDate);
      console.log("f"+fromDate);
    const data = ( axios.put(`/api/bookings/editdates`,{roomid:id,userid:user._id,toDate:toDate,fromDate:fromDate})).data;
    }catch(error){
      console.log(error);
    }

  //window.open("/profile")
  }

  function filterByDate(dates) {
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));



        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || room.currentbookings.length == 0) {
          setMessage("room is available for the dates")
        }
        else{
          setMessage("please select another date")
        }


    } catch (error) {

    }
  }

  return (
    <div className="editBooking-content" style={{width:"500px",margin:"250px",marginLeft:"400px"}}>
      <div className="editbooking-heading">

            <RangePicker
              className="datePicker datePickerDiv"
              format="DD-MM-YYYY"

              onChange={filterByDate}
              style={{ padding:"25px", width:"500px" }}
            />

          </div>
          <span>{message}</span>

          <div className="saveBooking">
            <div className="editBooking-savebtn">
            

              <button type="button" class="button" onClick={changeDates}>
                Save Details
              </button>
            </div>
            <div className="editBooking-cancelbtn">
            <Link to="/ProfileScreen">
              <button type="button" class="button">
                Cancel
              </button>
              </Link>
            </div>
          </div>
        </div>
  );
}

export default EditBooking;
