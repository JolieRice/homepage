const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioCtx;
let analyser;
let dataArray;
let hueShift = 0;
let rotation = 0;

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaStreamSource(stream);
  analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  draw();
});

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseRadius = 50;
  const bars = 50;
  const symmetry = 10;
  const angleStep = (2 * Math.PI) / symmetry;

  ctx.save();
  ctx.translate(centerX, centerY);

  // 🔄 Spin the whole mandala
  rotation += 0.02; // Adjust for speed
  ctx.rotate(rotation);

  hueShift += 0.8;

  // Don’t rotate again inside the loop — just draw
  for (let i = 0; i < symmetry; i++) {
    ctx.save();
    ctx.rotate(i * angleStep); // rotate each "arm"
    drawMandalaShape(dataArray, bars, baseRadius);
    ctx.restore();
  }

  ctx.restore();
}

function drawMandalaShape(data, bars, baseRadius) {
  for (let i = 0; i < bars; i++) {
    const value = data[i];
    const barLength = value * 0.5;

    const angle = (i / bars) * Math.PI;

    const x = Math.cos(angle) * baseRadius;
    const y = Math.sin(angle) * baseRadius;

    const xEnd = x * (1 + barLength / 12);
    const yEnd = y * (1 + barLength / 12);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = `hsl(${(hueShift + i * 10) % 360}, 80%, 60%)`;
    ctx.lineWidth = 4; // <- thicker lines
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }
}
