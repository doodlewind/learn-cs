export const PLAY_CLIP = 'PLAY_CLIP'
export const STOP_CLIP = 'STOP_CLIP'
export const SEEK_CLIP = 'SEEK_CLIP'

function getCurrentClips (clips, currentTime) {
  const currentClips = clips.filter(({ position, start, end }) => (
    position <= currentTime &&
    currentTime < position + (end - start)
  ))
  return currentClips
}

function getFutureTimers (clips, currentTime) {
  const futureClips = clips.filter(({ position }) => {
    return position > currentTime
  })
  const futureTimers = futureClips.map(clip => ({
    type: PLAY_CLIP,
    interval: clip.position - currentTime,
    duration: clip.end - clip.start,
    clip
  }))
  return futureTimers
}

export class ClipModel {
  constructor () {
    this.clips = []
    this.getPlayTimers = this.getPlayTimers.bind(this)
    this.getPausedTimers = this.getPausedTimers.bind(this)
    this.getSeekTimers = this.getSeekTimers.bind(this)
  }

  setClips (clips) {
    this.clips = clips
  }

  getPlayTimers (currentTime = 0) {
    const currentClips = getCurrentClips(this.clips, currentTime)
    const currentTimers = currentClips.map(clip => ({
      type: PLAY_CLIP,
      interval: 0,
      duration: clip.end - clip.start - (currentTime - clip.position),
      clip
    }))
    const futureTimers = getFutureTimers(this.clips, currentTime)
    return [...currentTimers, ...futureTimers]
  }

  getPausedTimers (currentTime = 0) {
    const currentClips = getCurrentClips(this.clips, currentTime)
    const currentTimers = currentClips.map(clip => ({
      type: STOP_CLIP,
      clip
    }))
    return currentTimers
  }

  getSeekTimers (time = 0) {
    const currentClips = getCurrentClips(this.clips, time)
    const seekTimers = currentClips.map(clip => ({
      type: SEEK_CLIP,
      time,
      from: time - clip.position,
      clip
    }))
    return seekTimers
  }
}
