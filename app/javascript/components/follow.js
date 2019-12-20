const submitArea = document.querySelector('.follow-submit-click');

const submitFollowRequest = () => {
  submitArea.addEventListener('click', e => {
    document.querySelector('.follow-submit').click();
  })
}

export { submitFollowRequest }
