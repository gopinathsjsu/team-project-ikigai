import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [location, setLoc] = useState("all");
  const [locRooms,setlocRooms]=useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        //console.log(data);
        setRooms(data);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  function filterByDate(dates) {
    console.log(moment(dates[0]).format("DD-MM-YYYY"));
    console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
       setToDate(moment(dates[1]).format("DD-MM-YYYY"));
       var result=moment(dates[1]).diff(dates[0],'days');
       console.log(result);
       if(result>7)
       {
         setError("Can't book rooms for more than 1 week")
       }
     
      let tempRooms = [];
      for (const room of rooms) {
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
        console.log(availability == true || room.currentbookings.length == 0)
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
      console.log(rooms);
    } catch (error) {}
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }
  function filterByType(type) {
    setType(type);
    console.log(type);
    if (type !== "all") {
      const tempRooms = rooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(rooms);
    }
  }
  function filterByLoc(location) {
    setLoc(location);
    console.log(location);
    if (location !== "all") {
      const tempRooms = duplicateRooms.filter(
        (x) => x.location.toLowerCase() == location.toLowerCase()
      );
      setRooms(tempRooms);
      
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="homescreen">
      <img
        className="homescreen-image"
        src="https://www.marriott.com/content/dam/dme/hero/DemandGen_5_2_22_AEM_SupersizeHero_3240x1620_04_27_22-1.jpg.transform/mcom-hp-transform-2880x1620/image.jpg"
        alt="The Hotel"
        style={{ width: "100%", height: "800px" }}
      />

      <div className="container">
     

        <div className="row mt-5 fliteredData">

        <div className="col-md-12">
          <label for="rooms">Search Hotel Name</label>
            <input
              type="text"
              className="form-control searchRooms"
              placeholder="Search hotel name"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </div>

        <div className="col-md-4" style={{marginTop:"15px"}}>
        <label for="location" className="fliteredDataLabel">Location</label>
            <select
              name="location"
              className="form-control dropdownCategory"
              value={location}
              onChange={(e) => {
                filterByLoc(e.target.value);
              }}
              required
            >
              {/* <option value="" selected disabled>
                Category
              </option> */}
              <option value="Hyderabad">Hyderabad</option>
              <option value="Dubai">Dubai</option>
              <option value="London">London</option>
              <option value="California">California</option>
              <option value="Newyork">Newyork</option>
              <option value="Texas">Texas</option>
            </select>
          </div>
          <div className="col-md-4" style={{marginTop:"15px"}}>
          <label for="rooms">Date</label><br></br>
          
            <RangePicker
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }} 
              className="datePicker datePickerDiv"
              format="DD-MM-YYYY"
              onChange={filterByDate}
              minDate={new Date()}
              // style={{ padding:"25px" }}
            />
             {/* <span style={{color:"red",fontWeight:"bolder",fontSize:"20px", marginTop:"5px;"}}>{error}</span> */}


          </div>
          <div className="col-md-4" style={{marginTop:"15px"}}>
          <label for="rooms">Category</label>
            <select
              name="category"
              className="form-control dropdownCategory"
              value={type}
              onChange={(e) => {
                filterByType(e.target.value);
              }}
              required
            >
              {/* <option value="" selected disabled>
                Category
              </option> */}
              <option value="all">All</option>
              <option value="Suite">Suite</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
          </div>
          <button className="btn btn-primary m-2" >Search</button>
        </div>
        
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          rooms.map((x) => {
            return (
              <div className="col-md-10" data-aos="flip-down">
                <Room room={x} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
