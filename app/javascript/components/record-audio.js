const constraints = {audio: true}
const banner = document.querySelector('.home-banner');
const homeScreen = document.querySelector('.home-center');
const photoIcon = document.querySelector('.photo-icon');
const text = homeScreen.firstElementChild;
const round1 = document.querySelector('.round1');
const round2 = document.querySelector('.round2');
const round3 = document.querySelector('.round3');
const round4 = document.querySelector('.round4');
const round5 = document.querySelector('.round5');
const round6 = document.querySelector('.round6');
const rounds = document.querySelectorAll('.listening-round');

const initRounds = () => {
  rounds.forEach((round) => {
    round.style.top = "0px";
    round.style.bottom = "0px";
    round.style.left = "0px";
    round.style.right = "0px";
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
  initRounds()
  banner.style.transform = "translate(0, -78px)"
  homeScreen.style.transform = "translate(0, 78px)"
  photoIcon.style.opacity = "0"
  text.innerHTML = "Listening"
}



export { startRecording }
