<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback" :entry="entry">
    <div class="e-image" v-if="param.theme == 1" :key="randKey">
      <FcFitImage :src="param.url" :imageStyle="imageStyle"/>
      <div class="img-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.url"></div>
    </div>
    <div class="e-image" v-if="param.theme == 2">
      <div class="img-mask" v-if="isSet"></div>
      <div class="video-mask" @click="playVideo" ref="videoMask">
        <div class="mask-td">
          <div class="mask-icon" :style="imageStyle">
            <img :src="param.maskIcon || 'http://consumerapp-1251779293.image.myqcloud.com/discovery/201912/smv9cj3qsj.png'">
          </div>
        </div>
      </div>
      <video
        ref="video"
        :src="param.src || ''"
        :poster="param.poster || ''"
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        x5-video-player-type=""
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        style="object-fit:cover"
        >
      </video>
    </div>
    <div v-if="param.theme == 3" :key="randKey">
      <FcFramePlayer :param="param" :isSet="isSet"/>
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
