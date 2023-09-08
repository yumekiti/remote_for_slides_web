const note = document.getElementById("note");
const pageContainer = document.getElementById("pageContainer");
const page = document.getElementById("page");

const main = async () => {
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
  pageContainer.style.display = "none";

  socket.on("page", (value) => {
    pageContainer.style.display = "block";
    page.textContent = value.page;
  });

  socket.on("note", (value) => {
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
};

setTimeout(async () => await main(), 500);
