<template>
  <div class="fc-module" :style="moudleStyle" ref='fcModule'>
    <div class="module-mask" v-if="isSet"></div>
    <div v-if="param.elements && param.elements.length">
      <div v-for="(item, key) in param.elements" :key="key">
        <EImage v-if="item.tag == 'image'" :param="item" :eid="key" :mid="mid" :isSet="isSet" :setConfig="setConfig" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
        <EText v-if="item.tag == 'text'" :param="item" :eid="key" :mid="mid" :isSet="isSet" :setConfig="setConfig" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
