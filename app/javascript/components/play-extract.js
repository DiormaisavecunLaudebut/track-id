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
  resetOnPlay(parent);
  const playView = parent.querySelector('.play-view');
  const views = parent.dataset.postViews;
  parent.classList.toggle('playing');
  playView.innerHTML = playView.innerHTML == extract_playing ? extract_pause(views) : extract_playing
}

export { playExtract }
