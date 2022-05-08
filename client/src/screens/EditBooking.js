import React from "react";
import "./EditBooking.css";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

function EditBooking() {
  return (
    <div className="editBooking-content">
      <div className="editbooking-heading">
        <h1>
          <b>EditBooking</b>
        </h1>

        <div className="editBooking-inputs">
          <div className="editBooking-hotelName">
            <div className="label">
              <b>Date</b>
            </div>
            <RangePicker
              className="datePicker datePickerDiv"
              format="DD-MM-YYYY"

              // style={{ padding:"25px" }}
            />
          </div>

          <div className="saveBooking">
            <div className="editBooking-savebtn">
              <button type="button" class="button">
                Save Details
              </button>
            </div>
            <div className="editBooking-cancelbtn">
              <button type="button" class="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBooking;
