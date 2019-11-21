<template>
  <div class="fc-input clear-fix" ref="FcInput">
    <div class="input-bk" @touchstart="stopTouchstart" @mousedown="stopTouchstart">
      <input class="input" :placeholder="param.placeholder || ''" :value="param.value" :readonly="param.readonly || false" @input="input" @focus="focus" @keyup="keyup" @focusout="focusout" :style="param.inputStyle || {}" :maxlength="param.maxlength || ''" :type="param.type || 'text'">
      <div class="tip" :style="param.tipStyle || {}" v-if="param.tip && param.showTip">{{param.tip}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
