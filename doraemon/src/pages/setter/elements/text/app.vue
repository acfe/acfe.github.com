<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback" :entry="entry">
    <div ref="text" class="e-text" :style="textStyle" @touchstart="stopTouchstart" @mousedown="stopTouchstart"><div v-html="param.text"></div>
      <div class="text-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.text"></div>
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
