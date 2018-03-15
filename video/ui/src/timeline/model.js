const noop = () => {}

class TimelineModel {
  constructor () {
    this.pushFile = this.pushFile.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  pushFile (file) {
    // TODO transform file to clip.
    this.onUpdateClips([{ file }])
  }

  subscribe ({
    onUpdateClips = noop
  }) {
    this.onUpdateClips = onUpdateClips
  }
}

export const model = new TimelineModel()
