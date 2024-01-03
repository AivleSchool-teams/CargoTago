const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    // 'noti' 사용 부분을 삭제했습니다.
  });

  socket.on("send_message", (data) => {
    console.log(data);
    // 메시지를 보낸 클라이언트와 같은 방에 있는 다른 클라이언트들에게 메시지를 전달합니다.
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));