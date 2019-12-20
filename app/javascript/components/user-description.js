const description = document.querySelector('.user-description');

const setUserDescriptionWidth = () => {
  if (description && window.innerWidth <= (description.offsetWidth + 48) ) {
    const more = document.createElement('div')
    more.classList.add('more-description')
    more.innerText = "...more"
    more.style.left = window.innerWidth - 90 + "px"
    description.appendChild(more)
  }
}

export { setUserDescriptionWidth }
