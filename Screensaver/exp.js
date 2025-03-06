/* script.js */
const ants = document.querySelectorAll(".ant");
const food = document.querySelector(".food");

function animateFood() {
  let foodX = Math.random() * (window.innerWidth - 50);
  let foodY = Math.random() * (window.innerHeight - 50);
  let speed = 2;

  function move() {
    const currentX = parseFloat(food.style.left) || window.innerWidth / 2;
    const currentY = parseFloat(food.style.top) || window.innerHeight / 2;

    const dx = foodX - currentX;
    const dy = foodY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      foodX = Math.random() * (window.innerWidth - 50);
      foodY = Math.random() * (window.innerHeight - 50);
    }

    const moveX = (dx / distance) * speed;
    const moveY = (dy / distance) * speed;

    food.style.left = `${currentX + moveX}px`;
    food.style.top = `${currentY + moveY}px`;

    requestAnimationFrame(move);
  }
  move();
}

function moveAnts() {
  ants.forEach((ant) => {
    let antX = parseFloat(ant.style.left) || Math.random() * window.innerWidth;
    let antY = parseFloat(ant.style.top) || Math.random() * window.innerHeight;

    const foodX = parseFloat(food.style.left);
    const foodY = parseFloat(food.style.top);

    const dx = foodX - antX;
    const dy = foodY - antY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const speed = parseFloat(ant.getAttribute("data-speed")) || 2;

    if (distance > 5) {
      antX += (dx / distance) * speed;
      antY += (dy / distance) * speed;
    }

    ant.style.left = `${antX}px`;
    ant.style.top = `${antY}px`;
  });
  requestAnimationFrame(moveAnts);
}

animateFood();
moveAnts();
