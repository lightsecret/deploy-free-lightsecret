document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = "snowCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const snowflakes = [];

  function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 1 - 0.5
      });
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (const flake of snowflakes) {
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    }
    ctx.fill();
    moveSnowflakes();
  }

  function moveSnowflakes() {
    for (const flake of snowflakes) {
      flake.y += flake.speed;
      flake.x += flake.drift;

      if (flake.y > height) {
        flake.y = 0;
        flake.x = Math.random() * width;
      }
      if (flake.x > width) {
        flake.x = 0;
      }
      if (flake.x < 0) {
        flake.x = width;
      }
    }
  }

  function update() {
    drawSnowflakes();
    requestAnimationFrame(update);
  }

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  createSnowflakes();
  update();
});