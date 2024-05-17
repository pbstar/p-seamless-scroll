<template>
  <div class="page">
    <div class="view">
      <div class="fbox" ref="scrollContainer">
        <div class="sbox">
        </div>
      </div>
      <el-button-group class="btns">
        <el-button type="primary">开始</el-button>
        <el-button type="primary">暂停</el-button>
        <el-button type="primary">卸载</el-button>
      </el-button-group>
    </div>

    <div class="config">
      <div class="row">
        <span>mode 滚动设计模式</span>
        <div class="more">
          <el-radio-group v-model="config.mode" @change="changeMade">
            <el-radio v-for="(item, index) in configData.mode" :key="index" :value="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="row">
        <span>direction 滚动方向</span>
        <div class="more">
          <el-radio-group v-model="config.direction" @change="changeMade">
            <el-radio v-for="(item, index) in configData.direction" :key="index" :value="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="row">
        <span>hoverStop 鼠标悬停停止</span>
        <div class="more">
          <el-switch v-model="config.hoverStop" />
        </div>
      </div>
      <div class="row">
        <span>speed 滚动速度{{ config.speed }}</span>
        <div class="more">
          <el-slider v-model="config.speed" :min="configData.speed[0]" :max="configData.speed[1]" />
        </div>
      </div>
      <div class="row">
        <span>auto 自动滚动</span>
        <div class="more">
          <el-switch v-model="config.auto" />
        </div>
      </div>
      <div class="row">
        <span>loop 循环滚动</span>
        <div class="more">
          <el-switch v-model="config.loop" />
        </div>
      </div>
      <div class="row">
        <span>rest 在滚动一段距离后停留一段时间</span>
        <div class="more">
          <el-switch v-model="isRest" />
        </div>
      </div>
      <div class="row" v-if="isRest">
        <span>rest->distance 停留前滚动的距离</span>
        <div class="more">
          <el-slider v-model="config.rest.distance" :min="configData.rest.distance[0]"
            :max="configData.rest.distance[1]" />
        </div>
      </div>
      <div class="row" v-if="isRest">
        <span>rest->time 停留的时间</span>
        <div class="more">
          <el-slider v-model="config.rest.time" :min="configData.rest.time[0]" :max="configData.rest.time[1]" />
        </div>
      </div>
    </div>

  </div>

</template>
<script setup>
import { ref } from 'vue';
import pSeamlessScroll from 'p-seamless-scroll';
import { ElRadio, ElRadioGroup, ElSwitch, ElSlider, ElButton, ElButtonGroup } from 'element-plus'
import 'element-plus/dist/index.css'
const scrollContainer = ref(null);
const config = ref({
  el: scrollContainer.value,
  mode: 'distance',
  direction: 'up',
  hoverStop: true,
  speed: 50,
  auto: true,
  loop: true,
  rest: {
    distance: 80,
    time: 1000,
  },
});
const isRest = ref(true);
const configData = ref({
  mode: ['distance', 'time'],
  direction: ['up', 'down', 'left', 'right'],
  hoverStop: [false, true],
  speed: [1, 300],
  auto: [false, true],
  loop: [false, true],
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

const changeMade = (e) => {
  config.value.mode = e;
  pss.reload(config.value);
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
  width: 80px;
}
</style>