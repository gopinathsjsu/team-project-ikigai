import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function OurHotelsScreen() {
  return (
    <div className="ourhotel-content">
      <div className="ourhotel-text">
        <h2 data-aos="zoom-in" style={{ color: "Black", fontSize: "100px" }}>
          4 collections. 17 brands. 6,000 destinations.
        </h2>
        <p
          data-aos="zoom-in"
          style={{ color: "white", fontSize: "200px", textAlign: "center" }}
        >
          <b>
            Allow us to open up your world with True Hospitality for Good. Our
            diverse set of global destinations exist to broaden your choices,
            invite you to save or splurge, and encourage you with welcoming
            experiences at every arrival. Which brand will you choose for your
            next getaway?
          </b>
        </p>
        <p
          data-aos="zoom-in"
          style={{ color: "white", fontSize: "200px", textAlign: "center" }}
        >
          <b>
            Distinguished design and unforgettable service bind the Luxury &
            Lifestyle Collection together making every journey a celebration of
            extraordinary experiences, each in their unique way.
          </b>
        </p>
        <p
          data-aos="zoom-in"
          style={{ color: "white", fontSize: "200px", textAlign: "center" }}
        >
          <b>
            By making travel both personal and purposeful, the Premium
            Collection gives guests a sense of belonging and well-being with
            thoughtful details and exceptional locations.
          </b>
        </p>
      </div>
    </div>
  );
}

export default OurHotelsScreen;
