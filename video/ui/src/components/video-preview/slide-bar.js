import { Observable } from 'rxjs'

const noop = () => {}
const clamp = (a, b, c) => Math.max(a, Math.min(b, c))
const THROTTLE_TIME = 100

export class SlideBar {
  constructor ({
    bar,
    totalWidth,
    onSlideStart = noop,
    onSlideChange = noop,
    onSlideEnd = noop
  }) {
    this.bar = bar
    this.totalWidth = totalWidth
    this.baseX = 0
    this.basePercentage = 0

    this.startSlide = this.startSlide.bind(this)
    this.toProgress = this.toProgress.bind(this)
    this.endSlide = this.endSlide.bind(this)
    this.reset = this.reset.bind(this)

    const starts = Observable
      .fromEvent(bar, 'mousedown')
      .do((e) => this.startSlide(e, onSlideStart))

    const moves = Observable
      .fromEvent(window, 'mousemove')
      .throttleTime(THROTTLE_TIME)
      .map(this.toProgress)

    const ends = Observable
      .fromEvent(window, 'mouseup')
      .do((e) => this.endSlide(e, onSlideEnd))

    // Get changes stream by clamping moves stream with starts and ends.
    const changes = starts
      .concatMap(() => moves.takeUntil(ends.first()))
    this.subscriber = changes.subscribe(progress => onSlideChange(progress))
  }

  startSlide (e, onSlideStart) {
    this.baseX = e.clientX
    this.basePercentage = this.bar.offsetLeft / this.totalWidth
    onSlideStart(e)
  }

  toProgress (e) {
    const deltaPercentage = (e.clientX - this.baseX) / this.totalWidth
    return clamp(0, this.basePercentage + deltaPercentage, 1)
  }

  endSlide (e, onSlideEnd) {
    this.baseX = 0
    this.basePercentage = 0
    onSlideEnd(e)
  }

  reset () {
    if (!this.subscriber) return
    this.subscriber.unsubscribe()
  }
}
