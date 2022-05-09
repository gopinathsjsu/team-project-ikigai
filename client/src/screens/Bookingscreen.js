import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import RoomsDropdown from "./rooms";

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [roomcount, setroomcount] = useState(1);
  const [rew, setRew] = useState(false);
  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [b, setB] = useState(false);
  const [g, setG] = useState(false);
  const aminities = [];
  const [p, setP] = useState(false);
  const [m, setM] = useState(false);
  var price = 0;
  function weekends() {
    var we = 0;
    var currentDate = new Date(fromdate);
    var toodate = new Date(todate);

    console.log(currentDate <= todate);
    while (currentDate <= todate) {
      if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
        we++;
        console.log("w" + we);
      }

      currentDate = currentDate.addDays(1);
    }
    console.log("w" + we);
    return we;
  }
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  useEffect(() => {
    console.log(user);
    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        //console.log(data);
        setRoom(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);
  const totalPrice = () => {
    price = roomcount * (totaldays * room.rentperday + Number(weekends()) * 50);
    if (b) {
      price += 30;
    }
    if (g) {
      price += 10;
    }
    if (p) {
      price += 10;
    }
    if (m) {
      price += 50;
    }
    return price;
  };

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    // setTotalAmount(roomcount*((totaldays * room.rentperday)+(Number(weekends())*50)));
  }, [room]);

  const onToken = async () => {
    if (b) {
      aminities.push("Breakfast");
    }
    if (g) {
      aminities.push("Gym access");
    }
    if (p) {
      aminities.push("Parking");
    }
    if (m) {
      aminities.push("Lunch and Dinner");
    }
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount: totalPrice(),
      totaldays: totalDays,
      aminities: aminities,
    };

    try {
      setLoading(true);
      const result1 = axios.put(`/api/users/editRewards/${user._id}`);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
    //TESTING CARD
    //https://stripe.com/docs/testing
    //https://www.npmjs.com/package/react-stripe-checkout
    // fetch("/save-stripe-token", {
    //   method: "POST",
    //   body: JSON.stringify(token),
    // }).then((response) => {
    //   response.json().then((data) => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row justify-content-center mt-5 bsBookingScreen">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>

                <p>From Date : {match.params.fromdate}</p>
                <p>To Date : {match.params.todate}</p>
                <p>Available Rooms : {room.maxcount}</p>
              </b>

              <div
                className="col-md-12"
                style={{
                  height: "",
                  width: "",
                  display: "flex",
                  marginRight: "-20px",
                  fontWeight: "",
                }}
              >
                <b>
                  <p for="rooms" style={{ marginRight: "10px" }}>
                    Aminities:
                  </p>
                </b>

                <input
                  type="checkbox"
                  style={{ transform: "scale(0.7)" }}
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  onChange={(e) => setB(e.target.checked)}
                />
                <b>
                  <p>Breakfast($30)</p>
                </b>
                <input
                  type="checkbox"
                  style={{ transform: "scale(0.7)" }}
                  id="vehicle2"
                  name="vehicle2"
                  value="Car"
                  onChange={(e) => setG(e.target.checked)}
                />
                <b>
                  <p> Gym($10)</p>
                </b>

                <input
                  type="checkbox"
                  style={{ transform: "scale(0.7)" }}
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  onChange={(e) => setP(e.target.checked)}
                />
                <b>
                  <p>Parking($10)</p>
                </b>
                <input
                  type="checkbox"
                  style={{ transform: "scale(0.7)" }}
                  id="vehicle2"
                  name="vehicle2"
                  value="Car"
                  onChange={(e) => setM(e.target.checked)}
                />
                <b>
                  <p>Meals($50)</p>
                </b>
              </div>

              <div
                className="col-md-4 dropdownRoomsCount"
                style={{ display: "flex", marginLeft: "400px" }}
              >
                <b>
                  <p for="rooms">Rooms </p>
                </b>

                <select
                  style={{
                    marginLeft: "20px",
                    marginBottom: "10px",
                    align: "right",
                  }}
                  onChange={(e) => setroomcount(e.target.value)}
                >
                  {/*Array.from(Array(Products.count)).map((e,value) => <option key={value} value={value}>{value+1}</option>) */}
                  {Array.apply(1, { length: room.maxcount }).map((e, value) => (
                    <option key={value + 1} value={value + 1}>
                      {value + 1}
                    </option>
                  ))}
                </select>
                <br></br>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>
                  Rent per day(weekdays)/(weekends) : $ {room.rentperday}/ $
                  {room.rentperday + 50}
                </p>
                <div style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    id="count"
                    name="count"
                    value="count"
                    style={{
                      marginLeft: "80px",
                      transform: "scale(0.5)",
                      width: "20px",
                      marginRight: "-400px",
                    }}
                    onChange={(e) => setRew(e.target.checked)}
                  />
                  <label
                    htmlor="count"
                    style={{ height: "50px", width: "300px" }}
                  >
                    (
                    {
                      JSON.parse(localStorage.getItem("currentUser"))
                        .rewardPoints
                    }
                    ) Use reward points
                  </label>
                  <br></br>
                </div>
                {rew ? (
                  <p>
                    Total Amount : ${" "}
                    {totalPrice() -
                      JSON.parse(localStorage.getItem("currentUser"))
                        .rewardPoints}
                  </p>
                ) : (
                  <p>Total Amount : $ {totalPrice()}</p>
                )}
              </b>
            </div>

            <div style={{ float: "right" }}>
              <button className="btn btn-primary" onClick={onToken}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
