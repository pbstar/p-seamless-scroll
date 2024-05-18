import { checkConfig, getElementDistance, computeStep, appendElem, toHover, initData, createScrollEl } from './units/index.js';
import toStart_time from './modes/time.js';

// 初始化
export function init(e_data, i_data) {

  // 校验配置信息
  if (!checkConfig(i_data)) return

  // 初始化数据
  initData(e_data, i_data)

  // 创建滚动元素
  createScrollEl(i_data)

  // 挂载元素的滚动长度
  i_data.contentDistance = getElementDistance(i_data, i_data.el.firstElementChild);
  // 滚动视口长度
  i_data.viewDistance = getElementDistance(i_data, i_data.el);
  // 判断元素是否需要滚动
  if (i_data.contentDistance < i_data.viewDistance) {
    return console.warn('ErrCode:108');
  }
  if (i_data.viewDistance < 10) {
    return console.warn('ErrCode:109');
  }

  // 滚动步长
  computeStep(i_data)

  // 拷贝元素用于滚动
  appendElem(i_data)

  // 监听鼠标移入移出事件
  if (i_data.config.hoverStop) {
    toHover(e_data, i_data, () => {
      toStart_time(e_data, i_data)
      if (i_data.onHover) i_data.onHover(e_data.state.isHover)
      if (i_data.onPause) i_data.onPause(e_data.state.isPause)
    })
  }

  // 开始滚动
  if (i_data.config.auto) {
    toStart_time(e_data, i_data)
  }
}

// 滚动
export function play(e_data, i_data) {
  e_data.state.isPause = false
  if (i_data.onPause) i_data.onPause(e_data.state.isPause)
  i_data.isHoverShield = false
  toStart_time(e_data, i_data)
}

// 暂停
export function pause(e_data, i_data) {
  e_data.state.isPause = true
  if (i_data.onPause) i_data.onPause(e_data.state.isPause)
  i_data.isHoverShield = true
}

// 销毁
export function destroy(i_data) {
  i_data.el.innerHTML = i_data.raw_el
  if (i_data.timer) clearInterval(i_data.timer)
  if (i_data.config.hoverStop && i_data.el.onmouseover) {
    i_data.el.onmouseover = null;
    i_data.el.onmouseout = null;
  }
}