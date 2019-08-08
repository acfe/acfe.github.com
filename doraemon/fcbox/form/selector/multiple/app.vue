<template>
  <div class="FcMultipleSelector clearFix" ref="FcMultipleSelector">
    <div class="mask" v-if="itemShow" @click="hideItem"></div>
    <div class="inputBk">
      <input class="input" :placeholder="param.placeholder || ''" :value="value" :readonly="true" :style="param.inputStyle || {}" @click="show">
      <div class="icon" :class="{open: itemShow}"></div>
      <div class="itemList" v-if="itemShow" ref="selectorContent">
        <div class="itemBk" ref="itemList">
          <Checkbox :param="param" :callback="checkboxCallback" />
        </div>
      </div>
      <div class="tip" :style="param.tipStyle || {}" v-if="param.tip && param.showTip && !itemShow">{{param.tip}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
