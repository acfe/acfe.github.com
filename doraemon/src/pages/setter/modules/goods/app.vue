<template>
  <FcModules :param="param" :isSet="isSet" :refreshContent="refreshContent" :setSetterContent="setSetterContent" :mid="mid" :acCallback="acCallback">
    <div class="m-goods">
      <!-- theme1 -->
      <div :class="'theme-' + theme" v-if="theme == 1">
        <div class="goods-group line-b" v-for="(item, key) in dataContent" :key="key" :style="contentPaddingStyle" @click="clickCallback(item)">
          <div :style="itemStyle">
            <div class="image-cell">
              <div class="t-center clear-fix">
                <div class="image" :style="imageFloatStyle">
                  <img :style="imageStyle" v-if="item.url" :src="item.url"/>
                </div>
              </div>
            </div>
            <div class="content-cell">
              <div class="goods-name" :style="nameStyle" v-if="item.name">{{item.name}}</div>
              <div class="good-description" :style="descriptionStyle" v-if="item.description && param.showDescription != 2">{{item.description}}</div>
              <div class="price-group">
                <div class="sale-price" :style="salePriceStyle" v-if="item.salePrice && param.showSalePrice"><span class="sale-price-tag" :style="salePriceTagStyle">&yen;</span>{{item.salePrice}}</div>
                <div class="origin-price" :style="originPriceStyle" v-if="item.originPrice && param.showOriginPrice"><span class="origin-price-tag" :style="originPriceTagStyle">&yen;</span>{{item.originPrice}}</div>
              </div>
              <div class="buy-icon" :style="cartIconStyle" v-if="param.cartIconUrl">
                <img :src="param.cartIconUrl">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme2 -->
      <div :class="'theme-' + theme" v-if="theme == 2">
        <div class="fl-item-list" v-for="(lItem, lKey) in contentList" :key="lKey" :style="contentPaddingStyle">
          <div v-for="(item, key) in lItem" :key="key" :class="{'fl-item-group': !item.blankStyle}" :style="item.blankStyle || {}">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image" :style="imageFloatStyle" v-if="item.url">
                  <img :style="imageStyle" :src="item.url"/>
                </div>
              </div>
              <div class="name" :style="nameStyle" v-if="item.name" v-html="item.name"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
              <div class="price-group">
                <div class="sale-price" :style="salePriceStyle" v-if="item.salePrice && param.showSalePrice"><span class="sale-price-tag" :style="salePriceTagStyle">&yen;</span>{{item.salePrice}}</div>
                <div class="origin-price" :style="originPriceStyle" v-if="item.originPrice && param.showOriginPrice"><span class="origin-price-tag" :style="originPriceTagStyle">&yen;</span>{{item.originPrice}}</div>
              </div>
              <div class="buy-icon" :style="cartIconStyle" v-if="param.cartIconUrl">
                <img :src="param.cartIconUrl">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- theme3 -->
      <div :class="'theme-' + theme" v-if="theme == 3">
        <div class="fl-container" :style="hiddenStyle">
          <div class="fl-item-content" v-for="(item, key) in dataContent" :key="key" :style="getContentPaddingStyle(contentPaddingStyle, key)">
            <div :style="itemStyle" v-if="!item.blankStyle && !item.emptyContent"  @click="clickCallback(item)">
              <div class="image-bk clear-fix">
                <div class="image" :style="imageFloatStyle" v-if="item.url">
                  <img :style="imageStyle" :src="item.url"/>
                </div>
              </div>
              <div class="name" :style="nameStyle" v-if="item.name" v-html="item.name"></div>
              <div class="description" :style="descriptionStyle" v-if="item.description" v-html="item.description"></div>
              <div class="price-group">
                <div class="sale-price" :style="salePriceStyle" v-if="item.salePrice && param.showSalePrice"><span class="sale-price-tag" :style="salePriceTagStyle">&yen;</span>{{item.salePrice}}</div>
                <div class="origin-price" :style="originPriceStyle" v-if="item.originPrice && param.showOriginPrice"><span class="origin-price-tag" :style="originPriceTagStyle">&yen;</span>{{item.originPrice}}</div>
              </div>
              <div class="buy-icon" :style="cartIconStyle" v-if="param.cartIconUrl">
                <img :src="param.cartIconUrl">
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
