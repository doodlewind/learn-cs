<template>
  <div class="timeline-wrapper">
    <div class="debug-menu">
      <button @click="toggle" class="btn">{{ toggleText }}</button>
      <div>{{ currentTime.toFixed(2) }}s</div>
    </div>
    <div class="clips-container">
      <div
        class="clips"
        :style="{
          width: containerWidth
        }"
      >
        <div
          class="clip-bar"
          :style="{ left: progress + '%' }"
        >
        </div>
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
// Global editor singleton.
import { editor } from './editor'

export default {
  name: 'Tineline',
  created () {
    window.editor = editor
    editor.subscribe({
      onUpdateClips: this.onUpdateClips,
      onTick: this.renderTick
    })
  },
  data () {
    return {
      paused: true,
      clips: [],
      duration: 0,
      progress: 0,
      flag: ''
    }
  },
  computed: {
    currentTime () {
      if (!this.duration) return 0
      return this.progress * this.duration / 100
    },
    toggleText () {
      return this.paused ? 'play' : 'stop'
    },
    containerWidth () {
      return this.clips.length * 200 + 'px'
    }
  },
  methods: {
    onUpdateClips () {
      this.duration = editor.duration
      this.clips = editor.clips
    },
    toggle () {
      this.paused = !this.paused
      editor.play()
    },
    renderTick () {
      this.progress = editor.progress * 100
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
