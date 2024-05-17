## p-seamless-scroll 官方文档

[![](https://img.shields.io/badge/GitHub-E34C26.svg)](https://github.com/pbstar/p-seamless-scroll)
[![GitHub license](https://img.shields.io/github/license/pbstar/p-seamless-scroll?style=flat&color=109BCD)](https://github.com/pbstar/p-seamless-scroll?tab=MIT-1-ov-file#readme)
[![GitHub stars](https://img.shields.io/github/stars/pbstar/p-seamless-scroll?style=flat&color=d48806)](https://github.com/pbstar/p-seamless-scroll/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pbstar/p-seamless-scroll?style=flat&color=C6538C)](https://github.com/pbstar/p-seamless-scroll/forks)
[![NPM Version](https://img.shields.io/npm/v/p-seamless-scroll?style=flat&color=d4b106)](https://www.npmjs.com/package/p-seamless-scroll)
[![npm bundle size](https://img.shields.io/bundlephobia/min/p-seamless-scroll?style=flat&color=41B883)](https://www.npmjs.com/package/p-seamless-scroll)

p-seamless-scroll 是一个创建无缝滚动效果的 js 插件。它有着轻量且高效的特性，支持丰富的自定义配置选项，提供了一系列 API 方法以及事件监听功能。

### 官网

[https://pbstar.github.io/p-seamless-scroll/](https://pbstar.github.io/p-seamless-scroll/)

### 配置

- el: 滚动容器的 DOM 元素。
- mode: 滚动设计模式，可选值包括 'distance' (默认) 、 'time'。
- direction: 滚动方向，可选值包括 'up' (默认) 、 'down' 、 'left' 、 'right'。
- speed: 滚动速度，以毫秒为单位，默认为 100。
- hoverStop: 是否在鼠标移入时停止滚动，默认为 true。
- auto: 是否自动开始滚动，默认为 true。
- loop: 是否循环滚动，默认为 true。
- rest: 在滚动一段距离后停留一段时间，默认为 null，例如{distance: 100, time: 2000}。
  - distance: 停留前滚动的距离，以 px 为单位，默认为 100。
  - time: 停留的时间，以毫秒为单位，默认为 2000。

### 属性

- state: 对象的状态信息，包含以下属性：
  - isHover: 是否鼠标移入滚动容器。
  - isPause: 是否暂停滚动。

### 方法

- play(): 开始滚动。如果配置自动开始滚动则初始化后无需调用此方法。
- pause(): 暂停滚动。
- reload(e): 重载配置。接受一个配置对象 e，并更新当前实例的配置。
- destroy(): 销毁滚动实例，清除定时器并释放资源。
- getState(): 获取当前状态对象。

### 事件

- on(event, callback): 监听事件。event 可以是以下值：
  - hover: 鼠标移入或移出滚动容器时触发。
  - pause: 滚动暂停或继续时触发。

- off(event): 移除事件监听。event 可以是以下值：
  - hover
  - pause

### 安装引入

#### npm 安装

```bash
npm install p-seamless-scroll --save
```

#### esm 引入

```javascript
import pSeamlessScroll from "p-seamless-scroll";
```

#### cdn 引入

```html
<script src="https://unpkg.com/p-seamless-scroll@[version]/lib/p-seamless-scroll.umd.js"></script>
```

### 使用示例

```html
<style>
  .fbox {
    width: 100px;
    height: 300px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .sbox {
    width: 100px;
    height: 200px;
  }
</style>
<div class="fbox" id="scrollContainer">
  <div class="sbox" style="background-color: rgb(255, 210, 210);">1</div>
  <div class="sbox" style="background-color: rgb(224, 255, 224);">2</div>
</div>
```

```javascript
// 假设已经有一个滚动容器的 DOM 元素，ID 为 'scroll-container'
const scrollContainer = document.getElementById('scroll-container');

// 实例化 pSeamlessScroll
const pss = new pSeamlessScroll({
  el: scrollContainer,
  mode: 'time'
});
```
