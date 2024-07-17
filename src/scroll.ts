import { checkConfig, getElementDistance, appendElem, toHover, initData, createScrollEl, watchState } from './units/index.ts';
import toStart_time from './modes/time.ts';
import { IData, EState } from './types/types.ts';
// 初始化
export function init(e_state:EState, i_data:IData) {

  // 校验配置信息
  if (!checkConfig(i_data)) return

  // 初始化数据
  initData(e_state, i_data)

  // 创建滚动元素
  createScrollEl(i_data)

  // 挂载元素的滚动长度
  i_data.contentDistance = getElementDistance(i_data, i_data.el.firstElementChild as HTMLElement);
  // 滚动视口长度
  i_data.viewDistance = getElementDistance(i_data, i_data.el);
  // 判断元素是否需要滚动
  if (i_data.contentDistance < i_data.viewDistance) {
    return console.error('ErrCode:108');
  }
  if (i_data.viewDistance < i_data.step) {
    return console.error('ErrCode:109');
  }

  // 拷贝元素用于滚动
  appendElem(i_data)

  // 监听鼠标移入移出事件
  toHover(e_state, i_data, () => {
    toStart_time(e_state, i_data)
  })

  i_data.isInit = true;

  // 开始滚动
  if (i_data.config.auto) {
    toStart_time(e_state, i_data)
  }
  // 监听属性
  watchState(e_state, i_data)
}

// 滚动
export function play(e_state:EState, i_data:IData) {
  if (!i_data.isInit) return console.error('ErrCode:110');
  e_state.isPause = false
  i_data.isHoverShield = false
  toStart_time(e_state, i_data)
}

// 暂停
export function pause(e_state:EState, i_data:IData) {
  if (!i_data.isInit) return console.error('ErrCode:110');
  e_state.isPause = true
  i_data.isHoverShield = true
}

// 销毁
export function destroy(i_data:IData) {
  if (!i_data.isInit) return console.error('ErrCode:110');
  i_data.isInit = false;
  i_data.el.innerHTML = i_data.raw_el;
  if (i_data.timer) clearTimeout(i_data.timer);
  if (i_data.restTimer) clearTimeout(i_data.restTimer)
  if (i_data.config.hoverStop && i_data.el.onmouseover) {
    i_data.el.onmouseover = null;
    i_data.el.onmouseout = null;
  }
}