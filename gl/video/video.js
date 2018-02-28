// Will set to true when video can be copied to texture.
export let isVideoReady = false

export function initVideo (url) {
  const video = document.createElement('video')

  let playing = false
  let timeupdate = false

  video.autoplay = true
  video.muted = true
  video.loop = true

  // Waiting for these 2 events to ensure
  // there is data in the video.
  video.addEventListener('playing', function () {
    playing = true
    checkReady()
  }, true)

  video.addEventListener('timeupdate', function () {
    timeupdate = true
    checkReady()
  }, true)

  video.src = url
  video.play()

  function checkReady () {
    if (playing && timeupdate) {
      isVideoReady = true
    }
  }

  return video
}
