<template>
  <div id="app">
    <video-preview/>
    <timeline/>
  </div>
</template>

<script>
import Timeline from './components/timeline'
import VideoPreview from './components/video-preview/index'

export default {
  name: 'App',
  components: {
    Timeline,
    VideoPreview
  }
}
</script>

<style>
html {
  font-size: 100px;
}
div, span {
  font-size: .14rem;
}
#app {
  color: #2c3e50;
}
</style>
