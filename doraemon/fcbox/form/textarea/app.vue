<template>
  <div class="fc-textarea clear-fix" ref="FcTextarea">
    <div class="placeholder-text" :key="randKey">{{param.value}}&nbsp;</div>
    <textarea class="textarea" :placeholder="param.placeholder || ''" :value="param.value" :readonly="param.readonly || false" @input="input" @keyup="keyup" @focus="focus" @focusout="focusout" :style="param.inputStyle || {}" :maxlength="param.maxlength || ''" :type="param.type || 'text'"></textarea>
    <div class="tip" :style="param.tipStyle || {}" v-if="param.tip && param.showTip">{{param.tip}}</div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
