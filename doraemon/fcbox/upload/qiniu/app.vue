<template>
  <div class="qi-niu-upload" ref="QiNiuUpload" :key="randKey">
    <div class="up-bk">
      <div class="up-bg"></div>
    </div>
    <input type="file" class="up-file" v-if="!param.value" @change="fileSelect" accept="image/*" />
    <div class="img" v-if="param.value" :style="imgStyle" @click="imageClickCallback">
      <img :src="param.value">
    </div>
    <div class="del-bg" v-if="param.value && param.del"></div>
    <div class="del" v-if="param.value && param.del" @click="del">删除</div>
    <div class="up-loading" v-if="loading"></div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
