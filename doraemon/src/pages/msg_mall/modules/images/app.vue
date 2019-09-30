<template>
  <FcModules :param="param" :isSet="isSet">
    <div class="m-images">
      <!-- theme1 templateType == 'banner' -->
      <div :class="'theme-' + theme" v-if="param.templateType == 'banner'">
        <div class="image-group" :style="contentPaddingStyle">
          <FcDomPlayer :param="domPlayerParam" v-if="domPlayerParam.data && domPlayerParam.data.length">
            <template slot="statusBar" slot-scope="props" v-if="domPlayerParam.showGuild">
              <div class="dom-player-status-bar">
                <div class="status-bar-icon" v-for="(item, key) in  props.data" :key="key" :class="{'status-bar-icon-checked' : props.checked == key}"></div>
              </div>
            </template>
            <template slot="s1" slot-scope="props">
              <div class="image" @click="acCallback(props.data)">
                <img :src="props.data.url" :param="{}"/>
              </div>
            </template>
          </FcDomPlayer>
        </div>
      </div>
      <!-- templateType == 'twoPicTopic' -->
      <div :class="'theme-1'" v-if="param.templateType == 'twoPicTopic'">
        <div class="two-pic">
          <div class="pic-item" @click="acCallback(dataContent[0])">
            <img :src="dataContent[0].url" v-if="dataContent[0].url">
          </div>
          <div class="gap"></div>
          <div class="pic-item" @click="acCallback(dataContent[1])">
            <img :src="dataContent[1].url" v-if="dataContent[1].url">
          </div>
        </div>
      </div>
      <!-- templateType == 'threePicTopic' -->
      <div :class="'theme-1'" v-if="param.templateType == 'threePicTopic'">
        <div class="three-pic">
          <div class="left-pic-item" @click="acCallback(dataContent[0])">
            <img :src="dataContent[0].url" v-if="dataContent[0].url">
          </div>
          <div class="gap"></div>
          <div class="right-item" @click="acCallback(dataContent[1])">
            <div class="right-pic top-pic">
              <img :src="dataContent[1].url" v-if="dataContent[1].url">
            </div>
            <div class="right-pic" @click="acCallback(dataContent[2])">
              <img :src="dataContent[2].url" v-if="dataContent[2].url">
            </div>
          </div>
        </div>
      </div>
      <!-- templateType == 'noticeBoard' -->
      <div class="notice" v-if="param.templateType == 'noticeBoard'">
        公告消息：{{dataContent[0].typeContent}}
        <div class="notice-icon"></div>
        <div class="notice-close-icon"></div>
      </div>
      <!-- templateType == 'subheading' -->
      <div class="sub-heading" v-if="param.templateType == 'subheading'">
        {{dataContent[0].typeTitle}}
      </div>
      <!-- templateType == 'goods' -->
      <div class="goods-container clear-fix" v-if="param.templateType == 'goods'">
        <div class="goods-item" v-for="(item, key) in dataContent" :key="key" @click="acCallback(item)">
          <div class="warn-icon" v-if="!checkLink(item.goodsLink)"></div>
          <div class="goods-image-container">
            <div class="goods-image">
              <img :src="item.url" v-if="item.url">
            </div>
          </div>
          <div class="goods-title">{{item.goodsTitle}}</div>
          <div class="goods-description">{{item.goodsAd}}</div>
          <div class="goods-price" v-if="item.sellPriceStr"><div class="price-tag">&yen;</div><div class="price-content">{{item.sellPriceStr}}</div>
            <div class="price-del">{{item.originalPriceStr}}</div>
          </div>
          <div class="cart-icon"></div>
        </div>
      </div>
      <!-- templateType == 'goodsSubtitle' -->
      <div class="tab-container" v-if="param.templateType == 'goodsSubtitle'">
        <div class="tab-menu-bk">
          <div class="tab-menu-icon"></div>
          <div class="tab-menu">
            <div class="tab-menu-content">
              <div class="tab-menu-item" v-for="(item, key) in dataContent" :key="key" :class="{'tab-menu-item-checked': item.checkedId == param.checkedId}" :data-checkedId="item.checkedId" @click="changeTab">
                {{item.typeTitle || 'tab' + (key + 1)}}
                <div class="checked-bar" v-if="item.checkedId == param.checkedId"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-container clear-fix" v-if="param.templateType == 'goodsSubtitle'">
        <div class="goods-item" v-for="(item, key) in getTabgoods(param)" :key="key" @click="acCallback(item)">
          <div class="warn-icon" v-if="!checkLink(item.goodsLink)"></div>
          <div class="goods-image-container">
            <div class="goods-image">
              <img :src="item.url" v-if="item.url">
            </div>
          </div>
          <div class="goods-title">{{item.goodsTitle}}</div>
          <div class="goods-description">{{item.goodsAd}}</div>
          <div class="goods-price" v-if="item.sellPriceStr"><div class="price-tag">&yen;</div><div class="price-content">{{item.sellPriceStr}}</div>
            <div class="price-del">{{item.originalPriceStr}}</div>
          </div>
          <div class="cart-icon"></div>
        </div>
      </div>
    </div>  
  </FcModules>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
