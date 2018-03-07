/* eslint-disable no-debugger */
import { Observable } from 'rxjs'

const project = {
  duration: 10,
  timeline: [
    { name: 'A', position: 0, start: 0, end: 1 },
    { name: 'B', position: 2, start: 0, end: 1 },
    { name: 'C', position: 4, start: 0, end: 1 },
    { name: 'D', position: 8, start: 0, end: 1 }
  ]
}

export function Stream () {
  const { timeline } = project
  Observable
    .from(timeline)
    .flatMap(clip => {
      return Observable
        .timer(clip.position * 1e3)
        .map(() => clip)
    })
    .subscribe(x => console.log(x))
}
