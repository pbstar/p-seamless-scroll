// 校验配置信息
export function checkConfig(i_data) {
  if (!i_data.el || !i_data.el instanceof HTMLElement) {
    console.error('请挂载正确的el元素！例如：document.getElementById("id")');
    return false
  }
  if (!i_data.config.modeList.includes(i_data.config.mode)) {
    console.error('请挂载正确的mode滚动方向！例如：' + i_data.config.modeList.join('、'));
    return false
  }
  if (!i_data.config.directionList.includes(i_data.config.direction)) {
    console.error('请挂载正确的direction滚动方向！例如：' + i_data.config.directionList.join('、'));
    return false
  }
  if (i_data.config.speed < 1 || i_data.config.speed > 100000) {
    console.error('请挂载正确的speed滚动速度！例如：1-100000');
    return false
  }
  if (i_data.config.loop && i_data.config.loop != true && i_data.config.loop != false) {
    console.error('请挂载正确的loop是否循环滚动！例如：true、false');
    return false
  }
  if (i_data.config.hoverStop && i_data.config.hoverStop != true && i_data.config.hoverStop != false) {
    console.error('请挂载正确的hoverStop是否鼠标移入停止！例如：true、false');
    return false
  }
  if (i_data.config.auto && i_data.config.auto != true && i_data.config.auto != false) {
    console.error('请挂载正确的auto是否自动滚动！例如：true、false');
    return false
  }
  return true
}
// 获取元素长度
export function getElementDistance(i_data, el) {
  if (i_data.config.direction == 'down' || i_data.config.direction == 'up') {
    return el.offsetHeight
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    return el.offsetWidth
  } else {
    return 0
  }
}
// 处理间隙
export function handleGap(i_data) {
  let remainder = i_data.contentDistance % i_data.step
  if (remainder != 0) {
    let remainderDistance = i_data.step - remainder
    i_data.contentDistance = i_data.contentDistance + remainderDistance
    let remainderEl = document.createElement('div')
    remainderEl.style.width = remainderDistance + 'px'
    remainderEl.style.height = remainderDistance + 'px'
    i_data.el.append(remainderEl)
  }
}
// 拷贝元素用于滚动
export function appendElem(i_data) {
  let c_length = i_data.el.children.length
  let c_distance = 0
  for (let i = 0; i < c_length; i++) {
    c_distance += getElementDistance(i_data, i_data.el.children[i])
    i_data.el.append(i_data.el.children[i].cloneNode(true))
    if (c_distance >= i_data.viewDistance) break
  }
}
//鼠标移入移出
export function toHover(e_data, i_data, callback) {
  i_data.el.onmouseover = debounce(() => {
    e_data.state.isHover = true
    if (i_data.isHoverShield) return;
    e_data.state.isPause = true
    callback()
  }, 100)
  i_data.el.onmouseout = debounce(() => {
    e_data.state.isHover = false
    if (i_data.isHoverShield) return;
    e_data.state.isPause = false
    callback()
  }, 100)
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }
}
// 瞬间移动
export function instant(i_data) {
  if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
    i_data.el.animate({ transform: 'translate(0px, ' + i_data.distance + 'px)' }, { duration: 0, fill: 'forwards' })
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    i_data.el.animate({ transform: 'translate(' + i_data.distance + 'px, 0px)' }, { duration: 0, fill: 'forwards' })
  }
}
// 动画移动
export function animate(i_data, time) {
  if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
    i_data.el.animate({ transform: 'translate(0px, ' + i_data.distance + 'px)' }, { duration: time, fill: 'forwards' })
  } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
    i_data.el.animate({ transform: 'translate(' + i_data.distance + 'px, 0px)' }, { duration: time, fill: 'forwards' })
  }
}