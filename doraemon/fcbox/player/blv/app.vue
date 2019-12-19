<template>
  <div class="fc-blv-player" ref="player" :style="playerStyle">
    <div class="blv-player-container" :key="randKey">
      <div class="blv-player-scroll" v-for="(item, key) in renderData" :key="key" :style="item.style || {}" :ref="item.ref || 'empty'" :data-render="item.dataRender || 'empty'">
        <div class="blv-player-content">
          <slot :name="item.slot" :data="item" v-if="item.slot != 'empty' && item.show"/>
        </div>
      </div>
    </div>
    <slot name="statusBar" :data="param.data" :checked="renderPage"/>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
