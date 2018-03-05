function main () {
  const videoA = document.getElementById('video-a')
  const videoB = document.getElementById('video-b')

  const tmpA = document.getElementById('tmp-a')
  const tmpACtx = tmpA.getContext('2d')

  const tmpB = document.getElementById('tmp-b')
  const tmpBCtx = tmpA.getContext('2d')

  const resultCanvas = document.getElementById('result')
  const resultCtx = resultCanvas.getContext('2d')

  function composite () {
    tmpACtx.drawImage(videoA, 0, 0, tmpA.width, tmpA.height)
    const pixelsA = tmpACtx.getImageData(0, 0, tmpA.width, tmpA.height)

    tmpBCtx.drawImage(videoB, 0, 0, tmpB.width, tmpB.height)
    const pixelsB = tmpACtx.getImageData(0, 0, tmpA.width, tmpA.height)

    pixelsB.data.forEach((x, i) => {
      const pxA = pixelsA.data[i]
      const pxB = x
      pixelsB.data[i] = 255 * (pxA / 255) * (pxB / 255)
    })

    resultCtx.putImageData(pixelsB, 0, 0)
  }

  function loop () {
    window.requestAnimationFrame(() => {
      composite()
      loop()
    })
  }
  loop()
}

window.onload = main
