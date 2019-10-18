<template>
  <div class="setter-container">
    <!-- 右键菜单 -->
    <div class="contextmenu-container" data-contextmenu-container="1" v-if="contextmenuParam.show" :style="contextmenuParam.style">
      <div v-if="contextmenuParam.setType == 'element'">
        <div class="contextmenu-item" @click="contextCopyElement">复制元素</div>
        <div class="contextmenu-item" @click="contextLockElement(1)" v-if="!contextmenuParam.element.lock">锁定</div>
        <div class="contextmenu-item" @click="contextLockElement()" v-if="contextmenuParam.element.lock">解锁</div>
        <div class="contextmenu-item" @click="contextMoveElement('up')">上移</div>
        <div class="contextmenu-item" @click="contextMoveElement('down')">下移</div>
        <div class="contextmenu-item" @click="contextMoveElement('top')">移至顶部</div>
        <div class="contextmenu-item" @click="contextMoveElement('bottom')">移至底部</div>
        <div class="contextmenu-item" @click="contextDelElement">删除元素</div>
      </div>
      <div v-if="contextmenuParam.setType == 'module'">
        <div class="contextmenu-item" @click="contextShowElement('set')">设置模块</div>
        <div class="contextmenu-item" @click="contextShowElement('element')">插入元素</div>
        <div class="contextmenu-item" @click="contextCopyModule">复制模块</div>
        <div class="contextmenu-item" @click="contextMoveModule('up')">上移</div>
        <div class="contextmenu-item" @click="contextMoveModule('down')">下移</div>
        <div class="contextmenu-item" @click="contextMoveModule('top')">移至顶部</div>
        <div class="contextmenu-item" @click="contextMoveModule('bottom')">移至底部</div>
        <div class="contextmenu-item" @click="contextDelModule">删除模块</div>
      </div>
    </div>
    <!-- 头部导航 -->
    <div class="setter-header">
      <div class="button-area">
        <div class="button-item"><FcButton :param="{theme: 'blue', type: 'border'}" text="预览" :callback="preview"/></div>
        <div class="button-item"><FcButton :param="{theme: 'blue'}" text="保存" :callback="save"/></div>
      </div>
      <div class="control-area">
        <div class="control-item" @click="historyUndo">
          <div class="item-icon-area">
            <div class="item-icon undo-icon" :class="{'undo-icon-checked': showUndo}"></div>
          </div>
          <div class="item-text">撤销</div>
        </div>
        <div class="control-item" @click="historyAhead">
          <div class="item-icon-area">
            <div class="item-icon ahead-icon" :class="{'ahead-icon-checked': showAhead}"></div>
          </div>
          <div class="item-text">恢复</div>
        </div>
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
                  <div class="item-image" v-if="item.url">
                    <img :src="item.url"/>
                  </div>
                  <div class="item-title" :style="item.titleStyle || {}">{{item.title}}</div>
                </div>
              </div>
            </div>
            <!-- 页面模版 -->
            <div class="body-menu-content" v-if="themeTabValue == 'page'"></div>
          </div>
          <!-- 弹窗左侧菜单 -->
          <div class="body-menu-container" v-if="setContentType == 'pop'">
            <div class="gray-tab">
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': themeTabValue == 'element'}" @click="changeThemeTab('element')">元素模版</div>
              <div class="gray-tab-item" :class="{'gray-tab-item-checked': themeTabValue == 'pop'}" @click="changeThemeTab('pop')">弹窗模版</div>
            </div>
            <!-- 元素模版 -->
            <div class="border-tab" v-if="themeTabValue == 'element'">
              <div class="border-tab-item" v-for="(item, key) in setConfig.elementTheme.data" :key="key" :class="{'border-tab-item-checked': setConfig.elementTheme.showList == item.tag}" @click="changeSetterModuleElmentListTab(item.tag)">
                {{item.title}}
              </div>
            </div>
            <div class="body-menu-content" v-if="themeTabValue == 'element'">
              <div class="module-list">
                <div class="module-list-item" v-for="(item, key) in getElementThemeList()" :class="{'module-list-item-icon': item.config.elements[0].tag == 'icon'}" :key="key" @click="addElement(item, 'pop')">
                  <div class="item-image" v-if="item.url">
                    <img :src="item.url"/>
                  </div>
                  <div class="item-icon" v-if="item.config.elements[0].svgContent" v-html="item.config.elements[0].svgContent"></div>
                  <div class="item-title" :style="item.titleStyle || {}">{{item.title}}</div>
                </div>
              </div>
            </div>
          </div>  
        </div>
        <!-- 主体内容 -->
        <div class="setter-body-main-content" id="mainSetter" @click="emptyClick">
          <div class="stage" :style="bodyStyle" v-if="setContentType != 'pop'" id="stage">
            <div class="page" :style="pageStyle">
              <OrderSetter
                :param="setConfig.mainOrderSetterParam"
                :key="setConfig.mainOrderSetterParam.key"
                :editCallback="orderSetterEditContentCallback"
                :delCallback="orderSetterDelContentCallback"
                :callback="orderSetterMoveCallback"
              >
                <div class="order-setter-item" v-for="(item, key) in setConfig.mainOrderSetterParam.content" :key="key" :slot="'s' + key">
                  <MImages v-if="item && item.tag == 'images'" :param="item" :mid="key" :dataSource="contentConfig.dataSource" :isSet="1" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
                  <MMenus v-if="item && item.tag == 'menus'" :param="item" :mid="key" :dataSource="contentConfig.dataSource" :isSet="1" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
                  <MGoods v-if="item && item.tag == 'goods'" :param="item" :mid="key" :dataSource="contentConfig.dataSource" :isSet="1" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
                  <MGroup v-if="item && item.tag == 'group'" :param="item" :mid="key" :dataSource="contentConfig.dataSource" :isSet="1" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
                  <MTab v-if="item && item.tag == 'tab'" :pages="contentConfig.pages" :param="item" :mid="key" :dataSource="contentConfig.dataSource" :isSet="1" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
                </div>
              </OrderSetter>
            </div>
          </div>
          <div class="stage pop-bg" v-if="setContentType == 'pop'" id="stage" :key="popRandKey">
            <div v-for="(item, key) in contentConfig.pops" :key="key">
              <MPop :param="item" :mid="key" :isSet="1" :popId="key" :refreshContent="refreshContent" :setSetterContent="setSetterContent"/>
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
                    <div class="tab-icon" v-if="item.isTab"></div>
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
            <!-- 全局设置 -->
            <div class="pt15" v-if="setContentType == 'global'"></div>
            <div class="body-menu-content" v-if="setContentType == 'global'">
              <ParamSetter :setterParam="setConfig.bodySetParam.setList" :setterParamValue="contentConfig.body" :setterRefreshContent="refreshContent"/>
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
          {{getPopTitle()}}
          <div class="close-btn" @click="closeSetterPop"></div>
        </div>
        <div class="border-tab pb15" v-if="popContentType == 'set' && setConfig.setterParam.data && setConfig.setterParam.data.length > 1">
          <div class="border-tab-item" v-for="(item, key) in setConfig.setterParam.data" :key="key" :class="{'border-tab-item-checked': setConfig.setterParam.setType == item.setType}" @click="changeSetterContentTab(item.setType)">
            {{item.title}}
          </div>
        </div>
        <!-- 设置内容 -->
        <div class="setter-pop-content" v-if="(setConfig.setType == 'module' && popContentType == 'set') || setConfig.setType != 'module'">
          <ParamSetter :setterParam="getSetterParam()" :setterParamValue="setConfig.setterParamValue" :setterRefreshContent="refreshContent" :key="setConfig.setterKey"/>
        </div>
        <div class="border-tab pb15" v-if="setConfig.setType == 'module' && popContentType == 'element'">
          <div class="border-tab-item" v-for="(item, key) in setConfig.elementTheme.data" :key="key" :class="{'border-tab-item-checked': setConfig.elementTheme.showList == item.tag}" @click="changeSetterModuleElmentListTab(item.tag)">
            {{item.title}}
          </div>
        </div>
        <div class="setter-pop-content" v-if="setConfig.setType == 'module' && popContentType == 'element'">
          <div class="module-list">
            <div class="module-list-item" v-for="(item, key) in getElementThemeList()" :class="{'module-list-item-icon': item.config.elements[0].tag == 'icon'}" :key="key" @click="addElement(item)">
              <div class="item-image" v-if="item.url">
                <img :src="item.url"/>
              </div>
              <div class="item-icon" v-if="item.config.elements[0].svgContent" v-html="item.config.elements[0].svgContent"></div>
              <div class="item-title" :style="item.titleStyle || {}">{{item.title}}</div>
            </div>
          </div>
        </div>
        <!-- 侧边Tab -->
        <div class="side-tabs" v-if="setConfig.setType == 'module'">
          <div class="side-tabs-item" :class="{'side-tabs-item-checked': popContentType == 'set'}" @click="changePopContentType('set')">
            <div class="side-tabs-item-text">设置</div>
          </div>
          <div class="side-tabs-item" :class="{'side-tabs-item-checked': popContentType == 'element'}" @click="changePopContentType('element')">
            <div class="side-tabs-item-text">元素</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 元素弹窗 -->
    <div class="setter-pop element-pop" id="elementPop" :class="{none: !setConfig.showElementPop}">
      <div class="setter-pop-container">
        <!-- 标题栏 -->
        <div class="setter-pop-title" id="elementPopTitle">
          元素图层
          <div class="close-btn" @click="closeElementPop"></div>
        </div>
        <div class="setter-pop-content" id="elementWindowSetter" data-contextmenu="element">
          <OrderSetter
            :param="setConfig.elementWindowSetterParam"
            :key="setConfig.elementWindowSetterParam.key"
            :editCallback="elementWindowSetterEditContentCallback"
            :delCallback="elementWindowSetterDelContentCallback"
            :callback="elementWindowSetterMoveCallback"
          >
            <div class="order-setter-item" v-for="(item, key) in setConfig.elementWindowSetterParam.content" :key="key" :slot="'s' + key">
              <div class="element-window-item">
                <div class="num-tag" v-if="!item.url">{{key + 1}}</div>
                <div class="img-tag" v-if="item.url"><img :src="item.url"></div>
                <div class="title-text">{{item.name}}</div>
                <div class="sub-icon unlock-icon" v-if="!item.lock" @click="contextLockElement(1)"></div>
                <div class="sub-icon show-icon" v-if="!item.hide" @click="contextHideElement(1)"></div>
                <div class="sub-icon lock-icon" v-if="item.lock" @click="contextLockElement()"></div>
                <div class="sub-icon unshow-icon" v-if="item.hide" @click="contextHideElement()"></div>
              </div>
            </div>
          </OrderSetter>
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
