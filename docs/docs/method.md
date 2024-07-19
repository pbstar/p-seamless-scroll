---
outline: deep
---

# 方法

## init(e)

初始化。实例化 new pSeamlessScroll()之后自动初始，无需调用此方法。此方法用作 destroy()之后再次使用时调用。

## play()

开始滚动。如果配置自动开始滚动则初始化后无需调用此方法。

## pause()

暂停滚动。

## reload(e)

重载配置。接受一个配置对象 e，并更新当前实例的配置。

## destroy()

销毁滚动实例，清除定时器并释放资源。

## getState()

获取当前状态对象。
