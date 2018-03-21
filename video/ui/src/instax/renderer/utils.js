// Async video state setter wrapped by promise.
export function setVideoState (element, paused, position) {
  // 4 outlets combined with position and paused.
  if (position === 0 && !paused) {
    return element.play()
  } else if (position === 0 && paused) {
    element.currentTime = position
    element.pause()
    return Promise.resolve()
  } else if (position !== 0 && !paused) {
    element.pause()
    element.currentTime = position
    return element.play()
  } else if (position !== 0 && paused) {
    element.pause()
    return Promise.resolve()
  }
}
