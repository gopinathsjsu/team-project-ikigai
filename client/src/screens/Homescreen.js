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
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));

      var tempRooms = [];
      for (const room of duplicateRooms) {
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
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
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
      const tempRooms = duplicateRooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
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
        src="https://cache.marriott.com/content/dam/marriott-renditions/MAALC/maalc-itc-room-9934-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*"
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

        <div className="col-md-4">
        <label for="rooms" className="fliteredDataLabel">Location</label>
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
              <option value="all">Hyderabad</option>
              <option value="delux">Dubai</option>
              <option value="non-delux">London</option>
              <option value="all">California</option>
              <option value="delux">Newyork</option>
              <option value="non-delux">Texas</option>
            </select>
          </div>
          <div className="col-md-4">
          <label for="rooms">Date</label>
            <RangePicker
              className="datePicker datePickerDiv"
              format="DD-MM-YYYY"
              onChange={filterByDate}
              // style={{ padding:"25px" }}
            />
          </div>
          <div className="col-md-4">
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
              <option value="all">Double</option>
              <option value="delux">Suite</option>
              <option value="non-delux">Single</option>
            </select>
          </div>
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
              <div className="col-md-6" data-aos="flip-down">
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
