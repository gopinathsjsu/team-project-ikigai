import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="" />
      </div>

      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Available Rooms : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
        </b>

        {/* 
        <div>
        Male<input type="radio" value="Male" name="gender" /> 
        Female<input type="radio" value="Female" name="gender" /> 
        Other<input type="radio" value="Other" name="gender" /> 
      </div> */}

        {/* <Options>
      <input type="radio" className="circle" name="icing" defaultValue={1} id="white" style={styles.radioWhite} />
      <label class="radio" htmlFor="white"></label>
      <input type="radio" className="circle" name="icing" defaultValue={2} id="pink" style={styles.radioPink} />
      <label class="radio" htmlFor="pink"></label>
      <input type="radio" className="circle" name="icing" defaultValue={3} id="red" style={styles.radioRed} />
      <label class="radio" htmlFor="red"></label>
    </Options> */}

        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View Detail
          </button>
        </div>
      </div>

      <div
        className="col-md-12"
        style={{
          height: "",
          width: "",
          display: "flex",
          marginTop: "20px",
          fontWeight: ""
        }}
      >
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        Breakfast
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
        Gym
        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
        Swimming Pool
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        Parking
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
        Meals

      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
