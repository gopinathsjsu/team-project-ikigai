const express = require("express");
const moment = require("moment");
const stripe = require("stripe")("YOUR PRIVATE STRIP API KEY"); //
const { v4: uuidv4 } = require("uuid"); //https://www.npmjs.com/package/uuid

const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});
// router.put("/editdates", async (req, res) => {
//   const userid = req.body.userid;
//   const roomid  = req.body.roomid;
//   const todate=req.body.toDate;
//   const fromdate=req.body.fromDate;
//   console.log("u"+userid);
//   console.log("u"+roomid);
//   console.log("u"+todate);
//   console.log("u"+fromdate);
//   try {
//     const bookings = await Booking.updateOne({ userid: userid, roomid:roomid },{todate:todate,fromdate:fromdate});
//     console.log("success");
//     res.send(bookings);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error });
//   }
// });
router.put("/editdates", async (req, res) => {
  const userid = req.body.userid;
  const roomid  = req.body.roomid;
  const todate=req.body.toDate;
  const fromdate=req.body.fromDate;
  const totalamount=req.body.totalamount;
  console.log("inside edit dates");
  console.log("u"+userid);
  console.log("u"+roomid);
  console.log("u"+todate);
  console.log("u"+fromdate);
  console.log("t"+totalamount);
  try {
    const bookings = await Booking.updateOne({ userid: userid, roomid:roomid },{todate:todate,fromdate:fromdate,totalamount:totalamount});
    console.log("success");
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom", async (req, res) => {
  
    const { room, userid, fromdate, todate, totalAmount, totaldays, aminities } =
      req.body;


      //Payment Success
      
      
        try {
          const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount: totalAmount,
            totaldays,
            aminities:aminities
          });

          const booking = await newBooking.save();

          const roomTmp = await Room.findOne({ _id: room._id });
          roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await roomTmp.save();
          res.send("Payment Successful, Your Room is booked");
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      
   
});

module.exports = router;
