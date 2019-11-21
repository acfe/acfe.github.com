<template>
  <div class="param-setter" :class="{'p-relative': posRelative}" ref='paramSetter' :style="{'z-index': zIndex || 1}">
    <div v-for="(item, key) in setList" :key="key" :class="{'order-setter-container': item.type == 'contentGroup'}">
      <!-- inputGroup -->
      <div class="item-lr-group" v-if="item.type == 'inputGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <div class="item-input-bk">
            <FcInput :param="item.param" :callback="item.callback"/>
          </div>
        </div>
      </div>
      <!-- selectorGroup -->
      <div class="item-lr-group" v-if="item.type == 'selectorGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <FcSingleSelector :param="item.param" :callback="item.callback"/>
        </div>
      </div>
      <!-- textareaGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'textareaGroup'">
        <div class="item-title">
          {{item.title}}
        </div>
        <div class="pt10">
          <div class="item-input-bk">
            <FcTextarea :param="item.param" :callback="item.callback"/>
          </div>
        </div>
      </div>
      <!-- editorGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'editorGroup'">
        <div class="item-title">
          {{item.title}}
        </div>
        <div class="pt10">
          <div class="editor-container">
            <FcEditor :param="item.param" :callback="item.callback"/>
          </div>
        </div>
      </div>
      <!-- colorGroup -->
      <div class="item-lr-group" v-if="item.type == 'colorGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <el-color-picker v-model="item.param.value" size="medium" @change="item.callback"></el-color-picker>
        </div>
      </div>
      <!-- radioTabGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'radioTabGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <FcRadioTab :param="item.param" :callback="item.callback"/>
        </div>
      </div>
      <!-- imageTabGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'imageTabGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content clear-fix">
          <div class="image-tab-item" v-for="(it, k) in item.param.data" :key="k" @click="item.callback(it)">
            <div class="image-content" :class="{'image-content-checked': it.value == item.param.value}" :style="{'background-image': it.url ? 'url(' + it.url + ')' : 'none'}"></div>
            <div class="text-content" v-if="it.option">{{it.option}}</div>
          </div>
        </div>
      </div>
      <!-- sliderGroup -->
      <div class="item-lr-group" v-if="item.type == 'sliderGroup'">
        <div class="item-title slider-input-content">{{item.title}}</div>
        <div class="item-content slider-component-content">
          <FcSlider :param="item.sliderParam.param" :callback="item.sliderParam.callback"/>
        </div>
        <div class="item-content slider-input-content">
          <div class="item-input-bk">
            <FcInput :param="item.textParam.param" :callback="item.textParam.callback"/>
          </div>
        </div>
      </div>
      <!-- animationGroup -->
      <div v-if="item.type == 'animationGroup'">
        <div class="item-tb-group pb0 clear-fix">
          <div class="item-title">{{item.themeTypeParam.title}}</div>
          <div class="item-content">
            <FcRadioTab :param="item.themeTypeParam.param" :callback="item.themeTypeParam.callback"/>
          </div>
        </div>
        <div class="item-tb-group clear-fix" v-if="item.themeTypeParam.param.value == 'in'">
          <div class="item-content-list clear-fix">
            <div class="image-tab-item" v-for="(it, k) in item.themeParam.data" :key="k" @click="item.themeParam.callback(it)">
              <div class="image-content" :class="{'image-content-checked': it.theme == item.themeParam.value}" :style="{'background-image': it.url ? 'url(' + it.url + ')' : 'none'}"></div>
              <div class="text-content" v-if="it.title">{{it.title}}</div>
            </div>
          </div>
        </div>
        <div class="item-tb-group clear-fix" v-if="item.themeTypeParam.param.value == 'out'">
          <div class="item-content-list clear-fix">
            <div class="image-tab-item" v-for="(it, k) in item.themeParam.dataOut" :key="k" @click="item.themeParam.callback(it)">
              <div class="image-content" :class="{'image-content-checked': it.theme == item.themeParam.value}" :style="{'background-image': it.url ? 'url(' + it.url + ')' : 'none'}"></div>
              <div class="text-content" v-if="it.title">{{it.title}}</div>
            </div>
          </div>
        </div>
        <div class="item-lr-group">
          <div class="item-title">{{item.repeatParam.title}}</div>
          <div class="item-content">
            <div class="item-input-bk">
              <FcInput :param="item.repeatParam.param" :callback="item.repeatParam.callback"/>
            </div>
          </div>
        </div>
        <div class="item-lr-group">
          <div class="item-title">{{item.delayParam.title}}</div>
          <div class="item-content">
            <div class="item-input-bk">
              <FcInput :param="item.delayParam.param" :callback="item.delayParam.callback"/>
            </div>
          </div>
        </div>
        <div class="item-lr-group">
          <div class="item-title">{{item.tEndParam.title}}</div>
          <div class="item-content">
            <div class="item-input-bk">
              <FcInput :param="item.tEndParam.param" :callback="item.tEndParam.callback"/>
            </div>
          </div>
        </div>
        <div class="item-lr-group" v-if="inArr(item.themeParam.value, [10, 11, 12, 13, 14, 15, 16, 17, 18])">
          <div class="item-title">{{item.degParam.title}}</div>
          <div class="item-content">
            <div class="item-input-bk">
              <FcInput :param="item.degParam.param" :callback="item.degParam.callback"/>
            </div>
          </div>
        </div>
        <div class="item-lr-group">
          <div class="item-title">{{item.tweenTypeParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.tweenTypeParam.param" :callback="item.tweenTypeParam.callback"/>
          </div>
        </div>
        <div class="item-lr-group" v-if="item.tweenTypeParam.param.value != 'Linear'">
          <div class="item-title">{{item.tweenAcParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.tweenAcParam.param" :callback="item.tweenAcParam.callback"/>
          </div>
        </div>
      </div>
      <!-- dataSourceGroup -->
      <div class="item-tb-group clear-fix pt0" v-if="item.type == 'dataSourceGroup' && setterParamValue.dataType == 1">
        <div class="clear-fix">
          <FcRadioTab :param="item.param" :callback="item.callback" :delCallback="item.delCallback"/>
          <div class="add-data-btn" @click="item.addCallback">+新增数据源</div>
        </div>
        <div class="item-lr-group source-input-group" v-if="item.showAdd">
          <div class="source-title">名称</div>
          <div class="item-input-bk source-name-input ">
            <FcInput :param="item.nameParam"/>
          </div>
          <div class="add-data-btn lh26" @click="item.saveCallback">保存</div>
        </div>
      </div>
      <!-- setGroup -->
      <div v-if="item.type == 'setGroup'">
        <div class="set-group-title" :class="{'set-group-sub-title': item.isSub}" @click="item.setOpen">
          {{item.title}}
          <div class="menu-icon" v-if="!item.isSub"></div>
          <div class="sub-icon right-icon" v-if="!item.open"></div>
          <div class="sub-icon down-icon" v-if="item.open"></div>
        </div>
        <ParamSetter v-if="item.open" :setterParam="item.setList" :setterParamValue="setterParamValue" :setterRefreshContent="refreshContent" :posRelative="1"/>
      </div>
      <!-- paddingGroup -->
      <div class="padding-group" v-if="item.type == 'paddingGroup'">
        <div class="padding-group-item">
          <div class="item-title">左px</div>
          <div class="item-content">
            <FcInput :param="item['padding-left'].param" :callback="item['padding-left'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">右px</div>
          <div class="item-content">
            <FcInput :param="item['padding-right'].param" :callback="item['padding-right'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">上px</div>
          <div class="item-content">
            <FcInput :param="item['padding-top'].param" :callback="item['padding-top'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">下px</div>
          <div class="item-content">
            <FcInput :param="item['padding-bottom'].param" :callback="item['padding-bottom'].callback"/>
          </div>
        </div>
      </div>
      <!-- radiusGroup -->
      <div class="padding-group" v-if="item.type == 'radiusGroup'">
        <div class="padding-group-item">
          <div class="item-title">左上px</div>
          <div class="item-content">
            <FcInput :param="item['border-top-left-radius'].param" :callback="item['border-top-left-radius'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">右上px</div>
          <div class="item-content">
            <FcInput :param="item['border-top-right-radius'].param" :callback="item['border-top-right-radius'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">左下px</div>
          <div class="item-content">
            <FcInput :param="item['border-bottom-left-radius'].param" :callback="item['border-bottom-left-radius'].callback"/>
          </div>
        </div>
        <div class="item-blank"></div>
        <div class="padding-group-item">
          <div class="item-title">右下px</div>
          <div class="item-content">
            <FcInput :param="item['border-bottom-right-radius'].param" :callback="item['border-bottom-right-radius'].callback"/>
          </div>
        </div>
      </div>
      <!-- borderGroup -->
      <div class="border-group" v-if="item.type == 'borderGroup'">
        <div class="border-group-item">
          <div class="title-item"></div>
          <div class="size-item">尺寸</div>
          <div class="color-item">颜色</div>
          <div class="style-item">样式</div>
        </div>
        <div class="border-group-item" v-for="oItem in ['top', 'bottom', 'left', 'right']" :key="oItem">
          <div class="title-item">{{item[oItem].title}}</div>
          <div class="size-item">
            <div class="border-bk">
              <FcInput :param="item[oItem].sizeParam.param" :callback="item[oItem].sizeParam.callback"/>
            </div>
          </div>
          <div class="item-blank"></div>
          <div class="color-item">
            <div class="border-bk">
              <FcInput :param="item[oItem].colorParam.param" :callback="item[oItem].colorParam.callback"/>
            </div>
          </div>
          <div class="item-blank"></div>
          <div class="style-item">
            <FcSingleSelector :param="item[oItem].styleParam.param" :callback="item[oItem].styleParam.callback"/>
          </div>
        </div>
      </div>
      <!-- heightGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'heightGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <FcRadioTab :param="item.heightTypeParam.param" :callback="item.heightTypeParam.callback"/>
        </div>
      </div>
      <div class="item-lr-group" v-if="item.type == 'heightGroup' && item.heightTypeParam.param.value == 'set'">
        <div class="item-title">{{item.heightParam.title}}</div>
        <div class="item-content">
          <div class="item-input-bk">
            <FcInput :param="item.heightParam.param" :callback="item.heightParam.callback"/>
          </div>
        </div>
      </div>
      <div class="item-tb-group clear-fix" v-if="item.type == 'heightGroup'">
        <div class="item-title">{{item.overflowParam.title}}</div>
        <div class="item-content">
          <FcRadioTab :param="item.overflowParam.param" :callback="item.overflowParam.callback"/>
        </div>
      </div>
      <!-- imageGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'imageGroup' && item.title && item.showTitle">
        <div class="item-title">
          {{item.title}}
        </div>
      </div>  
      <div class="item-lr-group" v-if="item.type == 'imageGroup'">
        <div class="upload-content">
          <FcSingleUpload :param="item.uploadParam" :delCallback="item.uploadParam.delCallback" :callback="item.uploadParam.callback"/>
        </div>
        <div class="item-content url-area">
          <FcTextarea :param="item.urlParam.param" :callback="item.urlParam.callback"/>
        </div>
      </div>
      <!-- actionGroup -->
      <div v-if="item.type == 'actionGroup'">
        <div class="item-lr-group">
          <div class="item-title">{{item.acTypeParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.acTypeParam.param" :callback="item.acTypeParam.callback"/>
          </div>
        </div>
        <!-- 跳转链接 -->
        <div class="item-tb-group clear-fix" v-if="item.acTypeParam.param.value == 1">
          <div class="item-title">{{item.acUrlParam.title}}</div>
          <div class="pt10">
            <div class="item-input-bk">
              <FcTextarea :param="item.acUrlParam.param" :callback="item.acUrlParam.callback"/>
            </div>
          </div>
        </div>
        <div class="item-tb-group clear-fix" v-if="item.acTypeParam.param.value == 1">
          <div class="item-title">{{item.acTargetParam.title}}</div>
          <div class="item-content">
            <FcRadioTab :param="item.acTargetParam.param" :callback="item.acTargetParam.callback"/>
          </div>
        </div>
        <!-- 跳转内页 -->
        <div class="item-lr-group" v-if="item.acTypeParam.param.value == 2">
          <div class="item-title">{{item.pagesParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.pagesParam.param" :callback="item.pagesParam.callback"/>
          </div>
        </div>
        <!-- 打开关闭弹窗 -->
        <div class="item-lr-group" v-if="item.acTypeParam.param.value == 3 || item.acTypeParam.param.value == 5">
          <div class="item-title">{{item.popsParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.popsParam.param" :callback="item.popsParam.callback"/>
          </div>
        </div>
        <!-- 执行事件 -->
        <div class="item-tb-group clear-fix" v-if="item.acTypeParam.param.value == 4">
          <div class="item-title">{{item.acFunParam.title}}</div>
          <div class="pt10">
            <div class="item-input-bk">
              <FcTextarea :param="item.acFunParam.param" :callback="item.acFunParam.callback"/>
            </div>
          </div>
        </div>
        <!-- tab切换 -->
        <div class="item-lr-group" v-if="item.acTypeParam.param.value == 7">
          <div class="item-title">{{item.tabParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.tabParam.param" :callback="item.tabParam.callback"/>
          </div>
        </div>
        <div class="item-lr-group" v-if="item.acTypeParam.param.value == 7 && item.tabItemParam">
          <div class="item-title">{{item.tabItemParam.title}}</div>
          <div class="item-content">
            <FcSingleSelector :param="item.tabItemParam.param" :callback="item.tabItemParam.callback"/>
          </div>
        </div>
        <!-- 埋点标识 -->
        <div class="item-tb-group clear-fix" v-if="item.acTypeParam.param.value">
          <div class="item-title">{{item.fioParam.title}}</div>
          <div class="pt10">
            <div class="item-input-bk">
              <FcTextarea :param="item.fioParam.param" :callback="item.fioParam.callback"/>
            </div>
          </div>
        </div>
      </div>
      <!-- contentGroup -->
      <div class="order-setter-content" v-if="item.type == 'contentGroup'">
        <div class="sub-title">
          {{item.title}}
          <div class="sub-icon edit-icon" v-if="item.contentListType == 'list'" @click="item.changeContentListType('edit')"></div>
          <div class="sub-icon list-icon" v-if="item.contentListType != 'list'" @click="item.changeContentListType('list')"></div>
        </div>
        <div class="add-button-area">
          <FcButton :param="{theme: 'blue'}" text="添加内容" :callback="item.addContent"/>
        </div>
        <div class="order-setter-grow" id="contentSetter">
          <OrderSetter
            :param="item.orderSetterParam"
            :key="item.orderSetterParam.key"
            :editCallback="item.orderSetterParam.orderSetterEditContentCallback"
            :delCallback="item.orderSetterParam.orderSetterDelContentCallback"
            :callback="item.orderSetterParam.orderSetterMoveCallback"
          >
            <div class="order-setter-item" v-for="(contentItem, contentKey) in item.orderSetterParam.content" :key="contentKey" :slot="'s' + contentKey">
              <div class="setter-item-content-container">
                <div class="setter-sub-title clear-fix">
                  <div class="num-tag" v-if="!contentItem.url">{{contentKey + 1}}</div>
                  <div class="img-tag" v-if="contentItem.url"><img :src="contentItem.url"></div>
                  <div class="title-text">{{contentItem.title || contentItem.name}}</div>
                  <div class="sub-icon del-icon" @click="item.delContent(contentKey)"></div>
                  <div class="sub-icon edit-icon" v-if="contentItem.contentListType == 'list'" @click="item.changeItemContentListType('edit', contentKey)"></div>
                  <div class="sub-icon list-icon" v-if="contentItem.contentListType != 'list'" @click="item.changeItemContentListType('list', contentKey)"></div>
                </div>
                <div class="set-text" :class="{'set-text-checked': setterParamValue.singleDatas.checkedId == contentItem.checkedId}" v-if="item.changeCheckedId && contentItem.contentListType != 'list'" @click="item.changeCheckedId(contentItem.checkedId, contentKey)">默认选中</div>
                <ParamSetter v-if="contentItem.contentListType != 'list'" :zIndex="item.orderSetterParam.content.length + 2 - contentKey" :setterParam="item.setList" :setterParamValue="contentItem" :setterRefreshContent="refreshContent" :posRelative="1"/>
              </div>
            </div>
          </OrderSetter>
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
