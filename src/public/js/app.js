const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName = "";
function addMessage(message) {
  const ul = room.querySelector("ul");
  const list = document.createElement("li");
  list.innerText = message;
  ul.appendChild(list);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
    "enter_room",
    {
      payload: input.value,
    },
    () => {
      welcome.hidden = true;
      room.hidden = false;
      const h3 = room.querySelector("h3");
      h3.innerText = roomName;
    }
  );
  roomName = input.value;
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("Someone joined!");
});
socket.on("left", () => {
  addMessage("Someone left!");
});
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("form");

// const socket = new WebSocket(`ws://${window.location.host}`);

// socket.addEventListener("open", () => {
//   console.log("Socket is connected");
// });

// socket.addEventListener("message", (message) => {
//   console.log(`[Rx]: ${message.data}`);
//   chat = document.createElement("li");
//   chat.textContent = message.data;
//   messageList.appendChild(chat);
// });

// socket.addEventListener("close", () => {
//   console.log("Disconnected");
// });

// // setTimeout(() => {
// //   socket.send("Hello from the browser");
// // }, 10000);

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");

//   socket.send(input.value);
//   input.value = "";
// }
// messageForm.addEventListener("submit", handleSubmit);
