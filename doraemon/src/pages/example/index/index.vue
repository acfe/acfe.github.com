<template>
  <div class="index" ref="index">
      <div class="demo-container clear-fix">
        <div class="demo-item" v-for="(item, key) in demoList" :key="key">
          <div class="preview-pop" @click="hideCode">
            <div class="qr-code-content" :ref="'qrCode' + key"></div>
          </div>
          <div class="image">
            <img :src="item.url">
          </div>
          <div class="control-area clear-fix">
            <div class="title">{{item.title}}</div>
            <div class="control-text">
              <span class="edit" @click="doEdit(item)">编辑</span>
              <span class="preview" @click="showCode">预览</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import './index.less'
import Index from './index.js'
export default Index
</script>
