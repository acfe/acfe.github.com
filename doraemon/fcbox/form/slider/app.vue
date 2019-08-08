<template>
    <div class="FcSlider" ref="FcSlider">
        <div class="bgBk">
            <div class="bgContent">
                <div class="bgBar" @click="click"></div>
            </div>
            <div class="bgChecked">
                <div class="checkedMask" ref="slideMask" :style="{width: maskWidth}"></div>
                <div class="bgCheckedBar" ref="slideBg">
                    <div class="slideBar" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" ref="slider" :style="{left: slideLeft}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import './app.less';
    import Index from './app.js';
    export default Index;
</script>