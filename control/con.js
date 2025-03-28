const hair = ["longhair.png", "bob.png", "blondehair.png"];
const tops = [
  "rainshirt.png",
  "blackshirt.png",
  "purpletop.png",
  "rosetop.png",
];
const bottoms = ["jeanskirt.png", "tanpants.png", "plaidskirt.png"];
const shoes = ["blackshoe.png", "boots.png", "whiteshoe.png"];

function randomize(category) {
  let items, previewId;
  switch (category) {
    case "hair":
      items = hair;
      previewId = "hair";
      break;
    case "top":
      items = tops;
      previewId = "top";
      break;
    case "bottom":
      items = bottoms;
      previewId = "bottom";
      break;
    case "shoes":
      items = shoes;
      previewId = "shoes";
      break;
  }
  const randomItem = items[Math.floor(Math.random() * items.length)];
  document.getElementById(previewId).src = randomItem;
}

const cursor = document.getElementById("custom-cursor");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
const speed = 0.3;

document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

function updateCursor() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;

  requestAnimationFrame(updateCursor);
}

updateCursor();

//Cat dragable item
const dragItem = document.getElementById("drag1");

dragItem.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text", event.target.id);
  event.target.style.opacity = 0.5; // Make the dragged Cat semi-transparent
});

dragItem.addEventListener("dragend", (event) => {
  event.target.style.opacity = 1; // Reset opacity when Cat dragging ends
});

document.body.addEventListener("dragover", (event) => {
  event.preventDefault(); // Allow dropping Cat
});

document.body.addEventListener("drop", (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  // Get the drop position and set the dragged Cats new position
  draggedElement.style.left = `${
    event.pageX - draggedElement.offsetWidth / 2
  }px`;
  draggedElement.style.top = `${
    event.pageY - draggedElement.offsetHeight / 2
  }px`;
});

// Cat Sound effect
const dragSound = document.getElementById("drag-sound");

// Cat Draggable item
const draggableItem = document.querySelector(".draggable");

// Play Cat sound when dragging starts
draggableItem.addEventListener("dragstart", (event) => {
  dragSound.play();
});

//control buttons sounds
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
