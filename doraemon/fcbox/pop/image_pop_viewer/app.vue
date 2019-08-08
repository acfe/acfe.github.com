<template>
  <div class="image-pop-viewer" ref="ImagePopViewerContent" v-if="ImagePopViewer.show">
    <div class="mask"></div>
    <div class="loading" v-if="loading"></div>
    <div class="close-tag" @click="close"></div>
    <div v-if="ImagePopViewer.data && ImagePopViewer.data.length > 1">
      <div class="go-icon pre-icon" @click="showChange('pre')"></div>
      <div class="go-icon next-icon" @click="showChange('next')"></div>
    </div>
    <div class="percent-tag">{{ImagePopViewer.percent}}%</div>
    <img ref="img" class="source-img" />
    <div ref="pic" class="pic">
      <img ref="showImg" />
    </div>
    <div ref="toolBar" class="tool-bar">
      <span data-name="refresh" class="refresh" @click="refresh"></span>
      <span data-name="resize" class="resize" @click="resize"></span>
      <span data-name="zoomOut" class="zoom-out" @click="zoom(1.1)"></span>
      <span data-name="zoomIn" class="zoom-in" @click="zoom(0.9)"></span>
      <span data-name="rotateZl" class="rotate-zl" @click="rotateZ(-90)"></span>
      <span data-name="rotateZ" class="rotate-z" @click="rotateZ(90)"></span>
      <span data-name="rotateY" class="rotate-y" @click="rotateY(180)"></span>
      <span data-name="rotateX" class="rotate-x" @click="rotateX(180)"></span>
    </div>
    <div class="thumb-bar" ref="scrollTable" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" v-if="ImagePopViewer.data && ImagePopViewer.data.length > 1">
      <div ref="showScrollContent">
        <div class="thumb-item" v-for="(item, key) in ImagePopViewer.data" :key="key" :style="{backgroundImage: 'url(' + item.thumb + ')'}" :class="{'checked-thumb': ImagePopViewer.showId == key}" @click="changeImage(key)">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
