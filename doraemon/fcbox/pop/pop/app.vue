<template>
  <div class="fc-pop" ref="fcPop" v-if="param.show">
    <div class="fc-pop-mask"></div>
    <div class="fc-pop-table">
      <div class="fc-pop-table-cell" @click="hide">
        <div class="fc-pop-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
