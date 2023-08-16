const note = document.getElementById("note");
const page = document.getElementById("page");

const [_, _room, roomId] = location.pathname.split("/");
const socket = io.connect(location.host, {
  transports: ['websocket'],
});
socket.emit("join", roomId);

socket.on("connect", () => {
  console.log("socket connected");
});

socket.on("event", (value) => {
  console.log(value);
});

note.style.display = "none";
page.style.display = "none";

socket.on("page", (value) => {
  page.style.display = "block";
  page.textContent = value.page;
});

socket.on("text", (value) => {
  note.style.display = "block";
  note.textContent = value.text;
});

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
