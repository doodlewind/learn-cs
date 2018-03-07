<template>
  <div id="app">
    <video-preview/>
  </div>
</template>

<script>
import VideoPreview from './components/video-preview/index'

export default {
  name: 'App',
  components: {
    VideoPreview
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
