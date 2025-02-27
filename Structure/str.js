document.addEventListener("DOMContentLoaded", () => {
  const islands = document.querySelectorAll(".island");

  islands.forEach((island) => {
    island.addEventListener("mouseover", () => {
      island.style.transform = "scale(1.3) translateY(-25px)";
    });

    island.addEventListener("mouseout", () => {
      island.style.transform = "scale(1) translateY(0)";
    });
  });

  // Optional: Background sound effect
  const waveSound = new Audio("wave-sound.mp3"); // Add a wave sound file
  waveSound.loop = true;
  waveSound.volume = 0.3;

  document.body.addEventListener("mouseover", () => {
    waveSound.play();
  });

  document.body.addEventListener("mouseleave", () => {
    waveSound.pause();
  });
});
