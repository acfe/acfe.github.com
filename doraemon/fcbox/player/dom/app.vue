<template>
  <div class="fc-dom-player" ref="fcDomPlayer">
    <slot name="statusBar" :data="param.data" :checked="renderPage"/>
    <div class="dom-player-scroll" ref="player">
      <div class="dom-player-content" v-if="renderData && renderData.length" :style="playerStyle" :key="randKey">
        <div class="player-td" v-for="(item, key) in renderData" :key="key" :style="itemStyle" :data-render="item.dataRender || 'empty'">
          <slot :name="item.slot" :data="item" v-if="item.slot != 'empty' && item.show"/>
          <div v-if="item.slot == 'empty' || !item.show">&nbsp;</div>
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
