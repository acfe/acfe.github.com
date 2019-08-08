<template>
  <div class="FcCheckbox clearFix" ref="FcCheckbox">
    <div class="item clearFix" v-for="(item, key) in param.data" :key="key" :style="param.itemStyle">
      <div class="checkbox" :class="{checked: item.checked}" @click="select" :data-checkbox-key="key"></div>
      <div class="option">{{item.option}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
