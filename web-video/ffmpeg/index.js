const ffmpeg = require('ffmpeg.js')
let stdout = ''
let stderr = ''

window.ffmpeg = ffmpeg

ffmpeg({
  arguments: ['-formats'],
  print: (data) => {
    stdout += data + '\n'
  },
  printErr: (data) => {
    stderr += data + '\n'
  },
  onExit: (code) => {
    console.log('Process exited with code ' + code)
    console.log(stdout)
    console.log(stderr)
  }
})
