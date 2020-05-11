const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const router = require("./chatRouter");

const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3300;
const server = http.createServer(app);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", router);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("join", ({ userId, room }) => {
    console.log("Name, room", userId, room);
    socket.join(room);
  });

  socket.on("sendMessage", (message, room, userId) => {
    const timeStamp = new Date
    console.log(room, 'sendMessage')
    io.to(room).emit("message", { sender: userId, content: message, created_at: timeStamp.toISOString() });
  });

  socket.on("changeRoom", ({ userId, room }) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    socket.disconnect();
  });
});

server.listen(PORT, () => {
  console.log(`***SERVER LISTENING ON PORT ${PORT}***`);
});

app.get("/", (req, res) => {
  res.status(200).json("Chat API");
});
