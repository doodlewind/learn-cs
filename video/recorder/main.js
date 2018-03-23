/* eslint-env browser */

const button = document.getElementById('button')
const link = document.getElementById('link')
const video = document.getElementById('video')
const div = document.getElementById('div')

const stop = stream => stream.getTracks().forEach(track => track.stop())
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const log = msg => {
  div.innerHTML += '<br>' + msg
}

const start = ms => navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(stream => record(stream, ms)
    .then(recording => {
      stop(stream)
      video.src = link.href = URL.createObjectURL(new Blob(recording))
      link.download = 'recording.webm'
      link.innerHTML = 'Download recording'
      log('Playing ' + recording[0].type + ' recording:')
    })
    .catch(log)
    .then(() => stop(stream))
  )
  .catch(log)

const record = (stream, ms) => {
  const rec = new MediaRecorder(stream)
  const data = []
  rec.ondataavailable = e => data.push(e.data)
  rec.start()
  log(rec.state + ' for ' + (ms / 1000) + ' seconds...')
  const stopped = new Promise((resolve, reject) => {
    rec.onstop = () => resolve()
    rec.onerror = e => reject(e.error || e.name)
  })
  return Promise
    .all([stopped, wait(ms).then(() => rec.stop())])
    .then(() => data)
}

button.addEventListener('click', () => start(5000))
