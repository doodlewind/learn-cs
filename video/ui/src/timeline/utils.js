const IS_NODE = (typeof module !== 'undefined' && module.exports)

export const noop = () => {}

export const clamp = (a, b, c) => Math.max(a, Math.min(b, c))

export const loop = window.requestAnimationFrame

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

export function randomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
