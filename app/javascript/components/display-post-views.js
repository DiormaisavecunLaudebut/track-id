const displayPostViews = () => {
  document.querySelectorAll('.post-item').forEach((post) => {
    const views = post.dataset.postViews
    post.querySelector('.post-view').innerHTML = views
  })
}

export { displayPostViews }
