<template>
  <div class="fc-flip-player" ref="player" :style="playerStyle">
    <slot name="statusBar" :data="param.data" :checked="renderPage"/>
    <div class="flip-player-container" :key="randKey">
      <div class="flip-player-scroll" v-for="(item, key) in renderData" :key="key" :style="item.style || {}" :ref="item.ref || 'empty'" :data-render="item.dataRender || 'empty'">
        <div class="flip-player-content">
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
