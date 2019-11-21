<template>
  <div class="fc-editor" ref="FcEditor">
    <div class="tool-bar" :id="param.id + 'Tool'"></div>
    <div class="editor-content" :id="param.id + 'Content'" @touchstart="stopTouchstart" @mousedown="stopTouchstart"></div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
