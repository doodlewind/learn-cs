const vsSource = `
  precision mediump float;

  attribute vec2 inPos;
  varying vec2 vertPos;

  void main() {
    vertPos = inPos;
    gl_Position = vec4(inPos, 0.0, 1.0);
  }
`

const fsSource = `
  precision mediump float;

  varying vec2 vertPos;

  uniform bool hasPreset;
  uniform float presetDelta;

  uniform sampler2D uSampler0;
  uniform sampler2D uSampler1;

  void main() {
    vec2 texCoord = vec2(vertPos.s, -vertPos.t) * 0.5 + 0.5;

    if (!hasPreset) {
      vec4 texColor0 = texture2D(uSampler0, texCoord.st);
      gl_FragColor = texColor0;
    } else {
      vec4 texColor0 = texture2D(uSampler0, texCoord.st);
      vec4 texColor1 = texture2D(uSampler1, texCoord.st);

      vec4 color0 = texColor0 * (1.0 - presetDelta);
      vec4 color1 = texColor1 * presetDelta;
      gl_FragColor = color0 + color1;
    }
  }
`

function loadShader (gl, type, source) {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error compiling shaders.', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function initShaderProgram (gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Error init program.', gl.getProgramInfoLog(program))
    return null
  }

  return program
}

export function initProgram (gl) {
  const program = initShaderProgram(gl, vsSource, fsSource)

  return {
    program,
    attributes: {
      inPos: gl.getAttribLocation(program, 'inPos')
    },
    uniforms: {
      presetDelta: gl.getUniformLocation(program, 'presetDelta'),
      hasPreset: gl.getUniformLocation(program, 'hasPreset'),
      uSampler0: gl.getUniformLocation(program, 'uSampler0'),
      uSampler1: gl.getUniformLocation(program, 'uSampler1')
    }
  }
}
