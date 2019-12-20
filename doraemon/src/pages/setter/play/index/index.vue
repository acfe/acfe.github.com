<template>
  <div class="index" ref="index" :key="pageKey">
    <div class="page" :style="pageStyle" ref="page">
      <div class="top-content" ref="topContent">
        <div class="module-relative moduleItem" v-for="(item, key) in showObj.topContent" :key="key" :data-id="item.id">
          <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MGroup v-if="item && item.tag == 'group'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
        </div>
      </div>
      <div class="module-relative" :style="setNormalContentPadding()">
        <div class="module-relative moduleItem" :class="{moduleLock: item.lockPosition == 'lock'}" v-for="(item, key) in showObj.normalContent" :key="key" :data-id="item.id">
          <div class="module-relative">
            <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
            <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
            <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
            <MGroup v-if="item && item.tag == 'group'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
            <MTab v-if="item && item.tag == 'tab'" :pages="contentConfig.pages" :tabItems="tabItems" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="module-relative moduleItem" v-for="(item, key) in showObj.bottomContent" :key="key" :data-id="item.id">
          <MImages v-if="item && item.tag == 'images'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MMenus v-if="item && item.tag == 'menus'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MGoods v-if="item && item.tag == 'goods'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
          <MGroup v-if="item && item.tag == 'group'" :dataSource="contentConfig.dataSource" :param="item" :acCallback="acCallback"/>
        </div>
      </div>
    </div>
    <div :key="popKey">
      <div v-for="(item, key) in contentConfig.pops" :key="key">
        <MPop :param="item" :popId="key" :acCallback="acCallback"/>
      </div>
    </div>
    <div class="to-top-btn" @click="goToTop" ref="toTopBtn" :style="toTopBtnStyle" v-if="showToTopBtn && toTopIconUrl">
      <img :src="toTopIconUrl">
    </div>
    <div class="music-btn" :class="{'animate': musicObj.autoplay}" :style="musicStyle" ref="music" @click="musicControl" v-if="musicObj.src" :key="musicObj.key">
      <img :src="musicObj.icon" v-if="musicObj.icon">
      <audio :autoplay="musicObj.autoplay" ref="audio" loop="loop" :src="musicObj.src" class="music-audio"></audio>
    </div>
  </div>
</template>

<script>
import './index.less'
import Index from './index.js'
export default Index
</script>
