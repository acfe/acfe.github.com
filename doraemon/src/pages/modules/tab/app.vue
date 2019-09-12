<template>
  <FcModules :param="param" :elementRefreshCallback="elementRefreshCallback" :mid="mid" :isSet="0" :setConfig="setConfig" :acCallback="acCallback" :key="randKey">
    <div class="m-tab">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="tab-module" v-for="(item, key) in tabContent" :key="key">
          <MImages v-if="item && item.tag == 'images'" :isSet="isSet" :dataSource="dataSource" :param="item" :setConfig="{ isTabModule: 1 }" :acCallback="acCallback"/>
          <MMenus v-if="item && item.tag == 'menus'" :isSet="isSet" :dataSource="dataSource" :param="item" :setConfig="{ isTabModule: 1 }" :acCallback="acCallback"/>
          <MGoods v-if="item && item.tag == 'goods'" :isSet="isSet" :dataSource="dataSource" :param="item" :setConfig="{ isTabModule: 1 }" :acCallback="acCallback"/>
        </div>
      </div>
    </div>
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
