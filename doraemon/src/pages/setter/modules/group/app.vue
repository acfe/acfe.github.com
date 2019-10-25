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
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
