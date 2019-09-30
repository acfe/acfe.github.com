<template>
  <div class="fc-module" :style="moduleStyle" ref='fcModule' data-contextmenu="module">
    <div class="module-mask" v-if="isSet"></div>
    <slot/>
    <div v-for="(item, key) in param.elements" :key="key">
      <EImage v-if="item.tag == 'image'" :param="item" :isSet="isSet" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
      <EText v-if="item.tag == 'text'" :param="item" :isSet="isSet" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
