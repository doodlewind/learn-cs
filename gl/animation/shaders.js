// Vertex shader program.
const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`

// Fragment shader program.
// Receives color via varying variable.
const fsSource = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`

// Creates a shader of the given type, uploads the source and
// compiles it.
function loadShader (gl, type, source) {
  const shader = gl.createShader(type)

  // Send the source to the shader object.
  gl.shaderSource(shader, source)

  // Compile the shader program.
  gl.compileShader(shader)

  // See if it compiled successfully.
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('Error compiling shaders', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

// Initialize a shader program, so WebGL knows how to draw our data.
function initShaderProgram (gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  // Create the shader program.
  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  // If creating the shader program failed, log.
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(
      'Error init shader program', gl.getProgramInfoLog(shaderProgram)
    )
    return null
  }

  return shaderProgram
}

export function initProgram (gl) {
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(
        shaderProgram, 'aVertexPosition'
      ),
      vertexColor: gl.getAttribLocation(
        shaderProgram, 'aVertexColor'
      )
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram, 'uProjectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        shaderProgram, 'uModelViewMatrix'
      )
    }
  }
  return programInfo
}
