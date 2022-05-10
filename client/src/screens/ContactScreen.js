import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function ContactScreen() {
  return (
    <div className="contactus-content">
      <div className="contactus-text">
        <h2 data-aos="zoom-in" style={{ color: "Black", fontSize: "100px" }}>
          Contact Us
        </h2>
        <p
          data-aos="zoom-in"
          style={{ color: "black", fontSize: "200px", textAlign: "center" }}
        >
          <b>
            <p>252 Schermerhorn St Brooklyn, </p>
            <p>NY 11217 Tel: 718-313-3636</p>
            <p>Reservations: 844-534-5792 Reservations:</p>
            <p>
              reservations.bk@acehotel.com Events: events.bk@acehotel.com Sales:
            </p>
            <p>
              sales.bk@acehotel.com Folio/Billing: frontdesk.bk@acehotel.com
            </p>
          </b>
        </p>
      </div>
    </div>
  );
}

export default ContactScreen;
