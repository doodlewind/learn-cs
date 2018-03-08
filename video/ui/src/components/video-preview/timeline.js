/* eslint-disable no-debugger */
import { Observable } from 'rxjs'

export const demoProject = {
  duration: 4.505 + 41.876,
  timeline: [
    { name: 'A', url: '', position: 0, start: 0, end: 4.505 },
    { name: 'B', url: '', position: 4.505, start: 0, end: 41.876 }
  ]
}

export function Stream (timeline) {
  return Observable
    .from(timeline)
    .flatMap(clip => {
      return Observable
        .timer(clip.position * 1e3)
        .map(() => clip)
    })
}
