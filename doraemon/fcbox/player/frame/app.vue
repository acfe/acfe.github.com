<template>
  <div class="frame-player" ref="FcFramePlayer" :key="randKey">
    <FcFitImage :src="imageUrl" :imageStyle="imageStyle"/>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
