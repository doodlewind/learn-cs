/* eslint-disable no-debugger */
import { Observable, Subject } from 'rxjs'
import Debug from 'debug'

const debug = Debug('timeline')

export function getVideoDuration (url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = url
    video.addEventListener('loadedmetadata', (e) => {
      resolve(video.duration)
    })
  })
}

export function getMockProject (videos) {
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
  duration: 4.505 + 41.876,
  clips: [
    { name: 'A', url: '', position: 0, start: 0, end: 4.505 },
    { name: 'B', url: '', position: 4.505, start: 0, end: 41.876 }
  ]
}

function afterCurrentOffset (clip, duration, currentOffset) {
  const { position, start, end } = clip
  return position + end - start >= currentOffset
}

export function initStream (project, currentOffset) {
  const { duration, clips } = project
  debug('current state', duration, currentOffset)

  const playStream = Observable
    .from(clips)
    .filter(clip => {
      return afterCurrentOffset(clip, duration, currentOffset)
    })
    // map clip to timer
    .map(clip => ({
      ...clip,
      fireAt: clip.position
    }))
    .do(timer => debug('timer', timer))
    .flatMap(timer => {
      return Observable
        .timer(timer.fireAt * 1e3)
        .map(() => timer)
    })
  return new Subject()
    .switchMap(play => play ? playStream : Observable.never())
}
