import { fetchAudio } from './play-extract'
let audio
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

const config = { attributes: true, childList: true, subtree: true }

const setMessagesMaxWidth = ()  => {
  document.querySelectorAll('.message-details').forEach((message) => {
    // 64 => margins 50 => upvotes-container width
    const maxWidth = window.innerWidth - 64 - 50;
    message.style.maxWidth = maxWidth + "px";
  })
}

const blockScroll = (min, postItem) => {
  if (postItem.classList.value.match('show-open')) {
    // 57 refers to the height of the new message form
    const conv = postItem.nextElementSibling
    const max = conv.offsetTop + conv.offsetHeight - window.innerHeight + 57
    if (window.scrollY < min) {
      window.scrollTo(0, min);
    } else if (window.scrollY > max) {
      window.scrollTo(0, max)
    }
  }
}

const setStyle = (filter, conv, postItem) => {
  filter.style.top = window.scrollY + "px"
  filter.classList.add('open')
  filter.style.height = (window.innerHeight) + "px"

  const convHeight = conv.offsetHeight > (window.innerHeight * 2 / 3) ? conv.offsetHeight + 57 : (window.innerHeight * 2 / 3 - 57)
  conv.style.top = (window.scrollY + window.innerHeight / 3) + "px";
  conv.style.height = convHeight + "px";

  const ScrollMin = window.scrollY
  document.addEventListener('scroll', e => blockScroll(ScrollMin, postItem), true)
}

const closePostShow = (filter, nodes, postItem) => {
  filter.addEventListener('click', e => nodes.forEach((node) => {
    const flashAlert = document.querySelector('.alert-info')
    flashAlert ? flashAlert.remove() : console.log('')
    node.remove();
    postItem.classList.remove('show-open');
  })
)}

const playExtract = (e) => {
  const playRound = e.currentTarget
  playRound.innerHTML = `<i style="font-size: 12px"class="fas fa-pause"></i>`
  const post = playRound.parentElement

  const playView = post.querySelector('.play-view')
  const views = post.dataset.postViews;
  post.classList.add('playing')
  if (playView.innerHTML == extract_playing) {
    playView.innerHTML = extract_pause(views);
    audio.pause();
  } else {
    audio = fetchAudio(post);
    audio.play();
    audio.addEventListener('ended', e => {
      playView.innerHTML = extract_pause(views)
      post.classList.remove('playing')
      console.log('extract endend')
      playRound.innerHTML = `<i style="color: white;font-size: 12px;" class="fas fa-play"></i>`
    })
    playView.innerHTML = extract_playing;
  }
}

const styleThisShit = (nodes) => {
  const filter = nodes.find(e => e.classList.value.match('opacity-filter'));
  const conv = nodes.find(e => e.classList.value.match('post-comments'));
  const postItem = nodes[0].previousElementSibling
  const playRound = conv.querySelector('.play-round')
  playRound.addEventListener('click', playExtract )
  setStyle(filter, conv, postItem);
  setMessagesMaxWidth();
  closePostShow(filter, nodes, postItem);
}

const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.addedNodes.length > 3) {
      const nodes = Array.from(mutation.addedNodes).filter(e => e.nodeType == 1)
      // console.log(nodes)
      if (nodes.find(e => e.classList.value == "post-comments")) {
        styleThisShit(nodes)
      }
    }
  }
};

const observer = new MutationObserver(callback);

const observeDOM = () => {
  observer.observe(document, config)
}

export { observeDOM }
