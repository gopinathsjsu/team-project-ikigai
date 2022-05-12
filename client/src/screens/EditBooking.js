import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import "./EditBooking.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});







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
  const [totaldays,setTotalDays]=useState(0);
  const[amount,setAmount]=useState("")

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.post(`/api/rooms/getroombyid`,{roomid:id})).data;
        
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
      //const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
      

     const totalamount=room.rentperday*totaldays
     console.log("t"+totalamount);
    const data = ( axios.put(`/api/bookings/editdates`,{roomid:id,userid:user._id,toDate:toDate,fromDate:fromDate,totalamount:totalamount})).data;
    }catch(error){
      console.log(error);
    }

   window.open("/MyBookingScreen")
  }

  function filterByDate(dates) {
    console.log(moment(dates[0]).format("DD-MM-YYYY"));
     console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));
      const result=moment(dates[1]).diff(dates[0],'days');
      if(result>7)
      {
        setError("Cannot book room for more than a week");
      }
      
      
     setTotalDays(result);
     
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
          console.log(totaldays);
     const totalamount=room.rentperday*totaldays
     setAmount(`Updated amount ${totalamount}`)
          console.log(availability);
        }
        else{
          setError("please select another date")
        }


    } catch (error) {

    }
  }

  return (
    <div className="editBooking-content" style={{width:"500px",margin:"250px",marginLeft:"400px"}}>
      <div className="editbooking-heading">

            <RangePicker
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }} 
              className="datePicker datePickerDiv"
              format="DD-MM-YYYY"

              onChange={filterByDate}
              style={{ padding:"25px", width:"500px" }}
            />

          </div>
          {error?(<span style={{color:"red"}}>{error}</span>
          ):(<div><span>{message}</span><br></br></div>)}
          
          
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
