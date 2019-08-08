<template>
  <div class="index" ref="index" :style="bodyStyle" :key="pageKey">
    <div class="page" :style="pageStyle">
      <div class="module" v-for="(item, key) in showContent" :key="key" :slot="'s' + key">
        <Mimages v-if="item && item.tag == 'images'" :param="item" :setConfig="{}" :acCallback="acCallback"/>
      </div>
    </div>
    <div v-for="(item, key) in showPops" :key="key">
      <MPop :param="item" :setConfig="{}" :popId="key" :acCallback="acCallback"/>
    </div>
  </div>
</template>

<script>
import './index.less'
import Index from './index.js'
export default Index
</script>
