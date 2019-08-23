<template>
  <FcModules :param="param" :elementRefreshCallback="elementRefreshCallback" :mid="mid" :isSet="isSet" :setConfig="setConfig" :acCallback="acCallback">
    <div class="m-goods" :style="minHeightStyle">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="goods-group line-b" v-for="(item, key) in content" :key="key" :style="contentPaddingStyle">
          <div class="image-cell">
            <img :src="item.url" :style="imageStyle">
          </div>
          <div class="content-cell">
            <div class="goods-name" :style="nameStyle" v-if="item.name">{{item.name}}</div>
            <div class="good-description" :style="descriptionStyle" v-if="item.description && param.showDescription != 2">{{item.description}}</div>
            <div class="price-group"  :style="priceAlignStyle">
              <div class="sale-price" :style="salePriceStyle" v-if="item.salePrice && param.showSalePrice != 2"><span class="sale-price-tag">&yen;</span>{{item.salePrice}}</div>
              <div class="origin-price" :style="originPriceStyle" v-if="item.originPrice && param.showOriginPrice != 2">&yen;{{item.originPrice}}</div>
            </div>
            <div class="buy-icon">
              <img src="https://common.fcbox.com/cdn/mall/static/images/cart.png">
            </div>
          </div>
        </div>
      </div>
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2">
        <div v-for="(item, key) in content" :key="key">
          <div class="image-table" v-if="key % columNum == 0">
            <div class="image-cell" v-for="i in columNum" :key="i" :style="cellStyle" @click="acCallback(content[key + (i-1)])">
              <div v-if="content[key + (i-1)]" :style="contentPaddingStyle">
                <div class="image">
                  <img :style="imageStyle" v-if="content[key + (i-1)].url" :src="content[key + (i-1)].url"/>
                </div>
                <div class="name" :style="nameStyle" v-if="content[key + (i-1)].name">{{content[key + (i-1)].name}}</div>
                <div class="description" :style="descriptionStyle" v-if="content[key + (i-1)].description && param.showDescription != 2">{{content[key + (i-1)].description}}</div>
                <div class="price-group" :style="priceAlignStyle">
                  <div class="sale-price" :style="salePriceStyle" v-if="content[key + (i-1)].salePrice && param.showSalePrice != 2">&yen;{{content[key + (i-1)].salePrice}}</div>
                  <div class="origin-price" :style="originPriceStyle" v-if="content[key + (i-1)].originPrice && param.showOriginPrice != 2">&yen;{{content[key + (i-1)].originPrice}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme4 -->
      <div :class="'theme-' + theme" v-if="theme == 4" :style="hiddenStyle">
        <div class="image-table" :style="tableStyle">
          <div class="image-cell" v-for="(item, key) in content" :key="key" :style="cellStyle" @click="acCallback(item)">
            <div v-if="item" :style="contentPaddingStyle">
              <div class="image">
                <img :style="imageStyle" v-if="item.url" :src="item.url"/>
              </div>
              <div class="name" :style="nameStyle" v-if="item.name">{{item.name}}</div>
              <div class="description" :style="descriptionStyle" v-if="item.description">{{item.description}}</div>
              <div class="price-group" :style="priceAlignStyle">
                <div class="sale-price" :style="salePriceStyle" v-if="item.salePrice && param.showSalePrice != 2">&yen;{{item.salePrice}}</div>
                <div class="origin-price" :style="originPriceStyle" v-if="item.originPrice && param.showOriginPrice != 2">&yen;{{item.originPrice}}</div>
              </div>
            </div>
          </div>
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
