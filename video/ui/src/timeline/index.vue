<template>
  <div class="timeline-wrapper">
    <div class="debug-menu">
      <button @click="play" class="btn">play</button>
      <div>{{ flag }}</div>
      <!-- <div>{{ time }}</div> -->
    </div>
    <div class="clips-container">
      <div
        class="clips"
        :style="{
          width: containerWidth
        }"
      >
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
.clips-container {
  width: 100%;
  height: 175px;
  overflow-x: auto;
}
.clips {
  display: flex;
  height: 100%;
  align-items: center;
}
.clip {
  margin: 10px;
  width: 180px;
  height: 70px;
  background: white;
}
</style>
