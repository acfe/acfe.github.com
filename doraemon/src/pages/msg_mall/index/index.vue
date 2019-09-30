<template>
  <div class="setter-container">
    <!-- 预览弹窗 -->
    <FcPop :param="previewPopParam">
      <div class="preview-pop">
        <div class="preview-content">
          <div v-for="(item, key) in previewNoticContent" :key="'pn' + key">
            <MImages v-if="item && item.tag == 'images'" :param="item"/>
          </div>
          <div class="msg-container clear-fix">
            <div class="msg-left">
              <div class="msg-title">购买短信</div>
              <div class="msg-text">单条低至3分</div>
            </div>
            <div class="msg-right">
              <div class="msg-title">发送短信</div>
              <div class="msg-text">可发短信：0</div>
            </div>
          </div>
          <div v-for="(item, key) in previewContent" :key="'pc' + key">
            <MImages v-if="item && item.tag == 'images'" :param="item"/>
          </div>
        </div>
      </div>
    </FcPop>
    <!-- 头部导航 -->
    <div class="setter-header">
      <div class="button-area">
        <div class="button-item"><FcButton :param="{theme: 'blue', type: 'border'}" text="预览" :callback="preview"/></div>
        <div class="button-item"><FcButton :param="{theme: 'blue'}" text="保存" :callback="checkSave"/></div>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="setter-body">
      <div class="setter-body-container">
        <!-- 左侧菜单 -->
        <div class="setter-body-menu boder-right">
          <!-- 页面左侧菜单 -->
          <div class="body-menu-container" v-if="setContentType != 'pop'">
            <!-- 模版tab -->
            <div class="gray-tab">
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': themeTabValue == 'module'}">选择模块</div>
            </div>
            <div class="body-menu-content" v-if="themeTabValue == 'module'">
              <div class="module-list">
                <div class="module-list-item" v-for="(item, key) in getModuleThemeList()" :key="key" @click="addModule(item)">
                  <div class="item-image" v-if="item.url">
                    <img :src="item.url"/>
                  </div>
                  <div class="item-title">{{item.title}}</div>
                </div>
              </div>
            </div>
            <!-- 页面模版 -->
            <div class="body-menu-content" v-if="themeTabValue == 'page'"></div>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="setter-body-main-content" id="mainSetter" @click="emptyClick">
          <div class="stage" v-if="setContentType != 'pop'">
            <div class="page">
              <OrderSetter
                :param="setConfig.mainOrderSetterParam"
                :key="setConfig.mainOrderSetterParam.key"
                :editCallback="orderSetterEditContentCallback"
                :delCallback="orderSetterDelContentCallback"
                :callback="orderSetterMoveCallback"
              >
                <div class="order-setter-item" v-for="(item, key) in setConfig.mainOrderSetterParam.content" :key="key" :slot="'s' + key">
                  <MImages v-if="item && item.tag == 'images'" :param="item" :dataSource="contentConfig.dataSource" :isSet="1"/>
                </div>
              </OrderSetter>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设置弹窗 -->
    <div class="setter-pop" id="setterPop" :class="{none: !setConfig.showSetterPop}">
      <div class="setter-pop-container">
        <!-- 标题栏 -->
        <div class="setter-pop-title" id="setterPopTitle">
          模块设置
          <div class="close-btn" @click="closeSetterPop"></div>
        </div>
        <!-- 设置内容 -->
        <div class="setter-pop-content">
          <ParamSetter :setterParam="getSetterParam()" :setterParamValue="setConfig.setterParamValue" :setterRefreshContent="refreshContent" :key="setConfig.setterKey"/>
        </div>
      </div>
    </div>
    <!-- TAB商品设置弹窗 -->
    <div class="goods-pop" v-if="setConfig.showGoodsPop" :key="setConfig.goodsPopKey">
      <div class="goods-pop-mask" @click="closeGoodsPop"></div>
      <div class="goods-pop-content">
        <div class="goods-setter">
          <ParamSetter :setterParam="setConfig.goodsSetParam" :setterParamValue="setConfig.goodsSetParamValue" :setterRefreshContent="refreshContent"/>
        </div>
        <div class="btn-area">
          <FcButton :param="{theme: 'blue'}" text="确定" :callback="closeGoodsPop"/>
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
