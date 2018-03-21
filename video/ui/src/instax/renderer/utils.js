// Async video state setter wrapped by promise.
export function setVideoState (element, paused, position) {
  if (position === 0 && !paused) return element.play()
  else if (position === 0 && paused) {
    element.currentTime = position
    return Promise.resolve()
  } else if (position !== 0 && !paused) {
    element.pause()
    element.currentTime = position
    return element.play()
  }
}
