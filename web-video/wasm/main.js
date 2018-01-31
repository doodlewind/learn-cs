/* eslint-env browser */
const $input = document.querySelector('input')
const $link = document.getElementById('link')

$input.onchange = e => {
  const { files } = $input
  const worker = new Worker('worker.js')
  worker.postMessage(files)
  worker.addEventListener('message', e => {
    const blob = new Blob([new DataView(e.data)], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    $link.href = url
    $link.hidden = false
  })
}
