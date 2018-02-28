// Inline from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
// Usage: `parcel index.html`

import { render } from './render'
import { initBuffers } from './buffers'
import { initProgram } from './shaders'
import { initTexture } from './texture'
import demoImageSrc from './demo.jpg'

// Init WebGL context.
const gl = document.querySelector('#glcanvas').getContext('webgl')

// Init shader program.
const programInfo = initProgram(gl)
console.log(programInfo)

// Init postion buffer.
const buffers = initBuffers(gl)

// Init image texture.
const texture = initTexture(gl, demoImageSrc)

// Render a frame.
render(gl, programInfo, buffers, texture)
