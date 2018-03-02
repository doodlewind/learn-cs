/* eslint-env browser */
import { mat4 } from '../gl-matrix-min'
import { isVideoReady } from './video'
import { updateTexture } from './texture'

// Wrap render function.
export function render (gl, programInfo, buffers, texture, video) {
  requestAnimationFrame(() => {
    if (isVideoReady) {
      updateTexture(gl, texture, video)
    }
    renderFrame(gl, programInfo, buffers, texture)

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

  const fieldOfView = 45 * Math.PI / 180
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix = mat4.create()

  mat4.perspective(
    projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar
  )

  const modelViewMatrix = mat4.create()

  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [-0.0, 0.0, -5.0]
  )

  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    )
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
  }

  {
    const num = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0

    const textureCoord = programInfo.attribLocations.textureCoord
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
    gl.vertexAttribPointer(
      textureCoord, num, type, normalize, stride, offset
    )
    gl.enableVertexAttribArray(textureCoord)
  }

  gl.useProgram(programInfo.program)

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  )
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  )

  {
    const offset = 0
    const vertexCount = 4

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}
