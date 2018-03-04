/* eslint-env browser */

// Wrap render function.
export function loop (gl, programInfo, buffers, textures, videos) {
  requestAnimationFrame(() => {
    draw(gl, programInfo, buffers, textures, videos)
    // Recursive render.
    loop(gl, programInfo, buffers, textures, videos)
  })
}

function draw (gl, programInfo, buffers, textures, videos) {
  // Clear.
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Positions.
  const { inPos } = programInfo.attributes
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(inPos, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(inPos)

  gl.useProgram(programInfo.program)

  // Textures.
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, textures[0])
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videos[0]
  )
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, textures[1])
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videos[1]
  )

  // Pass uniforms.
  gl.uniform1i(programInfo.uniforms.uSampler0, 0)
  gl.uniform1i(programInfo.uniforms.uSampler1, 1)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
