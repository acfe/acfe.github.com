<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-images">
      <!-- theme1 5 6 7-->
      <div :class="'theme-1'" v-if="inTheme(theme, [1, 5, 6, 7])">
        <div class="image-group" :style="contentPaddingStyle" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)">
          <div :style="itemStyle">
            <div v-if="item.url">
              <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
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
                <div v-if="item.url">
                  <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
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
        <div class="fl-container" :style="hiddenStyle" @touchstart="stopTouchstart" @mousedown="stopTouchstart">
          <div class="fl-item-content" v-for="(item, key) in dataContent" :key="key" :style="getContentPaddingStyle(contentPaddingStyle, key)">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div v-if="item.url">
                  <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
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
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <div @click="clickCallback(props.data)">
              <FcFitImage :src="props.data.url" :imageStyle="param.imageStyle" v-if="props.data.url"/>
            </div>
          </template>
        </FcDomPlayer>
      </div>
      <!-- theme9 10-->
      <div :class="'theme-1'" v-if="inTheme(theme, [9, 10])">
        <div class="title" :style="titleStyle" v-if="param.title" v-html="param.title" @click="clickCallback(param)"></div>
      </div>
      <!-- theme11-->
      <div :class="'theme-11'" v-if="inTheme(theme, [11])"  @click="clickCallback(param)">
        <FcFitImage :src="param.url" :imageStyle="param.imageStyle"/>
      </div>
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
