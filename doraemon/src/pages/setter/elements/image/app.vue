<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback">
    <div class="e-image" :style="imageStyle">
      <div class="img-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.url"></div>
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
