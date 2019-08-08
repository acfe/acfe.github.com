<template>
  <div class="fc-button-component" ref="FcButton">
    <div :class="className" :style="style" @click="clickAction">
      <div class="fc-button-text" :style="textStyle">{{text || '确定'}}</div>
      <div :class="tapClassName" :style="tapStyle" v-if="!param.disabled"></div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
