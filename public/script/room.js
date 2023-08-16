const [_, _room, roomId] = location.pathname.split("/");
const socket = io.connect(location.host);
socket.emit("join", roomId);

socket.on("connect", () => {
  console.log("socket connected");
});

socket.on("event", (value) => {
  console.log(value);
});

const noteContainer = document.getElementById("noteContainer");
const note = document.getElementById("note");
const page = document.getElementById("page");

noteContainer.style.display = "none";

const [prevButton, nextButton] = document.querySelectorAll("button");
prevButton.addEventListener("click", () => {
  data = {
    uuid: roomId,
    event: "prev",
  };
  socket.emit("event", data);
});
nextButton.addEventListener("click", () => {
  data = {
    uuid: roomId,
    event: "next",
  };
  socket.emit("event", data);
});
