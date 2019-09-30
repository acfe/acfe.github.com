<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-menus">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1" :style="hiddenStyle">
        <div class="menu-container">
          <div class="meun-item-content" v-for="(item, key) in dataContent" :key="key" :style="contentPaddingStyle">
            <div class="meun-item" :style="itemStyle" @click="clickCallback" :data-key="key">
              <div class="menu-item-text" :style="mergeCheckedStyle(nameStyle, nameCheckedStyle, item.checkedId)">{{item.name}}</div>
              <div class="checked-bar-content" :style="checkedBarPosStyle" v-if="item.checkedId == checkedId">
                <div class="checked-bar" :style="checkedBarStyle"></div>
              </div>
            </div>
          </div>
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
