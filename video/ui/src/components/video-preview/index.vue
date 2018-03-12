<template>
  <div class="video-preview">
    <input @change="updateFile($event, 0)" type="file" accept="video/*"/>
    <input @change="updateFile($event, 1)" type="file" accept="video/*"/>
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
          left: nextPosition + '%',
          transitionDuration: nextDuration + 's'
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
  getCurrentTime,
  getVideoDuration,
  getProjectMeta,
  demoProject
} from './utils'
import {
  Clipline,
  PLAY_CLIP,
  STOP_CLIP
} from './clipline'

export default {
  name: 'VideoPreview',
  data () {
    return {
      currentURL: '',
      nextPosition: 0,
      nextDuration: 0,
      duration: 0,
      // video: { name, url, duration }
      videos: [],
      clips: []
    }
  },
  computed: {
    nextPercentage () {
      return this.nextTime / this.duration * 100
    }
  },
  created () {
    this.subscriber = null
  },
  mounted () {
    const DEBUG_USE_MOCK = true
    if (DEBUG_USE_MOCK) {
      this.clips = demoProject.clips
      this.duration = demoProject.duration
    }
  },
  methods: {
    async play () {
      const clipline = new Clipline(this.clips)
      const paused = false
      const currentTime = getCurrentTime(this.$refs.bar, this.duration)
      const timers = clipline.getTimers(currentTime, paused)
      this.subscribeStream(timers)
    },
    pause () {
      const clipline = new Clipline(this.clips)
      const paused = true
      const currentTime = getCurrentTime(this.$refs.bar, this.duration)
      const timers = clipline.getTimers(currentTime, paused)
      this.subscribeStream(timers)
    },
    async updateFile (e, index) {
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
      const { duration, clips } = getProjectMeta(this.videos)
      this.clips = clips
      this.duration = duration
    },
    subscribeStream (timers) {
      if (this.subscriber) this.subscriber.unsubscribe()
      console.log(timers)
      const timelineStream = initStream(timers)
      this.subscriber = timelineStream.subscribe(event => {
        console.log(event)
        switch (event.type) {
          case PLAY_CLIP: {
            const { position, start, end } = event.clip
            this.nextPosition = (position + end - start) / this.duration * 100
            this.nextDuration = event.duration
            break
          }
          case STOP_CLIP: {
            this.nextDuration = 0
            const currentTime = getCurrentTime(this.$refs.bar, this.duration)
            this.nextPosition = currentTime / this.duration * 100
            break
          }
        }
      })
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
