<template>
  <FcElement :param="param" :isSet="isSet" :zIndex="zIndex" :acCallback="acCallback" :entry="entry">
    <div class="e-business">
      <div class="mall-search" v-if="param.businessTag == 'mallSearch'">
        <div class="search-input-container">
          <div class="search-input-content"></div>
          <div class="search-input-content">
            <div class="search-icon"></div>
            <div class="search-input">
              <FcInput :param="inputParam" :callback="inputCallback"/>
            </div>
          </div>
        </div>
        <div class="search-btn-container" ref="searchBtn" @click="doSeach" :style="btnStyle">搜索</div>
      </div>
    </div>
  </FcElement>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
