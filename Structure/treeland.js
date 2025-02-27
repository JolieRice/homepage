document.addEventListener("DOMContentLoaded", () => {
  const islands = document.querySelectorAll(".island");
  const textBox = document.getElementById("text-box");
  const textContent = document.getElementById("island-text");
  const closeButton = document.getElementById("close-text");

  islands.forEach((island) => {
    island.addEventListener("mouseover", () => {
      island.style.transform = "scale(1.3) translateY(-25px)";
    });

    island.addEventListener("mouseout", () => {
      island.style.transform = "scale(1) translateY(0)";
    });

    // Click event to show text
    island.addEventListener("click", () => {
      const islandText = island.getAttribute("data-text");
      showText(islandText);
    });
  });

  // Function to show text box
  function showText(text) {
    textContent.textContent = text;
    textBox.style.display = "block";
  }

  // Function to hide text box
  function hideText() {
    textBox.style.display = "none";
  }

  // Ensure close button works
  closeButton.addEventListener("click", hideText);

  // Optional: Background sound effect
  const waveSound = new Audio("wave-sound.mp3");
  waveSound.loop = true;
  waveSound.volume = 0.3;

  document.body.addEventListener("mouseover", () => {
    waveSound.play();
  });

  document.body.addEventListener("mouseleave", () => {
    waveSound.pause();
  });
});
