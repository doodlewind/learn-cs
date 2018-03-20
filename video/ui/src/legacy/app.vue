<template>
  <div class="app">
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
  ClipModel,
  PLAY_CLIP,
  STOP_CLIP,
  SEEK_CLIP
} from './clip-model'
import Debug from 'debug'
import { SlideBar } from './slide-bar'
import { VideoAdapter } from './video-adapter'

const debug = Debug('video')

export default {
  name: 'App',
  data () {
    return {
      currentURL: '',
      nextPosition: 0,
      nextDuration: 0,
      duration: 0,
      // video: { name, url, duration }
      videos: []
    }
  },
  created () {
    this.clipModel = new ClipModel()
    this.videoAdapter = new VideoAdapter()
    this.subscriber = null
  },
  mounted () {
    const DEBUG_USE_MOCK = false
    if (DEBUG_USE_MOCK) {
      this.clipModel.setClips(demoProject.clips)
      this.duration = demoProject.duration
    }
    // eslint-disable-next-line
    new SlideBar({
      bar: this.$refs.bar,
      totalWidth: 300,
      onSlideStart: this.pause,
      onSlideChange: this.seek
    })
  },
  methods: {
    play () {
      const currentTime = getCurrentTime(this.$refs.bar, this.duration)
      const states = this.clipModel.getPlayStates(currentTime)
      this.subscribeStream(states)
    },
    pause () {
      const currentTime = getCurrentTime(this.$refs.bar, this.duration)
      const states = this.clipModel.getPausedStates(currentTime)
      this.subscribeStream(states)
    },
    seek (percentage) {
      const time = this.duration * percentage
      const states = this.clipModel.getSeekStates(time)
      this.subscribeStream(states)
    },
    playVideo (url) {
      // 分别处理初始加载、切换新视频与继续播放当前视频的情形
      if (!this.currentURL || this.currentURL !== url) {
        this.currentURL = url
      } else if (this.$refs.video.paused) {
        this.$refs.video.play()
      }
    },
    pauseVideo () {
      this.$refs.video.pause()
    },
    seekVideo (url, time) {
      this.pauseVideo()
      if (!this.currentURL || this.currentURL !== url) {
        this.currentURL = url
      }
      this.$refs.video.currentTime = time
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
      this.clipModel.setClips(clips)
      this.duration = duration
    },
    subscribeStream (states) {
      if (this.subscriber) this.subscriber.unsubscribe()
      debug('states', states)
      const timelineStream = initStream(states)
      this.subscriber = timelineStream.subscribe(state => {
        this.videoAdapter.setState(state)
        debug('event', state)
        switch (state.type) {
          case PLAY_CLIP: {
            const { position, start, end, url } = state.clip
            this.playVideo(url)
            this.nextPosition = (position + end - start) / this.duration * 100
            this.nextDuration = state.duration
            break
          }
          case STOP_CLIP: {
            this.nextDuration = 0
            this.pauseVideo()
            const currentTime = getCurrentTime(this.$refs.bar, this.duration)
            this.nextPosition = currentTime / this.duration * 100
            break
          }
          case SEEK_CLIP: {
            const { time, from } = state
            this.seekVideo(state.clip.url, from)
            this.nextDuration = 0
            this.nextPosition = time / this.duration * 100
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
  border-right: 10px #ddd solid;
  height: 20px;
  background: #ddd;
}
.timeline-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 10px;
  background: lightskyblue;
  transition-property: 'left';
  transition-timing-function: linear;
}
.app {
  color: #666;
}
.video-body {
  position: relative;
  width: 310px;
  height: calc(310px / 16 * 9);
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
