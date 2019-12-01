import "bootstrap";
import { moveWaves } from '../components/sound-wave';
import { playExtract } from '../components/play-extract';
import { displayPostViews } from '../components/display-post-views';
import { openConversation } from '../components/display-post-comments';

const posts = document.querySelectorAll('.play-click');
const conversations = document.querySelectorAll('.comments-click');

displayPostViews()
posts.forEach(post => post.addEventListener('click', playExtract))
conversations.forEach(conv => conv.addEventListener('click', openConversation))
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
//       console.log(audio)
//       audio.play();
//     });

//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, 3000);
//   });
