import { init, destroy, play, pause } from './scroll.ts';
import { IData, EState, Config, onFun } from './types/types.ts';
let data: IData = {
  //节点
  el: null,
  //原始节点
  raw_el: null,
  //配置信息
  config: {
    //滚动方向
    direction: 'up',
    directionList: ['up', 'down', 'left', 'right'],
    //是否鼠标移入停止
    hoverStop: false,
    //滚动速度
    speed: 100,
    //是否自动滚动
    auto: true,
    //是否循环滚动
    loop: true,
    // 滚动休息
    rest: null,
  },
  state: {
    //是否鼠标移入
    isHover: false,
    //是否暂停
    isPause: false,
  },
  // 定时器
  timer: null,
  // 休息定时器
  restTimer: null,
  //是否屏蔽鼠标移入事件
  isHoverShield: false,
  // 挂载元素的滚动长度
  contentDistance: 0,
  // 滚动视口长度
  viewDistance: 0,
  // 滚动步长
  step: 10,
  // 滚动位置
  distance: 0,
  // 休息距离
  restDistance: 0,
  // 是否完成初始化
  isInit: false,
  // 监听的属性
  watchs: []
}
class pSeamlessScroll {
  state: EState
  constructor(e: Config) {
    //状态信息
    this.state = {
      //是否鼠标移入
      isHover: false,
      //是否暂停
      isPause: false,
    }
    this.init(e)
  }
  //初始化
  init(e: Config) {
    //内部数据
    data.el = e.el
    data.config.direction = e.direction || 'up'
    data.config.hoverStop = e.hoverStop === true ? true : false
    data.config.speed = e.speed || 100
    data.config.auto = e.auto === false ? false : true
    data.config.loop = e.loop === false ? false : true
    data.config.rest = e.rest || null
    //初始化
    init(data, this)
  }
  //开始滚动
  play() {
    play(data)
  }
  //暂停滚动
  pause() {
    pause(data)
  }
  //重载配置
  reload(e: Config) {
    destroy(data)
    data.config.direction = e.direction || 'up'
    data.config.hoverStop = e.hoverStop === true ? true : false
    data.config.speed = e.speed || 100
    data.config.auto = e.auto === false ? false : true
    data.config.loop = e.loop === false ? false : true
    data.config.rest = e.rest || null
    init(data, this)
  }
  //销毁
  destroy() {
    destroy(data)
  }
  //获取当前状态
  getState() {
    return data.state
  }
  //监听事件
  on(e: string, f: onFun) {
    if (e == 'hover') data.watchs.push({ es: e, ks: 'isHover', f })
    else if (e == 'pause') data.watchs.push({ es: e, ks: 'isPause', f })
  }
  // 移除监听事件
  off(e: string) {
    let watchs = data.watchs.filter(item => item.es !== e);
    data.watchs = watchs
  }
}
export default pSeamlessScroll