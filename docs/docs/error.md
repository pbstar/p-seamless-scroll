---
outline: deep
---

# 错误码

## 101

请挂载正确的 el 元素！例如：document.getElementById("id")。

## 102

请配置正确的 direction 滚动方向！可选值包括 'up' (默认) 、 'down' 、 'left' 、 'right'。

## 103

请配置正确的 speed 滚动速度！可选值在 1-100000 之间。

## 104

请配置正确的 loop 是否循环滚动！可选值包括 true、false。

## 105

请配置正确的 hoverStop 是否鼠标移入停止！可选值包括 true、false。

## 106

请配置正确的 auto 是否自动滚动！可选值包括 true、false。

## 107

请配置正确的 rest 是否在滚动一段距离后停留一段时间！可选值包括 null、{distance: 100, time: 2000}。

- 107-1: 请配置正确的 rest.distance 停留前滚动距离！可选值在 1-100000 之间。
- 107-2: 请配置正确的 rest.time 停留时间！可选值在 1-100000 之间。

## 108

滚动元素长度小于滚动视口长度，无需开启滚动。

## 109

滚动视口长度小于 10px，无需开启滚动。