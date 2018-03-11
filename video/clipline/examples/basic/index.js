import { Clipline } from '../../src'

const clips = [
  { position: 0, start: 0, end: 5 },
  { position: 5, start: 0, end: 5 },
  { position: 10, start: 0, end: 5 }
]

const timeline = new Clipline(clips)

console.log('default timers')
const defaultTimers = timeline.getTimers()
console.log(defaultTimers)

console.log('timers with offset')
const offsetTimers = timeline.getTimers(2)
console.log(offsetTimers)
