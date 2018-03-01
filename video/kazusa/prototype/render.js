/* eslint-env browser */
import { mat4 } from '../gl-matrix-min'
import { isVideoReady } from './video'
import { updateTexture } from './texture'

let delta = 0

// Wrap render function with extra delta args.
export function render (gl, programInfo, buffers, texture, video) {
  requestAnimationFrame(() => {
    delta += 0.01

    if (isVideoReady) {
      updateTexture(gl, texture, video)
    }

    renderFrame(gl, programInfo, buffers, texture, delta)
    render(gl, programInfo, buffers, texture, video)
  })
}

function renderFrame (gl, programInfo, buffers, texture, delta) {
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

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    delta * 0.7,
    [0, 1, 1]
  )

  const normalMatrix = mat4.create()
  mat4.invert(normalMatrix, modelViewMatrix)
  mat4.transpose(normalMatrix, normalMatrix)

  {
    const numComponents = 3
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
    const numComponents = 3
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    const { vertexNormal } = programInfo.attribLocations
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal)
    gl.vertexAttribPointer(
      vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset
    )
    gl.enableVertexAttribArray(vertexNormal)
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
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix
  )

  {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
    const offset = 0
    const type = gl.UNSIGNED_SHORT
    const vertexCount = 36

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0)
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset)
  }
}
