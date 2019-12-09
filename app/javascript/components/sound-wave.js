function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const range = ((min, max, step = 1) => (Array(Math.floor((max - min)/step) + 1) . fill(min) . map ( ((x, i) => ( x + i * step )) )));

const waves = document.querySelectorAll('.sound-wave')

function moveWaves() {
  const wave = waves[Math.floor(Math.random()*waves.length)]

  const values = range(5, 30)
  if (wave) {
    wave.style.height = [Math.floor(Math.random()*values.length)] + "px"
  }
}

export { moveWaves }
