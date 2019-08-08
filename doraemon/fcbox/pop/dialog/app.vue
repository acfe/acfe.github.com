<template>
  <div class="fc-dialog" ref="dialog" v-if="state.show">
    <FcPop :param="{show: true}">
      <div class="fc-pop-content-title">
        {{state.title}}
        <div class="close" @click="hide" v-if="state.showClose"></div>
      </div>
      <div class="pop-dialog-content">
        <div class="span">{{state.text}}</div>
      </div>
      <div class="pop-dialog-content">
        <div class="button-area" v-if="state.clearText">
          <FcButton :param="{type: 'border', theme: 'grey'}" :text="state.clearText" :callback="clear" />
        </div>
        <div class="button-area" v-if="state.confirmText">
          <FcButton :param="{theme: 'cyan'}" :text="state.confirmText" :callback="confirm" />
        </div>
      </div>
    </FcPop>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
