<template>
    <div class="m-pop" :class="{'m-absolute': isSet}" v-if="(isSet && popId == setConfig.setPopId) || param.show" ref="fcPop">
      <div class="mask" :style="maskStyle"></div>
      <div v-if="param.elements && param.elements.length">
      <div v-for="(item, key) in param.elements" :key="key">
        <EImage v-if="item.tag == 'image'" :param="item" :eid="key" mid="pop" :isSet="isSet" :setConfig="setConfig" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
        <EText v-if="item.tag == 'text'" :param="item" :eid="key" mid="pop" :isSet="isSet" :setConfig="setConfig" :zIndex="param.elements.length - key" :acCallback="acCallback"/>
      </div>
    </div>
    </div>  
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
