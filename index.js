const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");


const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

// CORS
app.use(cors());

// // ROUTES
// app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
//   req.io.emit("message", `Hello, ${req.originalUrl}`);
//   res.send("hello world!");
// });


const PORT = process.env.PORT || 9013; // 3000 للـ localhost
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
