<template>
  <div class="app" ref="router">
    <router-view></router-view>
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
