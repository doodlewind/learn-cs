<template>
  <div class="timeline-wrapper">
    <button @click="play" class="btn">play 20s</button>
    <div>{{ time }}</div>
    <div>{{ flag }}</div>
  </div>
</template>

<script>
import { model } from './model'

export default {
  name: 'Tineline',
  created () {
    model.subscribe({
      onUpdateClips: this.onUpdateClips,
      onTick: this.renderTick
    })
  },
  data () {
    return {
      time: 0,
      flag: ''
    }
  },
  methods: {
    onUpdateClips (clips, duration) {
      console.log(clips, duration)
    },
    play () {
      // debug
      window.model = model
      model.play()
    },
    renderTick (tick) {
      const { ts, state } = tick
      this.time = parseInt(ts)
      this.flag = state.type
    }
  }
}
</script>

<style scoped>
.timeline-wrapper {
  background: #ddd;
  height: 200px;
}
</style>
