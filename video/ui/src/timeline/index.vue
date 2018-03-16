<template>
  <div class="timeline-wrapper">
    <div class="debug-menu">
      <button @click="play" class="btn">play</button>
      <div>{{ flag }}</div>
      <!-- <div>{{ time }}</div> -->
    </div>
    <div class="timeline-clips">
      <div class="timeline-clip" v-for="clip in clips">
        {{ clip.position }} - {{ clip.end }}
      </div>
    </div>
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
      clips: [],
      flag: ''
    }
  },
  methods: {
    onUpdateClips () {
      this.clips = model.clips
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
  background: #e1e1e1;
  height: 200px;
}
.debug-menu {
  display: flex;
  align-items: center;
  font-size: 12px;
  background: #f2f2f2;
}
.btn {
  margin-right: 10px;
  width: 60px;
  background: lightskyblue;
}
.timeline-clips {
  display: flex;
  align-items: center;
}
.timeline-clip {
  background: #ccc;
}
</style>
