<template>
  <FcModules :param="param" :elementRefreshCallback="elementRefreshCallback" :mid="mid" :isSet="isSet" :setConfig="setConfig" :acCallback="acCallback">
    <div class="m-menus" :style="minHeightStyle">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1" :style="hiddenStyle">
        <div class="menus-table" :style="tableStyle">
          <div class="menus-cell" v-for="(item, key) in content" :key="key" :style="cellStyle" @click="clickCallback(item)">
            <div v-if="item" :style="contentPaddingStyle">
              <div class="name" :style="nameStyle" v-if="item.name && item.checkedId != checkedId">{{item.name}}</div>
              <div class="name name-checked" :style="nameCheckedStyle" v-if="item.name && item.checkedId == checkedId">{{item.name}}</div>
              <div class="checked-bar" :style="checkedBarStyle" v-if="item.name && item.checkedId == checkedId"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2">
        <div v-for="(item, key) in content" :key="key">
          <div class="image-table" v-if="key % columNum == 0">
            <div class="image-cell" v-for="i in columNum" :key="i" :style="cellStyle">
              <div v-if="content[key + (i-1)]" :style="contentPaddingStyle" @click="clickCallback(content[key + (i-1)])">
                <div class="image clear-fix">
                  <img :style="imageStyle" v-if="content[key + (i-1)].url" :src="content[key + (i-1)].url"/>
                </div>
                <div class="name" :style="nameStyle" v-if="content[key + (i-1)].name && content[key + (i-1)].checkedId != checkedId">{{content[key + (i-1)].name}}</div>
                <div class="name name-checked" :style="nameCheckedStyle" v-if="content[key + (i-1)].name && content[key + (i-1)].checkedId == checkedId">{{content[key + (i-1)].name}}</div>
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
