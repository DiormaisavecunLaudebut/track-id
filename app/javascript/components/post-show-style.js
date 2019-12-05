const config = { attributes: true, childList: true, subtree: true }

const setMessagesMaxWidth = ()  => {
  document.querySelectorAll('.message-details').forEach((message) => {
    // 64 => margins 50 => upvotes-container width
    const maxWidth = window.innerWidth - 64 - 50;
    message.style.maxWidth = maxWidth + "px";
  })
}

const blockScroll = (min, max, postItem) => {
  if (postItem.classList.value.match('show-open')) {
    if (window.scrollY < min) {
      window.scrollTo(0, min);
    } else if (window.scrollY > max) {
      console.log(`min ==> ${min}\nmax ==> ${max}\n\n`)
      window.scrollTo(0, max)
    }
  }
}

const setStyle = (filter, conv, postItem) => {
  filter.style.top = window.scrollY + "px"
  filter.classList.add('open')
  filter.style.height = (window.innerHeight) + "px"

  const convHeight = conv.offsetHeight > (window.innerHeight * 2 / 3) ? conv.offsetHeight : (window.innerHeight * 2 / 3)
  conv.style.top = (window.scrollY + window.innerHeight / 3) + "px";
  conv.style.height = convHeight + "px";

  const form = document.getElementById('new_message')
  const ScrollMin = window.scrollY
  const scrollMax = conv.offsetTop + conv.offsetHeight - window.innerHeight + form.offsetHeight
  document.addEventListener('scroll', e => blockScroll(ScrollMin, scrollMax, postItem), true)
}

const closePostShow = (filter, nodes, postItem) => {
  filter.addEventListener('click', e => nodes.forEach((node) => {
    node.remove();
    postItem.classList.remove('show-open');
  })
)}

const styleThisShit = (nodes) => {
  //console.log(nodes)
  const filter = nodes.find(e => e.classList.value.match('opacity-filter'));
  const conv = nodes.find(e => e.classList.value.match('post-comments'));
  const postItem = nodes[0].previousElementSibling
  setStyle(filter, conv, postItem);
  setMessagesMaxWidth();
  closePostShow(filter, nodes, postItem);
}

const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.addedNodes.length > 3) {
      const nodes = Array.from(mutation.addedNodes).filter(e => e.nodeType == 1)
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
