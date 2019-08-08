<template>
  <div class="fc-list" ref="fcList">
    <div class="fc-list-content" ref="content">
      <slot v-for="item in renderArr" :name="item.key"/>
    </div>
    <div class="fc-list-pre-loader" ref="preLoader" :key="randKey" :id="componentKey">
      <slot v-for="item in preRenderArr" :name="item.key"/>
    </div>
  </div>
</template>

<script>
import '../less/list.less'
import App from './app.js'
export default App
</script>
