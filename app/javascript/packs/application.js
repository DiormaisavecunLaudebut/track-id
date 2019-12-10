import "bootstrap";
import { moveWaves } from '../components/sound-wave';
import { playExtract } from '../components/play-extract';
import { displayPostViews } from '../components/display-post-views';
import { observeDOM } from '../components/post-show-style';

import { manageRecording } from '../components/record-audio';

const posts = document.querySelectorAll('.play-click');
const conversations = document.querySelectorAll('.comments-click');

displayPostViews()
posts.forEach(post => post.addEventListener('click', playExtract))
conversations.forEach(conv => conv.addEventListener('click', openConversation))
observeDOM();
manageRecording();
setInterval(moveWaves, 20);


// import cloudinary from "cloudinary-core";

// const cloudName = 'dlodtvkez';
// const unsignedUploadPreset = 'z3lte9fj';

// const callback = (error, result) => {
//   console.log(result, error);
// }



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
//       cloudinary.v2.uploader.unsigned_upload(audio,
//         unsignedUploadPreset,
//         {resource_type: "video"},
//         callback);
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










