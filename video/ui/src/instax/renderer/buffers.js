export function initBuffers (gl) {
  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ]

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  const textureCoordBuffer = gl.createBuffer()
  const textureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
  ]
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW
  )

  return {
    position: positionBuffer
  }
}
