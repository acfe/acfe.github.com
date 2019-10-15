<template>
  <FcEelement :param="param" :isSet="isSet" :eid="eid" :mid="mid" :setConfig="setConfig" :zIndex="zIndex" :acCallback="acCallback">
    <div class="e-image">
      <div class="img-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.url"></div>
      <img :src="param.url" :style="imageRadiusStyle"/>
    </div>
  </FcEelement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
