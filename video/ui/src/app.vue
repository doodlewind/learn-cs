<template>
  <div class="background">
    <div class="app">
      <div class="app-row">
        <preview/>
        <picker/>
      </div>
      <timeline/>
    </div>
  </div>
</template>

<script>
import Preview from './preview'
import Picker from './picker'
import Timeline from './timeline'

export default {
  name: 'App',
  components: {
    Preview,
    Picker,
    Timeline
  }
}
</script>

<style>
body, html {
  margin: 0;
  background: #f4f4f4;
  font-size: 12px;
}
.app {
  background: white;
  width: 600px;
  margin: 15px auto auto auto;
}
.app-row {
  display: flex;
}
input[type="button"], button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  padding: 0;
  cursor: pointer;
}
button:focus {
  outline-width: 0;
}
.btn {
  font-size: 12px;
  background: #ddd;
  color: white;
  height: 25px;
  width: 50px;
  cursor: pointer;
}
</style>
