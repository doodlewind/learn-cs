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

export async function file2Clip (file, position) {
  if (IS_NODE) return getMockFile(position)
  const url = window.URL.createObjectURL(file)
  return {
    name: file.name,
    position,
    start: 0,
    end: await getVideoDuration(url),
    url
  }
}
