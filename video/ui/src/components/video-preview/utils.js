/* eslint-disable no-debugger */
import { Observable, Subject } from 'rxjs'
import Debug from 'debug'

const debug = Debug('video')

export function getVideoDuration (url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = url
    video.addEventListener('loadedmetadata', (e) => {
      resolve(video.duration)
    })
  })
}

export function getProjectMeta (videos) {
  const durations = videos.map(video => video.duration)
  return {
    duration: durations.reduce((a, b) => a + b, 0),
    clips: videos.map((video, i) => ({
      name: video.name,
      // 顺序排列下每个视频默认 position 为前项 duration 之和
      position: durations.slice(0, i).reduce((a, b) => a + b, 0),
      start: 0,
      end: durations[i],
      url: video.url
    }))
  }
}

export const demoProject = {
  duration: 10,
  clips: [
    { name: 'A', url: '', position: 0, start: 0, end: 5 },
    { name: 'B', url: '', position: 5, start: 0, end: 5 }
  ]
}

export function getCurrentTime (bar, duration) {
  const leftPx = window.getComputedStyle(bar).getPropertyValue('left')
  const currentPercentage = parseFloat(leftPx) / 300
  return duration * currentPercentage
}

export function initStream (timers) {
  debug('timers', timers)

  return Observable
    .from(timers)
    .flatMap(timer => (
      Observable.timer(timer.interval * 1e3)).map(() => timer)
    )
}
