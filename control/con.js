function addChair() {
  const chair = document.createElement("div");
  chair.classList.add("chair");
  chair.style.left = Math.random() * window.innerWidth * 0.8 + "px";
  chair.style.top = Math.random() * window.innerHeight * 0.8 + "px";
  document.getElementById("space").appendChild(chair);
  makeDraggable(chair);
}

function makeDraggable(element) {
  let offsetX, offsetY;

  element.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });
  });

  function move(e) {
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";
  }
}

function toggleBackground() {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "black" ? "#f0f0f0" : "black";
}
