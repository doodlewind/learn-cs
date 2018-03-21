<template>
  <div class="timeline-wrapper">
    <div class="debug-menu">
      <button @click="reset" class="btn reset">reset</button>
      <button @click="togglePaused" class="btn play">
        {{ pausedText }}
      </button>
      <button @click="clear" class="btn clear">clear</button>
      <button @click="togglePreset" class="btn preset">
        preset {{ presetText }}
      </button>
      <div>{{ currentTime.toFixed(2) }}s</div>
    </div>
    <div class="clips-container">
      <div
        class="clips"
        :style="{
          width: containerWidth + 'px'
        }"
      >
        <div
          class="clip-bar"
          :style="{ left: progress + '%' }"
        >
        </div>
        <div
          class="clip"
          v-for="clip in clips"
          :style="{
            width: clip.width + 'px',
            borderBottomColor: clip.color
          }"
        >
          {{ (clip.end - clip.start).toFixed(2) }}s
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Global editor singleton.
import { editor } from '../instax'
import { randomColor, getWidth } from './utils'

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
      hasPreset: false,
      clips: [],
      duration: 0,
      progress: 0
    }
  },
  computed: {
    currentTime () {
      if (!this.duration) return 0
      return this.progress * this.duration / 100
    },
    pausedText () {
      return this.paused ? 'play' : 'stop'
    },
    presetText () {
      return this.hasPreset ? 'on' : 'off'
    },
    containerWidth () {
      return this.clips.map(clip => clip.width).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    onUpdateClips () {
      this.duration = editor.duration
      this.clips = editor.clips.map(clip => (
        { ...clip, color: randomColor(), width: getWidth(clip) }
      ))
    },
    reset () {
      this.paused = true
      editor.stop(0)
    },
    togglePaused () {
      if (!this.clips.length) return
      this.paused ? editor.play() : editor.stop()
      this.paused = !this.paused
    },
    togglePreset () {
      if (!this.clips.length) return
      this.hasPreset ? editor.setPreset(false) : editor.setPreset(true)
      this.hasPreset = !this.hasPreset
    },
    clear () {
      editor.resetClips()
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
  height: 100px;
}
.debug-menu {
  display: flex;
  align-items: center;
  font-size: 12px;
  background: #f2f2f2;
}
.btn {
  margin-right: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background: lightskyblue;
}
.btn.reset {
  background: lightsalmon;
}
.btn.clear {
  background: lightcoral;
}
.btn.preset {
  width: 80px;
  margin-right: 10px;
  background: lightpink;
}
.clips-container {
  width: 100%;
  height: 75px;
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
  padding-top: 10px;
  padding-left: 10px;
  height: 60px;
  background: white;
  border-bottom-width: 5px;
  border-bottom-style: solid;
}
</style>
