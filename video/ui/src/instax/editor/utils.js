const IS_NODE = (typeof module !== 'undefined' && module.exports)

export const noop = () => {}

export const clamp = (a, b, c) => Math.max(a, Math.min(b, c))

export const loop = window.requestAnimationFrame

const equal = (a, b) => Object.keys(a).every(key => a[key] === b[key])

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

function getElement (url) {
  return new Promise((resolve, reject) => {
    if (IS_NODE) return resolve({ duration: MOCK_DURATION })

    let metadataFlag = false

    const video = document.createElement('video')
    video.autoplay = false
    video.muted = true
    video.loop = false

    video.addEventListener('loadedmetadata', (e) => {
      metadataFlag = true
      checkReady()
    })

    video.src = url

    function checkReady () {
      if (!metadataFlag) return
      resolve(video)
    }
  })
}

export function getNextVideos (clips, currentPosition) {
  const currentClips = clips.filter(({ position, start, end }) => (
    position <= currentPosition &&
    currentPosition < position + end - start
  ))
  const currentVideos = currentClips.map(clip => ({
    clip,
    position: currentPosition - clip.position
  }))
  return currentVideos
}

export function shouldVideosUpdate (currentVideos, nextVideos) {
  if (currentVideos.length !== nextVideos.length) return true
  return currentVideos.some((video, i) => (
    !equal(video.clip, nextVideos[i].clip)
  ))
}

export function setBuffer (
  buffer, state, ts, nextVideos
) {
  // Perform tweening before firing stant / end events.
  // TODO remove hard coded value for mocking.
  if (nextVideos.length === 2) {
    const basePosition = nextVideos[1].clip.position
    const tween = (ts - state.base.ts) / 1e3 - basePosition
    buffer.preset = tween
  } else buffer.preset = null
}

export async function file2Clip (file, position) {
  if (IS_NODE) return getMockFile(position)
  const url = window.URL.createObjectURL(file)
  const element = await getElement(url)

  return {
    name: file.name,
    position,
    start: 0,
    end: element.duration,
    element,
    url
  }
}
