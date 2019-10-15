<template>
  <FcModules :param="param" :elementRefreshCallback="elementRefreshCallback" :mid="mid" :isSet="isSet" :setConfig="setConfig" :acCallback="acCallback">
    <div class="m-images" :style="minHeightStyle">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="image-group" :style="contentPaddingStyle" v-for="(item, key) in content" :key="key" @click="acCallback(item)">
          <div :style="itemStyle">
            <div class="clear-fix">
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
        <div v-for="(item, key) in content" :key="key">
          <div class="image-table" v-if="key % columNum == 0">
            <div class="image-cell" v-for="i in columNum" :key="i" :style="cellStyle" @click="acCallback(content[key + (i-1)])">
              <div v-if="content[key + (i-1)]" :style="checkRightPadding(contentPaddingStyle, columNum, key + (i-1))">
                <div :style="itemStyle">
                  <div class="clear-fix">
                    <div class="image" :style="imageFloatStyle">
                      <img :style="imageStyle" v-if="content[key + (i-1)].url" :src="content[key + (i-1)].url"/>
                    </div>
                  </div>
                  <div class="title" :style="titleStyle" v-if="content[key + (i-1)].title">{{content[key + (i-1)].title}}</div>
                  <div class="description" :style="descriptionStyle" v-if="content[key + (i-1)].description">{{content[key + (i-1)].description}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- them3 -->
      <div :class="'theme-' + theme" v-if="theme == 3">
        <FcDomPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <div class="dom-player-status-bar">
              <div class="status-bar-icon" v-for="(item, key) in  props.data" :key="key" :class="{'status-bar-icon-checked' : props.checked == key}"></div>
            </div>
          </template>
          <template slot="s1" slot-scope="props">
            <div class="image" :style="imageStyle" @click="acCallback(props.data)">
              <FcLazyImage :src="props.data.url" :param="{}"/>
            </div>
          </template>
        </FcDomPlayer>
      </div>
      <!-- theme4 -->
      <div :class="'theme-' + theme" v-if="theme == 4" :style="hiddenStyle">
        <div class="image-table" :style="tableStyle">
          <div class="image-cell" v-for="(item, key) in content" :key="key" :style="cellStyle" @click="acCallback(item)">
            <div v-if="item" :style="contentPaddingStyle">
              <div :style="itemStyle">
                <div class="clear-fix">
                  <div class="image" :style="imageFloatStyle">
                    <img :style="imageStyle" v-if="item.url" :src="item.url"/>
                  </div>
                </div>
                <div class="title" :style="titleStyle" v-if="item.title">{{item.title}}</div>
                <div class="description" :style="descriptionStyle" v-if="item.description">{{item.description}}</div>
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
