<template>
    <div class="FcSingleUpload" ref="FcSingleUpload" :key="picKey">
        <div class="upBk">
            <div class="upBg"></div>
        </div>
        <input type="file" class="iFile" v-if="!param.value" @change="fileSelect"/>
        <div class="img" v-if="param.value" @click="showImage">
            <img :src="param.value">
        </div>
        <div class="delBg" v-if="param.value && param.del"></div>
        <div class="del" v-if="param.value && param.del" @click="del">删除</div>
    </div>
</template>

<script>
	import './app.less';
    import Index from './app.js';
    export default Index;
</script>