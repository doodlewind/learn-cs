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
  initStream,
  getVideoDuration,
  getMockProject,
  demoProject
} from './timeline'
import { getCurrentOffset } from './utils'

export default {
  name: 'VideoPreview',
  data () {
    return {
      currentURL: '',
      currentOffset: 0,
      currentDuration: 0,
      // video: { name, url, duration }
      videos: []
    }
  },
  created () {
    this.timelineStream = null
  },
  mounted () {
    // for debug
    window.v = this.$refs.video
  },
  methods: {
    async play () {
      const DEBUG_USE_MOCK = false
      let project

      DEBUG_USE_MOCK
        ? project = demoProject
        : project = getMockProject(this.videos)

      const { duration } = project
      this.timelineStream = initStream(project, this.currentOffset)

      this.timelineStream.subscribe(clip => {
        const { position, start, end, url } = clip
        const offset = position + end - start
        this.currentOffset = offset / duration * 100
        this.currentDuration = end - start

        const videoRef = this.$refs.video
        // 分别处理初始加载、切换新视频与继续播放当前视频的情形
        if (!this.currentURL || this.currentURL !== url) {
          this.currentURL = url
        } else if (videoRef.paused) {
          videoRef.play()
        }
      })
      // debugger // eslint-disable-lin
      this.timelineStream.next(true)
    },
    // 做三件小事，暂停 video、暂停 bar 与暂停 stream
    pause () {
      const { video, bar } = this.$refs
      video.pause()
      this.currentDuration = 0
      this.currentOffset = getCurrentOffset(bar)
      this.timelineStream.next(false)
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
