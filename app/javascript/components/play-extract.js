let audio
let post
const baseURL = "https://res.cloudinary.com/dlodtvkez/video/upload/v1576957681/"
const errURL = "https://res.cloudinary.com/dlodtvkez/video/upload/v1576961956/lior_jadore.mp3"
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
  fetch(url).then(response =>  audio.src = response.ok ? url : errURL )
  return audio
}

const resetOnPlay = (postItem) => {
  if (document.querySelector('.playing')) { audio.pause() }
  const posts = Array.from(document.querySelectorAll('.post-item'));
  posts.filter(el => el != postItem).forEach((post) => {
    const playView = post.querySelector('.play-view');
    post.classList.remove('playing');
    playView.innerHTML = extract_pause(post.dataset.postViews)
  })
}

const playExtract = (e) => {
  const post = e.currentTarget.parentElement.parentElement;
  const playView = post.querySelector('.play-view');
  resetOnPlay(post);
  const views = post.dataset.postViews;
  post.classList.toggle('playing');
  if (playView.innerHTML == extract_playing) {
    playView.innerHTML = extract_pause(views);
    audio.pause();
  } else {
    audio = fetchAudio(post);
    audio.play();
    audio.addEventListener('ended', e => {
      playView.innerHTML = extract_pause(views)
      post.classList.remove('playing')
    })
    playView.innerHTML = extract_playing;
  }
}

export { playExtract, fetchAudio }
