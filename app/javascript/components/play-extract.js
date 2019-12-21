var audio
const baseURL = "https://res.cloudinary.com/dlodtvkez/video/upload/v1576957681/"
const extract_playing = `
<div>
  <i class="fab fa-itunes-note notes-extract"></i>
  <span class="text-extract">Extract playing</span>
</div>
`

const extract_pause = (views) => {
return `
  <div class="d-flex align-items-center play-view">
    <i class="fas fa-play post-item-play"></i>
    <span class="post-view">${views}</span>
  </div>`
}

const fetchAudio = (post) => {
  const audioID = "audio_" + post.dataset.postId + '_' + post.dataset.postUser + ".mp3"
  const url = baseURL + audioID
  const audio = document.createElement('audio')
  audio.src = url
  return audio
}

const resetOnPlay = (parent) => {
  const posts = Array.from(document.querySelectorAll('.post-item'));
  posts.filter(el => el != parent).forEach((post) => {
    const playView = post.querySelector('.play-view');
    post.classList.remove('playing');
    playView.innerHTML = extract_pause(post.dataset.postViews)
  })
}

const playExtract = (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  const playView = parent.querySelector('.play-view');
  resetOnPlay(parent);
  const views = parent.dataset.postViews;
  parent.classList.toggle('playing');
  if (playView.innerHTML == extract_playing) {
    playView.innerHTML = extract_pause(views);
    audio.pause();
  } else {
    audio = fetchAudio(parent);
    audio.play();
    playView.innerHTML = extract_playing;
  }
}

export { playExtract }
