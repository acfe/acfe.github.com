<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-group">
      <!-- theme1 -->
      <div :class="'clear-fix theme-' + theme" v-if="theme == 1">
        <div class="group-item" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)" :class="{pr0: (key + 1) % 2 == 0}">
          <div class="group-item-content">
            <div class="title-bar" :style="{'background-color': item.tipBarColor || '#F3C500'}"></div>
            <div class="title" :style="titleStyle" v-if="item.title">
              {{item.title}}
              <div class="new-tip" v-if="item.newTip">{{item.newTip}}</div>
            </div>
            <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
          </div>
        </div>
      </div>
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2">
        <div class="theme2-item" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)">
          <div :style="titleStyle" v-if="item.title">
            {{item.title}}
          </div>
        </div>
      </div>
      <!-- theme3 -->
      <div :class="'theme-' + theme" v-if="theme == 3">
        <div class="theme3-item" v-for="(item, key) in dataContent" :key="key" @click="clickCallback(item)">
          <div class="item-content">
            <div class="title" :style="titleStyle" v-if="item.title">
              {{item.title}}
            </div>
            <div class="description" :style="descriptionStyle" v-if="item.description">
              {{item.description}}
            </div>
          </div>
          <div class="image-content">
            <div class="image-bk clear-fix">
              <div class="image" :style="imageFloatStyle" v-if="item.url">
                <img :src="item.url" :style="imageStyle" v-if="item.url && isSet"/>
                <FcPreImage :src="item.url" :imageStyle="imageStyle" v-if="item.url && !isSet"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme4 -->
      <div :class="'theme-' + theme" v-if="theme == 4">
        <div :style="titleStyle" v-if="param.title">
          {{param.title}}
        </div>
        <div class="author" v-if="param.author || param.time">
          {{param.author}} {{param.time}}
        </div>
      </div>
      <!-- theme1001 -->
      <div :class="'theme-' + theme" v-if="theme == 1001">
        <div v-for="(itemC, keyC) in dataContent" :key="keyC" :style="contentPaddingStyle">
          <div class="switch-control clear-fix" :style="itemStyle" @click="switchControl(itemC)">
            <div class="switch-title" v-if="itemC.title" :style="titleStyle">{{itemC.title}}</div>
            <div class="switch-icon" :style="iconStyle" v-html="iconContent" :ref="'i' + itemC.tabPageId"></div>
          </div>
          <div class="switch-content" v-if="itemC.content" :ref="'c' + itemC.tabPageId">
            <div v-for="(item, key) in itemC.content" :key="key">
              <MImages v-if="item && item.tag == 'images'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
              <MMenus v-if="item && item.tag == 'menus'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
              <MGroup v-if="item && item.tag == 'group'" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
              <MGoods v-if="item && item.tag == 'goods'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
              <MTab v-if="item && item.tag == 'tab'" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
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
