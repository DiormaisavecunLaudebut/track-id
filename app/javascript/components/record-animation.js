const shazamLogo = document.getElementById('shazam-main-icon');
const rounds = document.querySelectorAll('.pulse');
const banner = document.querySelector('.home-banner');
const homeScreen = document.querySelector('.home-center');
const photoIcon = document.querySelector('.photo-icon');
const body = document.querySelector('body');
const text = homeScreen.firstElementChild;

const startPulseAnimation = () => {
  let i = 1
  shazamLogo.parentElement.classList.add('shazam-pulse');
  rounds.forEach(round => {
    round.classList.add(`round${i}`);
    round.classList.add('pulse-scale');
    i++
  })
}

const stopPulseAnimation = () => {
  let i = 1
  shazamLogo.parentElement.classList.remove('shazam-pulse');
    rounds.forEach(round => {
    round.classList.remove(`round${i}`);
    round.classList.remove('pulse-scale');
    i++
  })
}

const setListeningStyle = () => {
  body.style.position = "fixed";
  body.style.width = "100%";
  banner.style.transform = "translate(0, -78px)";
  // homeScreen.style.transform = "translate(0, 78px)";
  photoIcon.style.opacity = "0";
  text.innerHTML = "Listening";
}

const removeListeningStyle = () => {
  banner.style.transform = "translate(0, -0)";
  homeScreen.style.transform = "translate(0, 0)";
  photoIcon.style.opacity = "1";
  text.innerHTML = "Tap to Shazam";
}

const startRecordingAnimation = () => {
  setListeningStyle();
  startPulseAnimation();
}

const stopRecordingAnmiation = () => {
  removeListeningStyle();
  stopPulseAnimation();
}

export { startRecordingAnimation, stopRecordingAnmiation };
