// Usage: `parcel index.html`

import { loop } from './render'
import { initBuffers } from './buffers'
import { initProgram } from './shaders'
import { initTextures } from './texture'
import { initVideo } from './video'

const gl = document.querySelector('#glcanvas').getContext('webgl')

const programInfo = initProgram(gl)

const buffers = initBuffers(gl)

const videos = [
  initVideo(require('./kazusa.mp4')),
  initVideo(require('./sea.mp4'))
]

const textures = initTextures(gl)

loop(gl, programInfo, buffers, textures, videos)
