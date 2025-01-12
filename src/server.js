import http from "http";
import WebSocket from "ws";
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

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (data) => {
    console.log(`[Rx]: ${data}`);
  });
  socket.send("hello!!!");
});

server.listen(PORT, handleListen);
