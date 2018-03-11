import { PLAY_CLIP, STOP_CLIP } from './consts'

export class Clipline {
  constructor (clips) {
    this.clips = clips
  }

  getTimers (currentTime = 0, paused = false) {
    const currentClips = this.clips.filter(({ position, start, end }) => (
      position <= currentTime &&
      currentTime < position + (end - start)
    ))

    const futureClips = this.clips.filter(({ position }) => {
      return position > currentTime
    })

    const currentTimers = currentClips.map(clip => ({
      type: paused ? STOP_CLIP : PLAY_CLIP,
      interval: 0,
      clip
    }))

    const futureTimers = futureClips.map(clip => ({
      type: PLAY_CLIP,
      interval: clip.position - currentTime,
      clip
    }))

    if (paused) return currentTimers
    else return [...currentTimers, ...futureTimers]
  }
}
