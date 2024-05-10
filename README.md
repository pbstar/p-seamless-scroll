## p-seamless-scroll 官方文档

### 安装引入
#### npm安装
```
npm i p-seamless-scroll

import pSeamlessScroll from "p-seamless-scroll";
```
#### cdn引入
```
<script src="https://unpkg.com/p-seamless-scroll@0.0.1/lib/p-seamless-scroll.umd.js"></script>
```
### 使用示例
```
let scrollContainer = document.getElementById('scrollContainer');
let options = {
  el: scrollContainer
}
let pss=new pSeamlessScroll(options);
console.log(pss.state);// 获取状态信息
console.log(pss.getState());// 获取状态信息
```
### 配置项
el--挂载的dom节点<br>
direction--滚动方向<br>
speed--滚动速度<br>
hoverStop--鼠标悬停是否停止<br>
auto--是否自动滚动<br>
loop--是否循环滚动<br>
### 状态信息
isPause--是否暂停滚动<br>
isHover--是否鼠标悬浮<br>
### api
play--开始滚动<br>
pause--暂停滚动<br>
reload--重载<br>
destroy--销毁<br>
getState--获取状态信息<br>