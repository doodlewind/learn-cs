import {
  noop,
  clamp,
  loop,
  file2Clip
} from './utils'

const INIT = 'INIT'
const PLAY = 'PLAY'
const STOP = 'STOP'

export class Editor {
  constructor () {
    // states
    this.ts = 0
    this.clips = []
    this.state = {
      type: INIT,
      base: { ts: 0, position: 0 }
    }

    // callbacks
    this.updateVideoCallbacks = []
    this.updateClipCallbacks = []
    this.tickCallbacks = []

    // methods
    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.setState = this.setState.bind(this)
    this.pushFile = this.pushFile.bind(this)
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

  setState (newState) {
    if (!this.clips.length) return
    // TODO trigger current videos callback.
    this.state = newState
  }

  tick (ts) {
    this.ts = ts
    // TODO trigger current videos callback.
    this.tickCallbacks.forEach(cb => cb())
    loop(this.tick)
  }

  async pushFile (file) {
    const clip = await file2Clip(file, this.duration)
    this.clips.push(clip)
    this.updateClipCallbacks.forEach(cb => cb())
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
