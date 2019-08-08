<template>
  <div class="fc-list" ref="fcList">
    <div class="fc-list-content" ref="content" :style="contentStyle">
      <div class="fc-list-local-item" v-for="(item, key) in lazyRenderArr" :key="key" :style="item.style || {}">
        <slot :name="item.slot" :data="item"/>
      </div>
    </div>
    <div class="fc-list-pre-loader" ref="preLoader" :key="randKey" :id="componentKey">
      <div class="fc-list-local-item" v-for="(item, key) in preRenderArr" :key="key">
        <slot :name="item.slot" :data="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import '../less/list.less'
import App from './app.js'
export default App
</script>
