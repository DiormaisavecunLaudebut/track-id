const constraints = {audio: true}
const banner = document.querySelector('.home-banner');
const homeScreen = document.querySelector('.home-center');
const photoIcon = document.querySelector('.photo-icon');
const rounds = document.querySelectorAll('.pulse');
const shazamLogo = document.getElementById('shazam-main-icon');

const startPulseAnimation = () => {
  let i = 1
  shazamLogo.parentElement.classList.add('shazam-pulse');
  rounds.forEach(round => {
    round.classList.add(`round${i}`);
    round.classList.add('pulse-scale');
    i++
  })
}

function moveRound() {
  const actualSize = parseInt(round1.style.top, 10)
  round1.style.top = actualSize - 1 + "px"
  round1.style.bottom = actualSize - 1  + "px"
  round1.style.left = actualSize - 1  + "px"
  round1.style.right = actualSize - 1 + "px"
}

const startRecording = () => {
  if (homeScreen) {
    homeScreen.addEventListener('click', e => {
      const text = homeScreen.firstElementChild;
      banner.style.transform = "translate(0, -78px)"
      homeScreen.style.transform = "translate(0, 78px)"
      photoIcon.style.opacity = "0"
      text.innerHTML = "Listening"
      startPulseAnimation();
    })
  }
}



export { startRecording }
