const noop = () => {}
const IS_NODE = (typeof module !== 'undefined' && module.exports)
const MOCK_DURATION = 10

const getMockFile = (position) => ({
  name: 'mock',
  position,
  start: 0,
  end: MOCK_DURATION,
  url: ''
})

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

class TimelineModel {
  constructor () {
    this.paused = true
    this.duration = 0
    this.currentTime = 0
    this.clips = []
    this.states = []
    this.ts = 0

    this.tick = this.tick.bind(this)
    this.play = this.play.bind(this)
    window.requestAnimationFrame(this.tick)
  }

  play () {
    this.paused = false
    this.states = [
      { ts: this.ts },
      { ts: this.ts + 10e3 }
    ]
  }

  tick (ts) {
    this.ts = ts
    window.requestAnimationFrame(this.tick)
  }

  async pushFile (file) {
    const clip = await file2Clip(file, this.duration)
    this.duration = clip.position + (clip.end - clip.start)
    this.clips.push(clip)
    this.onUpdateClips(this.duration, this.clips)
  }

  subscribe ({
    onUpdateClips = noop
  }) {
    this.onUpdateClips = onUpdateClips
  }
}

export const model = new TimelineModel()
