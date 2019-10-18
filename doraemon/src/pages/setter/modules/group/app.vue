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
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
