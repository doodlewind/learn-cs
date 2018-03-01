/* eslint-env browser */
const $input = document.querySelector('input')
const $link = document.getElementById('link')
// const $video = document.getElementById('video')

// eslint-disable-next-line
function arrayBufferToBase64 (buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

$input.onchange = e => {
  const { files } = $input
  const worker = new Worker('worker.js')
  worker.postMessage(files)
  worker.addEventListener('message', e => {
    const blob = new Blob([new DataView(e.data)], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    $link.href = url
    $link.hidden = false
    // FIXME
    // $video.src = arrayBufferToBase64(e.data)
  })
}
