import React, { Component } from "react"
import { useState } from "react";

class Rooms extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }
  componentDidMount() {
    this.setState({
      rooms: [
        { id: "1", number: "1" },
        { id: "2", number: "2" },
        { id: "3", number: "3" },
        { id: "4", number: "4" },
        { id: "5", number: "5" },
        { id: "6", number: "6" },
        { id: "7", number: "7" },
        { id: "8", number: "8" },
        { id: "9", number: "9" },
        { id: "10", number: "10" },
      ],
    });
  }
  render() {
    const { rooms } = this.state;
    const length = this.props.length;
    let roomsList =
      rooms.length > 0 &&
      rooms.slice(0, length).map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.number}
          </option>
        );
      }, this);
    return (
      <div>
        <select name="rooms" className="form-control dropdownRoomsCount">
          {roomsList}
        </select>
      </div>
    );
  }
}

export default Rooms;
