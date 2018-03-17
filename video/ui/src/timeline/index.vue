<template>
  <div class="timeline-wrapper">
    <div class="debug-menu">
      <button @click="play" class="btn">play</button>
      <div>{{ flag }}</div>
      <div>{{ time }}</div>
    </div>
    <div class="clips-container">
      <div
        class="clips"
        :style="{
          width: containerWidth
        }"
      >
        <div class="clip-bar"></div>
        <div class="clip" v-for="clip in clips">
          {{ clip.position.toFixed(2) }}s
          -
          {{ (clip.position + clip.end - clip.start).toFixed(2) }}s
        </div>
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
  computed: {
    containerWidth () {
      return this.clips.length * 200 + 'px'
    }
  },
  methods: {
    onUpdateClips (clips) {
      this.clips = clips
    },
    play () {
      // debug
      window.model = model
      model.play()
    },
    renderTick (tick) {
      const { ts, state } = tick
      if (state.type === 'INIT') return

      this.time = parseInt(model.duration * 1e3 - (ts - state.ts))
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
.clips-container {
  width: 100%;
  height: 175px;
  overflow-x: auto;
}
.clips {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
}
.clip-bar {
  position: absolute;
  height: 100%;
  width: 5px;
  top: 0;
  background: lightskyblue;
  opacity: 0.6;
  cursor: col-resize;
}
.clip {
  margin-left: 0;
  border-top: 5px #ccc solid;
  border-bottom: 5px #ccc solid;
  border-right: 5px #ccc solid;
  padding-left: 10px;
  width: 190px;
  height: 70px;
  background: white;
}
</style>
