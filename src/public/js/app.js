const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Socket is connected");
});

socket.addEventListener("message", (message) => {
  console.log(`[Rx]: ${message.data}`);
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});

setTimeout(() => {
  socket.send("Hello from the browser");
}, 10000);
