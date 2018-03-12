<template>
  <div class="video-preview">
    <input @change="setFileURL($event, 0)" type="file" accept="video/*"/>
    <input @change="setFileURL($event, 1)" type="file" accept="video/*"/>
    <br/>
    <div class="video-body">
      <video
        :src="currentURL"
        ref="video"
        autoplay
      >
      </video>
    </div>
    <br/>
    <div class="timeline-wrapper">
      <div
        class="timeline-bar"
        ref="bar"
        :style="{
          left: currentOffset + '%',
          transitionDuration: currentDuration + 's'
        }"
      />
    </div>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  getVideoDuration,
  getMockProject,
  demoProject
} from './utils'
import { Clipline } from './clipline'

export default {
  name: 'VideoPreview',
  data () {
    return {
      currentURL: '',
      currentOffset: 0,
      currentDuration: 0,
      // video: { name, url, duration }
      project: {
        duration: 0,
        clips: []
      }
    }
  },
  created () {
    this.timelineStream = null
  },
  mounted () {
    const DEBUG_USE_MOCK = true

    DEBUG_USE_MOCK
      ? this.project = demoProject
      : this.project = getMockProject(this.videos)
  },
  methods: {
    async play () {
      const clipline = new Clipline(this.project.clips)
      const timers = clipline.getTimers(0, true)
      console.log(timers)
    },
    pause () {
    },
    async setFileURL (e, index) {
      const file = e.target.files[0]
      const canPlay = this.$refs.video.canPlayType(file.type)
      if (!canPlay) return

      const url = window.URL.createObjectURL(file)
      const videoMeta = {
        url,
        name: file.name,
        duration: await getVideoDuration(url)
      }

      Vue.set(this.videos, index, videoMeta)
    }
  }
}
</script>

<style>
.timeline-wrapper {
  position: relative;
  width: calc(3 * 100px);
  height: 20px;
  background: green;
}
.timeline-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 10px;
  background: grey;
  cursor: pointer;
  transition-property: 'left';
  transition-timing-function: linear;
}
.video-preview {
  color: #666;
}
.video-body {
  position: relative;
  width: calc(1.6 * 200px);
  height: calc(0.9 * 200px);
  background: black;
}
.video-body video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
