import { initProgram } from './shaders'
import { initBuffers } from './buffers'
import { initTextures } from './textures'
import { render } from './render'

export class Renderer {
  constructor ($canvas) {
    // TODO defensive detection.
    this.gl = $canvas.getContext('webgl')

    const { program, attributes, uniforms } = initProgram(this.gl)
    this.program = program
    this.attributes = attributes
    this.uniforms = uniforms

    this.buffers = initBuffers(this.gl)
    this.textures = initTextures(this.gl)

    // methods
    this.render = this.render.bind(this)
    this.updateVideos = this.updateVideos.bind(this)
  }

  updateVideos (type, videos) {
    console.log(type, videos)
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
