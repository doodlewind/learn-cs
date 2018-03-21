import { initProgram } from './shaders'
import { initBuffers } from './buffers'
import { initTextures } from './textures'
import { render } from './render'
import { setVideoState } from './utils'
import { PLAY } from '../editor'

export class Renderer {
  constructor ($canvas) {
    // TODO defensive detection.
    this.gl = $canvas.getContext('webgl')

    // states
    const { program, attributes, uniforms } = initProgram(this.gl)
    this.program = program
    this.attributes = attributes
    this.uniforms = uniforms
    this.sources = []
    this.buffers = initBuffers(this.gl)
    this.textures = initTextures(this.gl)

    // methods
    this.render = this.render.bind(this)
    this.updateVideos = this.updateVideos.bind(this)
  }

  updateVideos (type, videos) {
    const paused = type !== PLAY
    const promises = videos.map(
      video => setVideoState(video.clip.element, paused, video.position)
    )

    Promise.all(promises).then(() => {
      const elements = videos.map(video => video.clip.element)
      this.sources = elements
    })
  }

  render ({ preset }) {
    const {
      gl,
      program,
      attributes,
      uniforms,
      buffers,
      textures,
      sources
    } = this
    render(
      gl,
      program,
      attributes,
      uniforms,
      buffers,
      textures,
      sources,
      preset
    )
  }
}
