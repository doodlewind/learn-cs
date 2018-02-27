// Inline from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
// Usage: `parcel index.html`

import { render } from './render'
import { initBuffers } from './buffers'
import { initProgram } from './shaders'

// Init WebGL context.
const gl = document.querySelector('#glcanvas').getContext('webgl')

// Init shader program.
const programInfo = initProgram(gl)

// Init postion buffer.
const buffers = initBuffers(gl)

// Render a frame.
render(gl, programInfo, buffers)
