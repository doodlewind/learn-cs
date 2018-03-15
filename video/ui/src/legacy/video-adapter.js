import TWEEN from '@tweenjs/tween.js'
import {
  PLAY_CLIP,
  STOP_CLIP,
  SEEK_CLIP
} from './clip-model'

class TweenPlayer {
  constructor () {
    this.tween = null
    this.progress = { num: 0 }
    this.setState = this.setState.bind(this)
  }

  setState (newState) {
    switch (newState.type) {
      // For demo case, use fade effect by default.
      case PLAY_CLIP: {
        this.tween = new TWEEN.Tween(this.progress)
          .to({ num: 100 }, 1000)
        this.tween.start()

        break
      }
      // FIXME
      case STOP_CLIP: {
        this.tween.stop()
        break
      }
      case SEEK_CLIP: {
        break
      }
    }
  }
}

export class VideoAdapter {
  constructor () {
    this.setState = this.setState.bind(this)
    this.player = new TweenPlayer()

    // Init animation loop.
    const animate = (time) => {
      window.requestAnimationFrame(animate)
      TWEEN.update(time)
      // Pull value from player.
      // console.log(this.player.progress)
    }
    window.requestAnimationFrame(animate)
  }

  setState (newState) {
    this.player.setState(newState)
  }
}
