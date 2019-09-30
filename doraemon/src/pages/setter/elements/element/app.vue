<template>
  <div class="fc-element" ref="element" :data-eid="eid" :data-lock="param.lock ? 1 : 0" :style="elementStyle" @click="clickCallback(param)" data-contextmenu="element">
    <div class="elment-content">
      <slot/>
    </div>
    <div class="elment-setter" v-if="isSet && !param.lock">
      <div class="set-border" :class="{setted: setConfig.setElementId == eid}"></div>
      <div class="set-size-control set-size-left" v-if="setConfig.setElementId == eid" data-set-size="left"></div>
      <div class="set-size-control set-size-right" v-if="setConfig.setElementId == eid" data-set-size="right"></div>
      <div class="set-size-control set-size-top" v-if="setConfig.setElementId == eid" data-set-size="top"></div>
      <div class="set-size-control set-size-bottom" v-if="setConfig.setElementId == eid" data-set-size="bottom"></div>
      <div class="set-size-control set-rotate" v-if="setConfig.setElementId == eid" data-set-size="rotate"></div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
