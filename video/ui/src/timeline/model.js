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
    this.duration = 0
    this.currentTime = 0
    this.clips = []
    this.ts = 0
    this.state = INIT_STATE

    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    this.updateState = this.updateState.bind(this)
    window.requestAnimationFrame(this.tick)
  }

  play () {
    this.duration = 20
    this.state = {
      type: 'PLAY',
      ts: this.ts,
      // FIXME calculate base time.
      baseTime: 0
    }
  }

  tick (ts) {
    this.ts = ts
    this.updateState()
    this.onTick({
      ts: this.ts,
      state: this.state
    })
    window.requestAnimationFrame(this.tick)
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
