<template>
  <div class="fc-table">
    <table cellpadding="0" cellspacing="0" :style="{width: param.contentWidth || '100%'}">
      <tr class="table-title">
        <td class="td-selector" v-if="param.checkType == 'checkbox'">
          <div class="td-checkbox" :class="{'td-checked': isCheckAll}" @click="checkAll"></div>
        </td>
        <td class="td-selector" v-if="param.checkType == 'radio'"></td>
        <td v-for="(item, key) in titleArr" :style="{width: item.width || 'auto'}" :key="key">
          <div class="span">{{item.text}}</div>
        </td>
      </tr>
      <tr v-for="(item,index) in contentArr" :key="index">
        <td class="td-selector" v-if="param.checkType == 'checkbox'">
          <div class="td-checkbox" :class="{'td-checked': checkboxChecked[index]}" @click="checkboxCheck(index)"></div>
        </td>
        <td class="td-selector" v-if="param.checkType == 'radio'">
          <div class="td-radio" :class="{'td-checked': radioChecked === index}" @click="radioCheck(index)"></div>
        </td>
        <td v-if="item && item.length" v-for="(content, cIndex) in item" :key="cIndex">
          <div class="span" v-if="checkType('normal', content)">{{content}}</div>
          <div class="empty-span" :class="{'img-span': checkType('object', content) && content.type == 'image'}" v-if="checkType('object', content)">
            <div class="span" v-if="content.type == 'text'" :style="content.style || {}">{{content.text}}</div>
            <div class="span" v-if="content.type == 'link'">
              <a :href="content.href || ''" :style="content.style || {}" :target="content.target || '_self'">{{content.text}}</a>
            </div>
            <div class="span" v-if="content.type == 'action'">
              <div class="span action" :style="content.style || {}" @click="content.callback && content.callback()">{{content.text}}</div>
            </div>
            <div class="empty-span" v-if="content.type == 'image'">
              <div class="img-content" @click="content.callback && content.callback()">
                <img v-if="content.src" :src="content.src" :style="content.style || {}" />
              </div>
            </div>
          </div>
          <div class="empty-span" v-if="checkType('array', content)" v-for="(contentItem, contentItemIndex) in content" :key="contentItemIndex">
            <div class="span" v-if="checkType('normal', contentItem)">{{content}}</div>
            <div class="empty-span" :class="{'img-span': checkType('object', contentItem) && contentItem.type == 'image'}" v-if="checkType('object', contentItem)">
              <div class="span" v-if="contentItem.type == 'text'" :style="contentItem.style || {}">{{contentItem.text}}</div>
              <div class="span" v-if="contentItem.type == 'link'">
                <a :href="contentItem.href || ''" :style="contentItem.style || {}" :target="contentItem.target || '_self'">{{contentItem.text}}</a>
              </div>
              <div class="span" v-if="contentItem.type == 'action'">
                <div class="span action" :style="contentItem.style || {}" @click="contentItem.callback && contentItem.callback()">{{contentItem.text}}</div>
              </div>
              <div class="empty-span" v-if="contentItem.type == 'image'">
                <div class="img-content" @click="contentItem.callback && contentItem.callback()">
                  <img v-if="contentItem.src" :src="contentItem.src" :style="contentItem.style || {}">
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
