const noop = () => {}
const IS_NODE = (typeof module !== 'undefined' && module.exports)
const MOCK_DURATION = 10

function getMockFile (position) {
  return {
    name: 'mock',
    position,
    start: 0,
    end: MOCK_DURATION,
    url: ''
  }
}

function getVideoDuration (url) {
  return new Promise((resolve, reject) => {
    if (IS_NODE) return resolve(MOCK_DURATION)

    const video = document.createElement('video')
    video.src = url
    video.addEventListener('loadedmetadata', (e) => {
      resolve(video.duration)
    })
  })
}

async function file2Clip (file, position) {
  if (IS_NODE) return getMockFile(position)

  const url = window.URL.createObjectURL(file)
  const duration = await getVideoDuration(url)
  return {
    name: file.name,
    position,
    start: 0,
    end: duration,
    url
  }
}

const INIT_STATE = {
  type: 'INIT',
  ts: 0,
  duration: Infinity
}

class TimelineModel {
  constructor () {
    this.paused = true
    this.duration = 0
    this.currentTime = 0
    this.clips = []
    this.ts = 0
    this.currentState = INIT_STATE
    this.states = [this.currentState]

    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    this.updateState = this.updateState.bind(this)
    window.requestAnimationFrame(this.tick)
  }

  play () {
    this.paused = false
    // TODO compute new states from clips
    this.states = [
      {
        type: 'PLAY',
        ts: this.ts,
        duration: 10,
        clip: {
          position: 0,
          start: 0,
          end: 10
        }
      },
      {
        type: 'PLAY',
        ts: this.ts + 10e3,
        duration: 10,
        clip: {
          position: 0,
          start: 0,
          end: 10
        }
      }
    ]
  }

  tick (ts) {
    this.ts = ts
    this.updateState()
    this.onTick({
      ts: this.ts,
      state: this.currentState
    })
    window.requestAnimationFrame(this.tick)
  }

  updateState () {
    const newState = this.states.find(state => {
      return (
        this.ts - state.ts > 0 &&
        this.ts - state.ts <= state.duration * 1e3
      )
    })

    if (!newState) {
      this.currentState = INIT_STATE
      this.states = [INIT_STATE]
    } else {
      this.currentState = newState
    }
  }

  async pushFile (file) {
    const clip = await file2Clip(file, this.duration)
    this.duration = clip.position + (clip.end - clip.start)
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
