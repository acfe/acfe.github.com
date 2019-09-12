<template>
  <FcEelement :param="param" :isSet="isSet" :eid="eid" :mid="mid" :setConfig="setConfig" :zIndex="zIndex" :acCallback="acCallback" :key="randKey">
    <div class="e-search">
      <div class="theme1" v-if="param.theme == 1">
        <div class="empty-cell" v-if="param.showType == 2">
          <div class="search-icon" ref="searchSvg" :style="searchIconStyle" @click="showFull"></div>
        </div>
        <div class="icon-cell" :style="iconCellStyle" v-if="param.showType == 1 && param.showIcon">
          <div class="svg-content" ref="svg"></div>
          <div class="back-icon" :style="backIconStyle" ref="backSvg" @click="hideFull" v-if="param.showBackIcon == 1"></div>
        </div>
        <div class="input-cell" v-if="param.showType == 1">
          <div class="input-content">
            <input class="input" :style="inputTextStyle" :placeholder="param.placeholder"/>
            <div class="search-text" v-if="param.searchText" :style="searchTextStyle">{{param.searchText}}</div>
          </div>
        </div>
      </div>
    </div>
  </FcEelement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
