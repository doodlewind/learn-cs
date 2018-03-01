/* eslint-env browser */
const input = document.querySelector('input[type="file"]')
const video = document.querySelector('video')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function playFile (file) {
  if (file) {
    const fileReader = new FileReader()
    fileReader.onload = evt => {
      if (fileReader.readyState === FileReader.DONE) {
        video.src = fileReader.result
      } else {
        console.log('FileReader Error:', evt)
      }
    }
    fileReader.readAsDataURL(file)
  } else {
    video.src = ''
  }
}

input.onchange = e => {
  const file = input.files && input.files[0]
  playFile(file)
}

video.addEventListener('play', function () {
  const _this = this
  const draw = () => {
    if (!_this.paused && !_this.ended) {
      ctx.drawImage(_this, 0, 0)
      requestAnimationFrame(draw)
    }
  }
  requestAnimationFrame(draw)
})
