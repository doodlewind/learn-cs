// Vertex shader program.
const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;

    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
`

// Fragment shader program.
// Receives color via varying variable.
const fsSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
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
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(
        shaderProgram, 'aVertexPosition'
      ),
      vertexNormal: gl.getAttribLocation(
        shaderProgram, 'aVertexNormal'
      ),
      textureCoord: gl.getAttribLocation(
        shaderProgram, 'aTextureCoord'
      )
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram, 'uProjectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(
        shaderProgram, 'uModelViewMatrix'
      ),
      normalMatrix: gl.getUniformLocation(
        shaderProgram, 'uNormalMatrix'
      ),
      uSampler: gl.getUniformLocation(
        shaderProgram, 'uSampler'
      )
    }
  }
  return programInfo
}
