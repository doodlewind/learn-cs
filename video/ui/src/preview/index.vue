<template>
  <div class="preview-wrapper">
    <canvas width="320" height="240"></canvas>
  </div>
</template>

<script>
import { editor, Renderer } from '../instax'

export default {
  name: 'Preview',
  mounted () {
    const $canvas = this.$el.children[0]
    this.renderer = new Renderer($canvas)
    editor.subscribe({
      onTick: this.renderer.render,
      onUpdateVideos: this.renderer.updateVideos
    })
  }
}
</script>

<style scoped>
.preview-wrapper {
  background: black;
  width: 320px;
  height: 240px;
}
</style>
