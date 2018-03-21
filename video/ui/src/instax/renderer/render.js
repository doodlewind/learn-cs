function renderPlaceholder (gl, textures) {
  for (let i = 0; i < textures.length; i++) {
    const texture = textures[i]
    gl.activeTexture(gl['TEXTURE' + i])
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    const pixel = new Uint8Array([0, 0, 0, 255])
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel
    )
  }
}

function renderSources (gl, textures, sources) {
  for (let i = 0; i < sources.length; i++) {
    gl.activeTexture(gl['TEXTURE' + i])
    gl.bindTexture(gl.TEXTURE_2D, textures[i])
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sources[i]
    )
  }
}

export function render (
  gl,
  program,
  attributes,
  uniforms,
  buffers,
  textures,
  sources,
  delta
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
  if (!sources.length) {
    renderPlaceholder(gl, textures)
  } else {
    renderSources(gl, textures, sources)
  }

  // uniforms
  gl.uniform1i(uniforms.uSampler0, 0)
  gl.uniform1i(uniforms.uSampler1, 1)
  gl.uniform1f(uniforms.hasPreset, delta === null ? 0 : 1)
  // console.log(delta === null)
  // console.log(delta)
  if (delta !== null) {
    gl.uniform1f(uniforms.presetDelta, delta)
  }

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
