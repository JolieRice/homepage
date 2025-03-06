/* script.js */
const ants = document.querySelectorAll(".ant");
const food = document.querySelector(".food");
const bugs = document.querySelectorAll(".bug");
const body = document.body;

function moveFood() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);
  food.style.left = `${x}px`;
  food.style.top = `${y}px`;
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

    // Randomly assign some ants to move around the border
    const isOnBorder = Math.random() < 0.2; // 20% chance to move around the border

    if (isOnBorder) {
      // Move around the border
      if (antX <= 0) {
        antX = 0;
      } else if (antX >= window.innerWidth - 70) {
        antX = window.innerWidth - 70;
      }

      if (antY <= 0) {
        antY = 0;
      } else if (antY >= window.innerHeight - 70) {
        antY = window.innerHeight - 70;
      }

      // Random direction around the screen edges
      const randomEdgeMovement = Math.floor(Math.random() * 4); // Randomly pick one of the 4 borders
      switch (randomEdgeMovement) {
        case 0: // Move right along the top
          antX += speed;
          if (antX >= window.innerWidth - 70) {
            antX = 0; // Reset to the left side
          }
          break;
        case 1: // Move down along the right side
          antY += speed;
          if (antY >= window.innerHeight - 70) {
            antY = 0; // Reset to the top
          }
          break;
        case 2: // Move left along the bottom
          antX -= speed;
          if (antX <= 0) {
            antX = window.innerWidth - 70; // Reset to the right side
          }
          break;
        case 3: // Move up along the left side
          antY -= speed;
          if (antY <= 0) {
            antY = window.innerHeight - 70; // Reset to the bottom
          }
          break;
      }
    } else {
      // Normal random movement with attraction to the food
      const randomFactorX = (Math.random() - 0.5) * 2; // Random horizontal offset
      const randomFactorY = (Math.random() - 0.5) * 2; // Random vertical offset

      if (distance > 5) {
        antX += (dx / distance) * speed + randomFactorX; // Adding randomness to X movement
        antY += (dy / distance) * speed + randomFactorY; // Adding randomness to Y movement
      }
    }

    ant.style.left = `${antX}px`;
    ant.style.top = `${antY}px`;
  });
}

setInterval(moveFood, 3000);
setInterval(moveAnts, 50);
