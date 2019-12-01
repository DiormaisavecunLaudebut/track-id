const constraints = {audio: true}
const recordBtn = document.getElementById('record')

const init = (e) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
  }
}

recordBtn.addEventListener('click', async init)
