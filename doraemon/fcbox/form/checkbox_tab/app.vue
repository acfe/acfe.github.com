<template>
    <div class="FcCheckboxTab clearFix" ref="FcCheckboxTab">
        <div class="item clearFix" v-for="item,key in param.data" :style="param.itemStyle">
            <div class="option" :class="{checked: item.checked, enabled: item.enabled}" @click="select" :data-key="key">{{item.option}}</div>
        </div>
    </div>
</template>

<script>
	import './app.less';
    import App from './app.js';
    export default App;
</script>