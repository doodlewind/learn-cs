import {
  noop,
  clamp,
  loop,
  getNextVideos,
  file2Clip,
  setBuffer,
  shouldVideosUpdate
} from './utils'

export const INIT = 'INIT'
export const PLAY = 'PLAY'
export const STOP = 'STOP'

const PRESET_OFFSET = 1

const initState = {
  type: INIT,
  base: { ts: 0, position: 0 }
}

export class Editor {
  constructor () {
    // states
    this.ts = 0
    this.clips = []
    this.buffer = { videos: [], preset: null }
    this.state = initState

    // callbacks
    this.updateVideoCallbacks = []
    this.updateClipCallbacks = []
    this.tickCallbacks = []

    // methods
    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.setPreset = this.setPreset.bind(this)
    this.setState = this.setState.bind(this)
    this.pushFile = this.pushFile.bind(this)
    this.resetClips = this.resetClips.bind(this)
    this.subscribe = this.subscribe.bind(this)
    loop(this.tick)
  }

  get duration () {
    if (!this.clips.length) return 0
    return Math.max(...this.clips.map(
      ({ position, start, end }) => position + end - start)
    )
  }

  get progress () {
    switch (this.state.type) {
      case INIT: {
        return 0
      }
      case PLAY: {
        if (this.duration === 0) return 0
        const currentPostion = (
          this.state.base.position + (this.ts - this.state.base.ts) / 1e3
        )
        return clamp(0, currentPostion / this.duration, 1)
      }
      case STOP: {
        return this.state.base.position / this.duration
      }
    }
  }

  play (progress = this.progress) {
    this.setState({
      type: PLAY,
      base: { ts: this.ts, position: progress * this.duration }
    })
  }

  stop (progress = this.progress) {
    this.setState({
      type: STOP,
      base: { ts: this.ts, position: progress * this.duration }
    })
  }

  // Mock clips preset.
  setPreset (hasPreset) {
    for (let i = 1; i < this.clips.length; i++) {
      const prev = this.clips[i - 1]
      this.clips[i].position = hasPreset
        ? prev.position + prev.end - prev.start - PRESET_OFFSET
        : prev.position + prev.end - prev.start
    }
    this.updateClipCallbacks.forEach(fn => fn())
  }

  setState (newState) {
    if (!this.clips.length) return

    const basePosition = newState.base.position
    this.buffer.videos = getNextVideos(this.clips, basePosition)

    this.updateVideoCallbacks.forEach(fn => fn(
      newState.type, this.buffer.videos
    ))

    this.state = newState
  }

  tick (ts) {
    this.ts = ts

    const currentTime = this.progress * this.duration
    const nextVideos = getNextVideos(this.clips, currentTime)

    setBuffer(this.buffer, this.state, ts, nextVideos)
    this.tickCallbacks.forEach(fn => fn(this.buffer))

    // Emit video update events by diffing in each tick.
    if (shouldVideosUpdate(this.buffer.videos, nextVideos)) {
      this.buffer.videos = nextVideos
      this.updateVideoCallbacks.forEach(fn => fn(
        this.state.type, this.buffer.videos
      ))
    }

    loop(this.tick)
  }

  async pushFile (file) {
    const clip = await file2Clip(file, this.duration)
    this.clips.push(clip)
    this.updateClipCallbacks.forEach(fn => fn())
  }

  resetClips () {
    this.ts = 0
    this.clips = []
    this.state = initState
    this.buffer = { videos: [], preset: null }
    this.updateClipCallbacks.forEach(fn => fn())
  }

  subscribe ({
    onTick = noop,
    onUpdateVideos = noop,
    onUpdateClips = noop
  }) {
    this.updateVideoCallbacks.push(onUpdateVideos)
    this.updateClipCallbacks.push(onUpdateClips)
    this.tickCallbacks.push(onTick)
  }
}

export const editor = new Editor()
