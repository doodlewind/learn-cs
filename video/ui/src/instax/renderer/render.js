export function render (
  gl, program, attributes, uniforms, buffers, textures
) {
  // clear
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // positions
  const { inPos } = attributes
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(inPos, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(inPos)

  gl.useProgram(program)

  // textures
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, textures[0])
  // TODO use video textures.
  // gl.texImage2D(
  //   gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videos[0]
  // )
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, textures[1])
  // gl.texImage2D(
  //   gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videos[1]
  // )

  // uniforms
  gl.uniform1i(uniforms.uSampler0, 0)
  gl.uniform1i(uniforms.uSampler1, 1)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
