import { IData } from '../types/types.ts';
// 校验配置信息
export function checkConfig(i_data: IData) {
  if (!i_data.el) {
    console.error('ErrCode:101');
    return false
  }
  i_data.raw_el = i_data.el.innerHTML
  if (!i_data.config.directionList.includes(i_data.config.direction)) {
    console.error('ErrCode:102');
    return false
  }
  if (i_data.config.speed < 1 || i_data.config.speed > 100000) {
    console.error('ErrCode:103');
    return false
  }
  if (i_data.config.loop && i_data.config.loop != true && i_data.config.loop != false) {
    console.error('ErrCode:104');
    return false
  }
  if (i_data.config.hoverStop && i_data.config.hoverStop != true && i_data.config.hoverStop != false) {
    console.error('ErrCode:105');
    return false
  }
  if (i_data.config.auto && i_data.config.auto != true && i_data.config.auto != false) {
    console.error('ErrCode:106');
    return false
  }
  if (i_data.config.rest) {
    if (!i_data.config.rest.distance || i_data.config.rest.distance < 10 || i_data.config.rest.distance > 100000 || i_data.config.rest.distance % 10 != 0) {
      console.error('ErrCode:107-1');
      return false
    }
    if (!i_data.config.rest.time || i_data.config.rest.time < 1 || i_data.config.rest.time > 100000) {
      console.error('ErrCode:107-2');
      return false
    }
  }
  return true
}
// 获取元素长度
export function getElementDistance(i_data: IData, el: HTMLElement) {
  if (i_data.config.direction == 'down' || i_data.config.direction == 'up') {
    return el.offsetHeight
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    return el.offsetWidth
  } else {
    return 0
  }
}
// 拷贝元素用于滚动
export function appendElem(i_data: IData) {
  let c_length = i_data.el.firstElementChild?.firstElementChild?.children.length || 0
  let c_distance = 0
  for (let i = 0; i < c_length; i++) {
    c_distance += getElementDistance(i_data, i_data.el.firstElementChild?.firstElementChild?.children[i] as HTMLElement)
    i_data.el.firstElementChild?.firstElementChild?.append(i_data.el.firstElementChild?.firstElementChild?.children[i]?.cloneNode(true))
    if (c_distance >= i_data.viewDistance) break
  }
}
//鼠标移入移出
export function toHover(i_data: IData, callback: () => void) {
  i_data.el.firstElementChild.onmouseenter = () => {
    if (i_data.state.isHover) return;
    i_data.state.isHover = true
    if (i_data.isHoverShield) return;
    if (i_data.config.hoverStop) {
      i_data.state.isPause = true
      callback()
    }
  }
  i_data.el.firstElementChild.onmouseleave = () => {
    if (!i_data.state.isHover) return;
    i_data.state.isHover = false
    if (i_data.isHoverShield) return;
    if (i_data.config.hoverStop) {
      i_data.state.isPause = false
      callback()
    }
  }
}
// 瞬间移动
export function instant(i_data: IData) {
  if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
    i_data.el.firstElementChild?.firstElementChild?.animate({ transform: 'translate(0px, ' + i_data.distance + 'px)' }, { duration: 0, fill: 'forwards' })
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    i_data.el.firstElementChild?.firstElementChild?.animate({ transform: 'translate(' + i_data.distance + 'px, 0px)' }, { duration: 0, fill: 'forwards' })
  }
}
// 动画移动
export function animate(i_data: IData, time: number) {
  if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
    i_data.el.firstElementChild?.firstElementChild?.animate({ transform: 'translate(0px, ' + i_data.distance + 'px)' }, { duration: time, fill: 'forwards' })
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    i_data.el.firstElementChild?.firstElementChild?.animate({ transform: 'translate(' + i_data.distance + 'px, 0px)' }, { duration: time, fill: 'forwards' })
  }
}
// 休息
export function rest(i_data: IData, callback: () => void) {
  if (i_data.restDistance >= i_data.config.rest.distance) {
    i_data.restDistance = 0
    i_data.state.isPause = true
    if (i_data.restTimer) clearTimeout(i_data.restTimer)
    i_data.restTimer = setTimeout(() => {
      i_data.state.isPause = false
      callback()
    }, i_data.config.rest.time)
  }
}
// 初始化数据
export function initData(i_data: IData) {
  i_data.state = {
    isHover: false,
    isPause: false,
  }
  i_data.timer = null
  i_data.restTimer = null
  i_data.isHoverShield = false
  i_data.contentDistance = 0
  i_data.viewDistance = 0
  i_data.step = 10
  i_data.distance = 0
  i_data.restDistance = 0
  i_data.isInit = false
}
// 创建滚动元素
export function createScrollEl(i_data: IData) {
  let scrollEl: any = document.createElement('div')
  let fatherEl: any = document.createElement('div')
  scrollEl.style.display = "inline-flex"
  scrollEl.style.pointerEvents = "none"
  fatherEl.style.width = "100%"
  fatherEl.style.height = "100%"
  fatherEl.style.overflow = "hidden"
  if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
    scrollEl.style.flexDirection = "column"
  }
  for (let i = 0; i < i_data.el.children.length; i++) {
    scrollEl.append(i_data.el.children[i])
  }
  fatherEl.append(scrollEl)
  i_data.el.append(fatherEl)
  fatherEl = null
  scrollEl = null
}
// 监听state
export function watch(i_data: IData, pss: any) {
  i_data.state = new Proxy(i_data.state, {
    set(target, key: string, value, receiver) {
      pss.state[key] = value
      if (key == 'isPause') {
        if (i_data.restTimer) clearTimeout(i_data.restTimer)
      }
      //事件监听
      for (let i = 0; i < i_data.watchs.length; i++) {
        let { ks, f } = i_data.watchs[i]
        if (ks == key) f(value)
      }
      return Reflect.set(target, key, value, receiver)
    }
  })
}