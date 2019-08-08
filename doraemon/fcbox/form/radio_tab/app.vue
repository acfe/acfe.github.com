<template>
    <div class="FcRadioTab clearFix" ref="FcRadioTab" :key="rand">
        <div class="item clearFix" v-for="(item, key) in param.data" :key="key" :style="param.itemStyle">
            <div class="option" :class="{checked: param.value == item.value, disabled: item.disabled}" @click="select" :data-key="key">{{item.option}}</div>
        </div>
    </div>
</template>

<script>
	import './app.less';
    import App from './app.js';
    export default App;
</script>