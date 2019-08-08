<template>
  <div class="index" ref="index">
    <div class="main-title">组件示例</div>
    <div class="lock-table-component">
      <div class="lock-table-content" ref="main">
        <table class="full-table">
          <tr v-for="t in 30">
            <td v-for="i in 10">{{i}}</td>
          </tr>
        </table>
        <div class="top-lock" ref="top">
          <table class="full-table">
            <tr>
              <td v-for="i in 10">{{i}}</td>
            </tr>
          </table>
        </div>
        <div class="left-lock">
          <div class="left-lock-content" ref="left">
            <table>
              <tr v-for="t in 30">
                <td>1</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="core-lock">
          <table>
              <tr>
                <td>1</td>
              </tr>
            </table>
        </div>
      </div>
    </div>
    <!-- 输入框 下拉单选 -->
    <div class="item-group clear-fix">
      <div class="fl">
        <div class="item-title">输入框:</div>
        <div class="item-content">
          <FcInput :param="inputParam" :callback="inputCallback" />
        </div>
      </div>
      <div class="fl">
        <div class="item-title">下拉单选:</div>
        <div class="item-content">
          <FcSingleSelector :param="singleSelectorParam" />
        </div>
      </div>
    </div>
    <!-- 下拉多选 日历 -->
    <div class="item-group clear-fix">
      <div class="fl">
        <div class="item-title">下拉多选:</div>
        <div class="item-content">
          <FcMultipleSelector :param="multipleSelectorParam" />
        </div>
      </div>
      <div class="fl">
        <div class="item-title">日历组件:</div>
        <div class="item-content pr20">
          <FcDatePicker :param="datePickerParam" />
        </div>
        <!-- <div class="item-area">
          <FcButton :param="{theme: 'cyan'}" text="查询" />
        </div> -->
      </div>
    </div>
    <!-- 复选框 单选框 -->
    <div class="item-group clear-fix">
      <div class="fl">
        <div class="item-title">复选框:</div>
        <div class="item-content checkbox-area" data-track-event="radio_select" data-track-value="0">
          <FcCheckbox :param="checkboxParam" />
        </div>
      </div>
      <div class="fl">
        <div class="item-title">单选框:</div>
        <div class="item-content checkbox-area" data-track-event="radio_select" data-track-value="1">
          <FcRadio :param="radioParam" />
        </div>
      </div>
    </div>
    <!-- textarea -->
    <div class="item-group clear-fix">
      <div class="fl">
        <div class="item-title">textarea:</div>
        <div class="fl">
          <div class="item-content-table">
            <div class="item-content-cell textarea-content">
              <FcTextarea :param="textareaParam" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗按钮 -->
    <div class="item-group clear-fix">
      <div class="item-title">弹窗按钮:</div>
      <div class="item-area pr20">
        <FcButton :param="FcButtonParam" text="Alert" :callback="showAlert" />
      </div>
      <div class="item-area pr20">
        <FcButton :param="{type: 'border', theme: 'cyan'}" text="Confirm" :callback="showConfirm" />
      </div>
      <div class="item-area pr20">
        <FcButton :param="FcButtonParam" text="Toast" :callback="showToast" />
      </div>
      <div class="item-area pr20">
        <FcButton :param="{type: 'border', theme: 'cyan'}" text="自定义弹窗" :callback="showFramePop" />
      </div>
      <div class="item-area pr20">
        <FcButton :param="FcButtonParam" text="Loading" :callback="showLoading" />
      </div>
    </div>
    <!-- 上传 -->
    <div class="item-group clear-fix">
      <div class="item-title">上传:</div>
      <div class="upload fl">
        <QiNiuUpload :param="uploadParam" :callback="uploadCallback" />
      </div>
    </div>
    <!-- 组图预览 -->
    <div class="item-group clear-fix">
      <div class="item-title">组图预览:</div>
      <div class="image"><img src="//static.fcbox.com/fcapp/mall/ududs82vska.png" @click="showImagePop(0)" /></div>
        <div class="image"><img src="//static.fcbox.com/fcapp/mall/cota3z2p3fl.png" @click="showImagePop(1)" /></div>
          <div class="image"><img src="//static.fcbox.com/fcapp/mall/wvd1al8grdr.jpg" @click="showImagePop(2)" /></div>
          </div>
          <!-- 内容懒加载列表 -->
          <div class="item-group clear-fix">
            <div class="item-title">内容懒加载:</div>
            <div class="lazy-list">
              <FcLazyList :param="lazyListParam">
                <template slot="p1" slot-scope="props">
                  <div class="list-item">p1</div>
                </template>
                <template v-for="item in 1000" :slot="'s' + item" slot-scope="props">
                  <div :key="'s' + item" class="list-item list-item2" @click="showAlert">{{'s' + item}}</div>
                </template>
                <template v-for="item in 1000" :slot="'k' + item" slot-scope="props">
                  <div :key="'k' + item" class="list-item list-item3">{{'k' + item}}</div>
                </template>
              </FcLazyList>
            </div>
            <div class="item-title">数据懒加载:</div>
            <div class="lazy-list">
              <FcLazyDataList :param="lazyDataListParam">
                <template slot="s0" slot-scope="props">
                  <div class="list-item">{{props.data.name}}</div>
                </template>
                <template slot="s1" slot-scope="props">
                  <div class="list-item list-item2">{{props.data.name}}</div>
                </template>
              </FcLazyDataList>
            </div>
          </div>
          <!-- 局部加载列表 -->
          <div class="item-group clear-fix">
            <div class="item-title">数据局部加载:</div>
            <div class="lazy-list">
              <FcLocalList :param="localListParam">
                <template slot="s0" slot-scope="props">
                  <div class="list-item">{{props.data.name}}</div>
                </template>
                <template slot="s1" slot-scope="props">
                  <div class="list-item list-item2">{{props.data.name}}</div>
                </template>
              </FcLocalList>
            </div>
          </div>
          <!-- 表格 -->
          <div class="item-group clear-fix">
            <div class="item-table">
              <FcTable :param="tableParam" />
            </div>
          </div>
          <!-- 分页 -->
          <div class="item-group clear-fix">
            <FcPage :param="pageParam" :callback="pageCallback" />
          </div>
          <!--自定义弹窗-->
          <FcPop :param="popParam">
            <div class="fc-pop-content-title">
              自定义弹窗
              <div class="close" @click="closeFramePop"></div>
            </div>
            <div class="pop-frame-content">
              <!--自定义弹窗内容-->
              <iframe src="http://mall.fcbox.com" ref="iframe"></iframe>
            </div>
          </FcPop>
          <!-- 图片浏览器 -->
          <FcImagePopViewer />
        </div>
</template>

<script>
import './index.less'
import Index from './index.js'
export default Index
</script>
