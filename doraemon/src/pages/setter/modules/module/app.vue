<template>
  <div class="fc-module" :style="moudleStyle" ref='fcModule'>
    <div class="module-mask" v-if="isSet"></div>
    <slot/>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
