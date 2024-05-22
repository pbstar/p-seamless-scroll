<template>
  <div class="page">
    <div class="view">
      <div class="fbox" ref="scrollContainer">
        <div class="sbox">
        </div>
      </div>
      <el-button-group class="btns">
        <el-button type="primary" @click="play">开始</el-button>
        <el-button type="primary" @click="pause">暂停</el-button>
        <el-button type="primary" @click="reload">重置</el-button>
        <el-button type="primary" @click="destroy">卸载</el-button>
      </el-button-group>
    </div>

    <div class="config">
      <div class="row">
        <span>direction 滚动方向</span>
        <div class="more">
          <el-radio-group v-model="config.direction" @change="changeDirection">
            <el-radio v-for="(item, index) in configData.direction" :key="index" :value="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="row">
        <span>hoverStop 鼠标悬停停止</span>
        <div class="more">
          <el-switch v-model="config.hoverStop" @change="changeHoverStop" />
        </div>
      </div>
      <div class="row">
        <span>speed 滚动速度{{ config.speed }}</span>
        <div class="more">
          <el-slider v-model="config.speed" :min="configData.speed[0]" :max="configData.speed[1]"
            @change="changeSpeed" />
        </div>
      </div>
      <div class="row">
        <span>auto 自动滚动</span>
        <div class="more">
          <el-switch v-model="config.auto" @change="changeAuto" />
        </div>
      </div>
      <div class="row">
        <span>loop 循环滚动</span>
        <div class="more">
          <el-switch v-model="config.loop" @change="changeLoop" />
        </div>
      </div>
      <div class="row">
        <span>rest 在滚动一段距离后停留一段时间</span>
        <div class="more">
          <el-switch v-model="isRest" @change="changeIsRest" />
        </div>
      </div>
      <div class="row" v-if="isRest">
        <span>rest->distance 停留前滚动的距离</span>
        <div class="more">
          <el-input-number v-model="config.rest.distance" :step="10" step-strictly :min="configData.rest.distance[0]"
            :max="configData.rest.distance[1]" @change="changeRestDistance" />
        </div>
      </div>
      <div class="row" v-if="isRest">
        <span>rest->time 停留的时间</span>
        <div class="more">
          <el-slider v-model="config.rest.time" :min="configData.rest.time[0]" :max="configData.rest.time[1]"
            @change="changeRestTime" />
        </div>
      </div>
    </div>

  </div>

</template>
<script setup>
import { ref } from 'vue';
import pSeamlessScroll from 'p-seamless-scroll';
// import pSeamlessScroll from '../../lib/p-seamless-scroll.es';
import { ElRadio, ElRadioGroup, ElSwitch, ElSlider, ElButton, ElButtonGroup, ElInputNumber } from 'element-plus'
import 'element-plus/dist/index.css'
const scrollContainer = ref(null);
const config = ref({
  el: scrollContainer.value,
  direction: 'up',
  hoverStop: false,
  speed: 50,
  auto: true,
  loop: true,
  rest: null,
});
const isRest = ref(false);
const configData = ref({
  direction: ['up', 'down', 'left', 'right'],
  speed: [1, 300],
  rest: {
    distance: [5, 1000],
    time: [100, 10000],
  }
})

let pss = null
setTimeout(() => {
  config.value.el = scrollContainer.value
  pss = new pSeamlessScroll(config.value);
}, 100);

const changeDirection = (e) => {
  config.value.direction = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeHoverStop = (e) => {
  config.value.hoverStop = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeSpeed = (e) => {
  config.value.speed = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeAuto = (e) => {
  config.value.auto = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeLoop = (e) => {
  config.value.loop = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeIsRest = (e) => {
  isRest.value = e;
  if (e) {
    config.value.rest = {
      distance: 80,
      time: 1000,
    }
  } else {
    config.value.rest = null
  }
  if (!pss) return;
  pss.reload(config.value);
}
const changeRestDistance = (e) => {
  config.value.rest.distance = e;
  if (!pss) return;
  pss.reload(config.value);
}
const changeRestTime = (e) => {
  config.value.rest.time = e;
  if (!pss) return;
  pss.reload(config.value);
}

const play = () => {
  if (!pss) return;
  pss.play();
}
const pause = () => {
  if (!pss) return;
  pss.pause();
}
const reload = () => {
  config.value = {
    el: scrollContainer.value,
    direction: 'up',
    hoverStop: false,
    speed: 50,
    auto: true,
    loop: true,
    rest: null,
  }
  isRest.value = false;
  if (!pss) return;
  pss.reload(config.value);
}
const destroy = () => {
  if (!pss) return;
  pss.destroy();
}
</script>

<style scoped>
@media screen and (min-width: 668px) {
  .page {
    display: flex;
  }

  .view {
    margin-right: 30px;
    margin-top: 20px;
  }

  .config {
    flex: 1;
  }
}

@media screen and (max-width: 668px) {
  .config {
    margin-top: 20px;
  }
}

.page {
  margin-top: 20px;
}

.fbox {
  width: 240px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.sbox {
  width: 320px;
  height: 320px;
  background-image: url(/logo.png);
}

.btns {
  width: 240px;
  margin-top: 10px;
}

.btns .el-button {
  width: 60px;
}
</style>