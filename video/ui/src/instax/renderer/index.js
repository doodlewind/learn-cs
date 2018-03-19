
export class Renderer {
  constructor ($canvas) {
    // TODO defensive detection.
    this.gl = $canvas.getContext('webgl')

    // methods
    this.render = this.render.bind(this)
    this.updateVideos = this.updateVideos.bind(this)
  }

  updateVideos (type, videos) {
    console.log(type, videos)
  }

  render () {
  }
}
