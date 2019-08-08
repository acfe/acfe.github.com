<template>
  <div class="fc-tree-menu" ref="FcTreeMenu" @click="treeClick">
    <div v-for="(item, key) in renderArr" class="item clear-fix" :key="key" :style="{paddingLeft: propertyObj[item].level * 20 + 10 + 'px', top: rendStart + key * 50 + 'px'}" :data-id="item" :class="{checked: propertyObj[item].checked}">
      <div class="icon" :data-id="item" data-target="icon" :data-icon="1" :class="{open: propertyObj[item].open, text: !relativeObj[item] || !relativeObj[item].length}"></div>
      <div class="title" :data-id="item">{{propertyObj[item].name}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
