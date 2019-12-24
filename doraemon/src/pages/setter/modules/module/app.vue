<template>
  <div class="fc-module" :style="moduleStyle" ref='fcModule' data-contextmenu="module">
    <div class="module-mask" v-if="isSet"></div>
    <slot/>
    <div v-for="(item, key) in param.elements" :key="key">
      <EImage v-if="item.tag == 'image'" :param="item" :isSet="isSet" :zIndex="baseZindex + param.elements.length - key" :acCallback="acCallback" entry="m"/>
      <EText v-if="item.tag == 'text'" :param="item" :isSet="isSet" :zIndex="baseZindex + param.elements.length - key" :acCallback="acCallback" entry="m"/>
      <EIcon v-if="item.tag == 'icon'" :param="item" :isSet="isSet" :zIndex="baseZindex + param.elements.length - key" :acCallback="acCallback" entry="m"/>
      <EBusiness v-if="item.tag == 'business'" :param="item" :isSet="isSet" :zIndex="baseZindex + param.elements.length - key" :acCallback="acCallback" entry="m"/>
    </div>
    <div class="show-more" @click="showMore" v-if="isShowMore && param.showMoreText">
      <div class="show-more-content clear-fix">
        <div class="show-more-text">{{param.showMoreText}}</div>
        <div class="show-more-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
