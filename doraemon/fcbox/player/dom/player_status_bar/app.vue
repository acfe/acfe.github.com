<template>
  <div>
    <div class="dom-player-status-bar" v-if="!guildTheme">
      <div class="status-bar-icon" v-for="(item, key) in  pageData" :key="key" :class="{'status-bar-icon-checked' : checkedKey == key}"></div>
    </div>
    <div class="dom-player-status-bar1" v-if="guildTheme == 1">
      <div class="status-bar-icon" v-for="(item, key) in  pageData" :key="key" :class="{'status-bar-icon-checked' : checkedKey == key}"></div>
    </div>
    <div class="dom-player-status-bar2" v-if="guildTheme == 2">
      <div class="status-bar-icon" v-for="(item, key) in  pageData" :key="key" :class="{'status-bar-icon-checked' : checkedKey == key}"></div>
    </div>
    <div class="dom-player-status-bar3" v-if="guildTheme == 3">
      <div class="status-bar-icon" v-for="(item, key) in  pageData" :key="key" :class="{'status-bar-icon-checked' : checkedKey == key}"></div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
