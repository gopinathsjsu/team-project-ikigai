require('dotenv').config()
const cors = require('cors');
const express = require('express');

const authMiddleware = require('./api/middlewares/auth.middleware');

const app = express();

const authRouter = require("./api/routers/auth.router");
const hotelsRouter = require("./api/routers/hotels.router");
const roomsRouter = require("./api/routers/rooms.router");

/**
 * Middlewares
 */
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server on',
  });
});


app.use('/api/auth', authRouter);

app.use(authMiddleware);

app.use('/api/hotels', hotelsRouter);

app.use('/api/rooms', roomsRouter);

/**
 * App listen
 */
app.listen(process.env.API_PORT || 5000, () => {
  console.log(`App server now listening on port ${process.env.API_PORT || 5000}`);
});
