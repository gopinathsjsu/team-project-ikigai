import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import LandingScreen from "./screens/LandingScreen";
import OurHotelsScreen from "./screens/OurHotelsScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import EditBooking from "./screens/EditBooking";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route path="/" exact component={LandingScreen} />

        <Switch>
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            component={Bookingscreen}
          />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/bookings" exact component={ProfileScreen} />
          <Route path="/admin" exact component={AdminScreen} />

          <Route path="/home" exact component={Homescreen} />
          <Route path="/HotelsScreen" exact component={OurHotelsScreen} />
          <Route path="/About" exact component={AboutScreen} />
          <Route path="/Contact" exact component={ContactScreen} />
          <Route path="/EditBooking/:id" exact component={EditBooking} />
          <Route path="/OurHotelsScreen" exact component={OurHotelsScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
