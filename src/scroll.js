export function init(e_data, i_data) {
  // 判断传入的元素是否正确
  if (!i_data.el || !i_data.el instanceof HTMLElement) {
    return console.error('请挂载正确的元素！');
  }
  // 挂载元素的高度
  let contentHeight = i_data.el.offsetHeight;
  // 判断元素是否需要滚动
  if (contentHeight < i_data.el.parentElement.offsetHeight) {
    return console.warn('元素高度小于其父元素，无需开启滚动！');
  }
  // 初始化滚动位置
  let distance = 0
  if (i_data.config.direction == 'down') distance = -contentHeight
  // 拷贝元素用于滚动
  i_data.el.append(i_data.el.cloneNode(i_data.el))
  // 鼠标移入移出
  if (i_data.config.hoverStop) {
    toHover()
  }
  // 开始滚动
  if (i_data.config.auto) {
    toStart()
  }

  //鼠标移入移出
  function toHover() {
    i_data.el.onmouseover = () => {
      e_data.state.isHover = true
      if (i_data.isHoverShield) return;
      e_data.state.isPause = true
    }
    i_data.el.onmouseout = () => {
      e_data.state.isHover = false
      if (i_data.isHoverShield) return;
      e_data.state.isPause = false
    }
  }

  // 开始
  function toStart() {
    i_data.isStart = true
    if (i_data.timer) clearInterval(i_data.timer)
    i_data.timer = setInterval(() => {
      toDistance()
    }, i_data.config.speed);
  }

  //移动
  function toDistance() {
    if (e_data.state.isPause) return
    if (i_data.config.direction == 'up') {
      distance--
      if (distance * -1 >= contentHeight && i_data.config.loop) distance = 0
      i_data.el.style.transform = 'translate(0px, ' + distance + 'px)';;
    } else if (i_data.config.direction == 'down') {
      distance++
      if (distance >= 0 && i_data.config.loop) distance = -contentHeight
      i_data.el.style.transform = 'translate(0px, ' + distance + 'px)';
    }
  }
}

export function destroy(e_data, i_data) {
  if (i_data.timer) clearInterval(i_data.timer)
  if (i_data.config.hoverStop) {
    i_data.el.onmouseover.remove();
    i_data.el.onmouseout.remove();
  }
  e_data = null
  i_data = null
}