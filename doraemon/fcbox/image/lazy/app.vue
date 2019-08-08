<template>
  <div class="fc-lazy-image" ref="fcLazyImage" :key="randKey" :style="imageStyle">
    <img v-if="imageUrl" :src="imageUrl">
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
