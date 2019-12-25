<template>
  <div>
    <div v-for="(item, key) in param.content" :key="key">
      <MImages v-if="item && item.tag == 'images'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
      <MMenus v-if="item && item.tag == 'menus'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
      <MGroup v-if="item && item.tag == 'group'" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
      <MGoods v-if="item && item.tag == 'goods'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
      <MTab v-if="item && item.tag == 'tab'" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
    </div>
  </div>
</template>

<script>
import App from './app.js'
export default App
</script>
