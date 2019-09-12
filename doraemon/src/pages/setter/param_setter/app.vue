<template>
  <div class="param-setter" :class="{'p-relative': posRelative}" ref='paramSetter'>
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
      <!-- textareaGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'textareaGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="pt10">
          <div class="item-input-bk">
            <FcTextarea :param="item.param" :callback="item.callback"/>
          </div>
        </div>
      </div>
      <!-- radioTabGroup -->
      <div class="item-tb-group clear-fix" v-if="item.type == 'radioTabGroup'">
        <div class="item-title">{{item.title}}</div>
        <div class="item-content">
          <FcRadioTab :param="item.param" :callback="item.callback"/>
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
        <div class="set-group-title" @click="item.setOpen">
          {{item.title}}
          <div class="sub-icon right-icon" v-if="!item.open"></div>
          <div class="sub-icon down-icon" v-if="item.open"></div>
        </div>
        <ParamSetter v-if="item.open" :setterParam="item.setList" :setterParamValue="setterParamValue" :setterRefreshContent="refreshContent" :posRelative="1"/>
      </div>
      <!-- imageGroup -->
      <div class="item-lr-group" v-if="item.type == 'imageGroup'">
        <div class="upload-content">
          <FcSingleUpload :param="item.uploadParam" :delCallback="item.uploadParam.delCallback" :callback="item.uploadParam.callback"/>
        </div>
        <div class="item-content url-area">
          <FcTextarea :param="item.urlParam.param" :callback="item.urlParam.callback"/>
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
                  <div class="title-text">{{contentItem.title}}</div>
                  <div class="sub-icon del-icon" @click="item.delContent(contentKey)"></div>
                  <div class="sub-icon edit-icon" v-if="contentItem.contentListType == 'list'" @click="item.changeItemContentListType('edit', contentKey)"></div>
                  <div class="sub-icon list-icon" v-if="contentItem.contentListType != 'list'" @click="item.changeItemContentListType('list', contentKey)"></div>
                </div>
                <ParamSetter v-if="contentItem.contentListType != 'list'" :setterParam="item.setList" :setterParamValue="contentItem" :setterRefreshContent="refreshContent" :posRelative="1"/>
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
