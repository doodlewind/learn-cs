<template>
  <div class="timeline-wrapper">
    <button @click="play" class="btn">play</button>
  </div>
</template>

<script>
import { model } from './model'

export default {
  name: 'Tineline',
  created () {
    model.subscribe({
      onUpdateClips: this.onUpdateClips
    })
  },
  methods: {
    onUpdateClips (clips, duration) {
      console.log(clips, duration)
    },
    play () {
      // debug
      window.model = model
      model.play()
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
