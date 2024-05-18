---
outline: deep
---

# 快速开始

## 安装引入

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

## 使用示例

```html
<style>
  .fbox {
    width: 160px;
    height: 160px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .sbox {
    width: 240px;
    height: 240px;
    background-image: url(https://pbstar.github.io/p-seamless-scroll/logo.png);
  }
</style>

<div class="fbox" id="scrollContainer">
  <div class="sbox"></div>
</div>
```

```javascript
// 获取滚动容器
const scrollContainer = document.getElementById("scroll-container");

// 实例化 pSeamlessScroll
const pss = new pSeamlessScroll({
  el: scrollContainer
});
```
