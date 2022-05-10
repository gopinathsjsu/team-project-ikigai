import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function AboutScreen() {
  return (
    <div className="aboutus-content">
      <div className="boutus-text">
        <h2 data-aos="zoom-in" style={{ color: "Black", fontSize: "100px" }}>
          Welcome to the ITC Hotel.
        </h2>
        <div style={{ width: "90%" , margin:"auto", alignItems: "center"}}>
          <p data-aos="zoom-in" style={{ color: "black", fontSize: "200px" }}>
            <b>
              A luxury lifestyle hotel in Historic Downtown McMinnville–the
              heart of Oregon Wine Country–the 36 room ITC Hotel has grown out
              of the roots of our community. Our appreciation of the magical
              town of McMinnville and the surrounding Willamette Valley is
              second only to the unique understanding we have of it — something
              we’re eager to share at every opportunity. At the ITC Hotel, we
              know it’s the added detail in every distinctive room and our
              insider’s perspective that enable you to soak up our Oregon wine
              country lifestyle. It’s what makes the Atticus much more than a
              hotel: it’s where you belong. A luxury lifestyle hotel in Historic
              Downtown McMinnville–the heart of Oregon Wine Country–the 36 room
              ITC Hotel has grown out of the roots of our community. Our
              appreciation of the magical town of McMinnville and the
              surrounding Willamette Valley is second only to the unique
              understanding we have of it — something we’re eager to share at
              every opportunity. At the ITC Hotel, we know it’s the added detail
              in every distinctive room and our insider’s perspective that
              enable you to soak up our Oregon wine country lifestyle. It’s what
              makes the Atticus much more than a hotel: it’s where you belong.
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutScreen;
