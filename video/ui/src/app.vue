<template>
  <div class="background">
    <div class="app">
      <preview/>
      <timeline/>
    </div>
  </div>
</template>

<script>
import Preview from './preview'
import Timeline from './timeline'

export default {
  name: 'App',
  components: {
    Preview,
    Timeline
  }
}
</script>

<style>
body, html {
  margin: 0;
  background: #f4f4f4;
}
.app {
  background: white;
  width: 600px;
  margin: 15px auto auto auto;
}
</style>
