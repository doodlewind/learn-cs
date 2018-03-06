<template>
  <div class="video-preview">
    <input @change="setFileURL($event, 0)" type="file" accept="video/*"/>
    <input @change="setFileURL($event, 1)" type="file" accept="video/*"/>
    <br/>
    <div class="video-body">
      <video
        :src="videoURL"
        ref="video"
        autoplay
      >
      </video>
    </div>
    <br/>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
    <button @click="change">change</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'VideoPreview',
  data () {
    return {
      videoURL: null,
      fileURLs: [null, null]
    }
  },
  methods: {
    play () {
      if (!this.fileURLs[0] || !this.fileURLs[1]) {
        window.alert('invalid videos')
        return
      }

      this.videoURL = this.fileURLs[0]
      setTimeout(() => {
        this.videoURL = this.fileURLs[1]
      }, 3e3)
    },
    pause () {
      this.$refs.video.pause()
    },
    change () {
      console.log(123)
    },
    setFileURL (e, index) {
      console.log(21312312)
      const file = e.target.files[0]

      const canPlay = this.$refs.video.canPlayType(file.type)
      if (!canPlay) return

      const fileURL = window.URL.createObjectURL(file)
      Vue.set(this.fileURLs, index, fileURL)
    }
  }
}
</script>

<style>
.video-preview {
  color: #666;
}
.video-body {
  position: relative;
  width: calc(1.6 * 2rem);
  height: calc(0.9 * 2rem);
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
