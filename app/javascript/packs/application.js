import "bootstrap";
import { moveWaves } from '../components/sound-wave';
import { playExtract } from '../components/play-extract';
import { displayPostViews } from '../components/display-post-views';
import { openConversation } from '../components/display-post-comments';
import { startRecording } from '../components/record-audio';

const homeScreen = document.querySelector('.home-center');
const posts = document.querySelectorAll('.play-click');
const conversations = document.querySelectorAll('.comments-click');

displayPostViews()
posts.forEach(post => post.addEventListener('click', playExtract))
conversations.forEach(conv => conv.addEventListener('click', openConversation))
homeScreen.addEventListener('click', startRecording)
//setInterval(moveWaves, 20);


// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     const audioChunks = [];
//     mediaRecorder.addEventListener("dataavailable", event => {
//       audioChunks.push(event.data);
//     });

//     mediaRecorder.addEventListener("stop", () => {
//       const audioBlob = new Blob(audioChunks);
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//     });

//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, 3000);
//   });


// const constraints = {audio: true}
// const homeScreen = document.querySelector('.home-center');

// const homeScreen = document.querySelector('.home-center');
// URL = window.URL || window.webkitURL;
// let gumStream;
// let rec;
// let input;
// let AudioContext = window.AudioContext || window.webkitAudioContext;
// let audioContext = new AudioContext;


// function createDownloadLink(blob) {
//     let url = URL.createObjectURL(blob);
// }

// function stopRecording() {
//     console.log("stopButton clicked");
//     rec.stop(); //stop microphone access
//     gumStream.getAudioTracks()[0].stop();
//     rec.exportWAV(uploadToCloudinary);
// }

// const startRecording = () => {
//   let constraints = { audio: true };
//   navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
//     gumStream = stream;
//     input = audioContext.createMediaStreamSource(stream);
//     rec = new Recorder(input, { numChannels: 1 })
//     rec.record()
//     console.log("Recording started");
//     setTImeout(stopRecording, 5000)
// }).catch(function(err) {
// });
// }

// homeScreen.addEventListener('click', startRecording);










