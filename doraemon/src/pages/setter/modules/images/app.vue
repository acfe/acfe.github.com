<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-images">
      <!-- theme1 5 6 7 12 13-->
      <div :class="'theme-1'" v-if="inTheme(theme, [1, 5, 6, 7, 12, 13])">
        <div class="image-group" :style="contentPaddingStyle" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)">
          <div :style="itemStyle">
            <div class="image-content" v-if="item.url">
              <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
              <div class="f-content-mask" v-if="param.textMaskImage" :style="textMaskStyle"></div>
              <div class="f-content" :style="fContentStyle">
                <div class="f-tag" :style="fTagStyle" v-if="item.fTag" v-html="item.fTag"></div>
                <div class="title" :style="fTitleStyle" v-if="item.fTitle" v-html="item.fTitle"></div>
                <div class="description" :style="fDescriptionStyle" v-if="item.fDescription" v-html="item.fDescription"></div>
              </div>
            </div>
            <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
            <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
          </div>
        </div>
      </div>
      <!-- theme2 -->
      <div class="theme-2" v-if="inTheme(theme, [2, 15])">
        <div class="fl-item-list" v-for="(lItem, lKey) in contentList" :key="lKey" :style="contentPaddingStyle">
          <div v-for="(item, key) in lItem" :key="key" :class="{'fl-item-group': !item.blankStyle}" :style="item.blankStyle || {}">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image-content" v-if="item.url">
                  <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
                  <div class="f-content-mask" v-if="param.textMaskImage" :style="textMaskStyle"></div>
                  <div class="f-content" :style="fContentStyle">
                    <div class="f-tag" :style="fTagStyle" v-if="item.fTag" v-html="item.fTag"></div>
                    <div class="title" :style="fTitleStyle" v-if="item.fTitle" v-html="item.fTitle"></div>
                    <div class="description" :style="fDescriptionStyle" v-if="item.fDescription" v-html="item.fDescription"></div>
                  </div>
                </div>
              </div>
              <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme3 14 -->
      <div class="theme-3" v-if="inTheme(theme, [3, 14])">
        <div class="fl-container" :style="hiddenStyle" @touchstart="stopTouchstart" @mousedown="stopTouchstart">
          <div class="fl-item-content" v-for="(item, key) in dataContent" :key="key" :style="getContentPaddingStyle(contentPaddingStyle, key)">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image-content" v-if="item.url">
                  <FcFitImage :src="item.url" :imageStyle="param.imageStyle"/>
                  <div class="f-content-mask" v-if="param.textMaskImage" :style="textMaskStyle"></div>
                  <div class="f-content" :style="fContentStyle">
                    <div class="f-tag" :style="fTagStyle" v-if="item.fTag" v-html="item.fTag"></div>
                    <div class="title" :style="fTitleStyle" v-if="item.fTitle" v-html="item.fTitle"></div>
                    <div class="description" :style="fDescriptionStyle" v-if="item.fDescription" v-html="item.fDescription"></div>
                  </div>
                </div>
              </div>
              <div class="title" :style="titleStyle" v-if="item.title" v-html="item.title"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme4 -->
      <div class="theme-4"  v-if="inTheme(theme, [4, 16]) && domPlayerParam.loaded">
        <FcDomPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <div class="image-content" @click="clickCallback(props.data)">
              <FcFitImage :src="props.data.url" :imageStyle="param.imageStyle" v-if="props.data.url"/>
              <div class="f-content-mask" v-if="param.textMaskImage" :style="textMaskStyle"></div>
              <div class="f-content" :style="fContentStyle">
                <div class="f-tag" :style="fTagStyle" v-if="props.data.fTag" v-html="props.data.fTag"></div>
                <div class="title" :style="fTitleStyle" v-if="props.data.fTitle" v-html="props.data.fTitle"></div>
                <div class="description" :style="fDescriptionStyle" v-if="props.data.fDescription" v-html="props.data.fDescription"></div>
              </div>
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
