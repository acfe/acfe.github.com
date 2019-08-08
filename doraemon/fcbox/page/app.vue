<template>
  <div class="FcPage" :style="{textAlign: param.align || 'left'}" @click="click">
    <span v-if="param.showPreAndNext && showPre" data-page="pre">上页</span>
    <span v-for="(item, key) in showArr" :key="key" :data-page="item" :class="{checked: item == param.currentPage}">{{item}}</span>
    <span v-if="param.showPreAndNext && showNext" data-page="next">下页</span>
    <input v-if="param.showInput" :value="param.currentPage" @focusout="inputAction">
    <span v-if="param.showCount" class="tip">{{param.currentPage}}/{{param.totalPage}}</span>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
