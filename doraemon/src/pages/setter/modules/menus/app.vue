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
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2">
        <div class="fl-item-list" v-for="(lItem, lKey) in contentList" :key="lKey" :style="contentPaddingStyle">
          <div v-for="(item, key) in lItem" :key="key" :class="{'fl-item-group': !item.blankStyle}" :style="item.blankStyle || {}">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image" :style="imageFloatStyle" v-if="item.url">
                  <img :style="imageStyle" :src="item.url" v-if="item.checkedId != checkedId || !item.checkedUrl"/>
                  <img :style="imageStyle" :src="item.checkedUrl" v-if="item.checkedId == checkedId && item.checkedUrl"/>
                </div>
              </div>
              <div class="title" :style="mergeCheckedStyle(nameStyle, nameCheckedStyle, item.checkedId)" v-if="item.name" v-html="item.name"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme3 -->
      <div :class="'theme-' + theme" v-if="theme == 3">
        <div class="fl-container" :style="hiddenStyle">
          <div class="fl-item-content" v-for="(item, key) in dataContent" :key="key" :style="getContentPaddingStyle(contentPaddingStyle, key)">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback" :data-key="key">
              <div class="image-bk clear-fix">
                <div class="image" :style="imageFloatStyle" v-if="item.url">
                  <img :style="imageStyle" :src="item.url" v-if="item.checkedId != checkedId || !item.checkedUrl"/>
                  <img :style="imageStyle" :src="item.checkedUrl" v-if="item.checkedId == checkedId && item.checkedUrl"/>
                </div>
              </div>
              <div class="title" :style="mergeCheckedStyle(nameStyle, nameCheckedStyle, item.checkedId)" v-if="item.name" v-html="item.name"></div>
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
