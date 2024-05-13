## p-seamless-scroll 官方文档

[![](https://img.shields.io/badge/GitHub-C83C23.svg)](https://github.com/pbstar/p-seamless-scroll)
![GitHub license](https://img.shields.io/github/license/pbstar/p-seamless-scroll?style=flat&color=195E79)
![GitHub stars](https://img.shields.io/github/stars/pbstar/p-seamless-scroll?style=flat&color=8B4513)
![GitHub forks](https://img.shields.io/github/forks/pbstar/p-seamless-scroll?style=flat&color=556B2F)
![NPM Version](https://img.shields.io/npm/v/p-seamless-scroll?style=flat&color=7B68EE)
![npm bundle size](https://img.shields.io/bundlephobia/min/p-seamless-scroll?style=flat&color=708090)



p-seamless-scroll 是一个轻量级且功能强大的 js 插件，用于创建无缝滚动效果。它支持丰富的自定义配置选项，提供了一系列实用的 API 方法以及事件监听功能。

### 配置

- mode: 滚动设计模式，可选值包括 'distance' (默认) 、 'time'。
- el: 滚动容器的 DOM 元素。
- direction: 滚动方向，可选值包括 'up' (默认) 、 'down' 、 'left' 、 'right'。
- hoverStop: 是否在鼠标移入时停止滚动，默认为 true。
- speed: 滚动速度，以毫秒为单位，默认为 100。
- auto: 是否自动开始滚动，默认为 true。
- loop: 是否循环滚动，默认为 true。

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

```
npm install p-seamless-scroll --save
```

#### import 引入

```
import pSeamlessScroll from "p-seamless-scroll";
```

#### cdn 引入

```
<script src="https://unpkg.com/p-seamless-scroll@0.3.0/lib/p-seamless-scroll.umd.js"></script>
```

### 使用示例

```
// 假设已经有一个滚动容器的 DOM 元素，ID 为 'scroll-container'
const scrollContainer = document.getElementById('scroll-container');

// 实例化 pSeamlessScroll
const seamlessScroll = new pSeamlessScroll({
  el: scrollContainer,
  mode: 'time',
  direction: 'down',
  speed: 200
});

// 事件监听
seamlessScroll.on('pause',(e)=>{
  console.log('pause',e);
})
// 暂停滚动
seamlessScroll.pause();
```
