export let isVideoReady = false

export function initVideo (url) {
  const video = window.video = document.createElement('video')

  let playing = false
  let timeupdate = false

  video.autoplay = true
  video.muted = true
  video.loop = true

  // Waiting both events before playing video.
  video.addEventListener('playing', function () {
    playing = true
    checkReady()
  }, true)

  video.addEventListener('timeupdate', function () {
    timeupdate = true
    checkReady()
  }, true)

  video.src = url

  function checkReady () {
    if (playing && timeupdate) {
      isVideoReady = true
    }
  }

  return video
}
