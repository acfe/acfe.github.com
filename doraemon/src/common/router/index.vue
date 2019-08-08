<template>
  <div id="router-main" class="router-main" ref="router">
    <div class="router-menu">
      <div class="logo"></div>
      <div class="menu-content">
        <div class="menu-scroll-content">
          <FcTreeMenu :source="menu.source" />
        </div>
      </div>
    </div>
    <div class="router-content">
      <div class="header-content clear-fix">
        <div class="header-title">丰巢前端-管理后台脚手架</div>
        <div class="header-control">
          admin |
          <span @click="logout">退出</span>
        </div>
      </div>
      <div class="main-content">
        <div class="main-scroll-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <FcDialog />
    <Loading />
    <Toast />
  </div>
</template>

<script>
import './index.less'
import Router from './index.js'
export default Router
</script>
