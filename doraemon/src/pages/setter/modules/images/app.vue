<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-images">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="image-group" :style="contentPaddingStyle" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)">
          <div :style="itemStyle">
            <div class="t-center clear-fix">
              <div class="image" :style="imageFloatStyle">
                <img :style="imageStyle" v-if="item.url" :src="item.url"/>
              </div>
            </div>
            <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
            <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
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
                  <img :style="imageStyle" :src="item.url"/>
                </div>
              </div>
              <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme3 -->
      <div :class="'theme-' + theme" v-if="theme == 3">
        <div class="fl-container" :style="hiddenStyle">
          <div class="fl-item-content" v-for="(item, key) in dataContent" :key="key" :style="getContentPaddingStyle(contentPaddingStyle, key)">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image" :style="imageFloatStyle" v-if="item.url">
                  <img :style="imageStyle" :src="item.url"/>
                </div>
              </div>
              <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme4 -->
      <div :class="'theme-' + theme" v-if="theme == 4">
        <FcDomPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <div class="dom-player-status-bar">
              <div class="status-bar-icon" v-for="(item, key) in  props.data" :key="key" :class="{'status-bar-icon-checked' : props.checked == key}"></div>
            </div>
          </template>
          <template slot="s1" slot-scope="props">
            <div class="image" :style="imageStyle" @click="clickCallback(props.data)">
              <img :src="props.data.url"/>
            </div>
          </template>
        </FcDomPlayer>
      </div>
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
