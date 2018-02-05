/* eslint-env worker */
/* global ffmpeg_run */

self.importScripts('ffmpeg.js')

onmessage = function (e) {
  const files = e.data
  console.time('encode')
  ffmpeg_run({
    arguments: [
      '-i', '/input/' + files[0].name,
      '-strict', '-2',
      '-b:v', '2M',
      'out.mp4'
    ],
    files
  }, function (results) {
    console.log('len: ' + results[0].data.byteLength)
    console.timeEnd('encode')
    self.postMessage(results[0].data)
  })
}
