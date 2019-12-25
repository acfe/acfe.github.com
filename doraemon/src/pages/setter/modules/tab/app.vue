<template>
  <FcModules :param="param" :mid="mid" :isSet="isSet" :acCallback="acCallback" :key="randKey" :refreshContent="refreshContent" :setSetterContent="setSetterContent">
    <div class="m-tab" :id="'tab' + param.id" :class="{'lock-envent': isSet}">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="tab-module" v-for="(item, key) in tabContent" :key="key">
          <MImages v-if="item && item.tag == 'images'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          <MMenus v-if="item && item.tag == 'menus'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          <MGroup v-if="item && item.tag == 'group'" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          <MGoods v-if="item && item.tag == 'goods'" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          <MTab v-if="item && item.tag == 'tab'" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :param="item" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
        </div>
      </div>
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2 && playerLoaded.dom">
        <FcDomPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcDomPlayer>
      </div>
      <!-- theme3 -->
      <div :class="'theme-' + theme" v-if="theme == 3 && playerLoaded.vertical">
        <FcVerticalPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcVerticalPlayer>
      </div>
      <!-- theme4 -->
      <div :class="'theme-' + theme" v-if="theme == 4 && playerLoaded.flip">
        <FcFlipPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcFlipPlayer>
      </div>
      <!-- theme5 -->
      <div :class="'theme-' + theme" v-if="theme == 5 && playerLoaded.blh">
        <FcBlurHPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcBlurHPlayer>
      </div>
      <!-- theme6 -->
      <div :class="'theme-' + theme" v-if="theme == 6 && playerLoaded.blv">
        <FcBlurVPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcBlurVPlayer>
      </div>
      <!-- theme7 -->
      <div :class="'theme-' + theme" v-if="theme == 7 && playerLoaded.cardh">
        <FcCardHPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcCardHPlayer>
      </div>
      <!-- theme8 -->
      <div :class="'theme-' + theme" v-if="theme == 8 && playerLoaded.cardv">
        <FcCardVPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
          <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
            <PlayerStatusBar :pageData="props.data" :checkedKey="props.checked" :param="param"/>
          </template>
          <template slot="s1" slot-scope="props">
            <MTabItem :param="props.data" :pages="pages" :tabItems="tabItems" :isSet="isSet" :dataSource="dataSource" :acCallback="acCallback" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
          </template>
        </FcCardVPlayer>
      </div>
    </div>
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
