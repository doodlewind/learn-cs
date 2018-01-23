const ffmpeg = require('ffmpeg.js')
let stdout = ''

// Print FFmpeg's version.
ffmpeg({
  arguments: ['-version'],
  print: (data) => {
    stdout += data + '\n'
  },
  printErr: (data) => {
    console.error(data)
  },
  onExit: (code) => {
    console.log('Process exited with code ' + code)
    console.log(stdout)
  }
})
