<template>
  <div class="fc-loading-component" ref="loading" v-if="state.show">
    <div class="fc-loading-mask"></div>
    <div class="fc-loading"></div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
