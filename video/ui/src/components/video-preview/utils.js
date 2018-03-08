export function getVideoDuration (url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = url
    video.addEventListener('loadedmetadata', (e) => {
      resolve(video.duration)
    })
  })
}

export async function getVideosDuration (fileURLs) {
  const durations = await Promise.all(fileURLs.map(getVideoDuration))
  return durations.reduce((a, b) => a + b)
}

export function getMockProject (videos) {
  const durations = videos.map(video => video.duration)
  return {
    duration: durations.reduce((a, b) => a + b, 0),
    timeline: videos.map((video, i) => ({
      name: video.name,
      // 顺序排列下每个视频默认 position 为前项 duration 之和
      position: durations.slice(0, i).reduce((a, b) => a + b, 0),
      start: 0,
      end: durations[i],
      url: video.url
    }))
  }
}
