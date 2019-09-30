<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback">
    <div class="e-text" :style="textStyle">
      <div class="text-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.text"></div>
      {{param.text}}
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
