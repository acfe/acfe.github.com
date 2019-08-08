<template>
  <FcEelement :param="param" :isSet="isSet" :eid="eid" :mid="mid" :setConfig="setConfig" :zIndex="zIndex" :acCallback="acCallback">
    <div class="e-text" :style="textStyle">
     {{param.text || ''}}
    </div>
  </FcEelement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
