/* eslint-env browser */
/* global ffmpeg */
const $btn = document.getElementById('btn')
const $link = document.getElementById('link')
const $video = document.getElementById('video')

function fetchData (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        resolve(new Uint8Array(this.response))
      } else {
        reject(new Error(this.responseText))
      }
    }
    xhr.onerror = reject
    xhr.send()
  })
}

function encode (file) {
  console.time('encode')
  fetchData(file).then(data => {
    const res = ffmpeg({
      MEMFS: [{ name: 'input.mp4', data }],
      stdin: () => {},
      arguments: [
        '-i', 'input.mp4',
        'out.webm'
      ]
    })
    const videoBlob = new Blob([res.MEMFS[0].data])
    const videoUrl = URL.createObjectURL(videoBlob)
    $video.src = videoUrl
    $link.href = videoUrl
    console.timeEnd('encode')
  })
}

$btn.addEventListener('click', () => {
  encode('../resources/wa2.mp4')
  $link.hidden = false
}, false)
