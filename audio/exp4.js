const playlist = [
  { title: "Dream", artist: "song 1", src: "dream.mp3" },
  { title: "Flow", artist: "song 2", src: "flow.mp3" },
  { title: "Lazy", artist: "song 3", src: "lazy.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shapeContainer = document.querySelector(".shape-container");
const audioFileInput = document.getElementById("audioFile"); // File input for uploads
const downloadBtn = document.getElementById("downloadBtn");
let generatedShapes = []; //final artwork

// Load a song
function loadSong(index) {
  let song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.play();
  startVisualization(audio);
}

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
});

// file upload
audioFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    songTitle.textContent = file.name;
    songArtist.textContent = "Custom Upload";
    audio.play();
    startVisualization(audio);
  }
});

// Start with first song
loadSong(currentSongIndex);

// Shape visual
function startVisualization(audioElement) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(audioElement);
  const analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 256;

  source.connect(analyzer);
  analyzer.connect(audioContext.destination);

  const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
  let rotationDegree = 0;

  function updateShape() {
    analyzer.getByteFrequencyData(frequencyData);
    let avgFreq =
      frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;

    //color based on frequency data
    let red = Math.min(255, avgFreq * 2.5);
    let green = Math.min(255, 255 - avgFreq * 1.5);
    let blue = Math.min(255, 200 - avgFreq * 0.5);
    let yellow = Math.min(255, avgFreq * 1.5);
    let purple = Math.min(255, 255 - avgFreq * 1.2);

    // Create a gradient with more colors
    let gradient = `linear-gradient(45deg, 
        rgb(${red}, ${green}, ${blue}),
        rgb(${yellow}, ${blue / 2}, ${green / 2}),
        rgb(${purple}, ${yellow}, ${blue})
      )`;

    let newSize = Math.max(200, avgFreq * 4);
    let newShape = document.createElement("div");
    newShape.classList.add("shape");
    newShape.style.width = `${newSize}px`;
    newShape.style.height = `${newSize}px`;

    // change shape based on frequency
    if (avgFreq > 150) {
      newShape.style.borderRadius = "0%"; // square
    } else if (avgFreq > 100) {
      newShape.style.borderRadius = "20%"; // middle
    } else {
      newShape.style.borderRadius = "50%"; // circle
    }

    newShape.style.background = gradient;

    rotationDegree += avgFreq * 0.02;
    newShape.style.transform = `rotate(${rotationDegree}deg)`;

    shapeContainer.appendChild(newShape);

    // Store shape data for final artwork
    generatedShapes.push({
      size: newSize,
      borderRadius: newShape.style.borderRadius,
      background: gradient,
      rotation: rotationDegree,
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    });

    setTimeout(() => {
      newShape.style.transition = "opacity 2s ease-out";
      newShape.style.opacity = "0";
      setTimeout(() => newShape.remove(), 2000);
    }, 10);

    requestAnimationFrame(updateShape);
  }

  updateShape();

  // When the song ends show download button
  audioElement.onended = () => {
    document.querySelector(".final-artwork").style.display = "block";
  };
}

// Download the generated artwork
downloadBtn.addEventListener("click", () => {
  const artworkCanvas = document.createElement("canvas");
  const ctx = artworkCanvas.getContext("2d");

  // canvas size match browser window
  artworkCanvas.width = window.innerWidth;
  artworkCanvas.height = window.innerHeight;

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, artworkCanvas.width, artworkCanvas.height);

  // Draw the shapes based on stored data
  generatedShapes.forEach((shape) => {
    const { size, borderRadius, background, rotation, position } = shape;

    // Create a gradient based on shape background
    const gradient = ctx.createLinearGradient(
      position.x - size / 2,
      position.y - size / 2,
      position.x + size / 2,
      position.y + size / 2
    );
    const colorMatch = background.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (colorMatch) {
      const [r, g, b] = [
        parseInt(colorMatch[1]),
        parseInt(colorMatch[2]),
        parseInt(colorMatch[3]),
      ];
      gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
    }

    // rotation and draw the shape
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate((rotation * Math.PI) / 180); // Rotate in radians
    ctx.translate(-position.x, -position.y);

    // Draw the shape
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(position.x, position.y, size / 2, 0, 2 * Math.PI); // Draw a circle shape
    ctx.fill();
    ctx.restore();
  });

  // download
  const link = document.createElement("a");
  link.href = artworkCanvas.toDataURL();
  link.download = "artwork.png";
  link.click();
});

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  w = window.open();
  w.document.write(printContents);
  w.print();
  w.close();
}
