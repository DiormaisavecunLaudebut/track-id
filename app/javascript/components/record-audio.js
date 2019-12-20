import { startRecordingAnimation, stopRecordingAnmiation } from './record-animation';
import { recordAudio, stopRecordingAudio } from './audio-recorder';

const homeScreen = document.querySelector('.home-center');
const shazamLogo = document.getElementById('shazam-main-icon');
const MicRecorder = require('mic-recorder-to-mp3');
const rec = new MicRecorder({bitRate: 128});

const stopRecording = (rec) => {
  stopRecordingAnmiation();
  // stopRecordingAudio(rec);
}

const startRecording = (rec) => {
  startRecordingAnimation();
  // recordAudio(rec);
  // setTimeout(function() { stopRecording(rec) }, 5000)
}

const manageRecording = () => {
  if (homeScreen) {
    homeScreen.addEventListener('click', e => {
      shazamLogo.parentElement.classList.value == "" ? startRecording(rec) : stopRecording(rec)
    })
  }
}



export { manageRecording }
