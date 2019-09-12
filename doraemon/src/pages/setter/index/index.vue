<template>
  <div class="setter-container">
    <!-- 头部导航 -->
    <div class="setter-header"></div>
    <!-- 主体内容 -->
    <div class="setter-body">
      <div class="setter-body-container">
        <!-- 左侧菜单 -->
        <div class="setter-body-menu boder-right">
          <!-- 页面左侧菜单 -->
          <div class="body-menu-container" v-if="setContentType != 'pop'">
            <!-- 模版tab -->
            <div class="gray-tab">
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': themeTabValue == 'module'}" @click="changeThemeTab('module')">模块模版</div>
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': themeTabValue == 'page'}" @click="changeThemeTab('page')">页面模版</div>
            </div>
            <!-- 模块模版 -->
            <div class="border-tab" v-if="themeTabValue == 'module'">
              <div class="border-tab-item" v-for="(item, key) in setConfig.moduleTheme.data" :key="key" :class="{'border-tab-item-checked': setConfig.moduleTheme.showList == item.tag}" @click="changeModuleThemeTab(item.tag)">
                {{item.title}}
              </div>
            </div>
            <div class="body-menu-content" v-if="themeTabValue == 'module'">
              <div class="module-list">
                <div class="module-list-item" v-for="(item, key) in getModuleThemeList()" :key="key" @click="addModule(item)">
                  <div class="item-image">
                    <img :src="item.url"/>
                  </div>
                  <div class="item-title">{{item.title}}</div>
                </div>
              </div>
            </div>
            <!-- 页面模版 -->
            <div class="body-menu-content" v-if="themeTabValue == 'page'"></div>
          </div>
          <!-- 弹窗左侧菜单 -->
          <div class="body-menu-container" v-if="setContentType == 'pop'">
            <div class="gray-tab">
              <div class="gray-tab-item gray-tab-item-checked">元素模版</div>
              <div class="gray-tab-item">弹窗模版</div>
            </div>
          </div>  
        </div>
        <!-- 主体内容 -->
        <div class="setter-body-main-content" id="mainSetter">
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
        <!-- 右侧菜单 -->
        <div class="setter-body-menu boder-left">
          <!-- 设置tab -->
          <div class="body-menu-container">
            <div class="gray-tab">
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': setContentType == 'page'}" @click="changeSetContentType('page')">页面</div>
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': setContentType == 'pop'}" @click="changeSetContentType('pop')">弹窗</div>
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': setContentType == 'global'}" @click="changeSetContentType('global')">全局设置</div>
            </div>
            <!-- 新增页面按钮 -->
            <div class="menu-button-area" v-if="setContentType == 'page'">
              <FcButton :param="{theme: 'blue'}" text="新增页面" :callback="addPage"/>
            </div>
            <!-- 页面列表 -->
            <div class="body-menu-content boder-top" id="pageListOrderSetter" :class="{none: setContentType != 'page'}">
              <OrderSetter
                :param="setConfig.pageListOrderSetterParam"
                :key="setConfig.pageListOrderSetterParam.key"
                :editCallback="pageListOrderSetterEditContentCallback"
                :delCallback="pageListOrderSetterDelContentCallback"
                :callback="pageListOrderSetterMoveCallback"
              >
                <div class="order-setter-item" v-for="(item, key) in setConfig.pageListOrderSetterParam.content" :key="key" :slot="'s' + key">
                  <div class="page-list-item">
                    <div class="list-num-tag-area">
                      <div class="list-num-tag">{{key + 1}}</div>
                    </div>
                    <div class="list-content-area">
                      <div class="list-content-text">{{item.name}}</div>
                    </div>
                    <div class="list-num-tag-area">
                      <div class="list-num-icon" @click="showPageMenu(item)" data-menu="pageListMenu">
                        <div class="pop-list-menu-area" v-if="item.showMenu">
                          <div class="pop-list-menu">
                            <div class="pop-list-menu-item" v-if="setConfig.pageListOrderSetterParam.content.length > 1" @click="delPage(key)">删除页面</div>
                            <div class="pop-list-menu-item" @click="copyPage(item, key)">复制页面</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OrderSetter>
            </div>
            <!-- 新增弹窗按钮 -->
            <div class="menu-button-area" v-if="setContentType == 'pop'">
              <FcButton :param="{theme: 'blue'}" text="新增弹窗" :callback="addPop"/>
            </div>
            <!-- 弹窗列表 -->
            <div class="body-menu-content boder-top" id="popListOrderSetter" :class="{none: setContentType != 'pop'}">
              <OrderSetter
                :param="setConfig.popListOrderSetterParam"
                :key="setConfig.popListOrderSetterParam.key"
                :editCallback="popListOrderSetterEditContentCallback"
                :delCallback="popListOrderSetterDelContentCallback"
                :callback="popListOrderSetterMoveCallback"
              >
                <div class="order-setter-item" v-for="(item, key) in setConfig.popListOrderSetterParam.content" :key="key" :slot="'s' + key">
                  <div class="page-list-item">
                    <div class="list-num-tag-area">
                      <div class="list-num-tag">{{key + 1}}</div>
                    </div>
                    <div class="list-content-area">
                      <div class="list-content-text">{{item.name}}</div>
                    </div>
                    <div class="list-num-tag-area">
                      <div class="list-num-icon" @click="showPopMenu(item)" data-menu="pageListMenu">
                        <div class="pop-list-menu-area" v-if="item.showMenu">
                          <div class="pop-list-menu">
                            <div class="pop-list-menu-item" v-if="setConfig.popListOrderSetterParam.content.length > 1" @click="delPop(key)">删除弹窗</div>
                            <div class="pop-list-menu-item" @click="copyPop(item, key)">复制弹窗</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
        <div class="border-tab pb15" v-if="setConfig.setterParam.data && setConfig.setterParam.data.length">
          <div class="border-tab-item" v-for="(item, key) in setConfig.setterParam.data" :key="key" :class="{'border-tab-item-checked': setConfig.setterParam.setType == item.setType}" @click="changeModuleParamTab(item.setType)">
            {{item.title}}
          </div>
        </div>
        <!-- 设置内容 -->
        <div class="setter-pop-content">
          <ParamSetter :setterParam="getSetterParam()" :setterParamValue="setConfig.setterParamValue" :setterRefreshContent="refreshContent" :key="setConfig.setterKey"/>
        </div>
        <!-- 侧边Tab -->
        <div class="side-tabs">
          <div class="side-tabs-item side-tabs-item-checked">
            <div class="side-tabs-item-text">设置</div>
          </div>
          <div class="side-tabs-item">
            <div class="side-tabs-item-text">元素</div>
          </div>
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
