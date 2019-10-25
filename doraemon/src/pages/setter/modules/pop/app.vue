<template>
    <div class="m-pop" :class="{'m-absolute': isSet}" v-if="(isSet && popId == setPopId) || param.show" ref="fcPop">
      <div class="mask" :style="maskStyle" @touchstart="touchstart"></div>
      <div v-if="param.elements && param.elements.length">
      <div class="pop-container " :class="'p-' + param.popValign">
        <div v-for="(item, key) in param.elements" :key="key">
          <EImage v-if="item.tag == 'image'" :param="item" :isSet="isSet" :acCallback="acCallback" :zIndex="param.elements.length - key"/>
          <EText v-if="item.tag == 'text'" :param="item" :isSet="isSet" :acCallback="acCallback" :zIndex="param.elements.length - key"/>
          <EIcon v-if="item.tag == 'icon'" :param="item" :isSet="isSet" :acCallback="acCallback" :zIndex="param.elements.length - key"/>
        </div>
      </div>
    </div>
    </div>  
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
