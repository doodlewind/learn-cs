import {
  noop,
  clamp,
  loop,
  file2Clip
} from './utils'

const INIT = 'INIT'
const PLAY = 'PLAY'
// const STOP = 'STOP'

const INIT_STATE = {
  type: 'INIT',
  ts: 0,
  base: {
    ts: 0,
    position: 0
  }
}

export class TimelineModel {
  constructor () {
    this.ts = 0
    this.clips = []
    this.currentTime = 0
    this.state = INIT_STATE

    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    this.updateState = this.updateState.bind(this)
    loop(this.tick)
  }

  get duration () {
    if (!this.clips.length) return 0
    return Math.max(...this.clips.map(
      ({ position, start, end }) => position + end - start)
    )
  }

  get progress () {
    if (this.state.type === INIT) return 0
    if (this.duration === 0) return 0
    const currentPostion = (
      this.state.base.position + (this.ts - this.state.base.ts) / 1e3
    )
    return clamp(0, currentPostion / this.duration, 1)
  }

  play () {
    this.state = {
      type: PLAY,
      base: {
        ts: this.ts,
        position: 0
      }
    }
  }

  tick (ts) {
    this.ts = ts
    this.updateState()
    this.onTick({
      ts: this.ts,
      state: this.state
    })
    loop(this.tick)
  }

  updateState () {
    // FIXME calculate new state.
    const newState = this.state

    if (!newState) {
      this.state = INIT_STATE
      this.states = [INIT_STATE]
    } else {
      this.state = newState
    }
  }

  async pushFile (file) {
    const clip = await file2Clip(file, this.duration)
    this.clips.push(clip)
    this.onUpdateClips(this.clips)
  }

  subscribe ({
    onTick = noop,
    onUpdateClips = noop
  }) {
    this.onUpdateClips = onUpdateClips
    this.onTick = onTick
  }
}

export const model = new TimelineModel()
