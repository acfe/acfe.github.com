<template>
  <div>
    <FcPop :param="previewPopParam">
      <div class="preview-pop">
        <div class="preview-title">预览</div>
        <div class="preview-content">
          <iframe class="frame" src="/#/play"></iframe>
        </div>
      </div>
    </FcPop>
    <div class="index" ref="index">
      <div class="frame-header">
        <div class="header-content">
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
      </div>
      <div class="frame-body">
        <div class="frame-body-cell">
            <div class="body-content">
              <!-- left-menu -->
              <div class="left-menu-content">
                <div class="menu-content">
                  <div class="menu-tab">
                    <div class="menu-tab-cell">
                      <div class="edit-tab-menu">
                        <div v-for="i in 4" :key="i" @click="changeTabValue(setConfig.leftTabParam, (i - 1), changeSetType)" :class="{'edit-tab-menu-item': setConfig.leftTabParam.data[i - 1], 'edit-tab-menu-item-blank': !setConfig.leftTabParam.data[i - 1], 'edit-tab-menu-item-checked': setConfig.leftTabParam.data[i - 1] && setConfig.leftTabParam.data[i - 1].value == setConfig.leftTabParam.value}">
                          {{setConfig.leftTabParam.data[i - 1] ? setConfig.leftTabParam.data[i - 1].option : ''}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="add-page-btn" v-if="setConfig.leftTabParam.value == 0">
                    <div class="button-item"><FcButton :param="{theme: 'blue'}" text="新增页面" :callback="addPage"/></div>
                  </div>
                  <div class="add-page-btn-pop" v-if="setConfig.leftTabParam.value == 1">
                    <div class="button-item"><FcButton :param="{theme: 'blue'}" text="新增弹窗" :callback="addPop"/></div>
                  </div>
                  <div class="menu-content">
                    <div class="menu-content-cell">
                      <!-- page list -->
                      <div class="page-list" v-if="setConfig.leftTabParam.value == 0" id="pageListOrderSetter">
                        <OrderSetter
                          :param="setConfig.pageListOrderSetterParam"
                          :key="setConfig.pageListOrderSetterParam.key"
                          :editCallback="pageListOrderSetterEditContentCallback"
                          :delCallback="pageListOrderSetterDelContentCallback"
                          :callback="pageListOrderSetterMoveCallback"
                        >
                          <div class="order-setter-item" v-for="(item, key) in setConfig.pageListOrderSetterParam.content" :key="key" :slot="'s' + key">
                            <div class="page-item">
                              <!-- <div class="page-snapshot"></div> -->
                              <div class="page-name">{{item.name}}</div>
                            </div>
                          </div>
                        </OrderSetter>
                      </div>
                      <!-- pop list -->
                      <div class="page-list" v-if="setConfig.leftTabParam.value == 1">
                        <div class="page-item mtb20" v-for="(item, key) in contentConfig.pops" :key="key" :class="{'page-item-checked': key == setConfig.setPopId}" @click="changePop(key)">
                          <!-- <div class="page-snapshot"></div> -->
                          <div class="page-name">{{item.name}}</div>
                          <div class="del-icon" v-if="key == setConfig.setPopId" @click="delPop(key)"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- main-content -->
              <div class="main-content">
                <div class="element-window" :class="{'module-window': setConfig.setType == 'popElement' || setConfig.setType == 'pop'}" v-if="setConfig.showElementWindow">
                  <div class="element-window-title">
                    元素图层
                  </div>
                  <div class="element-window-content" id="elementWindow">
                    <OrderSetter
                      :param="setConfig.elementWindowSetterParam"
                      :key="setConfig.elementWindowSetterParam.key"
                      :editCallback="elementSetterEditContentCallback"
                      :callback="elementSetterMoveCallback"
                      v-if="setConfig.setType == 'element' || setConfig.setType == 'module'"
                    >
                      <div class="order-setter-item" v-for="(item, key) in setConfig.elementWindowSetterParam.content" :key="key" :slot="'s' + key">
                        <div class="element-window-item">
                          <div class="element-window-item-title">{{item.name}}</div>
                          <div class="element-window-del-icon" @click="elementSetterDelContentCallback(key)" v-if="key == setConfig.elementWindowSetterParam.editKey"></div>
                          <div class="element-window-unlock-icon" :class="{'element-window-lock-icon': item.lock}" @click="elementLock(item)" v-if="key == setConfig.elementWindowSetterParam.editKey"></div>
                        </div>
                      </div>
                    </OrderSetter>
                    <!-- pop element -->
                    <OrderSetter
                      :param="setConfig.popElementWindowSetterParam"
                      :key="setConfig.popElementWindowSetterParam.key"
                      :editCallback="popElementSetterEditContentCallback"
                      :callback="popElementSetterMoveCallback"
                      v-if="setConfig.setType == 'popElement' || setConfig.setType == 'pop'"
                    >
                      <div class="order-setter-item" v-for="(item, key) in setConfig.popElementWindowSetterParam.content" :key="key" :slot="'s' + key">
                        <div class="element-window-item">
                          <div class="element-window-item-title">{{item.name}}</div>
                          <div class="element-window-del-icon" @click="popElementSetterDelContentCallback(key)" v-if="key == setConfig.popElementWindowSetterParam.editKey"></div>
                          <div class="element-window-unlock-icon" :class="{'element-window-lock-icon': item.lock}" @click="elementLock(item)" v-if="key == setConfig.popElementWindowSetterParam.editKey"></div>
                        </div>
                      </div>
                    </OrderSetter>
                  </div>
                </div>
                <!-- 模块图层 -->
                <div class="element-window module-window" v-if="setConfig.setType != 'pop' && setConfig.setType != 'popElement'">
                  <div class="element-window-title">
                    模块图层
                  </div>
                  <div class="element-window-content" id="moduleWindow">
                    <OrderSetter
                      :param="setConfig.moduleWindowSetterParam"
                      :key="setConfig.moduleWindowSetterParam.key"
                      :editCallback="moduleSetterEditContentCallback"
                      :callback="moduleSetterMoveCallback"
                    >
                      <div class="order-setter-item" v-for="(item, key) in setConfig.moduleWindowSetterParam.content" :key="key" :slot="'s' + key">
                        <div class="element-window-item">
                          <div class="element-window-item-title">{{item.name}}</div>
                          <div class="element-window-del-icon" @click="moduleSetterDelContentCallback(key)" v-if="key == setConfig.moduleWindowSetterParam.editKey"></div>
                        </div>
                      </div>
                    </OrderSetter>
                  </div>
                </div>
                <div class="stage-content" id="mainSetter" @click="emptyAreaClick" v-if="setConfig.leftTabParam.value == 0">
                  <div class="stage" :style="bodyStyle">
                    <div class="page" :style="pageStyle">
                      <OrderSetter
                        :param="setConfig.mainOrderSetterParam"
                        :key="setConfig.mainOrderSetterParam.key"
                        :editCallback="orderSetterEditContentCallback"
                        :delCallback="orderSetterDelContentCallback"
                        :callback="orderSetterMoveCallback"
                      >
                        <div class="order-setter-item" v-for="(item, key) in setConfig.mainOrderSetterParam.content" :key="key" :slot="'s' + key">
                          <MImages v-if="item && item.tag == 'images'" :param="item" :dataSource="contentConfig.dataSource" :mid="key" :isSet="1" :elementRefreshCallback="elementRefreshCallback" :setConfig="setConfig"/>
                          <MMenus v-if="item && item.tag == 'menus'" :param="item" :dataSource="contentConfig.dataSource" :mid="key" :isSet="1" :elementRefreshCallback="elementRefreshCallback" :setConfig="setConfig"/>
                          <MGoods v-if="item && item.tag == 'goods'" :param="item" :dataSource="contentConfig.dataSource" :mid="key" :isSet="1" :elementRefreshCallback="elementRefreshCallback" :setConfig="setConfig"/>
                        </div>
                      </OrderSetter>
                    </div>
                  </div>
                </div>
                <div class="stage-content" id="mainPopSetter" @click="emptyPopAreaClick" v-if="setConfig.leftTabParam.value == 1">
                  <div class="stage pop-bg" :key="popContentKey">
                    <div v-for="(item, key) in contentConfig.pops" :key="key">
                      <MPop :param="item" isSet="1" :setConfig="setConfig" :popId="key" :elementRefreshCallback="popElementRefreshCallback"/>
                    </div>
                  </div>
                </div>
              </div>
              <!-- right-menu -->
              <div class="right-menu-content">
                <div class="edit-content-menu">
                  <div v-for="(item, key) in setConfig.editTabParam.data" :key="key">
                    <div v-if="item.show" @click="changeTabValue(setConfig.editTabParam, key, changeEditTab)" class="edit-content-menu-item" :class="{'edit-content-menu-item-checked': setConfig.editTabParam.data[key].value == setConfig.editTabParam.value}">{{setConfig.editTabParam.data[key].option}}</div>
                  </div>
                </div>
                <div class="menu-content">
                  <div class="menu-tab" v-if="setConfig.editTabParam.value == 0 || setConfig.editTabParam.value == 3">
                    <div class="menu-tab-cell">
                      <div class="edit-tab-menu">
                        <div v-for="i in 4" :key="i" :class="{'edit-tab-menu-item': (setConfig.rightTabParam.data[i - 1] && setConfig.rightTabParam.data[i - 1].show), 'edit-tab-menu-item-blank': !(setConfig.rightTabParam.data[i - 1] && setConfig.rightTabParam.data[i - 1].show), 'edit-tab-menu-item-checked': setConfig.rightTabParam.data[i - 1] && setConfig.rightTabParam.data[i - 1].value == setConfig.rightTabParam.value}">
                          <div class="edit-tab-menu-item-content" @click="changeTabValue(setConfig.rightTabParam, (i - 1), changeSetTab)" v-if="setConfig.rightTabParam.data[i - 1] && setConfig.rightTabParam.data[i - 1].show">{{setConfig.rightTabParam.data[i - 1].option}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="channel-support"  v-if="checkChannelSupport(setConfig)">
                    <div class="channel-support-item" v-for="(item, key) in setConfig.channels" :key="key">
                      <div class="channel-support-item-bar" :class="item.tag + '-bg'"></div>
                      <div class="channel-support-item-text">{{item.name}}</div>
                    </div>
                  </div>
                  <div class="menu-content">
                    <div class="menu-content-cell">
                      <!-- right menu content -->
                      <div class="module-list" v-if="setConfig.editTabParam.value == 1">
                        <div v-for="(item, key) in setConfig.moduleListParam" :key="key">
                          <div class="module-list-table" v-if="key % 3 == 0">
                            <div class="module-list-cell" v-for="i in 3" :key="i">
                              <div v-if="setConfig.moduleListParam[key + (i-1)]" @click="addModule(setConfig.moduleListParam[key + (i-1)])">
                                <div class="moudle-list-image">
                                  <div class="img"></div>
                                  <div class="support-bars-table">
                                    <div class="support-bars-cell" v-for="(items, keys) in setConfig.moduleListParam[key + (i-1)].support" :key="keys" :class="items + '-bg'"></div>
                                  </div>
                                </div>
                                <div class="moudle-list-title">{{setConfig.moduleListParam[key + (i-1)].name}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- element list -->
                      <div class="module-list" v-if="setConfig.editTabParam.value == 2 && setConfig.leftTabParam.value == 0">
                        <div v-for="(item, key) in setConfig.elementListParam" :key="key">
                          <div class="module-list-table" v-if="key % 3 == 0">
                            <div class="module-list-cell" v-for="i in 3" :key="i">
                              <div v-if="setConfig.elementListParam[key + (i-1)]" @click="addElement(setConfig.elementListParam[key + (i-1)])">
                                <div class="moudle-list-image">
                                  <div class="img"></div>
                                  <div class="support-bars-table">
                                    <div class="support-bars-cell" v-for="(items, keys) in setConfig.elementListParam[key + (i-1)].support" :key="keys" :class="items + '-bg'"></div>
                                  </div>
                                </div>
                                <div class="moudle-list-title">{{setConfig.elementListParam[key + (i-1)].name}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- pop element -->
                      <div class="module-list" v-if="setConfig.editTabParam.value == 2 && setConfig.leftTabParam.value == 1">
                        <div v-for="(item, key) in setConfig.elementListParam" :key="key">
                          <div class="module-list-table" v-if="key % 3 == 0">
                            <div class="module-list-cell" v-for="i in 3" :key="i">
                              <div v-if="setConfig.elementListParam[key + (i-1)]" @click="addPopElement(setConfig.elementListParam[key + (i-1)])">
                                <div class="moudle-list-image">
                                  <div class="img"></div>
                                  <div class="support-bars-table">
                                    <div class="support-bars-cell" v-for="(items, keys) in setConfig.elementListParam[key + (i-1)].support" :key="keys" :class="items + '-bg'"></div>
                                  </div>
                                </div>
                                <div class="moudle-list-title">{{setConfig.elementListParam[key + (i-1)].name}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Setter -->
                      <div class="setter-content" id="setterContent" v-if="setConfig.editTabParam.value == 0 || setConfig.editTabParam.value == 3" :key="setConfig.setterParam.key">
                        <Setter :callback="refreshContent"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
