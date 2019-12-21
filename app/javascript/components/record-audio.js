import { startRecordingAnimation, stopRecordingAnmiation } from './record-animation';

const homeScreen = document.querySelector('.home-center');
const shazamLogo = document.getElementById('shazam-main-icon');

const manageRecording = () => {
  if (homeScreen) {
    homeScreen.addEventListener('click', e => {
      shazamLogo.parentElement.classList.value == "" ? startRecordingAnimation() : stopRecordingAnmiation()
    })
  }
}



export { manageRecording }
