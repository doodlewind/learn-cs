<template>
  <div class="picker-container">
    <div class="picker-banner">
      <button class="btn add" @click="addFile">add</button>
    </div>
    <div class="picker-list">
      <div v-for="(file, i) in files" class="picker-item">
        {{ file.name }}
        <input
          @change="setFile($event, i)"
          ref="file"
          type="file"
          accept="video/*"
          hidden
        />
        <div v-if="!!file.name">
          <button @click="useFile(i)" class="btn use">
            use
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { editor } from '../instax'

const FAKE_CLICK_INTERVAL = 50
export default {
  name: 'Picker',
  data () {
    return {
      files: []
    }
  },
  methods: {
    addFile () {
      this.files.push({ name: '', file: null })
      // Workaround $nextTick with setTimeout.
      setTimeout(() => {
        const lastFile = this.$refs.file[this.files.length - 1]
        lastFile.click()
      }, FAKE_CLICK_INTERVAL)
    },
    setFile (e, i) {
      Vue.set(this.files, i, {
        name: e.target.files[0].name,
        file: e.target.files[0]
      })
    },
    useFile (i) {
      editor.pushFile(this.files[i].file)
    }
  }
}
</script>

<style scoped>
.picker-container {
  flex: 1;
  background: white;
  height: 180px;
}
.picker-banner {
  display: flex;
  justify-content: flex-end;
}
.picker-list {
  height: calc(180px - 25px);
  overflow-y: auto;
}
.btn.add {
  background-color: lightgreen;
}
.btn.use {
  background-color: lightskyblue;
}
.btn.del {
  background-color: lightpink;
}
.picker-item {
  cursor: default;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 5px auto;
  padding-left: 15px;
  color: #666;
}
</style>
