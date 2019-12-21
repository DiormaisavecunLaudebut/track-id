import { startRecordingAnimation, stopRecordingAnmiation } from './record-animation';

const homeScreen = document.querySelector('.home-center');
const shazamLogo = document.getElementById('shazam-main-icon');

const stopRecording = () => {
  stopRecordingAnmiation();
  // stopRecordingAudio(rec);
}

const startRecording = () => {
  startRecordingAnimation();
  // recordAudio(rec);
  // setTimeout(function() { stopRecording(rec) }, 5000)
}

const manageRecording = () => {
  if (homeScreen) {
    homeScreen.addEventListener('click', e => {
      shazamLogo.parentElement.classList.value == "" ? startRecording() : stopRecording()
    })
  }
}



export { manageRecording }
