<template>
    <div class="m-pop" :class="{'m-absolute': isSet}" v-if="(isSet && popId == setPopId) || param.show" ref="fcPop">
      <div class="mask" :style="maskStyle" @touchstart="touchstart"></div>
      <div v-if="param.elements && param.elements.length">
      <div v-for="(item, key) in param.elements" :key="key">
        <EImage v-if="item.tag == 'image'" :param="item" :eid="key" mid="pop" :isSet="isSet" :acCallback="acCallback" :zIndex="param.elements.length - key" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
        <EText v-if="item.tag == 'text'" :param="item" :eid="key" mid="pop" :isSet="isSet" :acCallback="acCallback" :zIndex="param.elements.length - key" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
      </div>
    </div>
    </div>  
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
