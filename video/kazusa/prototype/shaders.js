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
  uniform sampler2D uSampler;

  void main() {
    vec2 texCoord = vec2(vertPos.s, -vertPos.t) * 0.5 + 0.5;
    vec3 texColor = texture2D(uSampler, texCoord.st).rgb;
    gl_FragColor = vec4(texColor.rgb, 1.0);
  }
`

function loadShader (gl, type, source) {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('Error compiling shaders', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function initShaderProgram (gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(
      'Error init shader program', gl.getProgramInfoLog(shaderProgram)
    )
    return null
  }

  return shaderProgram
}

export function initProgram (gl) {
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

  const programInfo = {
    program: shaderProgram,
    attributes: {
      inPos: gl.getAttribLocation(
        shaderProgram, 'inPos'
      )
    },
    uniforms: {
      uSampler: gl.getUniformLocation(
        shaderProgram, 'uSampler'
      )
    }
  }
  return programInfo
}
