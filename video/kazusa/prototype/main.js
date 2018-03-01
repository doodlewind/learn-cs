// Usage: `parcel index.html`

import { render } from './render'
import { initBuffers } from './buffers'
import { initProgram } from './shaders'
import { initTexture } from './texture'
import { initVideo } from './video'

const gl = document.querySelector('#glcanvas').getContext('webgl')

const programInfo = initProgram(gl)

const buffers = initBuffers(gl)

const video = initVideo(require('./kazusa.mp4'))

const texture = initTexture(gl)

render(gl, programInfo, buffers, texture, video)
