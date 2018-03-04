export function initVideo (url) {
  const video = document.createElement('video')
  video.autoplay = true
  video.muted = true
  video.loop = true
  video.src = url
  return video
}
