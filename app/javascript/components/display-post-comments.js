
const blockScroll = (y) => {
  if (document.querySelector('.open')) {
    window.scrollTo(0, y)
  }
}

const maskConversation = (e) => {
  e.currentTarget.classList.remove('open');
  e.currentTarget.classList.add('hide');
  const conversation = e.currentTarget.previousElementSibling;
  conversation.classList.add('hide');
}

const displayFilter = (filter) => {
  filter.classList.add('open');
  filter.classList.remove('hide');
  filter.style.top = window.scrollY + "px"
  filter.style.height = (window.innerHeight) + "px"
}

const displayConversation = (conversation) => {
  conversation.classList.remove('hide');
  conversation.style.top = (window.scrollY + window.innerHeight / 3) + "px"
  conversation.style.height = (window.innerHeight * 2 / 3) + "px"
  const convY = window.scrollY
  document.addEventListener('scroll', e => blockScroll(convY))
}

const openConversation = (e) => {
  const post = e.currentTarget.parentElement.parentElement;
  const conversation = post.nextElementSibling;
  const filter = conversation.nextElementSibling;

  displayFilter(filter)
  displayConversation(conversation)
  closeConversation()
}

const closeConversation = () => {
  const filter = document.querySelector('.opacity-filter.open')
  filter.addEventListener('click', maskConversation)
}

export { openConversation }
