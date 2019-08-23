<template>
  <div class="index" ref="index" :key="pageKey">
    <div class="page" :style="pageStyle">
      <!-- top -->
      <div class="top-content" :style="{height: showObj.topHeight + 'px'}" v-if="showObj.topContent && showObj.topContent.length">
        <div class="module" v-for="(item, key) in showObj.topContent" :style="setModuleStyle(item)" :key="key">
          <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
          <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
          <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
        </div>
      </div>
      <!-- normal -->
      <div class="module" v-for="(item, key) in showObj.normalContent" :style="setModuleStyle(item)" :key="key" :ref="'lock' + item.lockId">
        <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
        <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
        <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
      </div>
      <!-- bottom -->
      <div class="bottom-content" :style="{height: showObj.bottomHeight + 'px'}" v-if="showObj.bottomContent && showObj.bottomContent.length">
        <div class="module" v-for="(item, key) in showObj.bottomContent" :style="setModuleStyle(item)" :key="key">
          <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
          <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
          <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :setConfig="{}" :acCallback="acCallback"/>
        </div>
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
