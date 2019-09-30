<template>
  <div class="OrderSetter" ref="OrderSetterItem" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" :key="randomKey">
    <div class="OrderSetterItem" v-for="(item,key) in slots" :ref="item" :data-order-key="key" :key="key" :style="{'z-index': slots.length - key}">
      <div class="selectedBorder" :data-border-key="item"></div>
      <div data-control="del" class="delOrderIcon"  v-if="!param.hideDel && !param.content[key].hideDel" :class="{delOrderIconSetter: param.hideAdd, hide: !(!(param.lockFirst && param.content.length <= 1) && key == editKey)}" @click="delOrderIcon(key)"></div>
      <div data-control="add" class="addOrderIcon" @click="addOrderIcon(key)" v-if="!param.hideAdd"></div>
      <slot :name="item" :data="item" />
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
