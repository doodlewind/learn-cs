<template>
  <div class="video-preview">
    <input @change="setFileURL($event, 0)" type="file" accept="video/*"/>
    <input @change="setFileURL($event, 1)" type="file" accept="video/*"/>
    <br/>
    <div class="video-body">
      <video
        :src="currURL"
        ref="video"
        autoplay
      >
      </video>
    </div>
    <br/>
    <div class="timeline-wrapper">
      <div
        class="timeline-bar"
        :style="{
          left: currOffset + '%',
          transitionDuration: currDuration + 's'
        }"
      />
    </div>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
    <button @click="change">change</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Stream, demoProject } from './timeline'
import { getVideoDuration, getMockProject } from './utils'

export default {
  name: 'VideoPreview',
  data () {
    return {
      currURL: '',
      currOffset: 0,
      currDuration: 0,
      // video: { name, url, duration }
      videos: []
    }
  },
  methods: {
    async play () {
      const DEBUG_USE_MOCK = false
      let project

      DEBUG_USE_MOCK
        ? project = demoProject
        : project = getMockProject(this.videos)

      const { duration, timeline } = project
      const timelineStream = Stream(timeline)

      // debugger // eslint-disable-line
      timelineStream.subscribe(clip => {
        console.log(clip)
        const { position, start, end, url } = clip
        const offset = position + end - start
        this.currOffset = offset / duration * 100
        this.currDuration = end - start
        this.currURL = url
      })
    },
    pause () {
      this.$refs.video.pause()
    },
    change () {},
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
