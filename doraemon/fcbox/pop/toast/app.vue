<template>
  <div class="fc-pop" ref="toast" v-if="state.show">
    <div class="fc-pop-toast-mask"></div>
    <div class="fc-pop-table">
      <div class="fc-pop-table-cell">
        <div class="fc-pop-content">
          <div class="fc-toast-white fc-pop-shadow" v-if="state.theme == 'white'">
            <span class="fc-toast-text">{{state.text}}</span>
          </div>
          <div class="fc-toast-black fc-pop-shadow" v-if="!state.theme">
            <span class="fc-toast-text">{{state.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
