## p-seamless-scroll 官方文档
p-seamless-scroll 是一个小巧而强大的 JavaScript 插件，专门用于创建流畅的无缝滚动效果。它支持丰富的自定义配置选项，允许用户根据实际需求调整滚动方向、速度、是否自动滚动以及是否循环滚动等参数。此外，p-seamless-scroll 还提供了一系列实用的 API 方法，如开始滚动、暂停滚动、重载配置和销毁实例等，为用户提供了灵活的操作和控制手段。

### 配置
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

### 安装引入
#### npm安装
```
npm install p-seamless-scroll --save
```
#### import引入
```
import pSeamlessScroll from "p-seamless-scroll";
```
#### cdn引入
```
<script src="https://unpkg.com/p-seamless-scroll@0.2.1/lib/p-seamless-scroll.umd.js"></script>
```
### 使用示例
```
// 假设已经有一个滚动容器的 DOM 元素，ID 为 'scroll-container'  
const scrollContainer = document.getElementById('scroll-container');  
  
// 实例化 pSeamlessScroll  
const seamlessScroll = new pSeamlessScroll({  
  el: scrollContainer,  
  direction: 'down',  
  hoverStop: false,  
  speed: 200,  
  auto: false,  
  loop: true  
});  
  
// 开始滚动  
seamlessScroll.play();  
  
// 暂停滚动  
seamlessScroll.pause();  

// 销毁实例  
seamlessScroll.destroy();
```