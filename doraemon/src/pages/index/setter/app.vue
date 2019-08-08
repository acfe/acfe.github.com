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

      <!-- image -->
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
              <FcTextarea :param="item.urlParam" :callback="item.urlParam.callback"/>
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

      <!-- heightGroup -->
      <div class="tb-cell h10" v-if="item.type == 'heightGroup'">
        <div class="height-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.typeParam" :callback="item.typeParam.callback"/>
          </div>
          <div class="input-group" v-if="item.typeParam.value == 'set'">
            <div class="input-title">高度px</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.valueParam" :callback="item.valueParam.callback"/>
              </div>
            </div>
          </div>
          <div class="sub-title">内容溢出时</div>
          <div class="radio-tab-area clear-fix">
            <FcRadioTab :param="item.overflowParam" :callback="item.overflowParam.callback"/>
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

      <!-- contentStyle -->
      <div class="tb-cell h10" v-if="item.type == 'contentStyle'">
        <div class="height-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="input-group" v-if="item.contentPaddingBottomParam">
            <div class="input-title">行间距px</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.contentPaddingBottomParam" :callback="item.contentPaddingBottomParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.contentPaddingRightParam">
            <div class="input-title">列间距px</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.contentPaddingRightParam" :callback="item.contentPaddingRightParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.columNumParam">
            <div class="input-title">每行显示数量</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.columNumParam" :callback="item.columNumParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.autoPlayTimeParam">
            <div class="input-title">轮播时间(毫秒ms)</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.autoPlayTimeParam" :callback="item.autoPlayTimeParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.loopParam">
            <div class="input-title">是否循环</div>
            <div class="input-content">
              <div class="max-200">
                <FcRadioTab :param="item.loopParam" :callback="item.loopParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.showGuildParam">
            <div class="input-title">轮播导航</div>
            <div class="input-content">
              <div class="max-200">
                <FcRadioTab :param="item.showGuildParam" :callback="item.showGuildParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group" v-if="item.imageRadiusParam">
            <div class="input-title">圆角px</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.imageRadiusParam" :callback="item.imageRadiusParam.callback"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- textStyle -->
      <div class="tb-cell h10" v-if="item.type == 'textStyle'">
        <div class="text-style-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="text-style-table">
            <div class="text-style-cell">大小px</div>
            <div class="text-style-cell">颜色</div>
            <div class="text-style-cell">粗细</div>
          </div>
          <div class="text-style-table">
            <div class="text-style-cell">
              <div class="border-bk">
                <FcTextarea :param="item.sizeParam" :callback="item.sizeParam.callback"/>
              </div>
            </div>
            <div class="text-style-cell">
              <div class="border-bk">
                <FcTextarea :param="item.colorParam" :callback="item.colorParam.callback"/>
              </div>
            </div>
            <div class="text-style-cell">
              <FcSingleSelector :param="item.weightParam" :callback="item.weightParam.callback"/>
            </div>
          </div>
          <div class="text-style-align">
            <FcRadioTab :param="item.textAlignParam" :callback="item.textAlignParam.callback"/>
          </div>
        </div>
        <div class="input-group" v-if="item.lineHeightParam">
          <div class="input-title">行高px</div>
          <div class="input-content">
            <div class="max-200">
              <FcTextarea :param="item.lineHeightParam" :callback="item.lineHeightParam.callback"/>
            </div>
          </div>
        </div>
      </div>

      <!-- themeSelector -->
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

      <!-- imagesModuleContent -->
      <div class="tb-cell" v-if="item.type == 'imagesModuleContent'">
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
              <div class="setter-content-area" id="imageSetterContent">
                <OrderSetter
                  :param="item.orderSetterParam"
                  :key="item.orderSetterParam.key"
                  :editCallback="item.orderSetterParam.orderSetterEditContentCallback"
                  :delCallback="item.orderSetterParam.orderSetterDelContentCallback"
                  :callback="item.orderSetterParam.orderSetterMoveCallback"
                >
                  <div class="order-setter-item" v-for="(item, key) in item.orderSetterParam.content" :key="key" :slot="'s' + key">
                    <div class="h10"></div>
                    <div class="upload-area">
                      <div class="upload-cell">
                        <FcSingleUpload :param="item.uploadParam" :delCallback="item.uploadParam.delCallback" :callback="item.uploadParam.callback"/>
                      </div>
                    </div>
                    <div class="input-group">
                      <div class="input-title">{{item.urlParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item.urlParam.param" :callback="item.urlParam.param.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group">
                      <div class="input-title">{{item.titleParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item.titleParam.param" :callback="item.titleParam.param.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group">
                      <div class="input-title">{{item.descriptionParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item.descriptionParam.param" :callback="item.descriptionParam.param.callback"/>
                        </div>
                      </div>
                    </div>
                    <div class="input-group">
                      <div class="input-title">{{item.linkParam.title}}</div>
                      <div class="input-content">
                        <div class="max-200">
                          <FcTextarea :param="item.linkParam.param" :callback="item.linkParam.param.callback"/>
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

      <!-- backgroundGroup -->
      <div class="tb-cell h10" v-if="item.type == 'backgroundGroup'">
        <div class="background-group">
          <div class="sub-title">{{item.title}}</div>
          <div class="upload-area">
            <div class="upload-cell">
              <FcSingleUpload :param="item.backgroundImageParam.uploadParam" :delCallback="item.backgroundImageParam.uploadParam.delCallback" :callback="item.backgroundImageParam.uploadParam.callback"/>
            </div>
          </div>
          <div class="input-group">
            <div class="input-title">{{item.backgroundImageParam.title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.backgroundImageParam.urlParam" :callback="item.backgroundImageParam.urlParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-title">{{item.backgroundColorParam.title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcTextarea :param="item.backgroundColorParam.param" :callback="item.backgroundColorParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-title">{{item.backgroundPositionParam.title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcRadioTab :param="item.backgroundPositionParam.param" :callback="item.backgroundPositionParam.callback"/>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-title">{{item.backgroundRepeatParam.title}}</div>
            <div class="input-content">
              <div class="max-200">
                <FcRadioTab :param="item.backgroundRepeatParam.param" :callback="item.backgroundRepeatParam.callback"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- marginGroup paddingGroup -->
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
            <div class="margin-cell">
              <div class="border-bk">
                <FcTextarea :param="item.top.param" :callback="item.top.param.callback"/>
              </div>
            </div>
            <div class="margin-cell">
              <div class="border-bk">
                <FcTextarea :param="item.bottom.param" :callback="item.bottom.param.callback"/>
              </div>
            </div>
            <div class="margin-cell">
              <div class="border-bk">
                <FcTextarea :param="item.left.param" :callback="item.left.param.callback"/>
              </div>
            </div>
            <div class="margin-cell">
              <div class="border-bk">
                <FcTextarea :param="item.right.param" :callback="item.right.param.callback"/>
              </div>
            </div>
          </div>
        </div>  
      </div>

      <!-- borderGroup -->
      <div class="tb-cell h10" v-if="item.type == 'borderGroup'">
        <div class="border-group">
          <div class="sub-title">{{item.title}}</div>
          <!-- top -->
          <div class="border-input-group">
            <div class="text-cell-tag"></div>
            <div class="text-cell">尺寸px</div>
            <div class="text-cell">颜色</div>
            <div class="selector-cell">样式</div>
          </div>
          <div class="border-input-group">
            <div class="text-cell-tag">
              <div class="cell-tag-content">{{item.top.title}}</div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.top.sizeParam" :callback="item.top.sizeParam.callback"/>
              </div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.top.colorParam" :callback="item.top.colorParam.callback"/>
              </div>
            </div>
            <div class="selector-cell">
              <FcSingleSelector :param="item.top.styleParam" :callback="item.top.styleParam.callback"/>
            </div>
          </div>
          <!-- bottom -->
          <div class="border-input-group">
            <div class="text-cell-tag">
              <div class="cell-tag-content">{{item.bottom.title}}</div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.bottom.sizeParam" :callback="item.bottom.sizeParam.callback"/>
              </div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.bottom.colorParam" :callback="item.bottom.colorParam.callback"/>
              </div>
            </div>
            <div class="selector-cell">
              <FcSingleSelector :param="item.bottom.styleParam" :callback="item.bottom.styleParam.callback"/>
            </div>
          </div>
          <!-- left -->
          <div class="border-input-group">
            <div class="text-cell-tag">
              <div class="cell-tag-content">{{item.left.title}}</div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.left.sizeParam" :callback="item.left.sizeParam.callback"/>
              </div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.left.colorParam" :callback="item.left.colorParam.callback"/>
              </div>
            </div>
            <div class="selector-cell">
              <FcSingleSelector :param="item.left.styleParam" :callback="item.left.styleParam.callback"/>
            </div>
          </div>
          <!-- right -->
          <div class="border-input-group">
            <div class="text-cell-tag">
              <div class="cell-tag-content">{{item.right.title}}</div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.right.sizeParam" :callback="item.right.sizeParam.callback"/>
              </div>
            </div>
            <div class="text-cell">
              <div class="border-bk">
                <FcTextarea :param="item.right.colorParam" :callback="item.right.colorParam.callback"/>
              </div>
            </div>
            <div class="selector-cell">
              <FcSingleSelector :param="item.right.styleParam" :callback="item.right.styleParam.callback"/>
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
