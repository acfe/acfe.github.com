<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback" :entry="entry">
    <div class="e-image" :style="imageStyle" v-if="param.theme == 1">
      <div class="img-mask" v-if="isSet"></div>
      <div class="mh" v-if="isSet && !param.url"></div>
    </div>
    <div class="e-image" :style="imageStyle" v-if="param.theme == 2">
      <div class="img-mask" v-if="isSet"></div>
      <video
        ref="video"
        :src="param.src || ''"
        controls=""
        :poster="param.poster || ''"
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        style="object-fit:fill"
        >
      </video>
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
