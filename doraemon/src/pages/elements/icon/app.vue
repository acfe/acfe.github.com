<template>
  <FcEelement :param="param" :isSet="isSet" :eid="eid" :mid="mid" :setConfig="setConfig" :zIndex="zIndex" :acCallback="acCallback">
    <div class="e-icon">
      <div class="icon-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !hasIcon"></div>
      <div ref="svg"></div>
    </div>
  </FcEelement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
