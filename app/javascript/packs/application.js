import "bootstrap";
import { moveWaves } from '../components/sound-wave';
import { playExtract } from '../components/play-extract';
import { displayPostViews } from '../components/display-post-views';
import { observeDOM } from '../components/post-show-style';
import { submitFollowRequest } from '../components/follow';
import { setUserDescriptionWidth } from '../components/user-description';
import { manageRecording } from '../components/record-audio';


const posts = document.querySelectorAll('.play-click');
const conversations = document.querySelectorAll('.comments-click');

displayPostViews();
setUserDescriptionWidth();
submitFollowRequest();
posts.forEach(post => post.addEventListener('click', playExtract));
conversations.forEach(conv => conv.addEventListener('click', openConversation));
observeDOM();
manageRecording();
setInterval(moveWaves, 20);


import cloudinary from "cloudinary-core";

const cloudName = 'dlodtvkez';
const unsignedUploadPreset = 'z3lte9fj';

const callback = (error, result) => {
  console.log(result, error);
}

