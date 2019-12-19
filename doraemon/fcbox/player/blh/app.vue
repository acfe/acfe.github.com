<template>
  <div class="fc-blh-player" ref="player" :style="playerStyle">
    <slot name="statusBar" :data="param.data" :checked="renderPage"/>
    <div class="blh-player-container" :key="randKey">
      <div class="blh-player-scroll" v-for="(item, key) in renderData" :key="key" :style="item.style || {}" :ref="item.ref || 'empty'" :data-render="item.dataRender || 'empty'">
        <div class="blh-player-content">
          <slot :name="item.slot" :data="item" v-if="item.slot != 'empty' && item.show"/>
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
