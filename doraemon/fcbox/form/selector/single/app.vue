<template>
  <div class="FcSingleSelector clearFix" ref="FcSingleSelector">
    <div class="mask" v-if="itemShow" @click="hideItem"></div>
    <div class="inputBk">
      <input class="input" :placeholder="param.placeholder || ''" :value="param.option || param.value" :readonly="true" :style="param.inputStyle || {}" @click="show">
      <div class="icon" :class="{open: itemShow}"></div>
      <div class="itemList" v-if="itemShow" ref="selectorContent">
        <div class="itemBk" ref="itemList">
          <div class="item lineB" v-for="(item, key) in param.data" :key="key" :data-single-key="key" @click="change" :class="{itemChecked: param.value == item.value || param.value == item.option}" :style="param.itemStyle || {}">
            {{item.option}}
            <div class="checked" v-if="(param.value == item.value || param.value == item.option) && !param.hideSelectedIcon" :data-single-key="key"></div>
          </div>
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
