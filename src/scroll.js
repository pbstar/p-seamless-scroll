export function init(e_data, i_data) {
  // 校验配置信息
  if (!checkConfig()) return

  // 挂载元素的滚动长度
  let contentDistance = getElementDistance(i_data.el);
  // 滚动视口长度
  let viewDistance = getElementDistance(i_data.el.parentElement);
  // 判断元素是否需要滚动
  if (contentDistance < viewDistance) {
    return console.warn('滚动元素长度小于滚动视口长度，无需开启滚动！');
  }

  // 滚动步长
  let step = 0
  if (viewDistance > 600) step = 10
  else if (viewDistance > 200) step = 5
  else if (viewDistance > 100) step = 3
  else step = 2

  // 初始化滚动位置
  let distance = 0
  if (i_data.config.direction == 'down' || i_data.config.direction == 'right') {
    distance = -contentDistance
    instant()
  }
  // 拷贝元素用于滚动
  let c_length = i_data.el.children.length
  let c_distance = 0
  for (let i = 0; i < c_length; i++) {
    c_distance += getElementDistance(i_data.el.children[i])
    i_data.el.append(i_data.el.children[i].cloneNode(true))
    if (c_distance >= viewDistance) break
  }

  // 鼠标移入移出
  if (i_data.config.hoverStop) {
    toHover()
  }
  // 开始滚动
  if (i_data.config.auto) {
    toStart()
  } else {
    i_data.toStartFunction = toStart
  }

  // 校验配置信息
  function checkConfig() {
    if (!i_data.el || !i_data.el instanceof HTMLElement) {
      console.error('请挂载正确的el元素！例如：document.getElementById("id")');
      return false
    }
    let directionList = ['up', 'down', 'left', 'right']
    if (!directionList.includes(i_data.config.direction)) {
      console.error('请挂载正确的direction滚动方向！例如：up、down、left、right');
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
  function getElementDistance(el) {
    if (i_data.config.direction == 'down' || i_data.config.direction == 'up') {
      return el.offsetHeight
    } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
      return el.offsetWidth
    } else {
      return 0
    }
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
    i_data.isStarted = true
    i_data.toStartFunction = null
    if (i_data.timer) clearInterval(i_data.timer)
    i_data.timer = setInterval(() => {
      toDistance()
    }, i_data.config.speed);
  }

  //移动
  function toDistance() {
    if (e_data.state.isPause) return
    if (i_data.config.direction == 'up' || i_data.config.direction == 'left') {
      if (distance * -1 >= contentDistance && i_data.config.loop) {
        distance = 0
        instant()
        toDistance()
      } else {
        distance -= step
        animate()
      }
    } else if (i_data.config.direction == 'down' || i_data.config.direction == 'right') {
      if (distance >= 0 && i_data.config.loop) {
        distance = -contentDistance
        instant()
        toDistance()
      } else {
        distance += step
        animate()
      }
    }
  }
  // 瞬间移动
  function instant() {
    if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
      i_data.el.animate({ transform: 'translate(0px, ' + distance + 'px)' }, { duration: 0, fill: 'forwards' })
    } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
      i_data.el.animate({ transform: 'translate(' + distance + 'px, 0px)' }, { duration: 0, fill: 'forwards' })
    }
  }
  // 动画移动
  function animate() {
    if (i_data.config.direction == 'up' || i_data.config.direction == 'down') {
      i_data.el.animate({ transform: 'translate(0px, ' + distance + 'px)' }, { duration: i_data.config.speed, fill: 'forwards' })
    } else if (i_data.config.direction == 'left' || i_data.config.direction == 'right') {
      i_data.el.animate({ transform: 'translate(' + distance + 'px, 0px)' }, { duration: i_data.config.speed, fill: 'forwards' })
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