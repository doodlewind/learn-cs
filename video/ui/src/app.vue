<template>
  <div class="background">
    <div class="app">
      <div class="app-row">
        <preview/>
        <picker
          @fileUsed="onFileUsed"
          @fileDeleted="onFileDeleted"
        />
      </div>
      <timeline/>
    </div>
  </div>
</template>

<script>
import Preview from './preview'
import Picker from './picker'
import Timeline from './timeline'
import { model } from './timeline/model'

export default {
  name: 'App',
  data () {
    return {
      paused: true,
      currentTime: 0,
      clips: []
    }
  },
  methods: {
    onFileUsed (file) {
      model.pushFile(file)
    },
    onFileDeleted (file) {
      console.log('TODO delete', file)
    }
  },
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
