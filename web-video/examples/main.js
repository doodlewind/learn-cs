/* eslint-env browser */
const input = document.querySelector('input[type="file"]')
const video = document.querySelector('video')

input.onchange = e => {
  let file = input.files && input.files[0]
  playFile(file)
}

function playFile (file) {
  if (file) {
    let fileReader = new FileReader()
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
