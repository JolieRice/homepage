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
