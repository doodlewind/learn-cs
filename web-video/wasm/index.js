/* eslint-env browser */
/* global ffmpeg_run */
const $input = document.querySelector('input')
// const $link = document.getElementById('link')
// const $video = document.getElementById('video')

// FIXME error running web worker
function encode (files) {
  console.time('encode')
  ffmpeg_run({
    stdin: () => {},
    arguments: [
      '-i',
      'input.mp4',
      '-b:v',
      '64k',
      '-bufsize',
      '64k',
      '-vf',
      'showinfo',
      '-strict',
      '-2',
      'out.mp4'
    ],
    files
  }, results => {
    console.timeEnd('encode')
    console.log(results)
  })
  // const videoBlob = new Blob([results.MEMFS[0].data])
  // const videoUrl = URL.createObjectURL(videoBlob)
  // $video.src = videoUrl
  // $link.href = videoUrl
  // $link.hidden = false
}

$input.onchange = e => {
  const { files } = $input
  encode(files)
}
