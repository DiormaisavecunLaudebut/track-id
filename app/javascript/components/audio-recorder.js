const recordAudio = (recorder) => {
  recorder.start().then(() => {
    // something else
  }).catch((e) => {
    console.error(e);
  });
}


const stopRecordingAudio = (recorder) => {
  recorder
  .stop()
  .getMp3().then(([buffer, blob]) => {
    // do what ever you want with buffer and blob
    // Example: Create a mp3 file and play
    const file = new File(buffer, 'me-at-thevoice.mp3', {
      type: blob.type,
      lastModified: Date.now()
    });

    const player = new Audio(URL.createObjectURL(file));
    // player.play();
    console.log(file)
    console.log(player)

  }).catch((e) => {
    alert('We could not retrieve your message');
    console.log(e);
  });
}

export { recordAudio, stopRecordingAudio }
