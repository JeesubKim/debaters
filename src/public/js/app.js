const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Socket is connected");
});

socket.addEventListener("message", (message) => {
  console.log(`[Rx]: ${message.data}`);
  chat = document.createElement("li");
  chat.textContent = message.data;
  messageList.appendChild(chat);
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});

// setTimeout(() => {
//   socket.send("Hello from the browser");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");

  socket.send(input.value);
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
