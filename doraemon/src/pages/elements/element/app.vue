<template>
  <div class="fc-element" ref="element" :data-eid="eid" :data-lock="param.lock ? 1 : 0" :style="setterStyle" @click="clickCallback(param)">
    <div class="elment-content">
      <slot/>
    </div>
    <div class="elment-setter" v-if="!param.lock">
      <div class="set-border" :class="{setted: setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')}" v-if="isSet"></div>
      <div class="set-size-control set-size-left" v-if="isSet && setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')" :data-eid="eid" data-set-size="left" :data-set-tag="param.tag"></div>
      <div class="set-size-control set-size-right" v-if="isSet && setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')" :data-eid="eid" data-set-size="right" :data-set-tag="param.tag"></div>
      <div class="set-size-control set-size-top" v-if="isSet && setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')" :data-eid="eid" data-set-size="top" :data-set-tag="param.tag"></div>
      <div class="set-size-control set-size-bottom" v-if="isSet && setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')" :data-eid="eid" data-set-size="bottom" :data-set-tag="param.tag"></div>
      <div class="set-size-control set-rotate" v-if="isSet && setConfig.setElementId == eid && (setConfig.setModuleId == mid || mid == 'pop')" :data-eid="eid" data-set-size="rotate"></div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
