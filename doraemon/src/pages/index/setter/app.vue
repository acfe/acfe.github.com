<template>
  <div class="fc-setter" ref="setter" id="setterBodyScrollContent" :key="randKey">
    <div class="tb-row" v-for="(item, key) in setList" :key="key">
      <!-- empty -->
      <div class="tb-cell" v-if="item.type == 'empty'"></div>

      <!-- textarea -->
      <div class="tb-cell h10" v-if="item.type == 'textarea'">
        <div class="input-group">
          <div class="input-title">{{item.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.param" :callback="item.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- singleSelector -->
      <div class="tb-cell h10" v-if="item.type == 'singleSelector'">
        <div class="input-group">
          <div class="input-title lh34">{{item.title}}</div>
          <div class="input-content">
            <FcSingleSelector :param="item.param" :callback="item.param.callback"/>
          </div>
        </div>
      </div>

      <!-- 图片内容设置 -->
      <div class="tb-cell h10" v-if="item.type == 'image'">
        <div class="upload-area">
          <div class="upload-cell">
            <FcSingleUpload :param="item.uploadParam" :delCallback="item.uploadParam.delCallback" :callback="item.uploadParam.callback"/>
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">{{item.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.urlParam.param" :callback="item.urlParam.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- radioTab -->
      <div class="tb-cell h10" v-if="item.type == 'radioTab'">
        <div class="radio-tab-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.param" :callback="item.callback"/>
          </div>
        </div>
      </div>

      <!-- dataSourceGroup -->
      <div class="tb-cell h10" v-if="item.type == 'dataSourceGroup'">
        <div class="radio-tab-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.param" :callback="item.param.callback"/>
          </div>
          <div class="button-item" v-if="!item.showAdd">
            <FcButton :param="{theme: 'blue', type: 'border'}" text="新增数据源" :callback="item.addCallback"/>
          </div>
          <div class="input-group" v-if="item.showAdd">
            <div class="input-content w30"></div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.addParam.nameParam"/>
              </div>
            </div>
            <div class="input-content w60">
              <FcButton :param="{theme: 'blue'}" text="确定" :callback="item.addParam.saveCallback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- contentSetter -->
      <div class="tb-cell" v-if="item.type == 'contentSetter'">
        <div class="images-module-content">
          <div class="tb-row">
            <div class="tb-cell h10"></div>
          </div>
          <div class="images-module-content-title">
            <div class="content-tilte-cell">{{item.title}}</div>
          </div>
          <div class="tb-row">
            <div class="tb-cell h10"></div>
          </div>
          <div class="add-content-btn-area">
            <div class="btn-area-cell"><FcButton :param="{theme: 'blue'}" text="添加内容" :callback="item.orderSetterParam.addContent"/></div>
          </div>
          <div class="images-module-content-setter">
            <div class="content-cell">
              <div class="setter-content-area" id="contentSetter">
                <OrderSetter
                  :param="item.orderSetterParam"
                  :key="item.orderSetterParam.key"
                  :editCallback="item.orderSetterParam.orderSetterEditContentCallback"
                  :delCallback="item.orderSetterParam.orderSetterDelContentCallback"
                  :callback="item.orderSetterParam.orderSetterMoveCallback"
                >
                  <div class="order-setter-item" v-for="(item2, key2) in item.orderSetterParam.content" :key="key2" :slot="'s' + key2">
                    <div class="h10"></div>
                    <div class="upload-area" v-if="item2.uploadParam">
                      <div class="upload-cell">
                        <FcSingleUpload :param="item2.uploadParam" :delCallback="item2.uploadParam.delCallback" :callback="item2.uploadParam.callback"/>
                      </div>
                    </div>
                    <div class="input-group" v-if="item2.urlParam">
                      <div class="input-title">{{item2.urlParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.urlParam.param" :callback="item2.urlParam.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group" v-if="item2.nameParam">
                      <div class="input-title">{{item2.nameParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.nameParam" :callback="item2.nameParam.callback"/>
                        </div>
                      </div>
                      <div class="input-content select-text" v-if="item.module == 'menus'" :class="{'select-text-checked': item.checkedId == item2.checkedId}" @click="item.changeCheckedId(item2.checkedId)">默认选中</div>
                    </div>
                    <div class="input-group" v-if="item2.titleParam">
                      <div class="input-title">{{item2.titleParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.titleParam" :callback="item2.titleParam.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group" v-if="item2.descriptionParam">
                      <div class="input-title">{{item2.descriptionParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.descriptionParam" :callback="item2.descriptionParam.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group" v-if="item2.salePriceParam">
                      <div class="input-title">{{item2.salePriceParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.salePriceParam" :callback="item2.salePriceParam.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group" v-if="item2.originPriceParam">
                      <div class="input-title">{{item2.originPriceParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item2.originPriceParam" :callback="item2.originPriceParam.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="ac-group" v-if="item2.acTypeParam">
                      <div class="input-group">
                        <div class="input-title lh34">{{item2.acTypeParam.title}}</div>
                        <div class="input-content">
                          <FcSingleSelector :param="item2.acTypeParam.param" :callback="item2.acTypeParam.param.callback"/>
                        </div>
                      </div>
                      <div class="input-group" v-if="item2.acTypeParam.param.value == 1">
                        <div class="input-title">{{item2.acUrlParam.title}}</div>
                        <div class="input-content">
                          <div class="max-200">
                            <FcTextarea :param="item2.acUrlParam.param" :callback="item2.acUrlParam.param.callback"/>
                          </div>
                        </div>
                      </div>
                      <div class="input-group" v-if="item2.acTypeParam.param.value == 1">
                        <div class="input-title lh34">{{item2.acTargetParam.title}}</div>
                        <div class="input-content">
                          <FcRadioTab :param="item2.acTargetParam.param" :callback="item2.acTargetParam.param.callback"/>
                        </div>
                      </div>
                      <div class="input-group" v-if="item2.acTypeParam.param.value == 2">
                        <div class="input-title lh34">{{item2.pagesParam.title}}</div>
                        <div class="input-content">
                          <FcSingleSelector :param="item2.pagesParam.param" :callback="item2.pagesParam.param.callback"/>
                        </div>
                      </div>
                      <div class="input-group" v-if="item2.acTypeParam.param.value == 3 || item2.acTypeParam.param.value == 5">
                        <div class="input-title lh34">{{item2.popsParam.title}}</div>
                        <div class="input-content">
                          <FcSingleSelector :param="item2.popsParam.param" :callback="item2.popsParam.param.callback"/>
                        </div>
                      </div>
                      <div class="input-group" v-if="item2.acTypeParam.param.value == 4">
                        <div class="input-title">{{item2.acFunParam.title}}</div>
                        <div class="input-content">
                          <div class="max-200">
                            <FcTextarea :param="item2.acFunParam.param" :callback="item2.acFunParam.param.callback"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="h10"></div>
                  </div>
                </OrderSetter>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- sliderGroup -->
      <div class="tb-cell h10" v-if="item.type == 'sliderGroup'">
        <div class="input-group">
          <div class="input-title">{{item.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.textParam.param" :callback="item.textParam.callback"/>
            </div>
          </div>
          <div class="input-content w120">
            <FcSlider :param="item.sliderParam.param" :callback="item.sliderParam.callback"/>
          </div>
        </div>
      </div>

      <!-- actionGroup -->

      <div class="tb-cell h10" v-if="item.type == 'actionGroup'">
        <div class="input-group">
          <div class="input-title lh34">{{item.acTypeParam.title}}</div>
          <div class="input-content">
            <FcSingleSelector :param="item.acTypeParam.param" :callback="item.acTypeParam.param.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.acTypeParam.param.value == 1">
          <div class="input-title">{{item.acUrlParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.acUrlParam.param" :callback="item.acUrlParam.param.callback"/>
            </div>
          </div>
        </div>
        <div class="input-group" v-if="item.acTypeParam.param.value == 1">
          <div class="input-title lh34">{{item.acTargetParam.title}}</div>
          <div class="input-content">
            <FcRadioTab :param="item.acTargetParam.param" :callback="item.acTargetParam.param.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.acTypeParam.param.value == 2">
          <div class="input-title lh34">{{item.pagesParam.title}}</div>
          <div class="input-content">
            <FcSingleSelector :param="item.pagesParam.param" :callback="item.pagesParam.param.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.acTypeParam.param.value == 3 || item.acTypeParam.param.value == 5">
          <div class="input-title lh34">{{item.popsParam.title}}</div>
          <div class="input-content">
            <FcSingleSelector :param="item.popsParam.param" :callback="item.popsParam.param.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.acTypeParam.param.value == 4">
          <div class="input-title">{{item.acFunParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.acFunParam.param" :callback="item.acFunParam.param.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- sizePositionGroup -->
      <div class="tb-cell h10" v-if="item.type == 'sizePositionGroup'">
        <div class="input-group">
          <div class="input-title">{{item.widthParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.widthParam" :callback="item.widthParam.callback"/>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">{{item.heightParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.heightParam" :callback="item.heightParam.callback"/>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">{{item.leftParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.leftParam" :callback="item.leftParam.callback"/>
            </div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">{{item.topParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.topParam" :callback="item.topParam.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- 设置浮标样式 -->
      <div class="tb-cell h10" v-if="item.type == 'barStyle'">
        <div class="text-style-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="input-group">
            <div class="input-title">宽度%</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.slParam.textParam.param" :callback="item.slParam.textParam.callback"/>
              </div>
            </div>
            <div class="input-content w120">
              <FcSlider :param="item.slParam.sliderParam.param" :callback="item.slParam.sliderParam.callback"/>
            </div>
          </div>
          <div class="text-style-table">
            <div class="text-style-cell">高度px</div>
            <div class="text-style-cell">颜色</div>
            <div class="text-style-cell">顶部位置px</div>
          </div>
          <div class="text-style-table">
            <div class="text-style-cell" v-for="(name, nameKey) in ['heightParam', 'backgroundParam', 'topParam']" :key="nameKey">
              <div class="border-bk">
                <FcTextarea :param="item[name].param" :callback="item[[name]].callback"/>
              </div>
            </div>
          </div>
          <div class="text-style-align">
            <FcRadioTab :param="item.alignParam.param" :callback="item.alignParam.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.borderRadiusParam">
          <div class="input-title">圆角px</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.borderRadiusParam.param" :callback="item.borderRadiusParam.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- 获取模块内容样式配置 -->
      <div class="tb-cell h10" v-if="item.type == 'moduleContentStyle' && item.setList && item.setList.length">
        <div class="height-group">
          <div class="sub-title">{{item.title}}</div>
          <div v-for="(contentItem, contentItemKey) in item.setList" :key="contentItemKey">
            <!-- textarea -->
            <div class="input-group" v-if="contentItem.type == 'textarea'">
              <div class="input-title">{{contentItem.title}}</div>
              <div class="input-content">
                <div class="max-200">
                  <FcTextarea :param="contentItem.param" :callback="contentItem.callback"/>
                </div>
              </div>
            </div>
            <!-- radioTab -->
            <div class="input-group" v-if="contentItem.type == 'radioTab'">
              <div class="input-title">{{contentItem.title}}</div>
              <div class="input-content">
                <div class="max-200">
                  <FcRadioTab :param="contentItem.param" :callback="contentItem.callback"/>
                </div>
              </div>
            </div>
            <!-- 内容图片样式设置 -->
            <div class="tb-cell h10" v-if="contentItem.type == 'imageSizeStyle'">
              <div class="text-style-group">
                <div class="sub-title">{{contentItem.title}}</div>
                <div class="text-style-table">
                  <div class="text-style-cell">宽px</div>
                  <div class="text-style-cell">高px</div>
                  <div class="text-style-cell">圆角px</div>
                </div>
                <div class="text-style-table">
                  <div class="text-style-cell" v-for="(name, nameKey) in ['widthParam', 'heightParam', 'borderRadiusParam']" :key="nameKey">
                    <div class="border-bk">
                      <FcTextarea :param="contentItem[name].param" :callback="contentItem[name].callback"/>
                    </div>
                  </div>
                </div>
                <div class="text-style-align">
                  <FcRadioTab :param="contentItem.alignParam.param" :callback="contentItem.alignParam.callback"/>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <!-- 模块高度设置 -->
      <div class="tb-cell h10" v-if="item.type == 'heightGroup'">
        <div class="height-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.typeParam.param" :callback="item.typeParam.callback"/>
          </div>
          <div class="input-group" v-if="item.typeParam.param.value == 'set'">
            <div class="input-title">高度px</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.valueParam.param" :callback="item.valueParam.callback"/>
              </div>
            </div>
          </div>
          <div class="sub-title">内容溢出时</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.overflowParam.param" :callback="item.overflowParam.callback"/>
          </div>
        </div>
      </div>

      <!-- 模板排版配置 -->
      <div class="tb-cell h10" v-if="item.type == 'themeSelector'">
        <div class="theme-selector">
          <div class="sub-title">{{item.title}}</div>
          <div v-for="(itemSub, keySub) in item.param.data" :key="keySub">
            <div class="module-list-table" v-if="keySub % 3 == 0">
              <div class="module-list-cell" v-for="i in 3" :key="i">
                <div v-if="item.param.data[keySub + (i-1)]" @click="item.callback(item.param.data[keySub + (i-1)])">
                  <div class="moudle-list-image" :class="{'moudle-list-image-checked': item.param.value == item.param.data[keySub + (i-1)].value}">
                    <div class="img"></div>
                    <div class="support-bars-table">
                      <div class="support-bars-cell" v-for="(items, keys) in item.param.data[keySub + (i-1)].support" :key="keys" :class="items + '-bg'"></div>
                    </div>
                  </div>
                  <div class="moudle-list-title">{{item.param.data[keySub + (i-1)].option}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文字设置 -->
      <div class="tb-cell h10" v-if="item.type == 'textStyle'">
        <div class="text-style-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="text-style-table">
            <div class="text-style-cell">大小px</div>
            <div class="text-style-cell">颜色</div>
            <div class="text-style-cell">粗细</div>
          </div>
          <div class="text-style-table">
            <div class="text-style-cell"  v-for="(name, nameKey) in ['sizeParam', 'colorParam']" :key="nameKey">
              <div class="border-bk">
                <FcTextarea :param="item[name].param" :callback="item[name].callback"/>
              </div>
            </div>
            <div class="text-style-cell">
              <FcSingleSelector :param="item.weightParam" :callback="item.weightParam.callback"/>
            </div>
          </div>
          <div class="text-style-align">
            <FcRadioTab :param="item.textAlignParam.param" :callback="item.textAlignParam.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.lineHeightParam">
          <div class="input-title">{{item.lineHeightParam.title}}</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.lineHeightParam.param" :callback="item.lineHeightParam.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- 背景设置 -->
      <div class="tb-cell h10" v-if="item.type == 'backgroundGroup'">
        <div class="background-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="upload-area">
            <div class="upload-cell">
              <FcSingleUpload :param="item.uploadParam" :delCallback="item.uploadParam.delCallback" :callback="item.uploadParam.callback"/>
            </div>
          </div>
          <div class="input-group" v-for="(name, nameKey) in ['urlParam', 'backgroundColorParam']" :key="nameKey">
            <div class="input-title">{{item[name].title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item[name].param" :callback="item[name].callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-for="(name, nameKey) in ['backgroundPositionParam', 'backgroundRepeatParam']" :key="'radio' + nameKey">
            <div class="input-title">{{item[name].title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcRadioTab :param="item[name].param" :callback="item[name].callback"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 边距设置 -->
      <div class="tb-cell h10" v-if="item.type == 'marginGroup' || item.type == 'paddingGroup'">
        <div class="margin-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="margin-table">
            <div class="margin-cell">上px</div>
            <div class="margin-cell">下px</div>
            <div class="margin-cell">左px</div>
            <div class="margin-cell">右px</div>
          </div>
          <div class="margin-table mb20">
            <div class="margin-cell" v-for="(name, nameKey) in ['top', 'bottom', 'left', 'right']" :key="nameKey">
              <div class="border-bk">
                <FcTextarea :param="item[name].param" :callback="item[name].callback"/>
              </div>
            </div>
          </div>
        </div>  
      </div>

      <!-- 边框设置 -->
      <div class="tb-cell h10" v-if="item.type == 'borderGroup'">
        <div class="border-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="border-input-group">
            <div class="text-cell-tag"></div>
            <div class="text-cell">尺寸px</div>
            <div class="text-cell">颜色</div>
            <div class="selector-cell">样式</div>
          </div>
          <div class="border-input-group" v-for="(name, nameKey) in ['top', 'bottom', 'left', 'right']" :key="nameKey">
            <div class="text-cell-tag">
              <div class="cell-tag-content">{{item[name].title}}</div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item[name].sizeParam.param" :callback="item[name].sizeParam.callback"/>
              </div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item[name].colorParam.param" :callback="item[name].colorParam.callback"/>
              </div>
            </div>
            <div class="selector-cell">
              <FcSingleSelector :param="item[name].styleParam" :callback="item[name].styleParam.callback"/>
            </div>
          </div>
          <div class="module-blank"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import './app.less'
import App from './app.js'
export default App
</script>
