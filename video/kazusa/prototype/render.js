/* eslint-env browser */
import { isVideoReady } from './video'
import { updateTexture } from './texture'

// Wrap render function.
export function render (gl, programInfo, buffers, texture, video) {
  requestAnimationFrame(() => {
    if (!video.paused) {
      if (isVideoReady) {
        updateTexture(gl, texture, video)
      }
      renderFrame(gl, programInfo, buffers, texture)
    }

    // Recursive render.
    render(gl, programInfo, buffers, texture, video)
  })
}

function renderFrame (gl, programInfo, buffers, texture) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
      programInfo.attributes.inPos,
      numComponents,
      type,
      normalize,
      stride,
      offset
    )
    gl.enableVertexAttribArray(programInfo.attributes.inPos)
  }

  gl.useProgram(programInfo.program)

  {
    const offset = 0
    const vertexCount = 4

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(programInfo.uniforms.uSampler, 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}
