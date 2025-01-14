import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
console.log("Hello");

const PORT = 9000;
const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const server = http.createServer(app);

const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.on("enter_room", (roomName, cb) => {
    socket.join(roomName);
    console.log(socket.rooms);
    cb();

    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnect", (a) => console.log(a));
});

// socket.on("disconnect", (reason) => {
//   console.log(`socket ${socket.id} disconnected due to ${reason}`);
//   socket.to();
// });
// const wss = new WebSocket.Server({ server });

// const sockets = new Set();
// wss.on("connection", (socket) => {
//   sockets.add(socket);
//   socket["nickname"] = "Anonymous";
//   socket.on("close", () => console.log("Disconnected from the Browser"));
//   socket.on("message", (data) => {
//     console.log(`[Rx]: ${data}`);

//     sockets.forEach((stored_socket) => {
//       stored_socket.send(`${socket.nickname}: ${data.toString()}`);
//     });
//   });
//   socket.send("hello!!!");
// });

server.listen(PORT, handleListen);
