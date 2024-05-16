import { checkConfig, getElementDistance, handleGap, computeStep, appendElem, toHover } from './units/index.js';
import toStart_distance from './modes/distance.js';
import toStart_time from './modes/time.js';

// 初始化
export function init(e_data, i_data) {

  // 校验配置信息
  if (!checkConfig(i_data)) return

  // 创建滚动元素
  const scrollEl = document.createElement('div')
  scrollEl.append(...i_data.el.children)
  i_data.el.append(scrollEl)

  // 挂载元素的滚动长度
  i_data.contentDistance = getElementDistance(i_data, i_data.el.firstElementChild);
  // 滚动视口长度
  i_data.viewDistance = getElementDistance(i_data, i_data.el);
  // 判断元素是否需要滚动
  if (i_data.contentDistance < i_data.viewDistance) {
    return console.warn('滚动元素长度小于滚动视口长度，无需开启滚动！');
  }

  // 滚动步长
  computeStep(i_data)

  // 拷贝元素用于滚动
  appendElem(i_data)

  // 处理间隙
  if (i_data.config.mode == 'distance') {
    handleGap(i_data)
  }

  // 监听鼠标移入移出事件
  if (i_data.config.hoverStop) {
    toHover(e_data, i_data, () => {
      if (i_data.config.mode == 'time') {
        toStart_time(e_data, i_data)
      }
      if (i_data.onHover) i_data.onHover(e_data.state.isHover)
      if (i_data.onPause) i_data.onPause(e_data.state.isPause)
    })
  }

  // 开始滚动
  if (i_data.config.auto) {
    i_data.isStarted = true
    if (i_data.config.mode == 'distance') {
      toStart_distance(e_data, i_data)
    } else if (i_data.config.mode == 'time') {
      toStart_time(e_data, i_data)
    }
  }
}

// 滚动
export function play(e_data, i_data) {
  e_data.state.isPause = false
  if (i_data.onPause) i_data.onPause(e_data.state.isPause)
  i_data.isHoverShield = false
  if (i_data.config.mode == 'distance') {
    if (!i_data.isStarted) {
      i_data.isStarted = true
      toStart_distance(e_data, i_data)
    }
  } else if (i_data.config.mode == 'time') {
    toStart_time(e_data, i_data)
  }
}

// 暂停
export function pause(e_data, i_data) {
  e_data.state.isPause = true
  if (i_data.onPause) i_data.onPause(e_data.state.isPause)
  i_data.isHoverShield = true
}

// 销毁
export function destroy(e_data, i_data) {
  if (i_data.timer) clearInterval(i_data.timer)
  if (i_data.config.hoverStop) {
    i_data.el.onmouseover.remove();
    i_data.el.onmouseout.remove();
  }
  e_data = null
  i_data = null
}