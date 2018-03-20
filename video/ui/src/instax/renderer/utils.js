export function initVideo (url, position = 0, paused = false) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')

    // Async latch flags.
    let playingFlag = false
    let timeupdateFlag = false

    video.autoplay = !paused
    video.muted = true
    video.loop = false

    // Waiting for these 2 events to ensure
    // there is data in the video.
    video.addEventListener('playing', function () {
      playingFlag = true
      checkReady()
    }, true)

    video.addEventListener('timeupdate', function () {
      timeupdateFlag = true
      checkReady()
    }, true)

    video.src = url

    function checkReady () {
      if (!(playingFlag && timeupdateFlag)) return
      resolve(video)
    }
  })
}
