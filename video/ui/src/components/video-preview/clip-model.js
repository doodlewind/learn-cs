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

function getFutureStates (clips, currentTime) {
  const futureClips = clips.filter(({ position }) => {
    return position > currentTime
  })
  const futureStates = futureClips.map(clip => ({
    type: PLAY_CLIP,
    interval: clip.position - currentTime,
    duration: clip.end - clip.start,
    clip
  }))
  return futureStates
}

export class ClipModel {
  constructor () {
    this.clips = []
    this.getPlayStates = this.getPlayStates.bind(this)
    this.getPausedStates = this.getPausedStates.bind(this)
    this.getSeekStates = this.getSeekStates.bind(this)
  }

  setClips (clips) {
    this.clips = clips
  }

  getPlayStates (currentTime = 0) {
    const currentClips = getCurrentClips(this.clips, currentTime)
    const currentStates = currentClips.map(clip => ({
      type: PLAY_CLIP,
      interval: 0,
      duration: clip.end - clip.start - (currentTime - clip.position),
      clip
    }))
    const futureStates = getFutureStates(this.clips, currentTime)
    return [...currentStates, ...futureStates]
  }

  getPausedStates (currentTime = 0) {
    const currentClips = getCurrentClips(this.clips, currentTime)
    const currentStates = currentClips.map(clip => ({
      type: STOP_CLIP,
      clip
    }))
    return currentStates
  }

  getSeekStates (time = 0) {
    const currentClips = getCurrentClips(this.clips, time)
    const seekStates = currentClips.map(clip => ({
      type: SEEK_CLIP,
      time,
      from: time - clip.position,
      clip
    }))
    return seekStates
  }
}
