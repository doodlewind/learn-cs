<template>
  <div class="preview-wrapper">
    <canvas width="320" height="180"></canvas>
  </div>
</template>

<script>
import { editor, Renderer } from '../instax'

export default {
  name: 'Preview',
  mounted () {
    const $canvas = this.$el.children[0]
    this.renderer = new Renderer($canvas, editor.buffer)
    // debug
    window.renderer = this.renderer
    editor.subscribe({
      onTick: this.renderer.render,
      onUpdateVideos: this.renderer.updateVideos
    })
  }
}
</script>

<style scoped>
.preview-wrapper {
  display: flex;
  align-items: center;
  background: black;
  width: 320px;
  height: 180px;
}
</style>
