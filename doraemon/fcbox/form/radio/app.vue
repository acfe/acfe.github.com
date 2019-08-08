<template>
  <div class="FcRadio clearFix" ref="FcPop">
    <div class="item clearFix" v-for="(item, key) in param.data" :style="param.itemStyle" :data-radio-key="key" :key="key">
      <div class="radio" :class="{checked: param.value == item.value}" @click="select" :data-radio-key="key"></div>
      <div class="option" :data-radio-key="key">{{item.option}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
