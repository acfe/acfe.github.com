<template>
  <div>
    <div class="dom-player-status-bar" v-if="inTheme(guildTheme, [0, 1, 2, 3])" :style="barContainerStyle">
      <div class="status-bar-icon" v-for="(item, key) in  pageData" :key="key" :class="{'status-bar-icon-checked' : checkedKey == key}" :style="checkedKey == key ? barCheckedStyle : barStyle"></div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
