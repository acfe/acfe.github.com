<template>
  <FcModules :param="param" :mid="mid" :isSet="isSet" :acCallback="acCallback" :key="randKey" :refreshContent="refreshContent" :setSetterContent="setSetterContent">
    <div class="m-tab" :id="'tab' + param.id">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="tab-module" v-for="(item, key) in tabContent" :key="key">
          <MImages v-if="item && item.tag == 'images'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          <MMenus v-if="item && item.tag == 'menus'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
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
