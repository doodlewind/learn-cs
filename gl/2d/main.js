// Inline from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
// Usage: `parcel index.html`

import { render } from './render'
import { initBuffers } from './buffers'
import { initProgram } from './shaders'

function main () {
  const canvas = document.querySelector('#glcanvas')
  const gl = canvas.getContext('webgl')

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl)
  const programInfo = initProgram(gl)
  // Render the scene.
  render(gl, programInfo, buffers)
}

main()
