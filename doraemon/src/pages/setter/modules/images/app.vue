<template>
  <FcModules :param="param" :isSet="isSet">
    <div class="m-images">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="image-group" :style="contentPaddingStyle" v-for="(item, key) in dataContent" :key="key">
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
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
