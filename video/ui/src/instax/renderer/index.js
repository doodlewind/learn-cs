import { initProgram } from './shaders'
import { initBuffers } from './buffers'
import { initTextures } from './textures'
import { render } from './render'
import { initVideo } from './utils'
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

  async updateVideos (type, videos) {
    // TODO clean up current textures and sources.
    if (!videos.length) return

    Promise
      .all(videos.map(
        video => initVideo(video.clip.url, video.position, type !== PLAY)
      ))
      .then(sources => {
        console.log('sources loaded')
        this.sources = sources
        // TODO update textures with new sources.
      })
  }

  render () {
    const {
      gl,
      program,
      attributes,
      uniforms,
      buffers,
      textures
    } = this
    render(gl, program, attributes, uniforms, buffers, textures)
  }
}
