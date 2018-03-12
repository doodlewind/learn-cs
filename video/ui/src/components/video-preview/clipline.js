export const PLAY_CLIP = 'PLAY_CLIP'
export const STOP_CLIP = 'STOP_CLIP'

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
      duration: paused
        ? 0
        : clip.end - clip.start - (currentTime - clip.position),
      clip
    }))

    const futureTimers = futureClips.map(clip => ({
      type: PLAY_CLIP,
      interval: clip.position - currentTime,
      duration: clip.end - clip.start,
      clip
    }))

    if (paused) return currentTimers
    else return [...currentTimers, ...futureTimers]
  }
}
