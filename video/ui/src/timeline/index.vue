<template>
  <div class="timeline-wrapper">
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
    onUpdateClips (clips) {
      console.log(clips)
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
