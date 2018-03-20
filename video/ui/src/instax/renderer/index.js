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
    const paused = type !== PLAY
    const promises = videos.map(v => initVideo(v.clip.url, v.position, paused))

    Promise.all(promises).then(sources => {
      this.sources = sources
      sources.forEach((source, i) => {
        const { position } = videos[i]
        if (position === 0 && !paused) source.play()
        else if (position === 0 && paused) {
          source.currentTime = position
        } else if (position !== 0 && !paused) {
          source.pause()
          source.currentTime = position
          source.play()
        }
      })
    })
  }

  render () {
    const {
      gl,
      program,
      attributes,
      uniforms,
      buffers,
      textures,
      sources
    } = this
    render(gl, program, attributes, uniforms, buffers, textures, sources)
  }
}
