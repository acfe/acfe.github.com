<template>
  <div class="FcDatePicker clearFix" ref="FcDatePicker">
    <div class="mask" v-if="itemShow" @click="hideItem"></div>
    <div class="inputBk">
      <input class="input" :placeholder="param.placeholder || ''" :value="param.option || param.value" :readonly="true" :style="param.inputStyle || {}" @click="show" :key="inputKey">
      <div class="icon" :class="{open: itemShow}"></div>
      <div class="icon-close" @click="empty"></div>
      <div class="itemList" v-if="itemShow" ref="selectorContent">
        <div class="itemBk" ref="itemList">
          <table cellspacing="0" cellpadding="0" @click="select">
            <tr ref="resultControl">
              <td colspan="7" class="dateControl">
                <span @click="showYearSelector">{{param.year}}</span>-
                <span @click="showMonthSelector">{{formatNum(param.month)}}</span>
                <div class="icon cIcon" @click="goNextMonth"></div>
                <div class="icon cIcon iconLeft" @click="goPreMonth"></div>
              </td>
            </tr>
            <tr v-if="showContent == 'year'" @click="showDateContent">
              <td colspan="7" ref="showContent" class="showContent clearFix">
                <div class="item" v-for="(item, key) in yearArr" :key="key">
                  <div class="itemContent" :class="{dateChecked: item == param.year}" @click="changeYear(item)">
                    {{item}}
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="showContent == 'month'" @click="showDateContent">
              <td colspan="7" ref="showContent" class="showContent clearFix">
                <div class="item" v-for="(item, key) in monthArr" :key="key">
                  <div class="itemContent" :class="{dateChecked: item == param.month}" @click="changeMonth(item)">
                    {{item}}月
                  </div>
                </div>
              </td>
            </tr>
            <tr class="dateTitle" v-if="showContent == 'date'">
              <td>一</td>
              <td>二</td>
              <td>三</td>
              <td>四</td>
              <td>五</td>
              <td>六</td>
              <td>日</td>
            </tr>
            <tr v-for="(item, key) in tdArr" :key="key" v-if="showContent == 'date'">
              <td v-for="(td,tdKey) in item" :key="tdKey" :class="{inMonth: td.inMonth, dateChecked: td.value == param.value, disabled: td.disabled}" :data-date="td.date" :data-key="key" :data-tdKey="tdKey">
                {{td.date || '&nbsp;'}}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="tip" :style="param.tipStyle || {}" v-if="param.tip && param.showTip && !itemShow">{{param.tip}}</div>
    </div>
  </div>
</template>

<script>
import './app.less'
import Index from './app.js'
export default Index
</script>
